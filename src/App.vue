<template>
  <div id="app">
    <main-header></main-header>
    <router-view/>
  </div>
</template>

<script>
import mainHeader from './components/Header';
export default {
  name: 'App',
  components: {
    mainHeader
  },
  created() {
    if(!this.$store.getters.currentCoins[0]) {
      this.$store.dispatch('fetchCoins');
    }
    this.$store.dispatch('fetchingCoins');
  },
}
</script>

<style>
html,body,ul,li,a, header,h1,h2,h3,h4,h5,h6 {
  margin: 0;
  padding: 0;
}

body {
  background: linear-gradient(to right, #3494E6, #EC6EAD);
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
