<template>
  <div>
    <h1 class='coin-title'>{{coinName}} {{currentPrice}}$</h1>
    <div class="coin-container">
      <!-- <div class="coin-info">
        <ul class='coin-list' v-if="currentInfo">
          <li class='coin-list-item'>
            <h2 class='coin-title-item'>
              #{{currentInfo.index}} {{currentInfo.long}}
              <i :class="[`crypto-icon-32-white-${coinName.toLowerCase()}` ,'crypto-icon-32 crypto-icon-32-white']"/>
            </h2>  
          </li>
          <hr>
          <li class='coin-list-item'>
            {{currentInfo.perc}}% for last 24 hours
          </li>
          <li class='coin-list-item'>
            Total Volue {{this.makePrice(currentInfo.volume)}}$
          </li> 
        </ul>
        <ul class='user-list'>
          <li>
            <h2>
              @{{userState.name}}
            </h2>
          </li>
          <hr>
          <li>{{userState.money}}$</li>
          <li v-if='currentCoinCount'>{{currentCoinCount.count}} {{coinName}}</li>
          <li v-else>0 {{coinName}}</li>
        </ul>
      </div> -->
      <CoinInfo
        :coinName='coinName'
        :info='currentInfo'
        :user='userState'
        :count='currentCoinCount'
        :infoCoin='getInfoCoin'
      />
      <div class='calc-vals' v-if='this.userState.token'>
        <div class='buy-coins'>
          <h2>Buy</h2>
          <div class="coins-calc">
            <input
              :placeholder="coinName"
              class='inp-val'
              type="number"
              @input="buyCoinCountChange"
              v-model="buyCoinCount"
            />
            <input
              placeholder="usd"
              class='inp-val'
              type="number"
              @input="buyUsdCountChange"
              v-model="buyUsdCount"
            />
            <button class='btn-trade' @click='buy'>buy</button>
            <h4 class='buy-message'>{{buyMessage}}</h4>
          </div>
        </div>
        <div class="sell-coins">
          <h2>Sell</h2>
          <div class='coins-calc'>
            <input
              :placeholder="coinName"
              class='inp-val'
              type="number"
              @input="sellCoinCountChange"
              v-model="sellCoinCount"
            />
            <input
              placeholder="usd"
              class='inp-val'
              type="number"
              @input="sellUsdCountChange"
              v-model="sellUsdCount"
            />
            <button class='btn-trade' @click='sell'>Sell</button>
            <h4 class='sell-message'>{{sellMessage}}</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import CoinInfo from './CoinInfo';

