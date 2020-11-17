import React from 'react';
import astronomyApi from '../api/astronomyApi';
import api from '../api/index'
// import elevationApi from '../api/elevationApi';
import '../css/index.css';
import CanvasMap from './CanvasMap';
import ThemeToggler from './ThemeToggler';

class Homepage extends React.Component {
  constructor(props){
    super(props);
    this.dateRef = React.createRef();
    this.timeRef = React.createRef();
    
    this.state = {latitude: 0, longitude: 0, status: '',timeSelected: false, dateSelected: false, data: null, counter: 0};
  }

  setTodayDate = async () => {
    let today = new Date(); 
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); //January is 0,
    const year = today.getFullYear();
    const hours = String(today.getHours()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');
    const seconds = String(today.getSeconds()).padStart(2, '0');

    const date = `${year}-${month}-${day}`;
    const time = `${hours}:${minutes}:${seconds}`;
 
    await this.fetchFromApi(this.state.latitude, this.state.longitude, date, time);
    this.setState({status:''});
  }

  setDate = async (e) => {
    let d = new Date(e.currentTarget.value);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    const date = `${year}-${month}-${day}`;
    const time = this.timeRef.current.value;
    this.setState({dateSelected: true});

    if(this.state.timeSelected){
      await this.fetchFromApi(this.state.latitude, this.state.longitude, date, time);
      this.setState({status:''});
    } 
  }

  setTime = async (e) => {
    let timeVal = e.currentTarget.value;
    let timeArr = timeVal.split(':');
    const hours = timeArr[0];
    const minutes = timeArr[1];
    const time = `${hours}:${minutes}:00`;
    const date = this.dateRef.current.value;
    this.setState((prevState, prevProps) => { // counter for first chnaging the hours and then changing the minutes
      return {counter: prevState.counter + 1, timeSelected: true}
    })
  
    if(this.state.dateSelected && this.state.counter === 1){
      await this.fetchFromApi(this.state.latitude, this.state.longitude, date, time);
      this.setState({status:'', counter: 0});
    }
  }

  fetchFromApi = async (latitude, longitude, date, time) => {
    // elevation api was omitted because of slowness

    // const elevationRes = await elevationApi.get('',{
    //   params: { "locations": `${latitude}, ${longitude}`},
    //   headers: {
    //     "Access-Control-Allow-Credentials": "false",
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    //     "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization",
    //     "Access-Control-Max-Age": "1800"
    //   }
    // });
    // console.log(elevationRes.data.results[0].elevation);
    const response = await astronomyApi.get('', {
      params: {
        "latitude": `${latitude}`,
        "longitude": `${longitude}`,
        "elevation": 0,
        "from_date": date, 
        "to_date": date,
        "time": time
      },
      headers: {
        "Access-Control-Allow-Credentials": "false",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "Access-Control-Allow-Headers": "Origin,content-type",
        "Access-Control-Max-Age": "1800",
        
        "Authorization": "Basic MDBmZGRlYzItMGY4NS00NTAwLWFhYTQtMGQyMjM2MGE4YWJkOjI2NzI1ZjEzOTBhOTM2MjE1MmFjNTE2NjQzOWU5NDc3YmI1OWZkNmNlYjMyY2IwOTc1MWExYzczZWU2MjVmYzQzMWI3ZDYwYzA4Yjc2ZTBhM2UwOGJmOGRmNmM2MTZiZGMzYmQ3OGFkYTY2MDg5MWMxY2EzNWI5NWMyYWMyZDJiZDRhNzI4NzVmYjlhMDA4OWJjOWEwYWIyYmIyZjMzMTFjN2RiNDM4ZmFiZDNlYmY2N2VmY2RmYjU3N2JlYmNmNGUzOTJiODcwYTU1OGZiNmIzZDQ1YzFjNTA0YzdhYmYx"
      }
    });
    const result = response.data.data.table.rows;
    console.log(response);
    console.log(result);
    // localStorage.setItem('data', JSON.stringify(result));
    await api.insertData(result).then(res => {})
  }

  geoFindMe = () => {
    const success = (position) => {
      this.setState({latitude: position.coords.latitude});
      this.setState({longitude: position.coords.longitude});
    }

    function error(err) {
      this.setState({status: `you didn't give permission: ERROR(${err.code}): ${err.message}`});
    }

    if(!navigator.geolocation) {
      this.setState({status: 'Geolocation is not supported by your browser'});
    } else {
      this.setState({status: 'Locating...'});
      navigator.geolocation.getCurrentPosition(success, error);
    }   
  }

  onReset = () => {
    // localStorage.clear();
    api.deleteData();
    this.dateRef.current.value = null;
    this.timeRef.current.value = null;
    this.setState({status: `Select date and time or press: 'now'`});
  }

  componentDidMount = async () => {
    this.geoFindMe();
    this.setState({status: `Select date and time or press: 'now'`});
    await api.insertData({details: null}).then(res => {})
  }


  render(){
    return (
      <div className="homepage">
        <div className="header">
          <ThemeToggler/>
          <h1>THE SOLAR SYSTEM AROUND YOU</h1> 
          <button className="resetBtn" onClick={this.onReset}>reset</button>
        </div>
        <div className="content">
          <div className="centerSection">
            <div className="parameters">
              <p className="status">{this.state.status}</p>
              <button onClick={this.setTodayDate}>now</button> <br/>
              <label>Date:</label>  
              <input type="date" name="date" onChange={this.setDate} ref={this.dateRef}></input> 
              <label>Time:</label>  
              <input type="time" name="time" min="00:00" max="24:00" onChange={this.setTime} ref={this.timeRef}></input> <br/>
            </div>
            <CanvasMap refs={this.props.refs} dataLoaded={this.state.data} />
          </div>
          <div className="rightSection">
            <div className="rowLegend">
              <label>Sun:</label>
              <div className="sunColor planetColor"></div>
            </div>
            <div className="rowLegend">
              <label>Moon:</label>
              <div className="moonColor planetColor"></div>
            </div>
            <div className="rowLegend">
              <label>Mercury:</label>
              <div className="mercuryColor planetColor"></div>
            </div>
            <div className="rowLegend">
              <label>Venus:</label>
              <div className="venusColor planetColor"></div>
            </div>
            <div className="rowLegend">
              <label>Mars:</label>
              <div className="marsColor planetColor"></div>
            </div>
            <div className="rowLegend">
              <label>Jupiter:</label>
              <div className="jupiterColor planetColor"></div>
            </div>
            <div className="rowLegend">
              <label>Saturn:</label>
              <div className="saturnColor planetColor"></div>
            </div>
            <div className="rowLegend">
              <label>Uranus:</label>
              <div className="uranusColor planetColor"></div>
            </div>
            <div className="rowLegend">
              <label>Neptune:</label>
              <div className="neptuneColor planetColor"></div>
            </div>
            <div className="rowLegend">
              <label>Pluto:</label>
              <div className="plutoColor planetColor"></div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
