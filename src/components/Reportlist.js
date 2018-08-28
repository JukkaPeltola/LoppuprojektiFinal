import React, { Component } from 'react';
import { getAllReports } from '../utilities/Service';
import Report from './Report';

var allReports = []
class Reportlist extends Component{
    constructor(props) {
        super(props)
        this.state={
            markers: [],
        }
    }

    componentDidMount() {

        getAllReports((data) => {
            data.map(res => {
                allReports.push(res)
            })
            this.setState({ markers: allReports })
            console.log(this.state.markers)
        });
    }
    render(){
        var reports = this.state.markers.map(marker => (
            <Report marker={marker} key={marker.report_id}>
            </Report>
            
        ));
        return(
            <div>
                <h1>Reports</h1>
               <h6>{reports}</h6>

            </div>

        );
    }
}
export default Reportlist;