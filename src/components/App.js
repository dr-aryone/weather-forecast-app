import React, { Component } from 'react';
import { Route, BrowserRouter } from "react-router-dom";

import Home from './Home/Home';
import CityDetails from './City/CityDetails';
import Header from './Header/Header';

import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <div className="App__content">
            <Route exact path='/weather-forecast-app' component={Home} />
            <Route path='/city/:id' component={CityDetails} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
