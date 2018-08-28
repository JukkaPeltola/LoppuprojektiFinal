import React, { Component } from 'react';
import { Marker } from 'react-google-maps';
import ball from '../images/ball_16x16.png';

class YourPosition extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 0,
            lng: 0
        }
    }

    componentWillReceiveProps() {
        this.setState({
            lat: parseFloat(sessionStorage.getItem('lat')),
            lng: parseFloat(sessionStorage.getItem('lng'))
            
        })
    }

    render() {
        return (
            <Marker
                icon={ball}
                position={{ lat: this.state.lat, lng: this.state.lng }} >
            </Marker>

        )
    }
}

export default YourPosition;