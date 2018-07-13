<template>
  <div>
    <h1 class='coin-title'>{{coinName}} {{currentPrice}}$</h1>
    <div class="coin-container">
      <div class="coin-info">
        <ul class='coin-list'>
          <li class='coin-list-item'>
            <h2>
              #{{this.getInfoCoin.rank}} {{this.getInfoCoin.display_name}}
            </h2>  
          </li>
          <hr>
          <li class='coin-list-item'>{{this.getInfoCoin.cap24hrChange}}% for last 24 hours</li>
          <li class='coin-list-item'>Total Volue {{this.makePrice(this.getInfoCoin.volume)}}$</li> 
        </ul>
      </div>
      <div class='calc-vals'>
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
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'Coin',
  
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
        setUserFields(res.data.user);
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
        console.log('buy res', res);
        setUserFields(res.data.user);
      });

      this.sellUsdCount = '';
      this.sellCoinCount = '';
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

  },

  computed: {
    ...mapGetters(['userState', 'currentCoins', 'getInfoCoin']),

    coinName() {
      return this.$route.params.coin;
    },

    currentPrice() {
      const coinName = this.$route.params.coin;
      if(this.currentCoins[0])
        return this.currentCoins.find(coin => coinName === coin.short).price;
      return 
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
  min-height: 550px;
}

.stats {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  padding: 10px;
  width: 20%;
  color: white;
}

hr {
  background: white;
  height: 1px;
  border: none;
}

.coin-info {
  width: 300px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  padding: 10px;
}

.calc-vals {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  padding: 10px;
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
