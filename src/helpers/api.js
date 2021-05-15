import axios from "axios";

const options = {
  baseURL: "https://labkom-api.herokuapp.com",
  // baseURL: "http://192.168.1.17:81",
  headers: {}
};

export default axios.create(options);
