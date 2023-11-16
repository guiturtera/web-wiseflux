import axios from "axios";

const baseURL = process.env.apiUrl + "/api/v1";

const instance = axios.create({
  baseURL: "https://wiseflux-backend-prod.azurewebsites.net/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
