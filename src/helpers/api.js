import axios from "axios";

const token = localStorage.getItem("token");

const options = {
  baseURL: "http://192.168.1.27:81/api/",
  headers: {}
};

if (token) {
  options.headers["Authorization"] = `Bearer ${token}`;
}

export default axios.create(options);
