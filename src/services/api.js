import axios from "axios";

const api = axios.create({
  baseURL: "https://pc-builder-api-v2.herokuapp.com",
});

export default api;
