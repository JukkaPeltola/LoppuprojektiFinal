import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import star from '../images/star.png';
import { InputGroup, Input } from 'reactstrap';

class StarRating extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rating: 3,
            text: ""
        };
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({ rating: nextValue }, () => {
            this.props.TakeStarsAndReview(this.state.rating, this.state.text)
        })
    }

    onTextChange = (e) => {
        this.setState({ text: e.target.value }, () => {
            this.props.TakeStarsAndReview(this.state.rating, this.state.text)
        })
    }

    render() {
        const { rating } = this.state;

        return (
            <div>
                <Input onChange={this.onTextChange} maxLength="300" placeholder="Kirjoita arvostelu.." />
                <StarRatingComponent
                    className="mt-2"
                    name="rateToilet"
                    starCount={5}
                    value={rating}
                    onStarClick={this.onStarClick.bind(this)}
                />
            </div>
        );
    }
}

export default StarRating;