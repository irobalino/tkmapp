import React, { Component } from 'react';
import { NavBar } from './NavBar';
import { Col, Grid, Row } from 'react-bootstrap';

import DocumentMeta from 'react-document-meta';

import '../static/css/fonts.css'; 
import '../static/css/skeleton.css';

export class Layout extends Component {
    displayName = Layout.name

    render() {

        const meta = {
            title: 'The Knotty Moms',
            description: 'The Knotty Moms',
            canonical: 'http://www.theknottymoms.com',
            meta: {
              charset: 'utf-8',
              name: {
                keywords: 'theknottymoms, wooden name signs,laser cut signs, nursery name sign, baby shower gift, home decor, wood letter name, wedding name, wedding backdrop, kids decor, custom name, wooden names, monograms'
              }
            }
          };

        return (
            <DocumentMeta {...meta}>
                <Grid fluid>
                    <Row>
                        <Col>
                            <NavBar />
                        </Col>
                    </Row>            
                    <Row className="container body-content mainTopM">
                        <Col>
                            {this.props.children}
                        </Col>
                    </Row>
                </Grid>
            </DocumentMeta>
        );
    }
}
