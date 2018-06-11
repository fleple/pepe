import axios from 'axios';

const user = {
  state: {
    name: '',
    email: '',
    token: '',
    errorsSign: [],
    errorsLogin: []
  },

  mutations: {
    SIGNIN(state, user) {
      state.name = user.name;
      state.email = user.email;
      state.token = user.token;
    },
    SIGNIN_ERRORS(state, errors) {
      state.errors = errors;
    }
  },

  actions: {
    signIn({ commit }) {
      axios.post('/api/users/', user).then(res => {
        commit('SIGNIN', res.data.user);
      }).catch(err => {
        commit('SIGNIN_ERRORS', err.response.data);
      });
    }
  },

  getters: {
    getUser(state) {
      return {
        name: state.name,
        email: state.email,
        token: state.token
      };
    },
    getErrorsSign(state) {
      return state.errorsSign;
    }
  }
}

export default user;