import React, { Component } from 'react';
import {Button} from 'reactstrap';
class report extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: true
        }
    }
    render() {
        return (
            <center style={{
                width: '70%',
                margin: '1% 0',
                padding: '3%',
                border: 'solid',
                borderRadius: '10px',
                backgroundColor: '#e2edff'
            }}>
               <h4 style={{fontWeight: 'bold'}}>{this.props.marker.name}</h4> 
                <p>{this.props.marker.text}</p>
                <Button onClick={this.deleteReport} color="danger">Delete</Button>
            </center>
        );
    }
}

export default report;