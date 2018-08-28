import React, { Component } from 'react';
import {Button} from 'reactstrap';

class OneReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            admin: true
        };
    }

    deleteReview = () => {
        this.props.deleteReview(this.props.review.review_id);
    }

    render() {
        return (
            <div>
                <h5>Arvostelu</h5>
                <h5>{this.props.review.rating}</h5>
                <h5>{this.props.review.review_text}</h5>
                {this.state.admin && <Button onClick={this.deleteReview} color="secondary">Poista arvostelu</Button>}
                <br/>
            </div>
        );
    }
}

export default OneReview;