import axios from "axios";

const token = localStorage.getItem("token");

const options = {
  baseURL: "/api/",
  headers: {}
};

if (token) {
  options.headers["Authorization"] = `Bearer ${token}`;
}

export default axios.create(options);
