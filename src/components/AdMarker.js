import React, { Component } from 'react';
import { Marker, InfoWindow } from 'react-google-maps';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { addNewToilet } from '../utilities/Service';
import './AdMarker.css';
import Geocode from 'react-geocode'
import logo from './plus.png';
var counter = 100000

class AdMarker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            markerOpen: false,
            draggable: true,
            infoWindowOpen: false,
            modalOpen: false,
            latLng: { lat: 60.17131, lng: 24.94145 },
            newToilet: {},
            checked: false,
            address: ""
        }

    }
    dragtoggle = () => {
        this.setState({ infoWindowOpen: false })
    }
    markerToggleOpen = () => {
        console.log("moi")
        this.setState({
            markerOpen: true
        });
    }
    markerToggleClose = () => {
        this.setState({
            markerOpen: false,
            draggable: true,
            infoWindowOpen: false,
            modalOpen: false,
            latLng: { lat: 60.17131, lng: 24.94145 },
            newToilet: {},
            checked: false,
            address: {}
        });
    }

    handleToggleClose = () => {
        this.setState({
            markerOpen: false,
            infoWindowOpen: false
        });
    }
    modalToggleopen = () => {
        this.setState({
            modalOpen: true,
        })
    }
    modalToggleClose = () => {
        this.setState({
            modalOpen: false,
        })
    }
    getLocation = (e) => {
        var lat = e.latLng.lat(), lng = e.latLng.lng()
        Geocode.fromLatLng(lat, lng).then(
            response => {
             var Address = response.results[0].formatted_address.toString();
                
             this.setState({
                infoWindowOpen: true, latLng: { lat: lat, lng: lng },
                newToilet: {
                    latitude: lat,
                    longitude: lng,
                },
                address: Address
            })  
        })
        
    }
    addNew=()=>{
        var theAddress = this.state.address
        var splittedAddress = theAddress.split(" ")
        var newToilet={
            inva: this.state.checked,
            name: this.refs.name.value,
            pricing: this.refs.hinta.value,
            information: this.refs.kuvaus.value,
            latitude: this.state.newToilet.latitude,
            longitude: this.state.newToilet.longitude,
            address: splittedAddress[0] + " " + splittedAddress[1],
            zip: splittedAddress[2],
            city: splittedAddress[3],
            toilet_id: counter
            
        }
        this.props.addMarker(newToilet)
        addNewToilet(newToilet)
        this.setState({
            markerOpen: false,
            draggable: true,
            infoWindowOpen: false,
            modalOpen: false,
            latLng: { lat: 60.17131, lng: 24.94145 },
            newToilet: {},
            checked: false,
            address: {}
        })
        counter++
    }
    switchClick = () => {
        this.setState({ checked: !this.state.checked })
    }
    render() {
        return (
            <div>
                <button className="addNewMarker" onClick={this.markerToggleOpen} style={{ 
                    backgroundColor: 'transparent', 
                    display: 'inline-block', 
                    border: 'none',
                    marginTop: '30%',
                    marginLeft: '-180px'
                }}>
                <img src={logo} alt="Add toilet"></img>
                </button>
                {
                    this.state.markerOpen &&
                    <Marker
                        position={this.state.latLng}
                        draggable={this.state.draggable}
                        onDragEnd={this.getLocation}
                        onDrag={this.dragtoggle}
                    >
                        {
                            this.state.infoWindowOpen &&
                            <InfoWindow>
                                <div>
                                    <Button style={{marginRight: `10px`}} color="success" onClick={this.modalToggleopen}>Add new toilet</Button>
                                    <Button style={{marginRight: `10px`}} onClick={this.markerToggleClose}>Cancel</Button>
                                </div>
                            </InfoWindow>
                        }


                    </Marker>
                }

                <Modal isOpen={this.state.modalOpen} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>sdfsdsdfds</ModalHeader>
                    <ModalBody>
                        <label>Name: </label>
                        <input ref="name" type="text"></input><br />
                        <label>inva: </label>
                        <div className="onoffswitch">
                            <input ref="inva" type="checkbox" name="onoffswitch" className="onoffswitch-checkbox" id="myonoffswitch"
                                checked={this.state.checked} onClick={this.switchClick} />
                            <label className="onoffswitch-label" htmlFor="myonoffswitch">
                                <span className="onoffswitch-inner"></span>
                                <span className="onoffswitch-switch"></span>
                            </label>
                        </div>
                        <label>Hinta: </label>
                        <input ref="hinta" type="number"></input><br />
                        <label>Kuvaus: </label>
                        <input ref="kuvaus" type="text" placeholder="Valinnainen"></input>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.addNew}>Add</Button>
                        <Button color="secondary" onClick={this.modalToggleClose} >Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default AdMarker;