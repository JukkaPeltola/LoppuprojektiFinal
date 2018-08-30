import React, { Component } from 'react';
import {Button} from 'reactstrap';
require('./OneReview.css');

class OneReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: props.isAdmin
        };
    }

    componentWillReceiveProps(nextProps){
        this.setState({admin: nextProps.isAdmin})
    }

    deleteReview = () => {
        this.props.deleteReview(this.props.review.review_id);
    }

    render() {
        return (
            <div className="reviewView">
                
                {/* <h5>Review</h5> */}
                
                <p className="reviewText">{this.props.review.review_text}</p><hr />
                <p className="reviewRating"><center>{this.props.review.rating}</center></p>
                {this.state.admin && <Button onClick={this.deleteReview} color="secondary">Delete review</Button>}
            </div>
        );
    }
}

export default OneReview;