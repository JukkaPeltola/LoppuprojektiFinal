import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import About from './components/About';
import Toiletlist from './components/Toiletlist';
import Reportlist from './components/Reportlist';
import Chat from './components/Chat';
import Login from './components/Login';
// import Reportlist from './components/Reportlist';
import Main from './components/Main';
import CustomNavbar from './components/Navbar';

class App extends Component {
  constructor(props){
    super(props)
    this.state= {
      isAdmin : false
    }

    this.setAdmin = this.setAdmin.bind(this);
  }
  
  setAdmin = (state) => {
    this.setState({isAdmin: state})
  }

  render() {
    return (
      <div className="App">
        <center>
        <div>
          <Router>
            <div>
            <CustomNavbar isAdmin={this.state.isAdmin} setAdmin={this.setAdmin}/>
            <Switch>
              <Route exact path="/" component={Main} />
              <Route exact path="/Wclist" component={Toiletlist} />
              <Route exact path="/Chat" component={Chat} />
              <Route exact path="/Reports" render={() => (this.state.isAdmin) ?  <Reportlist/> : <Redirect to="/"/> }/>
              <Route exact path="/Login" render={() => <Login setAdmin={this.setAdmin} /> } />
              <Route path="/" render={() => <Redirect to="/"/>} />

              </Switch>
            </div>
          </Router>

        </div>
        </center>
      </div>
    );
  }
}

export default App;
