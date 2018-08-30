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
        let lat = parseFloat(sessionStorage.getItem('lat'))
        let lng = parseFloat(sessionStorage.getItem('lng'))

        this.setState({ lat: lat, lng: lng })

        //Hakee käyttäjän sijainnin 1sek välein
        setInterval(() => {
            let lat = parseFloat(sessionStorage.getItem('lat'))
            let lng = parseFloat(sessionStorage.getItem('lng'))
            
            //Jos sijainti ei löydy alussa niin haetaan uusiksi
            if ((lat || lng) == null) {
                navigator.geolocation.getCurrentPosition(showPosition, errorPosition, { enableHighAccuracy: true });
            }

            function errorPosition() {
                alert(`Unfortunately I can't locate you! Please make sure your GPS is enabled in order to use all features.`)
            }

            function showPosition(position) {
                sessionStorage.setItem('lat', position.coords.latitude);
                sessionStorage.setItem('lng', position.coords.longitude);
                console.log("En löytänyt sijaintia niin nyt olen hakemassa uusiksi! HYVÄ JUTTU!")
            }

            this.setState({ lat: lat, lng: lng })
        }, 1000)
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