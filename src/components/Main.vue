<template>
  <div>
    <table class='main-table'>
      <thead>
        <tr>
          <th style="text-align:left">Coin Name</th>
          <th>Volume</th>
          <th>Price</th>
          <th>Percent</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(coin, index) in currentCoins"
          :key="coin.short"
          class='row'
          v-bind:class="[coin.perc > 0 ? 'change-up' : 'change-down']">
          <td
            style="text-align:left">
            #{{index + 1}}. {{coin.long}}
            <i v-bind:class="[coin.short, 'cc']"/>
            <router-link class='link-coin' :to='{ path: `coins/${coin.short}` }'>{{coin.short}}</router-link>
          </td>
          <td>${{coin.mktcap}}</td>
          <td>${{coin.price}}</td>
          <td>{{coin.perc}}%</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Main',
  // created() {
  //   if(!this.$store.getters.currentCoins[0]) {
  //     this.$store.dispatch('fetchCoins');
  //   }
  //   this.$store.dispatch('fetchingCoins');
  // },
  computed: {
    allCoins() {
      return this.$store.getters.allCoins;
    },
    currentCoins() {
      return this.$store.getters.currentCoins;
    }
  }
}
</script>

<style scoped>
.main-table {
  width: 90%;
  margin: 0 auto;
  margin-top: 50px;
  margin-bottom: 50px;
  table-layout: fixed;
  border-collapse: collapse;
  border: 1px solid  rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  text-transform: uppercase;
}
thead {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.3);
  font-weight: bolder;
  border-bottom: 1px solid  rgba(255, 255, 255, 0.2);
}
td, th {
  text-align: center;
  color: #fff;
  font-weight: bolder;
  padding: 15px;
}
td {
  border-bottom: 1px solid  rgba(255, 255, 255, 0.2);
}

.link-coin {
  text-transform: none;
  text-decoration: none;
  color: #fff;
}

.change-down {
  background-color: rgba(151, 20, 20, 0.2);
}
.change-up {
  background-color: rgba(26, 226, 26, 0.2);
}
</style>

