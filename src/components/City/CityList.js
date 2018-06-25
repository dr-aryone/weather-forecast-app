import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import cities from '../../utils/cities';
import fetch from '../../utils/fetch';

import './CityList.css';

const UNITS_CODE = {
  metric: '\u2103',
  imperial: '\u2109',
}

const API_KEY = '51d01ab68d980980b68a0ffae012d080';
const API_URL = 'http://api.openweathermap.org/data/2.5/weather';

class CityList extends Component {
  state = {
    weatherData: [],
    weatherUnits: 'metric',
    cityLinks: [],
  };

  getRouteName = (name) => {
    return name.toLowerCase().split(' ').join('-');
  }

  fetchDataByUnits = (unit) => {
    return cities.map((city) => (
      fetch(`${API_URL}?id=${city.id}&appid=${API_KEY}&units=${unit}`)
    ));
  }

  fetchCitiesData = () => {
    Promise.all([
      ...this.fetchDataByUnits('metric'),
      ...this.fetchDataByUnits('imperial')
    ]).then((results) => {
        const weatherData = results.slice(0,5).map((data) => {
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

        results.slice(5).forEach((data) => {
          const { name, main } = data;
          const weatherDataToAdd = weatherData.find((elem) => (
            elem.name === name
          ));

          weatherDataToAdd.weather.imperial = Math.floor(main.temp);
        });

        this.setState({ weatherData }, this.updateCityLinks);
      });
  }

  componentDidMount = () => {
    this.fetchCitiesData();
  }

  onToggleUnitsClick = (e) => {
    const weatherUnits = e.currentTarget.getAttribute('id');
    this.setState({ weatherUnits }, this.updateCityLinks);
  }

  updateCityLinks = () => {
    const cityLinks = this.state.weatherData.map((city) => (
      <NavLink to={`/city/${city.routeName}`} key={city.routeName}>
        <span className="CityList__weather">
          {city.weather[this.state.weatherUnits]}
          <small>{UNITS_CODE[this.state.weatherUnits]}</small>
        </span>
        <span className="CityList__description">
          {city.weather.description}
        </span>
        <span className="CityList__name">
          {city.name}, {city.country}
        </span>
      </NavLink>
    ));

    this.setState({ cityLinks });
  }

  getCityLinks = () => {
    const cityLinks = cities.map((city) => {
      const itemStyle = {
        backgroundImage: `url(${city.image})`
      }

      return (
        <li className="CityList__item" key={city.name} style={itemStyle}>
          {
            this.state.cityLinks.filter((cityLink) => (
              cityLink.key === city.routeName
            ))
          }
        </li>
      );
    });

    return cityLinks;
  }

  render () {
    const metricClass = classNames({
      'CityList__units--active': this.state.weatherUnits === 'metric',
    });
    const imperialClass = classNames({
      'CityList__units--active': this.state.weatherUnits === 'imperial',
    });

    return (
      <div className="CityList">
        <div className="CityList__units">
          <span
            id="metric"
            className={metricClass}
            onClick={this.onToggleUnitsClick}>
            &#8451;
          </span>
          <span></span>
          <span
            id="imperial"
            className={imperialClass}
            onClick={this.onToggleUnitsClick}>
            &#8457;
          </span>
        </div>
        <ul className="CityList__content">
          {this.getCityLinks()}
        </ul>
      </div>
    );
  }
};

export default CityList;
