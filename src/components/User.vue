<template>
  <div class='user-page'>
    <div class="user-state">
      <h2 class='user-name'>@{{userState.name}}</h2>
      <h4 class='user-cash'>{{userState.money}}$</h4>
      <hr>
      <ul>
        <li
          class='coin-item'
          v-for="(coin, index) in userState.coins"
          :key="index"
          v-if="coin.count > 0"
          @click="goToCoin(coin.shortName)"
          >
          <h4 class='item-icon'>
            <i :class="[`crypto-icon-32-white-${coin.shortName.toLowerCase()}` ,'crypto-icon-32 crypto-icon-32-white']"/>
          </h4>
          <h4 class='item-name'>
            <span>{{coin.shortName}}</span>
          </h4>
          <h4 class='item-count'>{{coin.count}}</h4> 
        </li>
      </ul>
    </div>
    <div class='user-history'>
      <table class='history-table'>
        <thead>
          <tr>
            <th>Date</th>
            <th>Info</th>
            <th>Current</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in userState.tradeHistory" :key="item._id">
            <td>{{item.date}}</td>
            <td>{{item.info}}</td>
            <td>{{ getPriceByName(item.info)}}$</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'userPage',
  created() {
    if(!this.userState.name) {
      this.$router.push('/');
    }
  },
  
  methods: {
    getCoinName(info) {
      return info.split(' ')[2];
    },
    getPriceByName(info) {
      const coinName = info.split(' ')[2];
      const coin = this.currentCoins.filter(coin => coin.short === coinName)[0];
      if(coin) {
        return coin.price;
      }
      return 'nothing';
    },
    goToCoin(coinName) {
      this.$router.push({
        name: 'Coin',
        params: { coin: coinName }
      });
    }
  },

  computed: {
    ...mapGetters(['userState', 'currentCoins'])
  }
};
</script>

<style>

.user-page {
  width: 90%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 2fr;
  justify-content: space-between;
}

ul {
  list-style: none;
  font-size: 14px;
}

.user-cash {
  text-align: left;
}

.coin-item {
  display: grid;
  grid-template-columns: auto 1fr 1fr;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 5px;
  transition: all .25s ease-in-out;
}

.coin-item:hover {
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.2)
}

.item-name {
  text-align: left;
  padding-left: 5px;
}
.item-count {
  text-align: right;
}

.user-state {
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  padding: 10px;
  padding-top: 20px;
  border-radius: 4px;
  width: 300px;
}

.user-history {
  width: 750px;
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  padding: 10px;
  border-radius: 4px;
}

.user-name {
  text-align: left;
  color: #fff;
}

.history-table {
  width: 90%;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 50px;
  table-layout: fixed;
  border-collapse: collapse;
  border: 1px solid  rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  text-transform: uppercase;
  text-align: left;
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
  font-size: 14px;
}

hr {
  background: white;
  height: 1px;
  border: none;
}
.crypto-icon-32 {
  /* height: 32px; */
  transform: scale(0.9);
}
</style>

