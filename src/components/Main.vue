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
          @click="goTo(coin.short)"
          class='row'
          v-bind:class="[coin.perc > 0 ? 'change-up' : 'change-down']">
          <td
            style="text-align:left">
            #{{index + 1}}. {{coin.long}}
            <i :class="[coin.short, 'cc']"/>
            {{coin.short}}
          </td>
          <td>${{makeCapCost(coin.mktcap)}}</td>
          <td>${{makePrice(coin.price)}}</td>
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
  methods: {
    goTo: function(coinShort) {
      this.$router.push({
        name: 'Coin',
        params: { coin: coinShort }
      });
    },
    makePrice: function(price) {
      let result = price.toLocaleString('ru-RU');
      if(!result.split(',')[1]) {
        return result + '.0000';
      }
      let currentLength = result.split(',')[1].length;
      if(currentLength === 3) {
        result += '0';
      } else if(currentLength === 2) {
        result += '00';
      } else if(currentLength === 1) {
        result += '000';
      } else if(currentLength === 0) {
        result += '0000';
      }
      return result;
    },
    makeCapCost: function(mktcap) {
      return mktcap.toLocaleString('en').split('.')[0].split(',').join(' ');
    }
  },
  computed: {
    ...mapGetters([
      'allCoins',
      'currentCoins'
    ])
  }
}
</script>

<style scoped>
.main-table {
  width: 1150px;
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

.row:hover {
  cursor: pointer;
  opacity: 0.9;
  box-shadow: 0px 0px 0px 1px #eee, 0px 0px 0px 1px #eee;
}

.change-down {
  background-color: rgba(151, 20, 20, 0.1);
}
.change-up {
  background-color: rgba(26, 226, 26, 0.1);
}
</style>

