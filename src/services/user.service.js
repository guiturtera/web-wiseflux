import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://localhost:7010/api/v1/';

class UserService {
  getUserInfo() {
    return axios.get(API_URL + 'User/info', { headers: authHeader() });
  }
}

export default new UserService();