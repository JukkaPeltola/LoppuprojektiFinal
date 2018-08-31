import React, { Component } from 'react';
import {Button} from 'reactstrap';
import geolib from 'geolib';
import ModalShowToiletInfo from './ModalShowToiletInfo';
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
            changeToggle: false,
            showButton: false 
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
            
        }
        if(nextProps.buttonState !== this.state.showButton){
            this.setState({showButton: nextProps.buttonState} , ()=> {console.log(this.state.showButton)})        
        }

    };
    onSubmit() {
        if(sessionStorage.getItem("lat") === null) {
            alert("Please make sure your GPS is enabled to use this feature");
            return;
        }

        console.log(listWithAll)
        var sortedList = listWithAll.sort((a, b) => (geolib.getDistance(
            { latitude:sessionStorage.getItem("lat"), longitude: sessionStorage.getItem("lng") },
            { latitude: a.latitude, longitude: a.longitude }) - geolib.getDistance(
                { latitude: sessionStorage.getItem("lat"), longitude: sessionStorage.getItem("lng")  },
                { latitude: b.latitude, longitude: b.longitude })
            ));
        console.log(sortedList)
        console.log(sessionStorage.getItem("lat"))
        
        nearestToilet = sortedList.slice(0,1);
    
        this.props.getFilterData(nearestToilet);
        this.props.buttonStatus(true);
        this.setState({changeToggle: true});

    }
    cancel() {
        this.props.getFilterData(listWithAll);        
        this.setState({changeToggle: false})
        this.props.buttonStatus(false);
    }
    render() {           
                if(this.state.markers.length === 0 || this.state.showButton === true) {
                    return (null);
                }
                else {
                    if(count===0) {
                        listWithAll = this.state.markers;
                        count++;
                    }
                    console.log(listWithAll)
                    if(!this.state.changeToggle) {
                    return (          
                        <div>
                            <Button style={{ marginLeft: '4%', marginTop: '8%' }} onClick={this.onSubmit}>Nearest</Button>
                        </div>
                    );
                }
                if(this.state.changeToggle) {
                    return (
                        <div>
                            <Button style={{ marginLeft: '4%', marginTop: '8%' }} onClick={this.cancel}>Show all</Button>
                        </div>
                    );
                }
        }
        
            

    }
}

export default FindNearestToilet