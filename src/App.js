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
    console.log(`Olen setAdmin func ${state}`)
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
              <Route path="/About" component={About} />
              <Route path="/Wclist" component={Toiletlist} />
              <Route path="/Chat" component={Chat} />
              <Route path="/Reports" render={() => (this.state.isAdmin) ?  <Reportlist/> : <Redirect to="/"/> }/>
              <Route path="/Login" render={() => <Login setAdmin={this.setAdmin} /> } />
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
