import React, { Component } from 'react';
import './Toiletlist.css';
import { GetAllToilets } from '../utils/WebapiService';
import geolib from 'geolib';

class Toiletlist extends Component {
    state = {  }

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

    }

    render() {

        // var distance = this.props.markerList((marker) => {
        //     geolib.getDistance(
        //         {latitude: sessionStorage.getItem("latitude"), longitude: sessionStorage.getItem("longitude")},
        //         {latitude: marker.latitude, longitude: marker.longitude}
        //     );
        // });

        var t = this.state.markers.map(marker => (

            <center>
                <li style={{ 
                    width: '70%',
                    margin: '1% 0',
                    padding: '3%',
                    border: 'solid',
                    borderRadius: '10px',
                    backgroundColor: '#e2edff' 
                }} >

                    {marker.name}, {marker.address}, {marker.zip}, {marker.city},
                    {marker.rating} , {marker.inva} , {marker.pricing} ,
            
                    {/* {geolib.getDistance(
                        {latitude: sessionStorage.getItem("latitude"), longitude: sessionStorage.getItem("longitude")},
                        {latitude: marker.latitude, longitude: marker.longitude}
                    )/1000 } km */}
                </li>
            </center>
        ));

        // t.sort(function (s1, s2) {
        //     return geolib.getDistance(
        //         {latitude: 60.17131, longitude: 24.94145},
        //         {latitude: s2.latitude, longitude: s2.longitude}) - geolib.getDistance(
        //             {latitude: 60.17131, longitude: 24.94145},
        //             {latitude: s1.latitude, longitude: s1.longitude});
        // });

        return (
            <div>
                <br />
                <h2>TOILET LIST</h2>
                <br />
                
                <table className="wc" style={{ marginLeft: 0, marginRight: 0, display: 'block', width: '100%', listStyleType: 'none' }}>
                    {t}
                </table>
            </div>
        );
    }
}

export default Toiletlist;