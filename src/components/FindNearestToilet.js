import React, { Component } from 'react';
import {Button} from 'reactstrap';
import geolib from 'geolib';import ModalShowToiletInfo from './ModalShowToiletInfo';
import InfoWindowMap from './InfoWindowMap';

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
        console.log(this.state.lat)
    }
 

    componentWillReceiveProps(nextProps){
        if(nextProps.markerList !== this.props.markerList){
             this.setState({ markers: nextProps.markerList })
                // count++;
        }
        // if(nextProps.updatedStatus !== false ) {
        //     this.setState({changeToggle: false})
        //     console.log("hiiohoi")
        // } 
        // if(count=== 2) {
           
        // }
        
    };
    onSubmit() {
        // listWithAll = this.state.markers;
        // console.log(listWithAll)
        var sortedList = listWithAll.sort((a, b) => (geolib.getDistance(
            { latitude: this.state.lat, longitude: this.state.lng },
            { latitude: a.latitude, longitude: a.longitude }) - geolib.getDistance(
                { latitude: this.state.lat, longitude: this.state.lng },
                { latitude: b.latitude, longitude: b.longitude })
            ));
        nearestToilet = sortedList.slice(0,1);
    
        this.props.getFilterData(nearestToilet);
        this.setState({changeToggle: true});

    }
    cancel() {
        this.props.getFilterData(listWithAll);
        this.setState({changeToggle: false})
    }
    render() {
        console.log(this.state.markers)
        count++;
        console.log(count)
        if(count === 3 && this.state.lat !== null) {
            
            listWithAll = this.state.markers;
            console.log(listWithAll)
        //     var sortedList = listWithAll.sort((a, b) => (geolib.getDistance(
        //         { latitude: this.state.lat, longitude: this.state.lng },
        //         { latitude: a.latitude, longitude: a.longitude }) - geolib.getDistance(
        //             { latitude: this.state.lat, longitude: this.state.lng },
        //             { latitude: b.latitude, longitude: b.longitude })
        //         ));
        //     nearestToilet = sortedList.slice(0,1);
        // }
        // console.log("adslfasdäf")
        // console.log(listWithAll)
        }
        if(this.state.lat !== null) {
            if(!this.state.changeToggle) {
                return (          
                    <div>
                        <Button style={{ marginLeft: '15px', marginTop: '10%' }} onClick={this.onSubmit}>Find nearest toilet</Button>
                    </div>
                );
            }
            if(this.state.changeToggle) {
                return (
                    <div>
                        <Button style={{ marginLeft: '15px', marginTop: '10%' }} onClick={this.cancel}>Show all toilets</Button>¨
                    </div>
                );
            }
            
        }
        else {
            return (
            <div>
                    {/* <Button disabled></Button> */}
                </div>
            );
        }   

    }
}

export default FindNearestToilet