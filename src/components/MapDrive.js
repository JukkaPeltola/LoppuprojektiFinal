import React, { Component } from 'react';
import { Button } from 'reactstrap';
import YourPosition from './YourPosition';
import './mapdrive.css';

const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} = require("react-google-maps");
var youPosition = {};
const google = window.google;

const MapWithADirectionsRenderer = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyA724IPb4Emgc7Xdfc6WI4XdhML1eQPI6k&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100vh` }} />,
    containerElement: <div style={{ height: `93vh`, width: '100wv' }} />,
    mapElement: <div style={{ height: `93vh` }} />,
  }),
  // withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {

      const DirectionsService = new google.maps.DirectionsService();

      const refs = {}

      DirectionsService.route({
        origin: new google.maps.LatLng(sessionStorage.getItem("lat"), sessionStorage.getItem("lng")),
        destination: new google.maps.LatLng(this.props.position.lat, this.props.position.lng),
        travelMode: google.maps.TravelMode.WALKING,
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            bounds: null,
            onMapMounted: ref => {
              refs.map = ref;
            },
            onBoundsChanged: () => {
              this.setState({
                bounds: refs.map.getBounds(),
                // center: refs.map.getCenter(),
              })
            },

            directions: result,
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });
    }
  })
)(props =>
  <GoogleMap
    ref={props.onMapMounted}
    onBoundsChanged={props.onBoundsChanged}
    defaultZoom={7}
    defaultCenter={new google.maps.LatLng(60.17131, 24.94145)}
    defaultOptions={{mapTypeControl: false}}
  >
    {props.directions && <DirectionsRenderer directions={props.directions} />}
    <YourPosition lat={youPosition.lat} lng={youPosition.lng} />
  </GoogleMap>
);

class MapDrive extends Component {

  showNormalMap = () => {
    this.props.showNormalMap();
  }

  render() {
    return (
      <div>
        <MapWithADirectionsRenderer position={this.props.position} />
        <Button onClick={this.showNormalMap} color="primary" size="lg" block>Return back</Button>{' '}


      </div>
    );
  }
};
//testi
export default MapDrive;