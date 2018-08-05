import React, { Component } from 'react';
import { Button, Glyphicon  } from 'react-bootstrap';

import '../static/css/etsy.css';

export class NotesDetails extends Component {
    displayName = NotesDetails.name

    constructor(props) {
        super(props);

        this.state = {
            notes: (this.props.fieldValues.custom_notes === undefined ? '' : this.props.fieldValues.custom_notes)
        };         
    }

    onTextChange(event) {
        if (event.target.value !== '') {
            this.setState({ notes: event.target.value });
        }
        else {
            this.setState({ notes: "" });
        }
    }    

    handleGoBack() {
        this.props.previousStep()
    }
    
    handleContinue() {
        var data = {
            custom_notes: this.state.notes
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
                    <h1><small>Please add your notes (optional)</small></h1>
                </div>
                <div className="row topPadding">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                        <textarea className="form-control" rows="10" onChange={this.onTextChange.bind(this)}  />
                    </div>
                    <div className="btnContinue">
                        <Button bsStyle="warning" className="btnBlackBorderWhiteBg" bsSize="small" onClick={() => this.handleContinue()}>
                            <span className="btnBlackTxt">Continue</span>
                        </Button>
                    </div>
                </div>                 
            </div>
        )
    }
}