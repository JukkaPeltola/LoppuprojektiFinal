import React, { Component } from 'react';
import mag from '../images/mag.png'

class SearchButton extends Component {
  constructor(props){
    super(props)
    this.state= {
      isAdmin : false
    }
  }
  get = () => {
    this.props.show(this.props.position)
}

  render() {
    return (
        <div>
         <button onClick={this.get} style={{
                    backgroundColor: 'transparent',
                    display: 'inline-block',
                    border: 'none',
                    borderRadius: '10px',
                    marginTop: '15px',
                    marginLeft: '10px'
                }}><img src={mag} alt="target"></img></button> 

        </div>
    
    );
  }
}

export default SearchButton;
