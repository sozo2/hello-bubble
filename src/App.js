import React, { Component } from 'react';
import './styles/global.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/home"
import Upload from "./components/upload"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/upload' component={Upload} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;