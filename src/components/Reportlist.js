import React, { Component } from 'react';
import { getAllReports } from '../utilities/Service';
import Report from './Report';
import {Input, Button, ButtonGroup} from 'reactstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


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
    filterReports = () => {
            console.log(this.state.markers[0].date)
            console.log(new Date().toDateString())
            // var a=this.state.markers;                
            // var b = a.sort(function(a, b){return a.date>b.date});
            // console.log(b);
            
            if(this.state.selected===2 || this.state.selected===null){
                let tempToilets = this.state.markers.sort((a, b) => (a.date > b.date ? 1 : -1))
                this.setState({ markers: tempToilets })
                this.setState({selected:3})
            }
            else{
                let tempToilets = this.state.markers.sort((a, b) => (a.date < b.date ? 1 : -1))
                this.setState({ markers: tempToilets })
                this.setState({selected:2})
            }
            
            
            
            
            // let tempToilets = this.state.markers.filter(x => x.date <new Date().toDateString())
            // this.setState({ markers: b })
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
                <Button className="filterBtn" color="primary" onClick={this.filterReports}>Filter by time</Button>
                
                <Input type="text" placeholder= "Search toilet" value={this.state.search} style={{width: `40%`, fontSize:15, fontFamily:'Lucida Console'}}
                        onChange={this.updateSearch.bind(this)} />

                <ReactCSSTransitionGroup
                    transitionName="fade"
                    transitionEnterTimeout={700}
                    transitionLeaveTimeout={700}
                    transitionAppear={true}
                    transitionAppearTimeout={700}>
                    {kaikki}
                </ReactCSSTransitionGroup>
            </div>

        );
    }
}
export default Reportlist;
{/* <h6 marker={marker} key={marker.report_id}>{reports}</h6> */}