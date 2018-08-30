import React, { Component } from 'react';


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
         <button onClick={this.get}>get</button> 

        </div>
    
    );
  }
}

export default GetCenter;
