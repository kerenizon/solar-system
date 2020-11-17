import axios from 'axios';


export default axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/https://api.astronomyapi.com/api/v2/bodies/positions'
});
