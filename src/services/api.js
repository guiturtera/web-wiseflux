import axios from "axios";

const baseURL = process.env.apiUrl

const instance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
