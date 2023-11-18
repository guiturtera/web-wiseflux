import axios from "axios";

// const baseURL = 'https://localhost:7010/api/v1'//process.env.apiUrl + "/api/v1";
const baseURL = process.env.VUE_APP_API_URL + "/api/v1";

const instance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
