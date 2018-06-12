import axios from 'axios';

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
    SIGN_OUT(state) {
      state.name = state.email = state.token = '';
      state.errorsSign = errorsLogin = null;
    }
  },

  actions: {
    signIn({ commit }, userData) {
      return axios.post('/api/users', userData);
    },
    login({ commit}, userData) {
      return axios.post('/api/auth', userData);
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