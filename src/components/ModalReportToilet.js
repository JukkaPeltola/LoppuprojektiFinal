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
        let user_id = sessionStorage.getItem('id')
        let text = this.state.text;

        let toilet_id = this.props.marker.toilet_id;
        let name = this.props.marker.name;
        // let user_id = id;

        let newReport = { toilet_id: toilet_id, user_id: user_id, name: name, text: text };
        addNewReport(newReport)
        this.toggle();
    }

    takeReportText = (e) => { this.setState({text: e.target.value}) }

    render() {
        return (
            <div>
                <a style={{ color:"red", fontSize:"16px"}} onClick={this.toggle}>Report toilet</a>
                {/* <Button style={{marginRight:'5px', marginTop:'1px'}} color="link" onClick={this.toggle}>Report</Button> */}
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Report the moderator</ModalHeader>
                    &nbsp;&nbsp;&nbsp;&nbsp;{this.props.marker.name}
                    <ModalBody>
                            <Input onChange={this.takeReportText} type="text" maxLength="500" placeholder="What has changed/is wrong?" />
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.reportToilet} color="primary" >Report</Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ModalReportToilet;