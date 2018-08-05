import React, { Component } from 'react';
import { EtsyListing } from './EtsyWizardUIBlocks';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import '../static/css/etsy.css';
import 'react-notifications/lib/notifications.css';

async function GetListings() {
    let info = await fetch('/api/listings', {
        }).then(response => {
            return response.json();
        })
        .then(data => {
            return data.results;
        })
        .catch((error) => {
            return [];
        });

    return info;
}

export class ListingSelection extends Component {
    displayName = ListingSelection.name

    async componentDidMount() {

        let data = await GetListings();

        if (data !== undefined && data.length > 0) {
            var newData = data.filter(x => {
                return x.title.includes('instant preview');
            });

            this.setState({
                listings: newData,
                loading: true
            });

            //We check if we have to open checkout_url because we started the process again
            if (this.props.fieldValues.checkout_url !== undefined && this.props.fieldValues.checkout_url !== '')
            {
                var url = this.props.fieldValues.checkout_url;

                var redirectdata = {
                    checkout_url: undefined
                }
                this.props.saveValues(redirectdata)

                //window.open(url, '_blank');
            }
        }
        else {
            NotificationManager.warning('No Listings were found', 'TheKnottyMoms', 3000);

            this.setState({
                listings: [],
                loading: false
            });
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            listings: [],
            loading: false
        };
    }

    handleListingSelection(listingobj) {
        let previewtype = "Standard";

        if (listingobj.title.toLowerCase().indexOf("single letter monogram") >= 0) {
            previewtype = "singlelettermonogram";
        }

        var data = {
            listing_id: listingobj.listing_id,
            listing_title: listingobj.title,
            preview_type: previewtype
        }

        this.props.saveValues(data)
        this.props.nextStep()
    } 

    render() {
        return(
            <div>
                <h1><small>Select your Listing</small></h1>
                <div className="row">
                    <div className="columns">
                        <div className="column">
                            {this.state.listings.filter((e, i) => i % 2 === 0).map((item, index) => 
                                <EtsyListing key={item.listing_id + index} item={item} handleClick={() => this.handleListingSelection(item)} />
                            )}
                        </div>
                        <div className="column">
                            {this.state.listings.filter((e, i) => i % 2 === 1).map((item, index) => 
                                <EtsyListing key={item.listing_id + index} item={item} handleClick={() => this.handleListingSelection(item)} />
                            )}
                        </div>
                    </div>
                </div>                
                <NotificationContainer/>    
            </div>
        );
    }
}

