import React, { Component } from 'react';
import { ListingSelection } from  './EtsyWizardListingSelection';
import { FontSelection } from './EtsyWizardFontSelection';
import { SizeSelection } from './EtsyWizardSizeSelection';
import { NotesDetails } from './EtsyWizardNotesDetails';
import { ConfirmDetails } from './EtsyWizardConfirmDetails';

import assign from 'object-assign';

var fieldValues = {
    listing_id: null
};

export class EtsyWizard extends Component {
    displayName = EtsyWizard.name

    constructor(props) {
        super(props);

        this.state = {
            step: 1
        }

        this.nextStep = this.nextStep.bind(this);
        this.previousStep = this.previousStep.bind(this);
        this.resetWizard = this.resetWizard.bind(this);
     }

    saveValues(paramvalue) {
        return function() {
            fieldValues  = assign({}, fieldValues, paramvalue)
        }.bind(this)()
    }

    resetWizard() {
        this.setState({
            step: 1
        }) 

        var resetdata = {
            listing_id: 0,
            listing_title: '',
            preview_type: 'Standard',
            font_propertyid: 0,
            font_valueid: 0,
            font_name: '',
            custom_text: undefined,
            size_propertyid: 0,
            size_valueid: 0,
            size_name: '',
            price: 0,
            productid: 0,
            offeringid: 0,            
            custom_notes: '',
            products: []
        }        
        this.saveValues(resetdata);
    }

    nextStep() {
        this.setState({
            step: this.state.step + 1
        })
    }

    previousStep() {
        this.setState({
            step: this.state.step - 1
        })
    }

    submitListing() {
        this.nextStep();
    }

    showStep() {
        switch(this.state.step)
        {
            case 1:
                return (
                    <ListingSelection 
                        fieldValues={fieldValues}
                        nextStep={this.nextStep}
                        previousStep={this.previousStep}
                        resetWizard={this.resetWizard}
                        saveValues={this.saveValues} />
                )

            case 2:
                return (
                    <FontSelection 
                        fieldValues={fieldValues}
                        nextStep={this.nextStep}
                        previousStep={this.previousStep}
                        resetWizard={this.resetWizard}
                        saveValues={this.saveValues} />
                ) 
                
            case 3:
                return (
                    <SizeSelection 
                        fieldValues={fieldValues}
                        nextStep={this.nextStep}
                        previousStep={this.previousStep}
                        resetWizard={this.resetWizard}
                        saveValues={this.saveValues} />
                ) 
                
            case 4:
                return (
                    <NotesDetails 
                        fieldValues={fieldValues}
                        nextStep={this.nextStep}
                        previousStep={this.previousStep}
                        resetWizard={this.resetWizard}
                        saveValues={this.saveValues} />
                )

            case 5:
                return (
                    <ConfirmDetails 
                        fieldValues={fieldValues}
                        nextStep={this.nextStep}
                        previousStep={this.previousStep}
                        resetWizard={this.resetWizard}
                        saveValues={this.saveValues} />
                )                 
        }
    }    

    render() {
        return (
            <div className="container-fluid">
                {this.showStep()}
            </div>
        );
    }
}

