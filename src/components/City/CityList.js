import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import cities from '../../utils/cities';
import fetch from '../../utils/fetch';
import resources from '../../utils/resources';

import UnitsToggle from '../Units/UnitsToggle';

import './CityList.css';

const { API_KEY, API_URL, UNITS_CODE } = resources;
const CITY_COUNT = cities.length;

class CityList extends Component {
  state = {
    weatherData: [],
    cityLinks: [],
    units: 'metric',
  };

  getRouteName = (name) => {
    return name.toLowerCase().split(' ').join('-');
  }

  fetchDataByUnits = (unit) => {
    return cities.map((city) => {
      const url = `${API_URL}?id=${city.id}&appid=${API_KEY}&units=${unit}`;

      return fetch(url)
    });
  }

  fetchCitiesData = () => {
    Promise.all([
      ...this.fetchDataByUnits('metric'),
      ...this.fetchDataByUnits('imperial')
    ]).then((results) => {
        const weatherData = results.slice(0, CITY_COUNT).map((data) => {
          const { name, main, weather, sys } = data;

          return {
            name,
            routeName: this.getRouteName(name),
            country: sys.country,
            weather: {
              metric: Math.floor(main.temp),
              description: weather[0].main,
            }
          };
        });

        results.slice(CITY_COUNT).forEach((data) => {
          const { name, main } = data;
          const weatherDataToUpdate = weatherData.find((elem) => (
            elem.name === name
          ));

          weatherDataToUpdate.weather.imperial = Math.floor(main.temp);
        });

        this.setState({ weatherData }, this.updateCityLinks);
      });
  }

  componentDidMount = () => {
    this.fetchCitiesData();
  }

  onToggleUnitsClick = (e) => {
    const units = e.currentTarget.getAttribute('id');

    this.setState({ units }, this.updateCityLinks);
  }

  updateCityLinks = () => {
    const cityLinks = this.state.weatherData.map((city) => {
      const { routeName, weather, name, country } = city;

      return (
        <NavLink to={`/city/${routeName}`} key={routeName}>
          <span className="CityList__weather">
            {weather[this.state.units]}
            <small>{UNITS_CODE[this.state.units]}</small>
          </span>
          <span className="CityList__description">
            {weather.description}
          </span>
          <span className="CityList__name">
            {name}, {country}
          </span>
        </NavLink>
      )
    });

    this.setState({ cityLinks });
  }

  getCityLinks = () => {
    const cityLinks = cities.map((city) => {
      const { routeName, name, image } = city;
      const linkStyle = {
        backgroundImage: `url(${image})`
      }

      return (
        <li className="CityList__item" key={name} style={linkStyle}>
          {
            this.state.cityLinks.filter((cityLink) => (
              cityLink.key === routeName
            ))
          }
        </li>
      );
    });

    return cityLinks;
  }

  render () {
    return (
      <div className="CityList">
        <UnitsToggle
          metric={this.state.units === 'metric'}
          imperial={this.state.units === 'imperial'}
          onToggleHandler={this.onToggleUnitsClick} />

        <ul className="CityList__content">
          {this.getCityLinks()}
        </ul>
      </div>
    );
  }
};

export default CityList;