export default {
  name: 'Coin',
  components: {
    CoinInfo
  },
  data() {
    return {
      buyUsdCount: '',
      buyCoinCount: '',
      buyMessage: '',
      sellUsdCount: '',
      sellCoinCount: '',
      sellMessage: ''
    }
  },

  created() {
    this.fetchInfo(this.coinName);
  },

  methods: {
    ...mapMutations(['SET_USER', 'SET_COINS', 'SET_TRADE_HISTORY', 'SET_MONEY']),
    ...mapActions(['fetchInfo']),

    buyCoinCountChange(event) {
      if(+event.target.value < 0) {
        this.buyCoinCount = 0;
        return;
      }
      this.buyUsdCount = +this.currentPrice * +event.target.value;
      this.buyMessage = `Buy ${event.target.value} ${this.coinName} for ${this.buyUsdCount}$`;
    },

    buyUsdCountChange(event) {
      if(+event.target.value < 0) {
        this.buyUsdCount = 0;
        return;
      }
      this.buyCoinCount = +event.target.value / +this.currentPrice;
      this.buyMessage = `Buy ${this.coinName} on ${event.target.value}$, in sum ${this.buyCoinCount} ${this.coinName}`;
    },

    sellCoinCountChange(event) {
      if(+event.target.value < 0) {
        this.sellCoinCount = 0;
        return;
      }
      this.sellUsdCount = +this.currentPrice * +event.target.value;
      this.sellMessage = `Sell ${event.target.value} ${this.coinName} for ${this.sellUsdCount}$`;
    },

    sellUsdCountChange(event) {
      if(+event.target.value < 0) {
        this.sellUsdCount = 0;
        return;
      }
      this.sellCoinCount = +event.target.value / +this.currentPrice;
      this.sellMessage = `Sell ${this.sellCoinCount} ${this.coinName} to get ${event.target.value}$`;
    },

    setUserFields(userData) {
      this.SET_COINS(userData);
      this.SET_TRADE_HISTORY(userData);
      this.SET_MONEY(userData);
    },
    
    buy() {
      const buyInfo = {
        token: localStorage.pepeCry,
        email: this.userState.email,
        usdCount: this.buyUsdCount,
        coinName: this.coinName,
        coinCount: this.buyCoinCount
      };

      axios.post('/api/trade/buy', buyInfo).then(res => {
        console.log('buy res', res);
        this.setUserFields(res.data.user);
      });
      
      this.buyUsdCount = '';
      this.buyCoinCount = '';
    },

    sell() {
      const sellInfo = {
        token: localStorage.pepeCry,
        email: this.userState.email,
        usdCount: this.sellUsdCount,
        coinName: this.coinName,
        coinCount: this.sellCoinCount
      };

      axios.post('/api/trade/sell', sellInfo).then(res => {
        console.log('sell res', res);
        this.setUserFields(res.data.user);
      });

      this.sellUsdCount = '';
      this.sellCoinCount = '';
    },

    // makePrice: function(price) {
    //   console.log('price',price);
    //   let result = null;
    //   if(price) {
    //     result = price.toLocaleString('ru-RU');
    //   }
    //   if(!result.split(',')[1]) {
    //     return result + '.0000';
    //   }
    //   let currentLength = result.split(',')[1].length;
    //   if(currentLength === 3) {
    //     result += '0';
    //   } else if(currentLength === 2) {
    //     result += '00';
    //   } else if(currentLength === 1) {
    //     result += '000';
    //   } else if(currentLength === 0) {
    //     result += '0000';
    //   }
    //   return result || 'nothing';
    // },

  },

  computed: {
    ...mapGetters(['userState', 'currentCoins','allCoins' ,'getInfoCoin']),

    coinName() {
      return this.$route.params.coin;
    },

    currentPrice() {
      const coinName = this.$route.params.coin;
      if(this.allCoins[0])
        return this.allCoins.find(coin => coinName === coin.short).price;
      return
    },
    
    currentInfo() {
      const coinName = this.$route.params.coin;
      let result = null;
      for(let i = 0; i < this.allCoins.length; i++) {
        if(coinName === this.allCoins[i].short) {
          result = this.allCoins[i];
          result.index = i + 1;
          return result;
        }
      }
    },

    currentCoinCount() {
      let result = 0;
      if(this.userState) {
        result = this.userState.coins.filter(coin => {
          return coin.shortName === this.$route.params.coin;
        })[0];
      }
      console.log('currentCoinCount', result);
      return result;
    }

  }
}
</script>

<style scoped>
.coin-title {
  text-align: left;
  color: white;
  width: 1150px;
  margin: 0 auto;
}

.coin-container {
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 0 auto;
  min-height: 250px;
}

hr {
  background: white;
  height: 1px;
  border: none;
}

.coin-list,
.user-list {
  width: 300px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  padding: 10px;
  list-style: none;
  color: white;
  margin-bottom: 20px;
  font-size: 18px;
}

.coin-title-item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;  
}

.calc-vals {
  /* background-color: rgba(255, 255, 255, 0.1); */
  /* border-radius: 4px; */
  /* padding: 10px; */
  color: white;
  display: flex;
  width: 750px;
  margin: 0 auto;
  justify-content: space-between;
}

.buy-coins,
.sell-coins {
  width: 45%;
  max-width: 45%;
  padding: 10px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.1);

}

.coins-calc {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.inp-val,.btn-trade {
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
  width: 95%;
}

.btn-trade {
  transition: all .3s ease;
}

.btn-trade:hover {
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.2);
}

.inp-val:focus,
.btn-trade:focus {
  outline: none;
}

input::placeholder {
  color: #ffffff;
}

.buy-message {
  text-align-last: center;
  padding-left: 20px;
}

.list-coins {
  list-style: none;
}
.single-coin {
  text-align: center;
}

.coin-list {
  list-style: none;
  color: #fff;
}

.coin-list-item {
  font-size: 18px;
}

</style>
