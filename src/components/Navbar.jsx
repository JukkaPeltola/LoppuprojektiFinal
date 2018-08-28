import React from 'react';
import './Navbar.css';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Form
} from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import Map from './Map';


export default class CustomNavbar extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    
    render() {
        return (
            <div>
            <Navbar className="navbar navbar-expand-md navbar-dark bg-dark" light expand="md">
                <NavbarBrand to="/" activeClassName="active" tag={RRNavLink}>TOILET</NavbarBrand>

                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                
                <Nav className="navbar-nav mr-auto" navbar>
                    <NavItem>
                        <NavLink to="/" activeClassName="active" tag={RRNavLink}>Koti</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/Wclist" activeClassName="active" tag={RRNavLink}>WC-lista</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/Chat" activeClassName="active" tag={RRNavLink}>Chat</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/About" activeClassName="active" tag={RRNavLink}>Tietoa</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/Reports" activeClassName="active" tag={RRNavLink}>Reports</NavLink>
                    </NavItem>
                </Nav>

                <Nav className="navbar-nav ml-auto">
                
                    <NavItem>
                        <NavLink style={{ color: 'green' }} to="/Signup" activeClassName="active" tag={RRNavLink}>Luo tunnus</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink style={{ border: '1px solid', borderRadius: '10px', backgroundColor: 'green' }} className="btn-primary" to="/Login" activeClassName="active" tag={RRNavLink}>Kirjaudu</NavLink>
                    </NavItem>
                </Nav>
                </Collapse>
            </Navbar>
        </div>
        );
    }
}