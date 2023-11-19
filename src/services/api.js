import axios from "axios";

console.log(import.meta.env.VITE_APP_API_URL)
//const baseURL = process.env.VUE_APP_API_URL + "/api/v1";S
const baseURL = import.meta.env.VITE_APP_API_URL + "/api/v1";

const instance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
