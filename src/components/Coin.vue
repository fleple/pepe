<template>
  <div>
    <h1 class='coin-title'>{{coinName}} {{currentPrice}}$</h1>
    <div class="coin-container">
      <div class='stats'>
        <h1>@{{userState.name}}</h1>
        <hr>
        <h2>Cash:{{userState.money}}$</h2>
        <h2 v-if='!userState.coins[0]'>You havent coins yet</h2>
        <ul v-else class='list-coins'>
          <li class='single-coin' v-for="(coin, index) in userState.coins" :key="index">
            {{coin.shortName}}: {{coin.count}}
          </li>
        </ul>
      </div>
      <div class='calc-vals'>
        <div class="coins-calc">
          <input
            :placeholder="coinName"
            class='inp-val'
            type="number"
            @input="coinCountChange"
            v-model="coinCount"
          />
          <input
            placeholder="usd"
            class='inp-val'
            type="number"
            @input="usdCountChange"
            v-model="usdCount"
          />
        </div>
        <h4 class='message'>{{message}}</h4>
        <button class='btn-buy' @click='buy'>buy</button>
         <Chart :name='coinName'/>
         <button @click='reqHistory(1)'>1 day</button>
         <button @click='reqHistory(90)'>90 days</button>
         <button @click='reqHistory(180)'>180 days</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import Chart from './Chart';

export default {
  name: 'Coin',
  components: {
    Chart
  },

  data() {
    return {
      usdCount: '',
      coinCount: '',
      message: ''
    }
  },

  created() {
    this.fetchInfo(this.coinName);
  },

  methods: {
    ...mapMutations(['SET_USER']),
    ...mapActions(['fetchInfo', 'fetchHistory']),
    reqHistory(days) {
      this.fetchHistory({
        coinShort: this.coinName,
        daysNum: days
      });
    },
    coinCountChange(event) {
      this.usdCount = +this.currentPrice * +event.target.value;
      this.message = `Buy ${event.target.value} ${this.coinName} for ${this.usdCount}$`;
    },
    usdCountChange(event) {
      this.coinCount = +event.target.value / +this.currentPrice;
      this.message = `Buy ${this.coinName} on ${event.target.value}$, in sum ${this.coinCount} ${this.coinName}`;
    },
    buy() {
      const buyInfo = {
        token: localStorage.pepeCry,
        email: this.userState.email,
        usdCount: this.usdCount,
        coinName: this.coinName,
        coinCount: this.coinCount
      };
      // console.log('ending to buy', buyInfo);
      axios.post('/api/trade/buy', buyInfo).then(res => {
        console.log('buy res', res);
        this.SET_USER(res.data.user);
      });
      
      this.usdCount = '';
      this.coinCount = '';
    }
  },

  computed: {
    ...mapGetters(['userState']),
    coinName() {
      return this.$route.params.coin;
    },
    currentPrice() {
      const coinName = this.$route.params.coin;
      const { currentCoins } = this.$store.getters;
      if(currentCoins[0])
        return currentCoins.find(coin => coinName === coin.short).price;
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
  width: 1150px;
  margin: 0 auto;
  min-height: 500px;
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

.calc-vals {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  padding: 10px;
  width: 75%;
  color: white;
}

.coins-calc {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.inp-val,.btn-buy {
  display: block;
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
  width: 40%;
}

.btn-buy {
  width: 94.8%;
  margin: 0 auto;
  transition: all .3s ease;
}

.btn-buy:hover {
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.2);
}

.inp-val:focus,
.btn-buy:focus {
  outline: none;
}

input::placeholder {
  color: #ffffff;
}

.message {
  text-align-last: left;
  padding-left: 20px;
}

.list-coins {
  list-style: none;
}
.single-coin {
  text-align: center;
}

</style>
