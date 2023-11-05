import axios from "axios";

const instance = axios.create({
  baseURL: "http://20.206.168.139/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;