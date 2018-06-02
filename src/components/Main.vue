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
        <tr v-for="(coin, index) in currentCoins" :key="coin.short" v-bind:class="{changed: coin.active}">
          <td
            style="text-align:left">
            #{{index + 1}}. {{coin.long}}
            <i v-bind:class="[coin.short, 'cc']"/>
            {{coin.short}}
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
  created() {
    if(!this.$store.getters.currentCoins[0]) {
      this.$store.dispatch('fetchCoins');
    }
    this.$store.dispatch('fetchingCoins');
  },
  computed: {
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

.changed {
  background-color: rgba(255, 255, 255, 0.3);
}
</style>

