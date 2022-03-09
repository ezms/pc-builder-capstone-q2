import axios from "axios";

const api = axios.create({
  // baseURL: "http://127.0.0.1:5000",
  baseURL: "https://pc-builder-api-v2.herokuapp.com",
});

export default api;
