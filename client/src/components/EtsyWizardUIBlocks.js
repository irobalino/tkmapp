import React, { Component } from 'react';
import { Col, Button, Glyphicon, Panel  } from 'react-bootstrap';

export class EtsyListing extends Component {
    displayName = EtsyListing.name

    constructor(props) {
        super(props)
    }

    handleClick = () => {
        this.props.handleClick(this.props.item.listing_id);
    }

    render() {
        return (
            <div className="">
                <article className="roundedBox">
                    <div className="col-lg-4 col-md-4 col-sm-12 NoLeftRightPadding logoCentered">
                        <img className="listingLogo" onClick={this.handleClick} src={this.props.item.MainImage.url_170x135} alt="listing cover" />
                    </div>
                    <div className="col-lg-8 col-md-8 col-sm-12 NoLeftRightPadding media-content">
                        <div className="media-content-outer">
                            <div className="txtCentered">
                                <span className="listingtitle" onClick={this.handleClick} dangerouslySetInnerHTML={{__html: this.props.item.title}} />
                            </div>
                            <div className="media-content-inner btnCentered">
                                <Button bsStyle="primary" className="btnBlackBorderWhiteBg" onClick={this.handleClick}>
                                    <Glyphicon glyph="glyphicon glyphicon-ok" className="buttonIcon buttonText" />
                                    <span className="btnBlackTxt">Select</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        )
    }
}

export class EtsyListingFont extends Component {
    displayName = EtsyListingFont.name

    constructor(props) {
        super(props)
    }

    handleClick = () => {
        this.props.handleClick(this.props.item.name);
    }

    handleFontClick = (e) => {
        e.preventDefault();
        this.props.handleClick(this.props.item.name);
    }

    render() {
        return (
            <Col xs={12} sm={6} md={4} lg={4}>
                <Panel>
                    <Panel.Heading className="txtCentered">
                        <span className="fontNameTxt">{this.props.item.name}</span>
                    </Panel.Heading>
                    <Panel.Body>
                        <div className="FontPreviewSample fontPreviewPanel">
                            <a className="LinkNoDecoration" href="#" onClick={this.handleFontClick}>
                                <h1 className={`mb-3 mb-lg-4 mt-auto font--${this.props.item.name} fontPreview`}><span className="fontPreviewText">{this.props.text !== undefined && this.props.text !== '' ? this.props.text : this.props.dummytext}</span></h1>
                            </a>
                        </div>
                    </Panel.Body>
                    <Panel.Footer className="FontPreviewSelectBtn">
                        <Button bsStyle="primary" className="btnBlackBorderWhiteBg" onClick={this.handleClick}>
                            <Glyphicon glyph="glyphicon glyphicon-ok" className="buttonIcon" /><span className="btnBlackTxt">Select</span>
                        </Button>                        
                    </Panel.Footer>
                </Panel>
            </Col>
        )
    }
}

export class EtsyListingSize extends Component {
    displayName = EtsyListingSize.name

    constructor(props) {
        super(props)
    }

    handleClick = () => {
        this.props.handleClick(this.props.item);
    }

    render() {
        return (
            <Col xs={6} sm={3} md={3} lg={2}>
                <Panel>
                    <Panel.Heading className="txtCentered">
                        <span className="sizeTxt">{this.props.item.namesize}</span>
                    </Panel.Heading>
                    <Panel.Body className="SizePriceBody">
                        <div className="SizePrice">
                            <div className="BottomMargin10px">
                                <span className="priceTxt">{this.props.item.price}</span>
                            </div>
                            <div className="btnContinue">
                                <Button bsStyle="primary" className="btnBlackBorderWhiteBg" onClick={this.handleClick}>
                                    <Glyphicon glyph="glyphicon glyphicon-shopping-cart" className="buttonIcon" /><span className="btnBlackTxt">Add</span>
                                </Button>                            
                            </div>
                        </div>
                    </Panel.Body>
                </Panel>
            </Col>
        )
    }
}