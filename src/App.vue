<template>
  <div id="app">
    <MainHeader/>
    <router-view/>
  </div>
</template>

<script>
import MainHeader from './components/Header';
import { mapGetters } from 'vuex';
export default {
  name: 'App',
  components: {
    MainHeader
  },
  created() {
    const { dispatch, getters } = this.$store;
    if(!this.userState.name) {
      dispatch('initUser');
    }
    if(!getters.currentCoins[0]) {
      dispatch('fetchCoins');
    }
    dispatch('fetchingCoins');
  },
  computed: {
    ...mapGetters(['userState'])
  }
}
</script>

<style>
html,body,ul,li,a, header,h1,h2,h3,h4,h5,h6 {
  margin: 0;
  padding: 0;
}

body {
  background: linear-gradient(to right, #3494E6, #EC6EAD);
  padding-bottom: 30px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
