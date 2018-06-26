import React, { Component } from 'react';
import { Route, BrowserRouter } from "react-router-dom";

import resources from '../utils/resources';

import Header from './Header/Header';
import Home from './Home/Home';
import CityDetails from './City/CityDetails';

import './App.css';

const { APP_ROOT } = resources;

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <div className="App__content">
            <Route exact path={APP_ROOT} component={Home} />
            <Route path='/city/:id' component={CityDetails} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
