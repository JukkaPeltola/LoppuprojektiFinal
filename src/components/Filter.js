import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';
import geolib from 'geolib';
import './Filter.css';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
var listWithAll =[];
var count = 0;
var distanceRange = 40075000;
class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
          modal: false,
          markers:[],
          lat: 60.17131,
          lng: 24.94145,
          all: [],
          disabledCheckboxState: false,
          disabledCheckboxState2: false,
       
        };
    this.applyFilters = this.applyFilters.bind(this);   
    this.toggle = this.toggle.bind(this);
    this.clear = this.clear.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
    this.handleChecked2 = this.handleChecked2.bind(this);

    }
    componentWillReceiveProps(nextProps){
        if(nextProps.markerList !== this.props.markerList){
             this.setState({ markers: nextProps.markerList })
             count++;
        }
        if(count == 2) {
        listWithAll= this.props.markerList;
        }
       
    }
    
  
    toggle() {
    this.setState({
        modal: !this.state.modal
    });
    }


    applyFilters(event) {
        // console.log(this.props.markerList);
        event.preventDefault();
        var kaikkiVessat = listWithAll;
        console.log(kaikkiVessat);
        var a = [];
        var b = [];
        var c = [];
        if(this.state.disabledCheckboxState && distanceRange == 40075000)
        {
            a = kaikkiVessat.filter(marker => marker.inva);
            this.props.getFilterData(a);
        }
        if(this.state.disabledCheckboxState && distanceRange != 40075000){
        b = kaikkiVessat.filter(marker => geolib.getDistance(
            {latitude: this.state.lat, longitude: this.state.lng},
            {latitude: marker.latitude, longitude: marker.longitude}
        ) < distanceRange);
        c = b.filter(marker => marker.inva);
        this.props.getFilterData(c);
        }

        if(!this.state.disabledCheckboxState)
        {
            b = kaikkiVessat.filter(marker => geolib.getDistance(
                {latitude: this.state.lat, longitude: this.state.lng},
                {latitude: marker.latitude, longitude: marker.longitude}
            ) < distanceRange);
            this.props.getFilterData(b);
        }      
    }

    clear(event) {
        event.preventDefault();
        this.props.getFilterData(listWithAll);
        this.setState({disabledCheckboxState: false});
        this.setState({disabledCheckboxState2: false});
        distanceRange = 40075000;
        console.log(listWithAll)
    }
    handleChecked () {
        this.setState({disabledCheckboxState: !this.state.disabledCheckboxState});
      }
    handleChecked2 () {
        this.setState({disabledCheckboxState2: !this.state.disabledCheckboxState2});
    }

    onSliderChange = (value) => {
        distanceRange = (value);
        console.log(value);
      
      }
    
    render() {
        console.log(count);
        this.props.markerList.sort(function (s1, s2) {
            return geolib.getDistance(
                   {latitude: 60.17131, longitude: 24.94145},
                {latitude: s1.latitude, longitude: s1.longitude}) - geolib.getDistance(
                    {latitude: 60.17131, longitude: 24.94145},
                    {latitude: s2.latitude, longitude: s2.longitude})
        });
                 console.log(distanceRange);        
      
        // var currentlyOpen = this.props.markerList((marker) => {
        //     var dateNow = new Date().getDay();
        //     var timeNow = new Date().toLocaleString([], {hour: '2-digit', minute:'2-digit', hour12: false});
            
        // });
        
        return (
            <div>
            <Button style={{width: '125px', height: '50px',  borderColor:'transparent', marginTop: '55px', marginLeft: '10px', borderRadius: '10%', backgroundColor: '#ff2d55', color: 'white', fontFamily: 'Roboto Mono', fontSize:'17px', fontWeight: 'bold'}} onClick={this.toggle}>FILTERING</Button>
            <Modal isOpen={this.state.modal} fade={false} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={this.toggle}></ModalHeader>
              <ModalBody>       
              <Slider min={0} max={1000} step={10} marks={{0: '0m', 250: '250m', 500: '500m', 750: '750m', 990: '1000m'}} defaultValue={500} onAfterChange={this.onSliderChange}/>  
              <br/>
              <div style={{fontWeight: 'bold'}}>Disabled access: </div>
              <div className="onoffswitch">
              <input type="checkbox" name="onoffswitch" className="onoffswitch-checkbox" id="myonoffswitch" checked={this.state.disabledCheckboxState} onChange={this.handleChecked}></input>           
              <label className="onoffswitch-label" htmlFor="myonoffswitch">
                <span className="onoffswitch-inner"></span>
                <span className="onoffswitch-switch"></span>
              </label>
              </div>
              <div style={{fontWeight: 'bold'}}>Open: </div>
              <div className="onoffswitch2">
              <input type="checkbox" name="onoffswitch2" className="onoffswitch-checkbox2" id="myonoffswitch2" checked={this.state.disabledCheckboxState2} onChange={this.handleChecked2}></input>
              <label className="onoffswitch-label2" htmlFor="myonoffswitch2">
                <span className="onoffswitch-inner2"></span>
                <span className="onoffswitch-switch2"></span>
              </label>
              </div>
              </ModalBody>
              <ModalFooter>
                <Button style={{backgroundColor: '#ff2d55', color: 'white', fontFamily: 'Roboto Mono', fontWeight: 'bold'}} onClick={this.applyFilters}>Apply filters</Button>
                <Button style={{fontFamily: 'Roboto Mono', fontWeight: 'bold'}} onClick={this.clear}>Clear filters</Button>
              </ModalFooter>
            </Modal>
          </div>
        );   
    }
}

export default Filter