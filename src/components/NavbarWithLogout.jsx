import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
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
import Map from './Map';
import Testi from './Testi';


export default class NawbarWithLogout extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div>
                <NavLink style={{ color: 'green' }} href="/Logout">Kirjaudu ulos</NavLink>
            </div>
        );
    }
}