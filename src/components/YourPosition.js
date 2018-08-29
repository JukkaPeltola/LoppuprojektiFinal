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
        console.log("asd")
        let lat = parseFloat(sessionStorage.getItem('lat'))
        let lng = parseFloat(sessionStorage.getItem('lng'))

        this.setState({lat: lat, lng: lng })

        setInterval(() => {
            let lat = parseFloat(sessionStorage.getItem('lat'))
            let lng = parseFloat(sessionStorage.getItem('lng'))
            this.setState({lat: lat, lng: lng})
            console.log(this.state)
        },1000)
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