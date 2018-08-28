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
import Map from './Map';


export default class CustomNavbar extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            addNew: false
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
                <NavbarBrand href="/">TOILET</NavbarBrand>

                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                
                <Nav className="navbar-nav mr-auto" navbar>
                    <NavItem>
                        <NavLink href="/">Koti</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/Wclist">WC-lista</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/Chat">Chat</NavLink>
                    </NavItem>                   
                    <NavItem>
                        <NavLink href="/About">Tietoa</NavLink>
                    </NavItem>
                    {
                        this.state.addNew &&
                    <NavItem>
                        <NavLink href="/Report">Report</NavLink>
                    </NavItem>
                    }
                    
                    
                    
                </Nav>

                <Nav className="navbar-nav ml-auto">
                
                    <NavItem>
                        <NavLink style={{ color: 'green' }} href="/Signup">Luo tunnus</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink style={{ border: '1px solid', borderRadius: '10px', backgroundColor: 'green' }} className="btn-primary" href="/Login">Kirjaudu</NavLink>
                    </NavItem>
                
                    <Form style={{ minWidth: '25vw', maxWidth: '120vw' }} className="form-inline mt-2 mt-md-0">
                        <NavItem className="searchBtn">
                            <button style={{ marginLeft: '1vw' }} className="btn btn-outline-success my-2 my-sm-0 text-center" type="submit">&#9906;</button>
                        </NavItem>
                        <NavItem className="searchField">
                            <input style={{ minWidth: '25vw', maxWidth: '100vm', marginLeft: '5px' }} className="form-control mr-sm-2" type="text" placeholder="Hae katu tai kaupunki"></input>
                        </NavItem>
                    </Form>
                </Nav>
                </Collapse>
            </Navbar>
        </div>
        );
    }
}