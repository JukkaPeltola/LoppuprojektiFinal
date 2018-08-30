import React, { Component } from 'react';
import { Marker, InfoWindow } from 'react-google-maps';
import ModalAddReview from './ModalAddReview';
import ModalReportToilet from './ModalReportToilet';
import { Button } from 'reactstrap';
import { GetOneToilets } from '../utilities/Service';
import NotDisabled from '../images/notForDisabled.gif';
import Disable from '../images/suitableForDisabled.jpg';
import ReactStars from 'react-stars';
import toileticon from '../images/vessa_icon16x16.png'
import ModalShowToiletReviews from './ModalShowToiletReviews';

var paivitetty;

class InfoWindowMap extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            addNew: false
        }

    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.status !== 3) {
            this.setState({ isOpen: false })
        }
    };

    testi = () => {
        GetOneToilets(this.props.marker.toilet_id, (data) => {
            paivitetty = data
            console.log(paivitetty)
            setTimeout(this.setState({ addNew: true }), 1300)
        })


    }

    handleToggleOpen = () => {
        this.props.sendProps("sendmessagetothiscomponent")
        this.setState({ isOpen: this })
    }

    handleToggleClose = () => {
        this.setState({
            isOpen: false
        });
    }

    showDirectionsMap = () => {
        if (sessionStorage.getItem("lat") === null) {
            alert("Please enable GPS to use this feature");
            return;
        }
        this.props.showRouteOnClick(this.props.marker.latitude, this.props.marker.longitude)
        console.log('olen infowindowsmapissa ja showroutemap:issa')
    }

    render() {
        let rating = this.props.marker.rating;

        if (rating != null) {
            rating = rating.toFixed(2);
        }
        let inva = this.props.marker.inva;
        if (!inva) {
            inva = <img alt='some value' style={{
                width: `30px`,
                height: `30px`,
            }} src={NotDisabled} />;
        }
        else {
            inva = <img alt='some value' style={{
                width: `30px`,
                height: `30px`,
            }} src={Disable} />;;
        }
       
        return (

            <Marker
                icon={toileticon}
                key={this.props.index}
                position={{ lat: parseFloat(this.props.lat), lng: parseFloat(this.props.lng) }}
                label={this.props.toilet_id}
                onClick={() => this.handleToggleOpen()}
            >
                {
                    this.state.isOpen &&
                    <InfoWindow options={{maxWidth:280}} onCloseClick={this.handleToggleClose}>
                        <div>
                            <h4>{this.props.marker.name}</h4>
                            <h4>{inva}</h4>
                            {
                                this.state.addNew && paivitetty != null &&
                                // <h6>Rating: {(paivitetty.rating).toFixed(2)} ★</h6>
                                
                                <ReactStars
                                    count={5}
                                    size={30}
                                    color2={'#ffd700'}
                                    value={(paivitetty.rating).toFixed(2)}
                                    edit={false} />
                                    
                            }
                            {
                                this.state.addNew === false &&
                                // <h6>Rating: {rating} ★</h6>
                                
                                <ReactStars
                                    count={5}
                                    size={26}
                                    color2={'#ffd700'}
                                    value={rating}
                                    edit={false} />
                                    
                            }
                            <div className="btn-group">
                                <ModalAddReview testi={this.testi} marker={this.props.marker} />
                                <ModalShowToiletReviews marker={this.props.marker} />
                                <ModalReportToilet marker={this.props.marker} />
                                <Button onClick={this.showDirectionsMap} color="success">Route</Button>{' '}
                            </div>
                        </div>
                    </InfoWindow>
                }


            </Marker>
        )

    }
}

export default InfoWindowMap;
