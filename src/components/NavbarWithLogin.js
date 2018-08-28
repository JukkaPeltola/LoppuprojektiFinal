import React, { Component } from 'react';
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

class NavbarWithLogin extends Component {
    state = {  }
    render() { 
        return (
            <div>
            <NavItem>
                <NavLink style={{ color: 'green' }} href="/Signup">Luo tunnus</NavLink>
            </NavItem>
            <NavItem>
                <NavLink style={{ border: '1px solid', borderRadius: '10px', backgroundColor: 'green' }} className="btn-primary" href="/Login">Kirjaudu</NavLink>
            </NavItem>
            </div>
        );
    }
}

export default NavbarWithLogin;