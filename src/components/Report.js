import React, { Component } from 'react';
import {Button} from 'reactstrap';
import Moment from 'moment';
import {deleteReport} from '../utilities/Service';
class report extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: true
        }   
    }

    poistaReport = () => {
        this.props.poista(this.props.marker.report_id)
        deleteReport(this.props.marker.report_id)
    }
    
    render() {
        const formattedDate = Moment(this.props.marker.date).format('DD-MMM-YY HH:mm');
        
        return (
            <div>
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
                <p>{formattedDate}</p>
                <Button onClick={this.poistaReport} color="danger">Delete</Button>
            </center>
            </div>

            
        );
    }
}

export default report;