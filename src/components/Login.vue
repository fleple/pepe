<template>
  <div class='form-container'>
    <h1>Login</h1>
    <form @submit.prevent="submit">
      <input autocomplete="email" type="email" v-model="email" placeholder='email'>
      <input autocomplete type="password" v-model="password" placeholder='Password'>
      <input class='btn-submit' type='submit' value='submit'/>
    </form>
    <p v-for="error in errors" :key="error">{{error}}</p>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
      errors: null
    }
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    ...mapMutations([
      'SET_USER',
      'SET_IN_LOCAL_STORAGE'
    ]),
    submit: function() {
      const userData = {
        email: this.email,
        password: this.password
      };

      this.login(userData).then(res => {
        this.SET_USER(res.data.user);
        this.SET_IN_LOCAL_STORAGE();
        this.$router.push('/profile');
      }).catch(err => {
        this.errors = err.response.data;
      });
    }
  },
  computed: {
    ...mapGetters([
      'userState'
    ])
  }
}
</script>

<style scoped>
.form-container {
  margin-top: 50px;
  padding: 50px;
  padding-bottom: 70px;
  width: 350px;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}
h1 {
  color: #ffffff;
  margin-bottom: 20px;
  margin-top: 50px;
  text-transform: uppercase;
}
form {
  display: flex;
  flex-direction: column;
}

input {
  display: block;
  padding: 15px;
  border: none;
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: bolder;
  text-transform: uppercase;
  background-color: transparent;
  border: 1px solid #ffffff;
  color: #ffffff;
  transition: all .25s ease-in-out;
  border-radius: 4px;
}

input::placeholder {
  color: #ffffff;
}

input:focus,
button:focus {
  outline: none;
}
.btn-submit:hover {
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.2);
}

p {
  color: #fff;
}
</style>