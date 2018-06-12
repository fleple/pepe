import axios from 'axios';
import decode from 'jwt-decode';

const user = {
  state: {
    name: '',
    email: '',
    token: '',
  },

  mutations: {
    SET_USER(state, user) {
      state.name = user.name;
      state.email = user.email;
      state.token = user.token;
    },
    LOG_OUT(state) {
      state.name = state.email = state.token = '';
      localStorage.pepeCry = '';
    },
    SET_IN_LOCAL_STORAGE(state) {
      localStorage.pepeCry = state.token;
    }
  },

  actions: {
    signIn({ commit }, userData) {
      return axios.post('/api/users', userData);
    },
    login({ commit }, userData) {
      return axios.post('/api/auth', userData);
    },
    initUser({ commit }) {
      let userData = {
        ...decode(localStorage.pepeCry),
        token: localStorage.pepeCry
      };
      commit('SET_USER', userData);
    }
  },

  getters: {
    userState(state) {
      return {
        name: state.name,
        email: state.email,
        token: state.token
      };
    }
  }
}

export default user;