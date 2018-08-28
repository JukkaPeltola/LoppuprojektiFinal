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

const google = window.google;
const _ = require("lodash");
const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer
} = require("react-google-maps");
var youPosition = {};
// const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");

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
        alert(`Unfortunately I can't locate you!`)
      }

      function showPosition(position) {
        // this.setState({
        //   lat: position.coords.latitude,
        //   lng: position.coords.longitude
        // })
        youPosition = { lat: position.coords.latitude, lng: position.coords.longitude }
        console.log(youPosition);
        sessionStorage.setItem('lat', youPosition.lat);
        sessionStorage.setItem('lng', youPosition.lng);
        // this.props.getPositionFromMap(youPosition)
      }



      navigator.geolocation.watchPosition(showPosition, errorPosition, { enableHighAccuracy: true });

      var allToilets = []
      getAllToilets((data) => {
        data.map(res => {
          allToilets.push(res)
        })

        this.setState({ toiletmarkers: allToilets })
      });

      const refs = {}

      this.setState({
        bounds: null,
        center: {
          lat: 60.17131, lng: 24.94145
        },
        markers: [],
        toiletmarkers: [],
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            // center: refs.map.getCenter(),
          })
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new google.maps.LatLngBounds();

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

          // refs.map.fitBounds(bounds);
        },

      })      
    }, componentWillReceiveProps(nextProps){
      if(nextProps.filteredMarkers!== this.props.filteredMarkers){
          this.setState({ toiletmarkers: nextProps.filteredMarkers })
      }
      this.setState({all: this.props.markerList});
  }}), 
  withScriptjs,
  withGoogleMap
)(props =>

  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={15}
    center={props.center}
    onIdle={props.onMapIdle}
    // onBoundsChanged={props.onBoundsChanged}
    onClick={props.onMapClick}
    defaultOptions={{mapTypeControl: false}}
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
          marginLeft:'10px',
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
    <Filter markerList={props.toiletmarkers} getFilterData={props.getFilterData}/>
    <AdMarker/>
    <FindNearestToilet markerList={props.toiletmarkers} getFilterData={props.getFilterData}/>
    </MapControl>
   </div>
    {props.markers.map((marker, index) =>
      <Marker key={index} position={marker.position} />
    )}

    {props.toiletmarkers.map((marker) =>
      <InfoWindowMap showRouteOnClick={props.showRouteOnClick} marker={marker} lat={marker.latitude} lng={marker.longitude} key={marker.toilet_id}> </InfoWindowMap>)}
  <YourPosition lat={youPosition.lat} lng={youPosition.lng} />

  </GoogleMap>
);


class Map2 extends Component {
    state = { markers: [] };
    filterCallback = (filterData) => {
      this.setState({markers: filterData});
    }
    render() {
      
      return(
          <div>
      
          <MapWithASearchBox getFilterData={this.filterCallback} filteredMarkers={this.state.markers} showRouteOnClick={this.props.showRouteOnClick}/>              

          </div>
      );
    }
};

export default Map2;