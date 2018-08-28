import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';
import './Google.css';


class Google extends Component {
    state = {
        isLoggedIn: false,
        // userID: '',
        name: '',
        email: '',
        picture: ''
    }

    responseGoogle = (response) => {
        console.log(response);

        this.setState({
            isLoggedIn: true,
            // userID: response.userID,
            name: response.profileObj.name,
            email: response.profileObj.email,
            picture: response.profileObj.imageUrl
        })
    }

    componentClicked = () =>
        console.log("clicked");

    render() {
        
        let gContent;

        if (this.state.isLoggedIn) {
            gContent = (
                <div style={{ 
                    width: '20wv',
                    margin: 'auto',
                    background: '#F4F4F4',
                    padding: '20px'
                }}>
                    <h4>Welcome!</h4><br />
                    <img src={this.state.imageUrl} alt={this.state.name} />
                    <br /><br /><h5>{this.state.name}</h5>
                    {this.state.email}
                </div>
            );
        } else {
            gContent = (<GoogleLogin
                clientId="486403689116-08v5qt1he007pj2b6t7gt9h3fein13m6.apps.googleusercontent.com"
                buttonText="Login with Google"
                autoLoad={false}
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle} />);
        }

        return (
            
            <div>
                {gContent}
            </div>
        );
    }
}

export default Google;