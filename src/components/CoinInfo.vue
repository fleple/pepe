<template>
  <div class="coin-info">
    <ul class='coin-list'>
      <li class='coin-list-item'>
        <h2 class='coin-title-item'>
          #{{infoCoin.rank}} {{info.long}}
          <i :class="[`crypto-icon-32-white-${coinName.toLowerCase()}` ,'crypto-icon-32 crypto-icon-32-white']"/>
        </h2>  
      </li>
      <hr>
      <li class='coin-list-item'>
        {{info.perc}}% for last 24 hours
      </li>
      <li class='coin-list-item'>
        Total Volue {{this.makePrice(info.volume)}}$
      </li> 
    </ul>
    <ul class='user-list'>
      <li>
        <h2>
          @{{user.name}}
        </h2>
      </li>
      <hr>
      <li>{{user.money}}$</li>
      <li v-if='count'>{{count.count}} {{coinName}}</li>
      <li v-else>You have not any {{coinName}} :(</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CoinInfo',
  props: {
    coinName: String,
    info: Object,
    user: Object,
    count: Object,
    infoCoin: Object
  },

  methods: {
    makePrice: function(price) {
      let result = null;
      if(price) {
        result = price.toLocaleString('ru-RU');
      }
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
      return result || 'nothing';
    }
  }
}  
</script>

<style scoped>
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
</style>
