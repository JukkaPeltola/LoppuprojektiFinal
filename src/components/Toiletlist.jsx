import React, { Component } from 'react';
import './Toiletlist.css';
import { getAllToilets } from '../utilities/Service';
import geolib from 'geolib';
import Toilet from './Toilet';
import { Button, ButtonGroup } from 'reactstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

var allToilets = []

class Toiletlist extends Component {

    constructor(props) {
        super(props)
        this.state = {
            lat: 60.17131,
            lng: 24.94145,
            zoom: 17,
            markers: [],
            rSelected: Number
        }

        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    }

    onRadioBtnClick(rSelected) {
        this.setState({ rSelected }, () => {
            this.filterToilets();
        })
    }

    filterToilets = () => {
        if (this.state.rSelected == 2) {
            let tempToilets = allToilets.filter(x => x.inva != true)
            this.setState({ markers: tempToilets })
        } else if (this.state.rSelected == 1) {
            let tempToilets = allToilets.sort((a, b) => (a.rating < b.rating ? 1 : -1))
            this.setState({ markers: tempToilets })
        } else if (this.state.rSelected == 4) {
            let tempToilets = allToilets.sort((a, b) => (geolib.getDistance(
                { latitude: 60.17131, longitude: 24.94145 },
                { latitude: a.latitude, longitude: a.longitude }) - geolib.getDistance(
                    { latitude: 60.17131, longitude: 24.94145 },
                    { latitude: b.latitude, longitude: b.longitude })

            ))
            this.setState({ markers: tempToilets })
        } else if (this.state.rSelected == 3) {
            let tempToilets = allToilets.sort((a, b) => (a.name > b.name ? 1 : -1))
            this.setState({ markers: tempToilets })
        }
    }

    componentDidMount() {

        getAllToilets((data) => {
            data.map(res => {
                allToilets.push(res)
            })

            this.setState({ markers: allToilets })
            console.log(this.state.markers)
        });
    }

    render() {
        var toilets = this.state.markers.map(marker => (
            <Toilet marker={marker} key={marker.toilet_id}>
            </Toilet>
        ));

        return (
            <div>
                <br />
                <h2>TOILET LIST</h2>
                <br />
                <h6>Järjestä</h6>
                <ButtonGroup>
                    <Button color="primary" onClick={() => this.onRadioBtnClick(1)} active={this.state.rSelected === 1}>Rating</Button>
                    <Button color="primary" onClick={() => this.onRadioBtnClick(2)} active={this.state.rSelected === 2}>Inva</Button>
                    <Button color="primary" onClick={() => this.onRadioBtnClick(3)} active={this.state.rSelected === 3}>Name</Button>
                    <Button color="primary" onClick={() => this.onRadioBtnClick(4)} active={this.state.rSelected === 4}>Distance</Button>
                </ButtonGroup>
                <ReactCSSTransitionGroup
                    transitionName="fade"
                    transitionEnterTimeout={700}
                    transitionLeaveTimeout={700}
                    transitionAppear={true}
                    transitionAppearTimeout={700}>
                    {toilets}
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}

export default Toiletlist;