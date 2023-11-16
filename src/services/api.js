import axios from "axios";

const baseURL = process.env.apiUrl + "/api/v1";

const instance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
