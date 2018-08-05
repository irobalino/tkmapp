import React, { Component } from 'react';
import { Button, Glyphicon  } from 'react-bootstrap';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import axios from 'axios';

import { LoadingOverlay, Loader } from 'react-overlay-loader';

import 'react-overlay-loader/styles.css';

import '../static/css/etsy.css';
import 'react-notifications/lib/notifications.css';

let OverlayStyle = {
    backgroundColor: 'black',
    opacity: '0.7'
}

async function GenerateGuestCart() {
    let guestinfo = await fetch('/api/guest', {
    }).then(response => {
        return response.json();
    })
    .then(data => {
        return data.results;
    })
    .catch((error) => {
        return [];
    });

    return guestinfo;
}

async function AddListingToGuestCart(postData) {
    let cartinfo = await axios.post('/api/guest/' + postData.guest_id  + '/carts/listing/' + postData.listing_id, postData)
    .then(response => {
        if (response.data !== undefined && response.data.results !== undefined) {
            return response.data.results;
        }
        else {
            return [];    
        }
    })    
    .catch((error) => {
        return [];
    });
    
    return cartinfo;
}

async function UpdateGuestCart(postData) {
    let cartinfo = await axios.put('/api/guest/' + postData.guest_id  + '/carts/' + postData.cart_id, postData)
    .then(response => {
        if (response.data !== undefined && response.data.results !== undefined) {
            return response.data.results;
        }
        else {
            return [];    
        }
    })    
    .catch((error) => {
        return [];
    });
    
    return cartinfo;
}

export class ConfirmDetails extends Component {
    displayName = ConfirmDetails.name;

    constructor(props) {
        super(props);

        this.state = {
            processing: false
        }
    }

    handleGoBack() {
        this.props.previousStep()
    }

    handleContinue = async () => {
        this.setState({
            processing: true
        }); 

        //We generate guest cart 
        let data = await GenerateGuestCart();
        if (data !== undefined && data.length > 0) {
            var guest_id = data[0].guest_id;
            var checkout_url = data[0].checkout_url;

            var postData = {
                guest_id: guest_id,
                listing_id: this.props.fieldValues.listing_id,
                quantity: 1,
                font_propertyid: this.props.fieldValues.font_propertyid,
                font_valueid: this.props.fieldValues.font_valueid,
                size_propertyid: this.props.fieldValues.size_propertyid,
                size_valueid: this.props.fieldValues.size_valueid                
            }

            let cartdata = await AddListingToGuestCart(postData);
            if (cartdata !== undefined && cartdata.length > 0)
            {
                var textnotesprefix = "Text: ";

                if (this.props.fieldValues.preview_type == "singlelettermonogram") {
                    textnotesprefix = "Letter: ";
                }

                //We update cart to send custom notes
                var updateData = {
                    guest_id: guest_id,
                    cart_id: cartdata[0].cart_id,
                    message: (this.props.fieldValues.custom_notes !== '' ? textnotesprefix + this.props.fieldValues.custom_text + '\r\n' + this.props.fieldValues.custom_notes: textnotesprefix + this.props.fieldValues.custom_text)
                }

                let updatedcartdata = await UpdateGuestCart(updateData);
                if (cartdata !== undefined && cartdata.length > 0)
                {
                    this.setState({ 
                        processing: false
                    });

                    var redirectdata = {
                        checkout_url: checkout_url
                    }
                    this.props.saveValues(redirectdata)
                    //this.props.resetWizard();

                    window.open(checkout_url, '_self');
                }
                else
                {
                    NotificationManager.warning('Etsy Shopping Cart could not be updated', 'TheKnottyMoms', 3000);

                    this.setState({ 
                        processing: false
                    }); 
                }
            }
            else
            {
                NotificationManager.warning('Etsy Item could not be added to Shopping Cart', 'TheKnottyMoms', 3000);

                this.setState({ 
                    processing: false
                });                 
            }
        }
        else 
        {
            NotificationManager.warning('Etsy Shopping Cart could not be created', 'TheKnottyMoms', 3000);

            this.setState({ 
                processing: false
            });            
        }
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
                    <h1><small>Please review the info</small></h1>
                </div>
                <div className="row topPadding">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                        <div className="txtCentered">
                            <h1 className={`mb-3 mb-lg-4 mt-auto font--${this.props.fieldValues.font_name} fontPreview NoBottomMargin`}><span className="fontPreviewText">{this.props.fieldValues.custom_text}</span></h1>
                        </div>
                        <div>
                            <span className="ParamName">Product:</span><span dangerouslySetInnerHTML={{__html: this.props.fieldValues.listing_title}} />
                            <br/>
                            <span className="ParamName">Font:</span><span>{this.props.fieldValues.font_name}</span>
                            <br/>
                            <span className="ParamName">Size:</span><span>{this.props.fieldValues.size_name}</span>
                            <br/>
                            <span className="ParamName">Price:</span><span>{this.props.fieldValues.price}</span>
                            <br/>                                                                
                        </div>
                        <div className="btnContinue topPadding">
                            <Button bsStyle="warning" className="btnBlackBorderWhiteBg" bsSize="small" onClick={this.handleContinue}>
                                <span className="btnBlackTxt">Confirm</span>
                            </Button>
                        </div>                            
                    </div>
                </div>

                <NotificationContainer/>

                <Loader fullPage loading={this.state.processing} containerStyle={OverlayStyle} text="Sending Info to ETSY" />

            </div>
        )
    }    
}