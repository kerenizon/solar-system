import axios from 'axios';


export default axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/https://api.open-elevation.com/api/v1/lookup'
});
