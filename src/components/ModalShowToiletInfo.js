import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { UpdateToilet, GetOneUser } from '../utilities/Service';

class ModalShowToiletInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            nestedModal: false,
            closeAll: false,
            admin: false
        };

        this.nameRef = React.createRef()
        this.addressRef = React.createRef()
        this.zipRef = React.createRef()
        this.cityRef = React.createRef()
        this.invaRef = React.createRef()
        this.informationRef = React.createRef()
        this.latitudeRef = React.createRef()
        this.longitudeRef = React.createRef()
        this.pictureRef = React.createRef()
        this.openingRef = React.createRef()
        this.closingRef = React.createRef()
        this.pricingRef = React.createRef()
        this.ratingRef = React.createRef()

        this.toggle = this.toggle.bind(this);
        this.toggleNested = this.toggleNested.bind(this);
        this.toggleAll = this.toggleAll.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    toggleNested() {
        this.setState({
            nestedModal: !this.state.nestedModal,
            closeAll: false
        });
    }

    toggleAll() {
        this.setState({
            nestedModal: !this.state.nestedModal,
            closeAll: true
        });
    }

    componentDidMount() {
        let id = sessionStorage.getItem('id')
        if (id != null) {
            GetOneUser(id, (data) => {
                if (data.admin) {
                    this.setState({admin: true})
                }
            })
        }
    }

    changeInfo = () => {
        let newToilet = {
            'toilet_id': this.props.marker.toilet_id, 'name': this.nameRef.value, 'address': this.addressRef.value,
            'zip': this.zipRef.value, 'city': this.cityRef.value, 'inva': this.invaRef.value, 'information': this.informationRef.value,
            'latitude': this.latitudeRef.value, 'longitude': this.longitudeRef.value, 'picture': this.pictureRef.value,
            'opening': this.openingRef.value, 'closing': this.closingRef.value, 'pricing': this.pricingRef.value,
            'rating': this.props.marker.rating
        }
        UpdateToilet(newToilet);
        console.log(newToilet);
        this.toggleAll();
    }

    render() {
        let rating = this.props.marker.rating;
        if (rating != null) {
            rating = rating.toFixed(2);
        }
        return (
            <div>
                <Button color="info" onClick={this.toggle}>Info</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>{this.props.marker.name}</ModalHeader>
                    <ModalBody>
                        <li>Rating: {rating} ★</li>
                        <li>{this.props.marker.address}, {this.props.marker.zip}, {this.props.marker.city}</li>
                    </ModalBody>
                    <ModalFooter>
                        {this.state.admin &&  <Button color="success" onClick={this.toggleNested}>Change the information</Button>}
                    
                        <Modal isOpen={this.state.nestedModal} toggle={this.toggleNested} onClosed={this.state.closeAll ? this.toggle : undefined}>
                            <ModalHeader>{this.props.marker.name}</ModalHeader>
                            <ModalBody>
                                <Form>
                                    <FormGroup>
                                        <Input innerRef={input => (this.nameRef = input)} type="text" name="name" id="name" placeholder={this.props.marker.name} />
                                        <Input innerRef={input => (this.addressRef = input)} type="text" name="address" id="address" placeholder={this.props.marker.address} />
                                        <Input innerRef={input => (this.zipRef = input)} type="text" name="zip" id="zip" placeholder={this.props.marker.zip} />
                                        <Input innerRef={input => (this.cityRef = input)} type="text" name="city" id="city" placeholder={this.props.marker.city} />
                                        <Input innerRef={input => (this.invaRef = input)} type="select" name="inva" id="inva">
                                            <option>True</option>
                                            <option>False</option></Input>
                                        <Input innerRef={input => (this.informationRef = input)} type="text" name="information" id="information" placeholder={this.props.marker.information} />
                                        <Input innerRef={input => (this.latitudeRef = input)} type="text" name="latitude" id="latitude" placeholder={this.props.marker.latitude} />
                                        <Input innerRef={input => (this.longitudeRef = input)} type="text" name="longitude" id="longitude" placeholder={this.props.marker.longitude} />
                                        <Input innerRef={input => (this.pictureRef = input)} type="text" name="picture" id="picture" placeholder={this.props.marker.picture} />
                                        <Input innerRef={input => (this.openingRef = input)} type="text" name="opening" id="opening" placeholder={this.props.marker.opening} />
                                        <Input innerRef={input => (this.closingRef = input)} type="text" name="closing" id="closing" placeholder={this.props.marker.closing} />
                                        <Input innerRef={input => (this.pricingRef = input)} type="number" step="0.1" name="pricing" id="pricing" placeholder={this.props.marker.pricing} />
                                    </FormGroup>
                                </Form>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.changeInfo}>Finish</Button>{' '}
                                <Button color="secondary" onClick={this.toggleNested}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                        {/* <Button color="secondary" >Show on map??</Button> */}
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ModalShowToiletInfo;
