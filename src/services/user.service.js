import api from './api'

class UserService {
  getUserInfo() {
    return api.get('User/info');
  }
}

export default new UserService();