import AuthService from '../services/auth.service';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, user) {
      return AuthService.login(user).then(
        x => {
          commit('loginSuccess', x);
          return Promise.resolve(x);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    },
    register({ commit }, user) {
      return AuthService.register(user).then(
        response => {
          commit('registerSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    },
    refreshUser({ commit }, user) {
      commit('refreshUser', user);
    }
  },
  mutations: {
    loginSuccess(state, user) {
      state.user = user;
      state.status.loggedIn = true;
    },
    loginFailure(state) {
      state.user = null;
      state.status.loggedIn = false;
    },
    logout(state) {
      state.user = null;
      state.status.loggedIn = false;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    },
    refreshUser(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    }
  }
};