<template>
  <header>
    <ul>
      <li>
        <router-link to='/main'>Pepe Cry</router-link>
      </li>
      <li v-if="userState.token">
        <router-link to='/user'>{{userState.name || 'username'}}</router-link>
      </li>
      <li v-if="!userState.token">
        <router-link to='/signin'>Sign In</router-link>
      </li>
      <li v-if="!userState.token">
        <router-link to='/login'>Login</router-link>
      </li>
      <li v-if="userState.token">
        <a @click="LOG_OUT">Log Out</a>
      </li>
    </ul>
  </header>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
  name: 'main-header',
  methods: {
    ...mapMutations(['LOG_OUT'])
  },
  computed: {
    ...mapGetters([
      'userState'
    ])
  }
}  
</script>

<style scoped>
header {
  box-shadow: 0px 2px 0px 0px rgba(255, 255, 255, 0.1); 
  margin-bottom: 50px;
}

ul {
  list-style: none;
  display: flex;
  width: 1200px;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.0);
}

li {
  width: 150px;
  background-color: rgba(255, 255, 255, 0.0);
}

a {
  transition: all .25s ease-in-out;
  text-transform: uppercase;
  font-weight: bolder;
  padding: 15px;
  display: block;
  width: 100%;
  text-align: center;
  color: #fff;
  text-decoration: none;
}
a:hover {
  cursor: pointer;
  box-shadow: 0px 2px 0px 0px #aa4b6b; 
}

.router-link-active {
  box-shadow: 0px 2px 0px 0px #aa4b6b; 
}
</style>

