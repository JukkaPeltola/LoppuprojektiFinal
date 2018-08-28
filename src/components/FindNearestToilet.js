import React, { Component } from 'react';
import {Button} from 'reactstrap';
import geolib from 'geolib';import ModalShowToiletInfo from './ModalShowToiletInfo';
import InfoWindowMap from './InfoWindowMap';
;

var listWithAll = [];
var count = 0;
var nearestToilet;

class FindNearestToilet extends Component {
    constructor(props) {
        super(props);
        this.state = {
          markers:[],
          lat: 0,
          lng: 0,
          modal: false,
          nestedModal: false,
          closeAll: false,
          admin: true,
          changeToggle: false
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.cancel = this.cancel.bind(this);
    }
    componentDidMount() {
        this.setState({lat: sessionStorage.getItem("lat"), lng: sessionStorage.getItem("lng")})
    }
 

    componentWillReceiveProps(nextProps){
        if(nextProps.markerList !== this.props.markerList){
             this.setState({ markers: nextProps.markerList })
                count++;
        }
        // if(nextProps.updatedStatus !== false ) {
        //     this.setState({changeToggle: false})
        //     console.log("hiiohoi")
        // } 
        if(count < 2)
        listWithAll = nextProps.markerList;
    };
    onSubmit() {
        this.props.getFilterData(nearestToilet);
        this.setState({changeToggle: true});

    }
    cancel() {
        this.props.getFilterData(listWithAll);
        this.setState({changeToggle: false})
    }
    render() {
        
        var sortedList = this.props.markerList.sort((a, b) => (geolib.getDistance(
            { latitude: this.state.lat, longitude: this.state.lng },
            { latitude: a.latitude, longitude: a.longitude }) - geolib.getDistance(
                { latitude: this.state.lat, longitude: this.state.lng },
                { latitude: b.latitude, longitude: b.longitude })
            ));
        nearestToilet = sortedList.slice(0,1);
        
        if(!this.state.changeToggle) {
            return (          
                <div>
                    <Button className="bg-dark" style={{ 
                        marginLeft: '15px',
                        opacity: '0.7',
                        marginTop: '5%'
                    }} onClick={this.onSubmit}>Find nearest toilet</Button>
                </div>
            );
        }
        if(this.state.changeToggle) {
            return (
                <div>
                    <Button onClick={this.cancel}>Show all toilets</Button>¨
                </div>
            );
        }   
    }
}

export default FindNearestToilet