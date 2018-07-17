<template>
  <div class='user-page'>
    <div class='side-bar'>
      <div class="header-state">
        <h2 class='user-name'>@{{userState.name}}</h2>
        <h4 class='user-cash'>{{userState.money}}$</h4>
      </div>
      <ul class="user-coins">
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
      <div class='money-state'>
        <h2>Total money</h2>
        <h4>{{allMoney}}$</h4>
      </div>
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
    ...mapGetters(['userState', 'currentCoins', 'allCoins']),
    allMoney() {
      let result = 0;
      if(this.userState.coins[0] && this.allCoins[0]) {
      result = this.userState.money;
        this.allCoins.forEach(coin => {
          this.userState.coins.forEach(userCoin => {
            if(coin.short === userCoin.shortName) {
              result += coin.price * userCoin.count;
            }
          });
        });
      }
      return result;
    }
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

.side-bar {
  width: 300px;
}

.header-state {
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  text-align: center;
  padding: 10px;
  box-sizing: border-box;
  margin-bottom: 20px;
}

.user-name {
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 5px;
}

.user-cash {
  padding-top: 5px;
}

.coin-item {
  display: grid;
  grid-template-columns: auto 1fr 1fr;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  transition: all .25s ease-in-out;
}

.coin-item:hover {
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.2)
}

.item-name {
  text-align: left;
  padding-left: 10px;
  padding-right: 10px;
}
.item-count {
  text-align: right;
}

.user-coins {
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  border-radius: 4px;
  width: 300px;
}

.user-coins li:last-child {
  border: none;
}

.money-state {
  margin-top: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  padding: 10px;
  border-radius: 5px;
}

.money-state h2 {
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 5px;
}

.money-state h4 {
  padding-top: 5px;
}

.user-history {
  width: 750px;
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  padding: 10px;
  border-radius: 4px;
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
  margin-bottom: 0;
}
.crypto-icon-32 {
  /* height: 32px; */
  transform: scale(0.9);
}
</style>

