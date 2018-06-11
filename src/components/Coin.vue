<template>
  <h1>hello {{coinName}} {{currentPrice}}</h1>
</template>

<script>
export default {
  name: 'Coin',
  computed: {
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