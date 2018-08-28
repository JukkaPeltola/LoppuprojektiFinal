import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import './Facebook.css';

class Facebook extends Component {
    state = {
        isLoggedIn: false,
        userID: '',
        name: '',
        email: '',
        picture: ''
    }

    responseFacebook = response => {
        console.log(response);

        this.setState({
            isLoggedIn: true,
            userID: response.userID,
            name: response.name,
            email: response.email,
            picture: response.picture.data.url
        })
    }

    componentClicked = () =>
        console.log("clicked");

    render() {
        
        let fbContent;

        if (this.state.isLoggedIn) {
            fbContent = (
                <div style={{ 
                    width: '20wv',
                    margin: 'auto',
                    background: '#F4F4F4',
                    padding: '20px'
                }}>
                    {/* <h4>Welcome!</h4><br /> */}
                    <img src={this.state.picture} alt={this.state.name} />
                    <br /><br /><h5>{this.state.name}</h5>
                    {this.state.email}
                </div>
            );
        } else {
            fbContent = (<FacebookLogin
                appId="1814667208653551"
                buttonText="LOGIN WITH FB"
                autoLoad={false}
                fields="name,email,picture"
                onClick={this.componentClicked}
                callback={this.responseFacebook} />);
        }

        return (
            
            <div>
                {fbContent}
            </div>
        );
    }
}

export default Facebook;