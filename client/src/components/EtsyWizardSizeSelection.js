import React, { Component } from 'react';
import { Row, Grid, Button, Glyphicon  } from 'react-bootstrap';
import { EtsyListingSize } from './EtsyWizardUIBlocks'

import '../static/css/etsy.css';

export class SizeSelection extends Component {
    displayName = SizeSelection.name

    componentDidMount() {
        if (this.props.fieldValues.products !== undefined && this.props.fieldValues.products.length > 0)
        {
            var sizes = [];
            var uniquesizes = [];

            for (var i = 0; i < this.props.fieldValues.products.length; i++) {
                var product = this.props.fieldValues.products[i];
                var sizeobj = product.property_values.filter(x => {
                    return x.property_name === 'Width';
                });

                if (sizeobj !== undefined && sizeobj.length > 0)
                {
                    sizes.push({
                        propertyid: sizeobj[0].property_id,
                        id: sizeobj[0].value_ids[0],
                        namesize: sizeobj[0].values[0] + ' ' + sizeobj[0].scale_name,
                        price: product.offerings[0].price.currency_formatted_short,
                        productid: product.product_id,
                        offeringid: product.offerings[0].offering_id
                    });   
                }
            } 

            if (sizes.length > 0) {
                uniquesizes = sizes.filter((obj, pos, arr) => {
                    return arr.map(mapObj => mapObj["namesize"]).indexOf(obj["namesize"]) === pos;
                });
            }

            this.setState({
                sizes: uniquesizes
            });            
        }

        window.scrollTo(0, 0);
    }    

    constructor(props) {
        super(props);

        this.state = {
            sizes: []
        };         
    }

    handleGoBack() {
        this.props.previousStep()
    }
    
    handleSizeSelection(sizeobj) {
        var data = {
            size_propertyid: sizeobj.propertyid,
            size_valueid: sizeobj.id,
            size_name: sizeobj.namesize,
            price: sizeobj.price,
            productid: sizeobj.productid,
            offeringid: sizeobj.offeringid
        }

        this.props.saveValues(data)
        this.props.nextStep()
    }      

    render() {
        return(
            <div>
                <div className="topPadding">
                    <Button bsStyle="warning" className="btnBlackBorderWhiteBg" bsSize="small" onClick={() => this.handleGoBack()}>
                        <Glyphicon glyph="glyphicon glyphicon-arrow-left" className="buttonIcon" /><span className="btnBlackTxt">Go Back</span>
                    </Button>
                </div>          
                <div>
                    <h1><small>Select your Size</small></h1>
                </div>
                <Grid className="NoLeftRightPadding NoLeftRightMargin btnAddSize">
                    <Row className="show-grid">
                        {this.state.sizes.map((item, index) => 
                            <EtsyListingSize key={item.id + index} item={item} handleClick={() => this.handleSizeSelection(item)} />
                        )}
                    </Row>
                </Grid>
            </div>
        )
    }
}