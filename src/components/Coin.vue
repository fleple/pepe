<template>
  <div>
    <h1>{{coinName}} {{currentPrice}}</h1>
    <div>
      {{coinName}}<input type="number" @input="coinValueChange" v-model="coinValue">
      <br>
      $<input type="number" @input="usdChange" v-model="usd">
    </div>
    <button @click='buy'>buy</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'; 

export default {
  name: 'Coin',
  data() {
    return {
      usd: 0,
      coinValue: 0
    }
  },
  methods: {
    coinValueChange(event) {
      this.usd = +this.currentPrice * +event.target.value;
    },
    usdChange(event) {
      this.coinValue = +event.target.value / +this.currentPrice;
    },
    buy() {
      this.usd = '';
      this.coinValue = ''
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
      if(currentCoins[0]) {
        let coin = currentCoins.find(coin => coinName === coin.short);
        return coin.price;
      } else {
        return 0;
      }
    }
  }
}
</script>