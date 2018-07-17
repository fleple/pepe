<template>
  <div>
    <form class='form-search' @submit.prevent='searchCoins'>
      <input
        class='coin-search'
        type="text"
        placeholder="Coin"
        @input='setSearchCoin'
      />
      <button class='btn-search' @click="searchCoins">Search</button>
    </form>
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
          :class="[coin.perc > 0 ? 'change-up' : 'change-down']">
          <td
            style="text-align:left">
            <span>#{{index + 1}}.</span>
            <span>
              <i :class="[`crypto-icon-32-white-${coin.short.toLowerCase()}` ,'crypto-icon-32 crypto-icon-32-white']"/>
            </span>
            <span>
             {{coin.long}}
            </span>
          </td>
          <td>${{makeCapCost(coin.mktcap)}}</td>
          <td>${{makePrice(coin.price)}}</td>
          <td>{{coin.perc}}%</td>
        </tr>
      </tbody>
    </table>
    <button class="more-coins" @click='ADD_COINS'>More coins</button>
  </div>
</template>

<script>
import { mapMutations ,mapGetters } from 'vuex';

export default {
  name: 'Main',
  data() {
    return {
      coinSearch: ''
    }
  },

  methods: {
    ...mapMutations(['ADD_COINS', 'SEARCH_COINS']),
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
    },
    setSearchCoin(event) {
      this.coinSearch = event.target.value;
    },
    searchCoins(event) {
      this.SEARCH_COINS(this.coinSearch);
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
.form-search {
  display: flex;
  width: 400px;
  align-items: cener;
  justify-content: center;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  padding: 10px;
}


.coin-search,
.btn-search {
  display: block;
  box-sizing: border-box;
  padding: 10px;
  border: none;
  font-size: 14px;
  font-weight: bolder;
  text-transform: uppercase;
  background-color: transparent;
  border: 1px solid #ffffff;
  color: #ffffff;
  transition: all .25s ease-in-out;
  border-radius: 4px;
  width: 300px;
  text-align: center;
  transition: all .25s ease-in-out;
}

.coin-search {
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}
.btn-search {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  width: 100px;
  border-left: none;
}

.btn-search:hover {
  background-color: rgba(255, 255, 255, 0.2);
  cursor: pointer;
}

input::placeholder {
  color: #ffffff;
  text-align: center;
}

.coin-search:focus,
.btn-search:focus {
  outline: none;
}

.main-table {
  width: 1150px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 30px;
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
  font-size: 14px;
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

.crypto-icon-32 {
  transform: translateY(8px) scale(0.9);
}

.more-coins {
  display: block;
  box-sizing: border-box;
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
  border-radius: 4px;
  width: 20%;
  margin: 0 auto;
}

.more-coins:hover {
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.2);
}

.more-coins:focus {
  outline: none;
}
</style>

