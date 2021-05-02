import axios from "axios";

const token = localStorage.getItem("token");

const options = {
  baseURL: "https://labkom-api.herokuapp.com",
  headers: {}
};

if (token) {
  options.headers["Authorization"] = `Bearer ${token}`;
}

export default axios.create(options);
