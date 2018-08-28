import React, { Component } from 'react';
import { getAllReports } from '../utilities/Service';
import Report from './Report';

var allReports = []

class Reportlist extends Component{
    constructor(props) {
        super(props)
        this.state={
            markers: [],
            admin: false,
            search:''
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
    poista = (id) => {
        let temp = this.state.markers.filter(x => x.report_id != id)
        this.setState({markers: temp})
    }
    updateSearch(e) {
        this.setState({ search: e.target.value });
    }
    
    render(){
        // var reports = this.state.markers.map(marker => (
        //     <Report marker={marker} key={marker.report_id}>
        //     </Report>
            
        // ));
        let filteredContacts = this.state.markers
        .filter(
            (marker) => {
                return marker.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            }
        )
        ;
        var kaikki = filteredContacts
            .map(function (marker) {
                return (<Report poista={this.poista} marker={marker} key={marker.report_id}></Report>);
            }.bind(this));

        return(
            <div>
                <h1>Reports</h1>
                <input type="text" placeholder= "Search toilet" value={this.state.search} style={{width: `240px`, fontSize:15, fontFamily:'Lucida Console'}}
                        onChange={this.updateSearch.bind(this)} />

                <ul>
                {kaikki}
                </ul>    
             
            </div>

        );
    }
}
export default Reportlist;
{/* <h6 marker={marker} key={marker.report_id}>{reports}</h6> */}