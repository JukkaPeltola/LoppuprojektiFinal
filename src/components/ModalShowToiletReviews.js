import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { GetOneReview, GetOneUser } from '../utilities/Service';
import OneReview from './OneReview';
import { DeleteReview } from '../utilities/Service';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

var reviews;
class ModalShowToiletReviews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            nestedModal: false,
            closeAll: false,
            rev: null,
            admin: false
        };

        this.toggle = this.toggle.bind(this);
        this.toggleNested = this.toggleNested.bind(this);
        this.toggleAll = this.toggleAll.bind(this);
    }

    deleteReview = (review_id) => {
        let templist = this.state.rev.filter(x=> x.props.review.review_id != review_id);
        this.setState({rev: templist})
        DeleteReview(review_id)
    }

    componentDidMount(){
        let id = sessionStorage.getItem('id')
        if (id != null){
            GetOneUser(id,(data) => {
                if (data.admin == true){
                    this.setState({admin: true})
                    console.log("Admin muuttui")
                } else {
                    this.setState({admin: false})
                }
            })
        } else {
            this.setState({admin: false})
        }

        GetOneReview(this.props.marker.toilet_id, (data) => {
            reviews = data.map((review, index) => {
                return <OneReview isAdmin={this.state.admin} deleteReview={this.deleteReview} toilet={this.props.marker} review={review} key={index}></OneReview>
            })
            this.setState({rev: reviews})

        })
    }

    toggle() {

        this.setState({
            modal: !this.state.modal
        })
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

    render() {

        return (
            <div>
                <Button color="info" onClick={this.toggle}>Toilet reviews</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Reviews</ModalHeader>
                    &nbsp;&nbsp;&nbsp;&nbsp;{}
                    <ModalBody>
                        <ReactCSSTransitionGroup
                        transitionName="fade"
                        transitionEnterTimeout={700}
                        transitionLeaveTimeout={700}
                        transitionAppear={true}
                        transitionAppearTimeout={700}> 
                        {
                            this.state.rev
                        }
                        </ReactCSSTransitionGroup>
                    </ModalBody>
                    <ModalFooter>
                        {/* <Button color="primary" >Something</Button>{' '} */}
                        <Button onClick={this.toggle} color="secondary" >Back</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ModalShowToiletReviews;
