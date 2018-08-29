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
import { GetOneUser } from '../utilities/Service';

export default class CustomNavbar extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            logged: false,
            admin: props.isAdmin
        };
        //Testaus Toimiiko???
    }

    componentDidMount() {
        if (this.state.admin) {
            return
        }

        let logged = sessionStorage.getItem('id');
        if (logged == null) {
            return
        } else {
            GetOneUser(logged, (data) => {
                if (data.admin) {
                    this.setState({ admin: true })
                    this.props.setAdmin(true)
                }
                return
            })
        }
    }

    logout = () => {
        sessionStorage.removeItem('id')
        this.props.setAdmin(false)
        this.setState({ admin: false })
    }

    changeToLoggedIn = () => {
        this.setState({ logged: true })
    }

    changeToLoggedOut = () => {
        this.setState({ logged: false })
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        let loggedin = sessionStorage.getItem('id')

        return (
            <div>
                <Navbar className="navbar navbar-expand-md navbar-dark bg-dark" light expand="md">
                    <NavbarBrand to="/" activeClassName="active" tag={RRNavLink}>TOILET</NavbarBrand>

                    {/* <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>

                        <Nav className="navbar-nav mr-auto" navbar>
                            <NavItem>
                                <NavLink onClick={this.changeToLoggedOut} to="/" activeClassName="active" tag={RRNavLink}>Koti</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={this.changeToLoggedOut} to="/Wclist" activeClassName="active" tag={RRNavLink}>WC-lista</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={this.changeToLoggedOut} to="/Chat" activeClassName="active" tag={RRNavLink}>Chat</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={this.changeToLoggedOut} to="/About" activeClassName="active" tag={RRNavLink}>Tietoa</NavLink>
                            </NavItem>
                            {
                                this.props.isAdmin &&
                                <NavItem>
                                    <NavLink onClick={this.changeToLoggedOut} to="/Reports" activeClassName="active" tag={RRNavLink}>Reports</NavLink>
                                </NavItem>
                            }
                        </Nav> */}

                {/*Tarvitaanko?*/}
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                
                <Nav className="navbar-nav mr-auto" navbar>
                    <NavItem>
                        <NavLink onClick={this.changeToLoggedOut} to="/" activeClassName="active" tag={RRNavLink}>Koti</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={this.changeToLoggedOut} to="/Wclist" activeClassName="active" tag={RRNavLink}>WC-lista</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={this.changeToLoggedOut} to="/Chat" activeClassName="active" tag={RRNavLink}>Chat</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={this.changeToLoggedOut} to="/About" activeClassName="active" tag={RRNavLink}>Tietoa</NavLink>
                    </NavItem>
                    {
                        this.state.addNew &&
                    <NavItem>
                        <NavLink onClick={this.changeToLoggedOut} to="/Reports" activeClassName="active" tag={RRNavLink}>Reports</NavLink>
                    </NavItem>
                    }
                    
                </Nav>
                {/*Tähän asti? plus mahd. alempi pökäle. v/o*/}
                        <Nav className="navbar-nav ml-auto">
                            {
                                (loggedin != null && this.state.logged == false) &&
                                <NavItem>
                                    <NavLink onClick={this.logout} style={{ color: 'green' }} to="/" activeClassName="active" tag={RRNavLink}>Logout</NavLink>
                                </NavItem>
                            }

                            {(loggedin == null && this.state.logged == false) &&
                                <NavItem>
                                    <NavLink onClick={this.changeToLoggedIn} style={{ border: '1px solid', borderRadius: '10px', backgroundColor: 'green' }} className="btn-primary" to="/Login" activeClassName="active" tag={RRNavLink}>Kirjaudu</NavLink>
                                </NavItem>
                            }
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}