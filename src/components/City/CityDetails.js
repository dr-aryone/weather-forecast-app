import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import cities from '../../utils/cities';
import fetch from '../../utils/fetch';

import UnitsToggle from './UnitsToggle';

import './CityDetails.css';

const API_KEY = '51d01ab68d980980b68a0ffae012d080';
const API_URL = 'http://api.openweathermap.org/data/2.5/weather';
const speedUnit = {
  metric: 'meter/sec',
  imperial: 'miles/hour',
}
const UNITS_CODE = {
  metric: '\u2103',
  imperial: '\u2109',
}

class CityDetails extends Component {
  state = {
    id: 0,
    name: '',
    image: '',
    weather: {
      description: '',
      icon: '03d',
      metric: {
        temp: 0,
        tempMin: 0,
        tempMax: 0,
      },
      imperial: {
        temp: 0,
        tempMin: 0,
        tempMax: 0,
      },
    },
    windSpeed: {
      metric: 0,
      imperial: 0,
    },
    windDirection: 0,
    clouds: 0,
    sunrise: 0,
    sunset: 0,
    humidity: 0,
    units: 'imperial',
  }

  componentWillMount = () => {
    const cityRouteName = this.props.match.params.id;
    const city = cities.filter((city) => city.routeName === cityRouteName);
    const { id, name, image } = city[0];

    this.setState({ id, name, image });
  }

  getFormattedTimezone = (minutes) => {
    const sign = minutes > 0 ? '+' : '';
    const hours = minutes;

    return `GMT${sign}${hours}`;
  }

  getHumanTime = (seconds) => {
    const date = new Date(seconds * 1000);
    const [, month, day] = date.toDateString().split(' ');
    const timezone = (date.getTimezoneOffset() / 60) * -1;

    return `${month} ${day}, ${date.toLocaleTimeString()} ${this.getFormattedTimezone(timezone)}`;
  }

  fetchCityWeather = (units) => (
    fetch(`${API_URL}?id=${this.state.id}&appid=${API_KEY}&units=${units}`)
  )

  getCityDetails = () => {
    Promise.all([
      this.fetchCityWeather('metric'),
      this.fetchCityWeather('imperial')
    ]).then((results) => {
      const [ metricData, imperialData ] = results;
      const { weather, main, wind, sys, clouds } = metricData;
      const imperialTemp = imperialData.main.temp;
      const imperialMinTemp = imperialData.main.temp_min;
      const imperialMaxTemp = imperialData.main.temp_max;
      const imperialWindSpeed = imperialData.wind.speed;
      this.setState({
        weather: {
          description: weather[0].description,
          icon: weather[0].icon,
          metric: {
            temp: main.temp,
            tempMin: main.temp_min,
            tempMax: main.temp_max,
          },
          imperial: {
            temp: imperialTemp,
            tempMin: imperialMinTemp,
            tempMax: imperialMaxTemp,
          },
        },
        windSpeed: {
          metric: wind.speed,
          imperial: imperialWindSpeed,
        },
        windDirection: wind.deg,
        clouds: clouds.all,
        sunrise: this.getHumanTime(sys.sunrise),
        sunset: this.getHumanTime(sys.sunset),
        humidity: main.humidity,
      });
    })
  }

  componentDidMount = () => {
    this.getCityDetails();
  }

  getCityImage = (name) => {
    const city = cities.filter((city) => city.routeName === name);

    return city[0].image;
  }

  onToggleUnitsClick = (e) => {
    const units = e.currentTarget.getAttribute('id');
    this.setState({ units });
  }

  render () {
    const imageStyle = {
      backgroundImage: `url(${this.state.image})`,
      margin: `0 1rem`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
    }
    const {
      name,
      weather,
      windSpeed,
      windDirection,
      clouds,
      sunrise,
      sunset,
      humidity,
      units
    } = this.state;

    return (
      <div className="CityDetails">
        <div className="CityDetails__image" style={imageStyle}></div>
        <div className="CityDetails__info">
          <div className="CityDetails__title">
            { name }
          </div>
          <div className="CityDetails__body">
            <div className="CityDetails__main-info">
              <p>{weather[units].temp} {UNITS_CODE[units]}</p>
              <p className="CityDetails__icon-wrapper">
                <small>{weather.description}</small>
                <img
                  src={`http://openweathermap.org/img/w/${weather.icon}.png`}
                  alt='Icon' />
              </p>
            </div>
            <div className="CityDetails__extra-info">
              <p>
                <small>Min. temp.: </small>
                {weather[units].tempMin} {UNITS_CODE[units]}
              </p>
              <p>
                <small>Max. temp.: </small>
                {weather[units].tempMax} {UNITS_CODE[units]}
              </p>
              <p><small>Humidity: </small>{humidity}%</p>
              <p>
                <small>Wind speed: </small>
                {windSpeed[units]} {speedUnit[units]}
              </p>
              <p><small>Wind direction: </small>{windDirection} deg</p>
              <p><small>Clouds: </small>{clouds}%</p>
              <p><small>Sunrise: </small>{sunrise}</p>
              <p><small>Sunset: </small>{sunset}</p>
            </div>
          </div>
        </div>
        <UnitsToggle
          metric={this.state.units === 'metric'}
          imperial={this.state.units === 'imperial'}
          onToggleHandler={this.onToggleUnitsClick} />
        <NavLink to='/' className="CityDetails__back-button">
          back to home
        </NavLink>
      </div>
    )
  }
};

export default CityDetails;
