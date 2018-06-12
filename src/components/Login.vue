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

export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
      errors: []
    }
  },
  methods: {
    submit: function() {
      const userData = {
        name: this.name,
        email: this.email,
        password: this.password
      };
      this.errors = [];
      axios.post('/api/auth/', userData).then(res => {
        console.log('res', res);
        this.$router.push({path: '/main'});
      }).catch(err => {
        console.log('err',err);
        this.errors.push(err.response.data.error);
        console.log('login err', err.response.data);
      });

    }
  }
}
</script>

<style scoped>
.form-container {
  margin-top: 50px;
  padding: 50px;
  padding-bottom: 70px;
  width: 30%;
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
  border-radius:4px;
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
  /* color: #3494E6; */
}

p {
  color: #fff;
}
</style>