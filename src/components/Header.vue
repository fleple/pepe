<template>
  <header>
    <ul class='header-list'>
      <div class='sub-header'>
        <li>
          <router-link to='/main'>Pepe Cry</router-link>
        </li>
        <li v-if="userState.token">
          <router-link to='/profile'>Profile</router-link>
        </li>
      </div>
      <div class='sub-header'>
        <li v-if="!userState.token">
          <router-link to='/signin'>Sign In</router-link>
        </li>
        <li v-if="!userState.token">
          <router-link to='/login'>Login</router-link>
        </li>
        <li v-if="userState.token">
          <a @click="logOut">Log Out</a>
        </li>
      </div>
    </ul>
  </header>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'main-header',
  methods: {
    ...mapMutations(['LOG_OUT']),
    logOut() {
      this.$router.push('/');
      this.LOG_OUT();
    }
  },

  computed: {
    ...mapGetters(['userState'])
  }
}  
</script>

<style scoped>
header {
  box-shadow: 0px 2px 0px 0px rgba(255, 255, 255, 0.1); 
  margin-bottom: 20px;
}

.header-list {
  list-style: none;
  display: flex;
  width: 1150px;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.0);
  justify-content: space-between;
}

.sub-header {
  display: flex;
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
  font-size: 14px;
}
a:hover {
  cursor: pointer;
  box-shadow: 0px 2px 0px 0px #aa4b6b;
}

.router-link-active {
  box-shadow: 0px 2px 0px 0px #aa4b6b; 
  
}
</style>

