import React, { Component } from 'react';
import Map2 from './Map';
import MapDrive from './MapDrive';
import './mapdrive.css'

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            route: false,
            lat: null,
            lng: null
        }
    }

    showNormalMap = () => {
        this.setState({route: false})
    }

    showRouteOnClick = (lat,lng) => {
        this.setState({route: true, lat: lat, lng: lng})
        console.log('olen Mainissa showrouteclickissä')
    }

    render() {
            return (
                <div>
                    <Map2  showRouteOnClick={this.showRouteOnClick}/>
                    <div id="mapdrive">
                {  this.state.route &&
                
                    <MapDrive  showNormalMap={this.showNormalMap} position={{lat: this.state.lat, lng: this.state.lng}} />
                }
                </div>
                </div>
            )
        }
    }


export default Main;