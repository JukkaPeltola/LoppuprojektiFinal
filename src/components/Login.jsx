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

import { GetAllUsers } from '../utils/WebapiService';
import Facebook from './Facebook';

// import firebase from 'firebase';
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Google from './Google';

import Auth from './Auth.js';

// import { validateInput } from './loginValidation';
// import { connect } from 'react-redux';

// const config = {
//     apiKey: "AIzaSyBO21N1pGlRw0zk5MPzHOYB3l8URn5Py-Y",
//     authDomain: "toiletapp-7a45a.firebaseapp.com",
//     databaseURL: "https://toiletapp-7a45a.firebaseio.com",
//     projectId: "toiletapp-7a45a",
//     storageBucket: "toiletapp-7a45a.appspot.com",
//     messagingSenderId: "486403689116"
// };
// firebase.initializeApp(config);

// const uiConfig = {
//     // Popup signin flow rather than redirect flow.
//     signInFlow: 'popup',
//     // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
//     signInSuccessUrl: '/Login',
//     // We will display Google and Facebook as auth providers.
//     signInOptions: [
//         firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//         firebase.auth.FacebookAuthProvider.PROVIDER_ID
//     ]
// };

// const auth = new Auth();
// auth.login();

// firebase.initializeApp({
//     apiKey: "AIzaSyBO21N1pGlRw0zk5MPzHOYB3l8URn5Py-Y",
//     authDomain: "toiletapp-7a45a.firebaseapp.com"
// })

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            userList: [],
            isSignedIn: false
        }

        // uiConfig = {
        //     signInSuccessUrl: 'http://localhost:3000',
        //     signInOptions: [
        //         firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        //         firebase.auth.FacebookAuthProvider.PROVIDER_ID
        //     ],
        //     callbacks: {
        //         signInSuccess: () => false
        //     }
        // }
        

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);

    }

    componentDidMount () {

        // firebase.auth().onAuthStateChanged(user =>{
        //     this.setState({isSignedIn:!!user})
        // })

        var allUsers = []
        
        GetAllUsers((data) => {
            data.map(res => {
            allUsers.push(res)
            })
    
            this.setState({userList: allUsers})
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

        // const { errors, username, password } = this.state;      

        return (
            <div className="teksti">
                <br />
                <center>

                    {/* {this.state.isSignedIn ? (
                        <div>Signed in</div>
                    ) : (
                        // <StyledFirebaseAuth
                        //     uiConfig={this.uiConfig}
                        //     firebaseAuth={firebase.auth()}
                        // />

                        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
                
                    )} */}

                    {/* <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} /> */}

                    {/* <Auth /> */}

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
                                    // error={errors.identifier}
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
                        <Google />
                        <br />
                        <Facebook />
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