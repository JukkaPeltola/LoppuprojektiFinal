import React from 'react';
import { InputGroup, Input } from 'reactstrap';
import ReactStars from 'react-stars'


class StarRating extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rating: 3,
            text: ""
        };
    }

    onTextChange = (e) => {
        this.setState({ text: e.target.value }, () => {
            this.props.TakeStarsAndReview(this.state.rating, this.state.text)
            console.log(this.state)
        })
    }
    ratingChanged = (newRating) => {
        this.setState({ rating: newRating }, () => {
            this.props.TakeStarsAndReview(this.state.rating, this.state.text)
            console.log(this.state)
        })
    }

    render() {

        return (
            <div>
                <Input onChange={this.onTextChange} maxLength="300" placeholder="Kirjoita arvostelu.." />
                <ReactStars
                    count={5}
                    size={30}
                    onChange={this.ratingChanged}
                    color2={'#ffd700'}
                    value={this.state.rating} />
            </div>
        );
    }
}

export default StarRating;