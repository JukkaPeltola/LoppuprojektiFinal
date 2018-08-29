import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import About from './components/About';
import Toiletlist from './components/Toiletlist';
import Reportlist from './components/Reportlist';
import Chat from './components/Chat';
import Login from './components/Login';
// import Reportlist from './components/Reportlist';
import Main from './components/Main';
import CustomNavbar from './components/Navbar';


// import Etsi from './Components/GoogleMap';
// import { GoogleMap } from 'react-google-maps';

class App extends Component {
  render() {
    return (
      <div className="App">
        <center>
        <div>

          <Router>
            <div>
            <CustomNavbar />
            <Switch>
              <Route exact path="/" component={Main} />
              {/* <Route path="/Home" component={Home} /> */}
              <Route path="/About" component={About} />
              <Route path="/Wclist" component={Toiletlist} />
              <Route path="/Chat" component={Chat} />
              <Route path="/Reports" component={Reportlist} />
              <Route path="/Login" component={Login} />
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
