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
import { componentWillUnmount } from 'react-google-maps/lib/utils/MapChildHelper';

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
var youPosition = {};
var propsCounter = 5
// const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");
var refs = {}
var allToilets = []
var positionCounter = 0
const MapWithASearchBox = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyA724IPb4Emgc7Xdfc6WI4XdhML1eQPI6k&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `92vh`, width: '100wv' }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  lifecycle({

    componentDidMount() {

      function  getYourCenterOnClick (){
        this.setState({center:youPosition}).bind(this)
      }

      function errorPosition() {
        alert(`Unfortunately I can't locate you! Please make sure your GPS is enabled in order to use all features.`)
      }

      function showPosition(position) {
        console.log(positionCounter)
        youPosition = { lat: position.coords.latitude, lng: position.coords.longitude }
        console.log(youPosition);
        sessionStorage.setItem('lat', youPosition.lat);
        sessionStorage.setItem('lng', youPosition.lng);
        if(positionCounter<1){
        this.setState({center: youPosition})
        }
        console.log(`olen showPositionissa`)
      }

      navigator.geolocation.watchPosition(showPosition.bind(this), errorPosition, { enableHighAccuracy: true });


      getAllToilets((data) => {
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
        this.setState({ toiletmarkers: nextProps.filteredMarkers, })
       
        var firstSet = nextProps.filteredMarkers.slice(0,1);
        var firstPoint = new google.maps.LatLng(firstSet[0].latitude, firstSet[0].longitude);
        var secondSet = nextProps.filteredMarkers.slice(nextProps.filteredMarkers.length-1, nextProps.filteredMarkers.length);
        var lastPoint = new google.maps.LatLng(secondSet[0].latitude, secondSet[0].longitude);
        var bounds1 = new google.maps.LatLngBounds();
        bounds1.extend(firstPoint);
        bounds1.extend(lastPoint);
       
        if(nextProps.filteredMarkers.length === 1) {
          refs.map.panTo(firstPoint);
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
      else if (nextProps.status !== 3) {
        propsCounter++
        this.setState({ status: propsCounter })
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
            marginLeft: '15px',
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `240px`,
            height: `32px`,
            marginTop: `22px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
          }}
        />
      </SearchBox>
      <MapControl position={google.maps.ControlPosition.LEFT_TOP}>
        <FindNearestToilet markerList={props.toiletmarkers} getFilterData={props.getFilterData} />
        <Filter markerList={props.toiletmarkers} getFilterData={props.getFilterData} />
        <AdMarker addMarker={props.addMarker} position={youPosition} />
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
  state = { markers: [], addedMarker: [], status: null };
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

  render() {

    return (
      <div>

        <MapWithASearchBox sendProps={this.sendProps} status={this.state.status} addMarker={this.addMarker} addedMarkers={this.state.addedMarker} getFilterData={this.filterCallback} filteredMarkers={this.state.markers} showRouteOnClick={this.props.showRouteOnClick} />

      </div>
    );
  }
};

export default Map2;
