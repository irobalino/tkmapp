import React, { Component } from 'react';
import { Alert, Button, Glyphicon  } from 'react-bootstrap';
import { EtsyListingFont } from './EtsyWizardUIBlocks';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import { Row, Grid  } from 'react-bootstrap';

import '../static/css/etsy.css';
import 'react-notifications/lib/notifications.css';

async function GetListingProducts(listing_id) {
    let listingsdata = await fetch('/api/listings/' + listing_id + '/inventory', {
    }).then(response => {
        return response.json();
    })
    .then(data => {
        return data.results;
    })
    .catch((error) => {
        return [];
    });

    return listingsdata;
}

export class FontSelection extends Component {
    displayName = FontSelection.name

    async componentDidMount() {
        var info = {};

        let data = await GetListingProducts(this.props.fieldValues.listing_id);
        if (data.products !== undefined && data.products.length > 0)
        {
            var fonts = [];
            var uniquefonts = [];

            for (var i = 0; i < data.products.length; i++) {
                var product = data.products[i];
                var typography = product.property_values.filter(x => {
                    return x.property_name === 'Font';
                });

                if (typography !== undefined && typography.length > 0)
                {
                    fonts.push({
                        propertyid: typography[0].property_id,
                        id: typography[0].value_ids[0],
                        name: typography[0].values[0]
                    });   
                }
            } 

            if (fonts.length > 0) {
                uniquefonts = fonts.filter((obj, pos, arr) => {
                    return arr.map(mapObj => mapObj["name"]).indexOf(obj["name"]) === pos;
                });
            }

            this.setState({
                fonts: uniquefonts
            });            

            //We save products info for other components
            info = {
                products: data.products
            }
            this.props.saveValues(info)            
        }
        else {
            NotificationManager.warning('No Inventory were found', 'EtsyApp', 3000);

            info = {
                products: []
            }
            this.props.saveValues(info)            
        }

        window.scrollTo(0, 0);
    }    

    constructor(props) {
        super(props);

        this.state = {
            fonts: [],
            text: (this.props.fieldValues.custom_text === undefined ? '' : this.props.fieldValues.custom_text)
        };        
    }

    onTextChange(event) {
        if (event.target.value !== '') {
            this.setState({ text: event.target.value });
        }
        else {
            this.setState({ text: "" });
        }
    }

    onLetterChange(event) {
        event.target.value = event.target.value.toUpperCase();

        if (event.target.value !== '') {
            this.setState({ text: event.target.value });
        }
        else {
            this.setState({ text: "" });
        }
    }    

    handleGoBack() {
        this.props.previousStep()
    }

    handleFocus(event) {
        event.target.select();
    }

    handleFontSelection(fontobj) {
        if (this.state.text !== 'undefined' && this.state.text !== '')
        {
            var data = {
                font_propertyid: fontobj.propertyid,
                font_valueid: fontobj.id,
                font_name: fontobj.name,
                custom_text: this.state.text
            }
    
            this.props.saveValues(data)
            this.props.nextStep()
        }
        else
        {
            switch(this.props.fieldValues.preview_type)
            {
                case "singlelettermonogram":
                    NotificationManager.warning('Please type your letter', 'TheKnottyMoms', 3000);
                    break;

                default:
                    NotificationManager.warning('Please type your text', 'TheKnottyMoms', 3000);
                    break;
            }
        }
    }
    
    showFontWizard() {
        switch(this.props.fieldValues.preview_type)
        {
            case "singlelettermonogram":
                return (
                    <div>
                        <div className="topPadding bottomMargin20px">
                            <Button bsStyle="warning" className="btnBlackBorderWhiteBg" bsSize="small" onClick={() => this.handleGoBack()}>
                                <Glyphicon glyph="glyphicon glyphicon-arrow-left" className="buttonIcon" /><span className="btnBlackTxt">Go Back</span>
                            </Button>
                        </div>

                        <Alert bsStyle="info" className="topPadding">
                            <strong>Please Read these guidelines</strong>
                            <ul className="topPadding">
                                <li>36" maximum height</li>
                                <li>Dots will be connected to lowercase "i"s and "j"s unless otherwise requested.</li>
                                <li>Height varies depending on the number of letters in the word.</li>
                                <li>We will produce all orders automatically with the first letter as uppercase and all other letters as lowercase, unless instructions are given to do different.</li>
                            </ul>
                        </Alert>

                        <div>
                            <h1><small>Type your Letter & Select your Font</small></h1>
                        </div>
                        <div className="row topPadding LeftPadding15px">
                            <div className="form-group rightpadding15px">
                                <label>Enter your Text</label>
                                <input type="text" placeholder="A - Z" name="customText" value={this.state.text} className="form-control mb-4" id="customText" onFocus={this.handleFocus} maxLength="1" onChange={this.onLetterChange.bind(this)} />
                            </div>
                        </div>
                        <Grid>
                            <Row className="show-grid">
                                {this.state.fonts.map((item, index) => 
                                    <EtsyListingFont key={item.id + index} dummytext="A" item={item} text={this.state.text} handleClick={() => this.handleFontSelection(item)} />
                                )}
                            </Row>
                        </Grid>               
                    </div>   
                )

            default:
                return (
                    <div>
                        <div className="topPadding bottomMargin20px">
                            <Button bsStyle="warning" className="btnBlackBorderWhiteBg" bsSize="small" onClick={() => this.handleGoBack()}>
                                <Glyphicon glyph="glyphicon glyphicon-arrow-left" className="buttonIcon" /><span className="btnBlackTxt">Go Back</span>
                            </Button>
                        </div>

                        <Alert bsStyle="info" className="topPadding">
                            <strong>Please Read these guidelines</strong>
                            <ul className="topPadding">
                                <li>Multiple words will be joined to be a single piece. For example "Stephanie and Brandon" will be cut as "Stephanie&Brandon" so all characters touch. If you would like them as separate pieces please request in the order notes.</li>
                                <li>Dots will be connected to lowercase "i"s and "j"s unless otherwise requested.</li>
                                <li>Height varies depending on the number of letters in the word.</li>
                                <li>we will produce all orders automatically with the first letter as uppercase and all other letters as lowercase, unless instructions are given to do different.</li>
                            </ul>
                        </Alert>

                        <div>
                            <h1><small>Type your Text & Select your Font</small></h1>
                        </div>
                        <div className="row topPadding LeftPadding15px">
                            <div className="form-group rightpadding15px">
                                <label>Enter your Text</label>
                                <input type="text" placeholder="Type your text" name="customText" value={this.state.text} className="form-control mb-4" id="customText" onFocus={this.handleFocus} onChange={this.onTextChange.bind(this)} />
                            </div>
                        </div>
                        <Grid className="fontContainer">
                            <Row className="show-grid">
                                {this.state.fonts.map((item, index) => 
                                    <EtsyListingFont key={item.id + index} dummytext="Sample" item={item} text={this.state.text} handleClick={() => this.handleFontSelection(item)} />
                                )}
                            </Row>
                        </Grid>
                    </div>            
                )
        }
    }

    render() {
        return(
            <div>
                {this.showFontWizard()}
                <NotificationContainer/>
            </div>
        );
    }    
}