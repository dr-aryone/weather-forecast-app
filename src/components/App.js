import React, { Component } from 'react';
import { Route, NavLink, BrowserRouter } from "react-router-dom";

import Cities from './City/Cities';
import Home from './Home/Home';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <h1>Weather Forecast App</h1>
            <ul className="">
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/city">Go to city details</NavLink></li>
            </ul>
            <div className="content">
              <Route exact path="/" component={Home} />
              <Route path="/city" component={Cities} />
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
