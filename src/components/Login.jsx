import React, { Component } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import {
    Label,
    Input,
    Form,
    FormGroup,
    Button
} from 'reactstrap';

import { GetAllUsers } from '../utilities/Service';
import Facebook from './Facebook';
import Google from './Google';
import { stat } from 'fs';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            userList: [],
            googleIn: false,
            facebookIn: false
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);

    }

    googleIn = () => {
        this.setState({ googleIn: true })
    }

    facebookIn = () => {
        this.setState({ facebookIn: true })
    }

    componentDidMount() {

        var allUsers = []

        GetAllUsers((data) => {
            data.map(res => {
                allUsers.push(res)
            })

            this.setState({ userList: allUsers })
            console.log(this.state.userList)
        });
    }

    onSubmit(e) {
        e.preventDefault();
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div className="teksti">
                <br />
                <center>
                    {/* <div className="normalLogin">

                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="exampleEmail">Username</Label>
                                <Input
                                    type="text"
                                    name="username"
                                    required="true"
                                    value={this.state.username}
                                    onChange={this.onChange}
                                    id="username"
                                    placeholder="Username" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="examplePassword">Password</Label>
                                <Input
                                    field="password"
                                    value={this.state.password}
                                    // error={errors.password}
                                    type="password"
                                    name="password"
                                    onChange={this.onChange}
                                    required="true"
                                    id="password"
                                    placeholder="Password" />
                            </FormGroup>
                            <Button
                                className="buttonLogin"
                                type="submit"
                            >
                            {console.log(this.props.isAdmin)}
                                Login
                            </Button>
                        </Form>
                    </div>*/}

                    <div className="socialAuth"><br />
                    <h2>Login</h2>
                        <br />
                        {!this.state.facebookIn && <Google setAdmin={this.props.setAdmin} googleIn={this.googleIn} />}
                        <br />
                        {!this.state.googleIn && <Facebook setAdmin={this.props.setAdmin} facebookIn={this.facebookIn} />}
                        <br /><br />
                    </div>
                    <hr style={{ marginBottom: '0', marginTop: '2%' }}></hr>
                    {/* <span className="notReg">Not a user yet? <Link to="/Signup">Sign up here!</Link></span> */}
                    <br /><br />
                </center>
            </div>

        );
    }
}

export default Login;