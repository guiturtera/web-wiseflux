import api from './api'

class UserService {
  getUserInfo() {
    return api.get('User/info');
  }
  getUserNotifications() {
    return api.get('User/notifications');
  }
}

export default new UserService();