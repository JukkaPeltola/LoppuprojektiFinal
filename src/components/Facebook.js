import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import './Facebook.css';
import { GetAllUsers, AddNewUser } from '../utilities/Service';
var users;

class Facebook extends Component {
    state = {
        isLoggedIn: false,
        userId: '',
        name: '',
        email: '',
        picture: '',
        admin: false
    }

    componentDidMount() {
        GetAllUsers((data) => {
            users = data
            console.log(users)
        })
    }

    responseFacebook = response => {
        console.log(response);

        this.setState({
            isLoggedIn: true,
            userId: response.userID,
            name: response.name,
            email: response.email,
            picture: response.picture.data.url
        }, () => {
            let exist = users.filter(x => x.social_id == response.id);
            if (exist.length == 0) {
                let newUser = {
                    'firstname': "", 'lastname': "", 'email': "",
                    'nickname': "", 'password': "", 'picture': "",
                    'admin': false, 'social_id': response.id
                }
                this.props.facebookIn()
                console.log(newUser)
                console.log(exist)
                sessionStorage.setItem('id', response.id)
                AddNewUser(newUser)
            } else {
                this.props.facebookIn()
                sessionStorage.setItem('id', response.id)
                exist[0].admin == true ? this.setState({ admin: true }, () => this.props.setAdmin(true)) 
                : this.setState({admin: false}, () => this.props.setAdmin(false))
                console.log(exist[0])
                
            }
        })
    }
    aa = () => {
        this.props.setAdmin()
    }
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