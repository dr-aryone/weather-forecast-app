import React, { Component } from 'react';

import './CityDetails.scss';

import cities from '../../utils/cities';
import fetch from '../../utils/fetch';

import './CityDetails.css';

const API_KEY = '51d01ab68d980980b68a0ffae012d080';
const API_URL = 'http://api.openweathermap.org/data/2.5/weather';

class CityDetails extends Component {
  state = {
    id: 0,
    name: '',
    image: '',
    weather: {
      description: '',
      icon: '',
      temp: 0,
      tempMin: 0,
      tempMax: 0,
    },
    windSpeed: 0,
    sunrise: 0,
    sunset: 0,
    humidity: 0,
  }

  componentWillMount = () => {
    const cityRouteName = this.props.match.params.id;
    const city = cities.filter((city) => city.routeName === cityRouteName);
    const { id, name, image } = city[0];

    this.setState({ id, name, image });
  }

  /*
  weather.description
  weather.icon
  main.temp_min
  main.temp_max
  wind.speed
  sys.sunrise
  sys.sunset

  Forecast
  api.openweathermap.org/data/2.5/forecast?id=524901
  main.humidity
  */

  getCityDetails = () => {
    fetch(`${API_URL}?id=${this.state.id}&appid=${API_KEY}`).then((results) => {
      // console.log(results);
      this.setState({
        weather: {
          description: results.weather[0].description,
          icon: results.weather[0].icon,
          temp: results.main.temp,
          tempMin: results.main.temp_min,
          tempMax: results.main.temp_max,
        },
        windSpeed: results.wind.speed,
        sunrise: results.sys.sunrise,
        sunset: results.sys.sunset,
        humidity: results.main.humidity,
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

  render () {
    return (
      <div className="CityDetails">
        <div className="CityDetails__image">
          <img src={this.state.image} alt="" />
        </div>
        <div className="CityDetails__info">
          <div className="CityDetails__title">
            { this.state.name }
          </div>
          <div className="CityDetails__body">
            <p>{this.state.weather.temp}</p>
            <p>{this.state.weather.description}</p>
            <p><small>Min. temp: </small>{this.state.weather.tempMin}</p>
            <p><small>Max. temp: </small>{this.state.weather.tempMax}</p>
            <p><small>Wind speed: </small>{this.state.windSpeed}</p>
            <p><small>Sunrise: </small>{this.state.sunrise}</p>
            <p><small>Sunset: </small>{this.state.sunset}</p>
            <p><small>Humidity: </small>{this.state.humidity}</p>
          </div>
        </div>
      </div>
    )
  }
};

export default CityDetails;
