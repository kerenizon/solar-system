import React from 'react';
import '../css/index.css';

class Planet extends React.Component {

  componentDidMount(){
    let btnsArr = this.props.refs;
    for(let i=0; i<10; i++){
      if (btnsArr[i].className === 'selected'){
        btnsArr[i].className = '';
      }
      if(btnsArr[i].textContent.toLowerCase() === this.props.location.pathname.slice(1)){
        btnsArr[i].className = 'selected';
      }
    }
  }
 
  render(){
    const data = JSON.parse(localStorage.getItem('data'));
    let planet = data[this.props.index].cells[0];
    let date = new Date(planet.date); 
    return (
      <div className="planetPage">  
        <div className={this.props.classImg + " planetImg"}></div>
        <div className="details">
          <h2>Details of {this.props.name} on  {date.toDateString()}  {planet.date.split('T')[1].slice(0,8)} :</h2>
          <h3>distance from earth:</h3>
          <p>{planet.distance.fromEarth.au} au</p>
          <p>{planet.distance.fromEarth.km} km</p>
          <h3>position:</h3>
          <h4>equatorial:</h4>
          <p>declination: {planet.position.equatorial.declination.string.replace('&', ' ')}</p>
          <p>right ascension: {planet.position.equatorial.rightAscension.string}</p>
          <h4>horizontal:</h4>
          <p>altitude: {planet.position.horizonal.altitude.string.replace('&', ' ')}</p>
          <p>azimuth: {planet.position.horizonal.azimuth.string.replace('&', ' ')}</p>
        </div>
      </div>
    );
  }
}

export default Planet;
