import axios from 'axios';

const API_URL = 'https://localhost:7010/api/v1/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'Auth/login', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        let res = response.data.response
        if (res) {
          localStorage.setItem('user', JSON.stringify(res));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'User/add', {
      email: user.email,
      username: user.username,
      phoneNumber: user.phoneNumber,
      role: user.role,
      password: user.password
    });
  }
}

export default new AuthService();