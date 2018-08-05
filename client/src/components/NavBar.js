import React, { Component } from 'react';
import { Navbar, Nav, NavItem  } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faPinterest } from '@fortawesome/free-brands-svg-icons'

import '../static/css/NavBar.css'; 
import logo from '../static/images/TKM.png'; 

export class NavBar extends Component {
    displayName = NavBar.name

    render() {
        return (
            <Navbar fixedTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">
                            <img src={logo} alt="" height="130px" />
                        </a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem href="https://www.instagram.com/theknottymoms" className="socialMediaIconNavBar">
                            <FontAwesomeIcon icon={faInstagram} />&nbsp;&nbsp;<span className="socialMediaTextNavBar">Instagram</span>
                        </NavItem>
                    </Nav>               
                    <Nav pullRight>                
                        <NavItem href="mailto::info@theknottymoms.com" className="menuLinkNavBar">
                            Contact us
                        </NavItem>                    
                        <NavItem href="https://www.etsy.com/shop/theknottymoms" className="menuLinkNavBar">
                            Our Etsy shop
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
