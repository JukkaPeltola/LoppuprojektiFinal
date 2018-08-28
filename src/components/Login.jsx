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

        console.log("Käyttäjät ladattu.");
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
                    <div className="normalLogin">
                        <h2>Kirjaudu</h2>
                        <br />

                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="exampleEmail">Käyttäjätunnus</Label>
                                <Input
                                    type="text"
                                    name="username"
                                    required="true"
                                    value={this.state.username}
                                    onChange={this.onChange}
                                    id="username"
                                    placeholder="Syötä käyttäjätunnus" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="examplePassword">Salasana</Label>
                                <Input
                                    field="password"
                                    value={this.state.password}
                                    // error={errors.password}
                                    type="password"
                                    name="password"
                                    onChange={this.onChange}
                                    required="true"
                                    id="password"
                                    placeholder="Syötä salasana" />
                            </FormGroup>
                            <Button
                                className="buttonLogin"
                                type="submit"
                            >
                                Kirjaudu
                            </Button>
                        </Form>
                    </div>
                    <br />

                    <div className="socialAuth">
                        <br />
                        {!this.state.facebookIn && <Google googleIn={this.googleIn} />}
                        <br />
                        {!this.state.googleIn && <Facebook facebookIn={this.facebookIn} />}
                        <br />
                    </div>
                    <hr style={{ marginBottom: '0', marginTop: '2%' }}></hr>
                    <span className="notReg">Et vielä käyttäjä? <Link to="/Signup">Rekisteröidy tästä!</Link></span>
                    <br /><br />
                </center>
            </div>

        );
    }
}

export default Login;