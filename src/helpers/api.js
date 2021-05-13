import axios from "axios";

const options = {
  baseURL: "https://labkom-api.herokuapp.com",
  headers: {}
};

export default axios.create(options);
