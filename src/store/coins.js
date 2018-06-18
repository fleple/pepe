import axios from 'axios';
import io from "socket.io-client";

const coins = {
  state: {
    allCoins: [],
    currentCoins: []
  },
  
  mutations: {
    FETCH_COINS(state, coins) {
      state.allCoins = coins;
      state.currentCoins = coins.slice(0, 30);
    },
    REPLACE_ONE(state ,coin) {
      for(let i = 0; i < state.currentCoins.length; i++) {
        if(state.currentCoins[i].short === coin.short) {
          state.currentCoins.splice(i, 1, coin);
        }
      }
    }
  },

  actions: {
    fetchCoins({commit}) {
      axios.get('http://coincap.io/front').then(response => {
        return response.data.map(item => {
          return {
            ...item
          };
        })
      }).then(coins => {
        commit('FETCH_COINS', coins);
      });
    },
    fetchingCoins({ commit }) {
      const socket = io.connect('https://coincap.io');
      socket.on('trades', (tradeMsg) => {
        commit('REPLACE_ONE' ,tradeMsg.msg);
      });
    }
  },

  getters: {
    allCoins(state) {
      return state.allCoins;
    },
    currentCoins(state) {
      return state.currentCoins;
    }
  }
}

function makeCapCost(mktcap) {
  return mktcap.toLocaleString('en').split('.')[0].split(',').join(' ');
}

export default coins;