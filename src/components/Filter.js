import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import geolib from 'geolib';
import './Filter.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import StarRatingComponent from 'react-star-rating-component';
import './Buttons.css'

var listWithAll =[];
var count = 0;
var distanceRange = 0;
class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            filterButtonShown: true,
            markers:[],
            lat: null,
            lng: null,
            all: [],
            disabledCheckboxState: false,
            disabledCheckboxState2: false,
            rating: 0 ,
            sliderDisabled: false,
            hideButtons: false     
        };
    this.applyFilters = this.applyFilters.bind(this);   
    this.toggle = this.toggle.bind(this);
    this.clear = this.clear.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
    this.handleChecked2 = this.handleChecked2.bind(this);
    }
    componentDidUpdate() {
        distanceRange = 40075000;
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.markerList !== this.props.markerList){
            this.setState({ markers: nextProps.markerList })
            
        }  
        this.setState({lat: sessionStorage.getItem("lat"), lng: sessionStorage.getItem("lng")});
        if(nextProps.buttonState !== this.state.hideButtons){
            this.setState({hideButtons: nextProps.buttonState} , ()=> {console.log(this.state.hideButtons)})        
        }
    };
    
    toggle() {
    this.setState({
        modal: !this.state.modal
    });
    }

    onStarClick(event) {
        this.setState({ rating: event });
    }

    applyFilters(event) {
        event.preventDefault();
        var kaikkiVessat = listWithAll;
        var a = [];
        var b = [];
        var c = [];
        var d = [];
        var e = [];
        console.log(listWithAll)
        console.log(distanceRange)
        if(this.state.disabledCheckboxState && distanceRange === 40075000)
        {
            a = kaikkiVessat.filter(marker => marker.inva && marker.rating >= this.state.rating);
            if(a.length === 0) {
                alert("No toilets found!")
                this.setState({disabledCheckboxState: false});
                this.setState({disabledCheckboxState2: false});
                this.setState({rating: 0})
                distanceRange = 40075000;
                return ;
            }
            this.props.getFilterData(a);
        }
        if(this.state.disabledCheckboxState && distanceRange !== 40075000){
            b = kaikkiVessat.filter(marker => geolib.getDistance(
                {latitude: sessionStorage.getItem("lat"), longitude: sessionStorage.getItem("lng")},
                {latitude: marker.latitude, longitude: marker.longitude}
            ) < distanceRange);
            c = b.filter(marker => marker.inva && marker.rating >= this.state.rating);
            if(c.length === 0) {
                alert("No toilets found!")
                this.setState({disabledCheckboxState: false});
                this.setState({disabledCheckboxState2: false});
                this.setState({rating: 0})
                distanceRange = 40075000;
                return ;
            }
            this.props.getFilterData(c);
        }

        if(!this.state.disabledCheckboxState && distanceRange !== 40075000)
        {
            b = kaikkiVessat.filter(marker => geolib.getDistance(
                {latitude: sessionStorage.getItem("lat"), longitude: sessionStorage.getItem("lng")},
                {latitude: marker.latitude, longitude: marker.longitude}
            ) < distanceRange && marker.rating >= this.state.rating);
            if(b.length === 0) {
                alert("No toilets found!")
                this.setState({disabledCheckboxState: false});
                this.setState({disabledCheckboxState2: false});
                this.setState({rating: 0})                
                return ;
            }
            this.props.getFilterData(b);
        } 
        if(!this.state.disabledCheckboxState && distanceRange === 40075000)
        {
            e = kaikkiVessat.filter(marker => marker.rating >= this.state.rating);
            if(e.length === 0) {
                alert("No toilets found!")
                this.setState({disabledCheckboxState: false});
                this.setState({disabledCheckboxState2: false});
                this.setState({rating: 0})                
                return ;
            }
            this.props.getFilterData(e);
            this.setState({filterButtonShown: false});
        } 
        if(this.state.disabledCheckboxState && distanceRange !== 40075000)
        {
            d = kaikkiVessat.filter(marker => marker.rating >= this.state.rating);
            if(a.length === 0) {
                alert("No toilets found!")
                this.setState({disabledCheckboxState: false});
                this.setState({disabledCheckboxState2: false});
                this.setState({rating: 0})
                distanceRange = 40075000;
                return ;
            }
            this.props.getFilterData(d);
        }
        this.setState({filterButtonShown: false});
        this.props.buttonStatus(true);
        this.toggle();           
    }

    clear(event) {
        event.preventDefault();
        this.props.getFilterData(listWithAll);
        this.setState({disabledCheckboxState: false});
        this.setState({disabledCheckboxState2: false});
        this.setState({rating: 0})
        distanceRange = 40075000;
        this.setState({filterButtonShown: true});
        this.props.buttonStatus(false);
    }
    handleChecked () {
        this.setState({disabledCheckboxState: !this.state.disabledCheckboxState});
    }

    handleChecked2 () {
        this.setState({disabledCheckboxState2: !this.state.disabledCheckboxState2});
    }

    onSliderChange = (value) => {
        if(sessionStorage.getItem("lat") === null) {
            alert("Please enable GPS to use this feature");
            this.setState({sliderDisabled: true})
            return;
            
        }
        distanceRange = (value);       
    }
    
    render() {
        if(this.state.markers.length === 0 || this.state.hideButtons) {
            return (null);
        }
        else {
            if(count===0) {
                listWithAll = this.state.markers;
                count++;
            }
            if(this.state.filterButtonShown) {
                return (           
                    <div>
                    <Button id="filter"className="mapFilterBtn bg-dark" style={{
                        width: '82px',  
                        borderColor:'transparent', 
                        marginTop: '12px',
                        // marginRight: '5px',
                        opacity: '0.7',
                        // float: 'left',
                        // borderRadius: '3px', 
                        color: 'white', 
                        display: 'inline-block', 
                        fontSize:'16px'
                    }} onClick={this.toggle}>Filter</Button>
        
                    <Modal size="sm" isOpen={this.state.modal} fade={false} toggle={this.toggle} className={this.props.className} >
                      {/* <ModalHeader toggle={this.toggle}></ModalHeader> */}
                      <div style={{ marginBottom: '20px'}}>
                      <ModalBody>
                            {/* <div style={{fontWeight: 'bold'}}>Open? </div>
                      <div className="onoffswitch2">
                      <input type="checkbox" disabled name="onoffswitch2" className="onoffswitch-checkbox2" id="myonoffswitch2" checked={this.state.disabledCheckboxState2} onChange={this.handleChecked2}></input>
                      <label className="onoffswitch-label2" htmlFor="myonoffswitch2">
                        <span className="onoffswitch-inner2"></span>
                        <span className="onoffswitch-switch2"></span>
                      </label>
                      </div> */}
                      <div style={{fontWeight: 'bold'}}>Search within range (in meters) </div>    
                      <Slider disabled={this.state.sliderDisabled} min={0} max={1000} step={10} marks={{0: '0m', 250: '250m', 500: '500m', 750: '750m', 990: '1000m'}} defaultValue={500} onAfterChange={this.onSliderChange}/>  
                      <br/>
                      <div style={{fontWeight: 'bold'}}>Disabled access? </div>
                      <div className="onoffswitch">
                      <input type="checkbox" name="onoffswitch" className="onoffswitch-checkbox" id="myonoffswitch" checked={this.state.disabledCheckboxState} onChange={this.handleChecked}></input>           
                      <label className="onoffswitch-label" htmlFor="myonoffswitch">
                        <span className="onoffswitch-inner"></span>
                        <span className="onoffswitch-switch"></span>
                      </label>
                      </div>
                    
                      <div style={{fontWeight: 'bold'}}>How many stars? </div>
                      <StarRatingComponent
                            className="mt-2"
                            name="rateToilet"
                            starCount={5}
                            value={this.state.rating}
                            onStarClick={this.onStarClick.bind(this)}
                        />
        
                      </ModalBody>
                      <ModalFooter>
                        <Button className="btn btn-success" onClick={this.applyFilters}>Apply filters</Button>
                        <Button className="btn btn-default" onClick={this.toggle}>Cancel</Button>
                      </ModalFooter>
                      </div>
                    </Modal>
                  </div>
                );   
                } 
                if(!this.state.filterButtonShown) {
                    return (
                        <Button id="filter" className="mapFilterBtn bg-dark" style={{
                                        borderColor:'transparent', 
                                        // margin: '1%',
                                        // marginRight: '5px',
                                        opacity: '0.7',
                                        // float: 'left',
                                        // borderRadius: '3px', 
                                        color: 'white', 
                                        display: 'inline-block', 
                                        fontSize:'16px'
                                    }} onClick={this.clear}>Show all</Button>
                    );
                }
            }
        
        
        // var currentlyOpen = this.props.markerList((marker) => {
        //     var dateNow = new Date().getDay();
        //     var timeNow = new Date().toLocaleString([], {hour: '2-digit', minute:'2-digit', hour12: false});
            
        // });
       
    }
}

export default Filter