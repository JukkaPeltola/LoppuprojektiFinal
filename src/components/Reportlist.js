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
            search:'',

            currentPage: 1,
            reportsPerPage: 5
        }

        this.handleClick = this.handleClick.bind(this);
    }
    filterReports = () => {           
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

    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
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


        const { currentPage, reportsPerPage } = this.state;

        // Logic for displaying toilets
        const indexOfLastToilet = currentPage * reportsPerPage;
        const indexOfFirstToilet = indexOfLastToilet - reportsPerPage;
        const toiletsSliced = kaikki.slice(indexOfFirstToilet, indexOfLastToilet);

        const renderToilets = toiletsSliced.map((toilet, index) => {
            return <li key={index}>{toilet}</li>;
        });

        // Logic for displaying page numbers
        var pageNumbers = [];
        var startPage;
        var endPage;

        for (let i = 1; i <= Math.ceil(kaikki.length / reportsPerPage); i++) {
            pageNumbers.push(i);

            if (currentPage > 3 && pageNumbers > 5) {
                startPage = currentPage - 2;
                endPage = currentPage + 2;
            }

            if (currentPage <= 3 && pageNumbers < 5) {
                startPage = 1;
                endPage = 5;
            } else if (currentPage + 2 >= pageNumbers) {
                startPage = pageNumbers - 4;
                endPage = pageNumbers;
            } else {
                startPage = currentPage - 3;
                endPage = currentPage + 2;
            }

        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
            <li 
                style={{ border: 'solid 1px', borderRadius: '5px', padding: '2%', backgroundColor: '#e2edff' }}
                // key={number}
                id={number}
                onClick={this.handleClick}
            >
                {number}
            </li>
            );
        });

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
                <div className="paging">
                    <ul>
                        {renderToilets}
                    </ul>
                    <ul className="page-numbers">
                        {renderPageNumbers}
                    </ul>
                </div>
                </ReactCSSTransitionGroup>
                
            </div>

        );
    }
}
export default Reportlist;
{/* <h6 marker={marker} key={marker.report_id}>{reports}</h6> */}