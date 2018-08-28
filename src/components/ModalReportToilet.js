import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { addNewReport } from '../utilities/Service';
import { InputGroup, Input } from 'reactstrap';


class ModalReportToilet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            text: ""

        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    reportToilet = () => {
        let text = this.state.text;
        let toilet_id = this.props.marker.toilet_id;
        let name = this.props.marker.name;
        let user_id = 1;
        let newReport = { toilet_id: toilet_id, user_id: user_id, name: name, text: text };
        addNewReport(newReport)
        this.toggle();
    }

    takeReportText = (e) => { this.setState({text: e.target.value}) }

    render() {
        return (
            <div>
                <Button color="danger" onClick={this.toggle}>Report</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Ilmoita ylläpitäjälle</ModalHeader>
                    &nbsp;&nbsp;&nbsp;&nbsp;{this.props.marker.name}
                    <ModalBody>
                            <Input onChange={this.takeReportText} type="text" maxLength="500" placeholder="Mikä on muuttunut/vialla?" />
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.reportToilet} color="primary" >Report</Button>{' '}
                        <Button color="secondary" >Jotain tähän?</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ModalReportToilet;