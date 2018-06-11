import axios from 'axios';
import io from "socket.io-client";

function makeCapCost(mktcap) {
  return mktcap.toLocaleString('en').split('.')[0].split(',').join(' ');
}

function makePrice(price) {
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
}

const coins = {
  state: {
    allCoins: [],
    currentCoins: []
  },
  
  mutations: {
    FETCH_COINS(state, coins) {
      state.allCoins = coins;
    },
    REPLACE_ONE(state ,coin) {
      // state.allCoins.find(currentCoin => currentCoin.short === coin.short);
      for(let i = 0; i < state.allCoins.length; i++) {
        if(state.allCoins[i].short === coin.short) {
          state.allCoins.splice(i, 1, coin);
        }
      }
    }
  },

  actions: {
    fetchCoins({commit}) {
      axios.get('http://coincap.io/front').then(response => {
        return response.data.map(item => {
          return {
            ...item,
            mktcap: makeCapCost(item.mktcap),
            price: makePrice(item.price),
            active: false
          };
        })
      }).then(coins => {
        commit('FETCH_COINS', coins);
      });
    },
    fetchingCoins({ commit }) {
      const socket = io.connect('https://coincap.io');
      socket.on('trades', (tradeMsg) => {
        commit('REPLACE_ONE' ,{
          ...tradeMsg.msg,
          mktcap: makeCapCost(tradeMsg.msg.mktcap),
          price: makePrice(tradeMsg.msg.price),
          active: true
         });
      });
    }
  },

  getters: {
    allCoins(state) {
      return state.allCoins;
    },
    currentCoins(state) {
      return state.allCoins.slice(0, 30);
    }
  }
}

export default coins;