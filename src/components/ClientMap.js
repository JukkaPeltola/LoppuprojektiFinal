import React, { Component } from 'react';
//import { render } from 'react-dom';
import { Map, TileLayer, Marker, Popup, } from 'react-leaflet';
import L from 'leaflet';
import { GetAllToilets } from '../utils/WebapiService';


class ClientMap extends Component {

    constructor() {
        super()
        
        this.state = {
        lat: 60.17131,
        lng: 24.94145,
        zoom: 17,
        markers: []

        }
    }

    componentDidMount() {
    
        var allToilets = []
        
        GetAllToilets((data) => {
            data.map(res => {
            allToilets.push(res)
            })
    
            this.setState({markers: allToilets})
            console.log(this.state.markers)
        });

        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        function success(pos) {
        
            var crd = pos.coords;
            sessionStorage.setItem("latitude", pos.coords.latitude);
            sessionStorage.setItem("longitude", pos.coords.longitude);

            console.log('Your current position is:');
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`More or less ${crd.accuracy} meters.`);
        }

        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }
    
        navigator.geolocation.getCurrentPosition(success, error, options);
        // Näyttää käyttäjän sijainnin, kun uncommentoidaan:
        // this.setState({lat: sessionStorage.getItem("latitude"), lng: sessionStorage.getItem("longitude")});

    }

    render() {
    
        const iconPerson = new L.Icon({
        
            iconUrl: require('./vessa.jpg'),
            iconSize: new L.Point(20, 20),
            className: 'leaflet-div-icon'
        });
    
        const LeafletMarkers = this.state.markers.map(marker => (
        
        <Marker position={[marker.latitude, marker.longitude]} icon={iconPerson} key={`marker_${marker.name}`}>
            <Popup>
                <span>{marker.name}</span>
            </Popup>
        </Marker>
        ));

        return (
        
        <div>
            <Map
            center={[this.state.lat, this.state.lng]}
            zoom={this.state.zoom}>
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            {LeafletMarkers}
            </Map>
        </div>

        );
    }
}

export default ClientMap;