import React, { Component } from 'react';
import target from '../images/target.png'

class GetCenter extends Component {
  constructor(props){
    super(props)
    this.state= {
      isAdmin : false
    }
  }
  get = () => {
    this.props.getCenterAgain(this.props.position)
}

  render() {
    return (
        <div>
         <button onClick={this.get} style={{
                    backgroundColor: 'transparent',
                    display: 'inline-block',
                    border: 'none',
                    marginTop: '15px',
                    marginRight: '10px'
                }}><img src={target} alt="target"></img></button> 

        </div>
    
    );
  }
}

export default GetCenter;
