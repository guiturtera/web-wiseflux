import api from "./api";

class AuthService {
  login(user) {
    return api
      .post('Auth/login', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        let res = response.data.response
        if (res) {
          localStorage.setItem('user', JSON.stringify(res));
        }
      
        return response.data.response;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return api.post('User/add', {
      email: user.email,
      username: user.username,
      phoneNumber: user.phoneNumber,
      role: user.role,
      password: user.password
    });
  }

  refreshToken(tokens) {
    return api
      .post('Auth/refresh', {
        token: tokens.token,
        refreshToken: tokens.refreshToken
      })
      .then(response => {
        let res = response.data.response
        if (res) {
          localStorage.setItem('user', JSON.stringify(res));
        }
      
        return response.data.response;
      });
  }
}

export default new AuthService();