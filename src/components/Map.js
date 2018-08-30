import React, { Component } from 'react';
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox';
import { getAllToilets } from '../utilities/Service';
import InfoWindowMap from './InfoWindowMap'
import Filter from './Filter';
import MapControl from './MapControl';
import logo from './plus.png';
import YourPosition from './YourPosition';
import AdMarker from './AdMarker';
import FindNearestToilet from './FindNearestToilet';
// import './Map.css'
import { componentWillUnmount } from 'react-google-maps/lib/utils/MapChildHelper';
import GetCenter from './GetCenter'

const google = window.google;
console.log(google)
const _ = require("lodash");
const { compose, withProps, lifecycle, } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer
} = require("react-google-maps");
// const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");
var refs = {}
var allToilets = []
var positionCounter = 0
var propsCounter = 5
var youPosition = {};
const MapWithASearchBox = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyA724IPb4Emgc7Xdfc6WI4XdhML1eQPI6k&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `92vh`, width: '100wv' }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  lifecycle({

    componentDidMount() {

     

      function errorPosition() {
        alert(`Unfortunately I can't locate you! Please make sure your GPS is enabled in order to use all features.`)
      }

      function showPosition(position) {
        youPosition = { lat: position.coords.latitude, lng: position.coords.longitude }
        sessionStorage.setItem('lat', youPosition.lat);
        sessionStorage.setItem('lng', youPosition.lng);
        if(positionCounter<1){
        this.setState({center: youPosition})
        positionCounter++
        }
      }

      navigator.geolocation.watchPosition(showPosition.bind(this), errorPosition, { enableHighAccuracy: true });


      getAllToilets((data) => {
        allToilets = []
        data.map(res => {
          allToilets.push(res)
        })
        this.setState({ toiletmarkers: allToilets })
      });

      refs = {}

      this.setState({
        bounds: null,
        center: {
          lat: 60.17131, lng: 24.94145
        },
        markers: [],
        toiletmarkers: [],
        status: null,
        onMapMounted: ref => {
          refs.map = ref;
        },
        onMapClick: () => {
          propsCounter++
          this.setState({ status: propsCounter })
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          })
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
         
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new window.google.maps.LatLngBounds();

          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport)
            } else {
              bounds.extend(place.geometry.location)
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
          }));
          const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

          this.setState({
            center: nextCenter,
            markers: nextMarkers,
          });

          //refs.map.fitBounds(bounds);
        },

      })
    }, componentWillReceiveProps(nextProps) {
      if (nextProps.filteredMarkers !== this.props.filteredMarkers) {
        this.setState({ toiletmarkers: nextProps.filteredMarkers })
        console.log(nextProps)//
        // var firstSet = nextProps.filteredMarkers.sort()
        var firstSet = nextProps.filteredMarkers.slice(0, 1);
        var firstPoint = new google.maps.LatLng(firstSet[0].latitude, firstSet[0].longitude);
        var secondSet = nextProps.filteredMarkers.slice(nextProps.filteredMarkers.length - 1, nextProps.filteredMarkers.length);
        var lastPoint = new google.maps.LatLng(secondSet[0].latitude, secondSet[0].longitude);
        var bounds1 = new google.maps.LatLngBounds();
        // bounds1.extend(firstPoint);
        if(sessionStorage.getItem("lat")===null) {
          bounds1.extend(lastPoint);
        }
        else {
          bounds1.extend(new google.maps.LatLng(sessionStorage.getItem("lat"), sessionStorage.getItem("lng")));
        }
        bounds1.extend(firstPoint);

        if (nextProps.filteredMarkers.length === 1) {
          var bounds2 = new google.maps.LatLngBounds();
          if(sessionStorage.getItem("lat")===null) {
            bounds2.extend(firstPoint);
          }
          else {
            bounds2.extend(new google.maps.LatLng(sessionStorage.getItem("lat"), sessionStorage.getItem("lng")));
          }
          bounds2.extend(lastPoint);
          refs.map.fitBounds(bounds2)
        }
        else {
          refs.map.fitBounds(bounds1)
        }
      }
      else if (nextProps.addedMarkers !== this.props.addedMarkers) {
        for (let index = 0; index < nextProps.addedMarkers.length; index++) {
          const element = nextProps.addedMarkers[index];
          if (!this.props.addedMarkers.includes(element)) {
            allToilets.push(element)
          }
        }
        this.setState({ toiletmarkers: allToilets })
      }
     
      else if(nextProps.getBounds !== this.props.getBounds ||  nextProps.boundCounter !== this.props.boundCounter){
        var  firstPoint = new google.maps.LatLng(nextProps.getBounds.lat-(0.005), nextProps.getBounds.lng-(0.005));
        var lastPoint = new google.maps.LatLng(nextProps.getBounds.lat+(0.005), nextProps.getBounds.lng+(0.005));
        var bounds1 = new google.maps.LatLngBounds();
        bounds1.extend(firstPoint);
        bounds1.extend(lastPoint);

        refs.map.fitBounds(bounds1)
      }
      else if (nextProps.status !== 3) {
        propsCounter++
        this.setState({ status: propsCounter, })
       
      }
    }

  }),
  // withScriptjs,
  withGoogleMap
)(props =>

  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={15}
    center={props.center}
    onIdle={props.onMapIdle}
    // onBoundsChanged={props.onBoundsChanged}
    onClick={props.onMapClick}
    defaultOptions={{ mapTypeControl: false, fullscreenControl: false, streetViewControl: false, zoomControl: false }}
  >
    <div>
      <SearchBox
        ref={props.onSearchBoxMounted}
        bounds={props.bounds}
        controlPosition={google.maps.ControlPosition.TOP_LEFT}
        onPlacesChanged={props.onPlacesChanged}
      >
        <input
          type="text"
          placeholder="Search places"
          style={{
            marginLeft: '1%',
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `240px`,
            height: `32px`,
            marginTop: `1%`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
          }}
        />
      </SearchBox>
      <MapControl position={google.maps.ControlPosition.RIGHT_BOTTOM}>
        <AdMarker getCenterAgain={props.getCenterAgain} addMarker={props.addMarker} position={youPosition} />
      </MapControl>
      <MapControl position={google.maps.ControlPosition.LEFT_BOTTOM}>
      <FindNearestToilet markerList={props.toiletmarkers} getFilterData={props.getFilterData} />
      </MapControl>

      <MapControl position={google.maps.ControlPosition.TOP_CENTER}>
       
        <Filter markerList={props.toiletmarkers} getFilterData={props.getFilterData} />
      </MapControl>

        <MapControl position={google.maps.ControlPosition.TOP_RIGHT}>
        <GetCenter getCenterAgain={props.getCenterAgain} position={youPosition} />
      </MapControl>
      
       
    </div>
    {props.markers.map((marker, index) =>
      <Marker key={index} position={marker.position} />
    )}

    {props.toiletmarkers.map((marker) =>
      <InfoWindowMap sendProps={props.sendProps} status={props.status} showRouteOnClick={props.showRouteOnClick} marker={marker} lat={marker.latitude} lng={marker.longitude} key={marker.toilet_id}> </InfoWindowMap>)}
    <YourPosition lat={youPosition.lat} lng={youPosition.lng} />
  </GoogleMap>
);


class Map2 extends Component {
  state = { markers: [], addedMarker: [], status: null, getBounds: {}, boundCounter: 0 };
  filterCallback = (filterData) => {
    this.setState({ markers: filterData });
  }
  addMarker = (newMarker) => {
    var newMarkers = []
    newMarkers.push(newMarker)
    this.setState({ addedMarker: newMarkers })
  }
  sendProps = (receivedMessage) => {
    this.setState({ status: receivedMessage })
  }
  getYourCenterOnClick= (position)=>{
    this.state.boundCounter++
    this.setState({getBounds: position})
  }

  render() {

    return (
      <div>

        <MapWithASearchBox boundCounter = {this.state.boundCounter}getBounds={this.state.getBounds} getCenterAgain={this.getYourCenterOnClick}sendProps={this.sendProps} status={this.state.status} addMarker={this.addMarker} addedMarkers={this.state.addedMarker} getFilterData={this.filterCallback} filteredMarkers={this.state.markers} showRouteOnClick={this.props.showRouteOnClick} />

      </div>
    );
  }
};

export default Map2;
