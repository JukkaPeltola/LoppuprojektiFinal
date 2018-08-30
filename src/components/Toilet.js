import React, { Component } from 'react';
import ModalShowToiletInfo from './ModalShowToiletInfo';
import ModalShowToiletReviews from './ModalShowToiletReviews';
import geolib from 'geolib';
import './Toilet.css';
import {Button} from 'reactstrap';
import { GetOneUser } from '../utilities/Service';
class Toilet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: false
        }
    }

    componentDidMount(){
        let user = sessionStorage.getItem('id')
        if (user != null) {
            GetOneUser(user,(data) => {
                // console.log((data.admin))
                this.setState({admin: data.admin})
            })
        }
    }

    render() {
        var ratingFixed = this.props.marker.rating != null ? this.props.marker.rating.toFixed(2) : 0

        return (
            <div className="toiletItem">
                <center style={{
                    width: '70%',
                    margin: '1% 0',
                    padding: '2%',
                    border: 'solid',
                    borderRadius: '10px',
                    backgroundColor: '#e2edff'
                }}>
                    <h5>{this.props.marker.name}</h5>
                    <h5>★{ratingFixed}★</h5>
                    <h6>{this.props.marker.address}, {this.props.marker.city}</h6>
                    <h6>{this.props.marker.inva}</h6>
                    <h6>{geolib.getDistance(
                        { latitude: parseFloat(sessionStorage.getItem('lat')), longitude: parseFloat(sessionStorage.getItem('lng')) },
                        { latitude: this.props.marker.latitude, longitude: this.props.marker.longitude })} metriä sijainnistasi</h6>
                        <p>INFORMATION</p>
                        
                        <div className="toiletlistBtn"><ModalShowToiletInfo marker={this.props.marker} /></div>
                        <div className="toiletlistBtn"><ModalShowToiletReviews marker={this.props.marker} /></div>
                        <div className="toiletlistBtn">
                        {
                            this.state.admin && <Button color="danger">Poista</Button>
                        }
                        </div>   
                    
                </center>

            </div>
        );
    }
}

export default Toilet;