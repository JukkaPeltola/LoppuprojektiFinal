import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';
import { AddNewUser, GetAllUsers } from '../utilities/Service';
require('./Google.css');

var users;

class Google extends Component {
    state = {
        isLoggedIn: false,
        // userID: '',
        name: '',
        email: '',
        picture: '',
        admin: false
    }

    componentDidMount(){
        GetAllUsers((data) => {
            users = data
            console.log(users)
        })
    }

    responseGoogle = (response) => {
        console.log(response);
        this.setState({
            name: response.profileObj.name,
            email: response.profileObj.email,
            picture: response.profileObj.imageUrl,
            isLoggedIn: true,
        }, () => {
            let exist = users.filter(x => x.social_id == response.googleId);
            if (exist.length == 0){
                let newUser = {
                    firstname: "", lastname: "", email: "",
                    nickname: "", password: "", picture: "",
                    admin: false, social_id: response.googleId
                }
                this.props.googleIn()
                console.log(newUser)
                console.log(exist)
                sessionStorage.setItem('id', response.googleId)
                AddNewUser(newUser)
            } else {
                this.props.googleIn()
                sessionStorage.setItem('id', response.googleId)
                exist[0].admin == true ? this.setState({ admin: true }, () => this.props.setAdmin(true)) 
                : this.setState({admin: false}, () => this.props.setAdmin(false))
                console.log(exist[0])
            }
        })
    }

    render() {

        let gContent;

        if (this.state.isLoggedIn) {
            gContent = (
                <div className="googleBtn" style={{
                    width: '20wv',
                    margin: 'auto',
                    background: '#F4F4F4',
                    padding: '20px'
                }}>
                    <h4>Welcome!</h4><br />
                    <img src={this.state.picture} alt={this.state.name} />
                    <br /><br /><h5>{this.state.name}</h5>
                    {this.state.email}
                </div>
            );
        } else {
            gContent = (<GoogleLogin
                // onClick={this.responseGoogle}
                clientId="486403689116-08v5qt1he007pj2b6t7gt9h3fein13m6.apps.googleusercontent.com"
                buttonText="Login with Google"
                autoLoad={false}
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
            />);
        }

        return (

            <div>
                {gContent}
            </div>
        );
    }
}

export default Google;