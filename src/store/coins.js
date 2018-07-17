import axios from 'axios';
import io from "socket.io-client";

const coins = {
  state: {
    allCoins: [],
    currentCoins: [],
    step: 15,
    offset: 30
  },
  
  mutations: {
    FETCH_COINS(state, coins) {
      state.allCoins = coins;
      state.currentCoins = coins.slice(0, state.offset);
    },
    REPLACE_ONE(state ,coin) {
      for(let i = 0; i < state.currentCoins.length; i++) {
        if(state.currentCoins[i].short === coin.short) {
          state.currentCoins.splice(i, 1, coin);
        }
      }
    },
    ADD_COINS(state) {
      state.currentCoins.push(...state.allCoins.splice(state.offset, state.step));
      state.offset += state.step;
    },
    SEARCH_COINS(state, word) {
      if(word !== '') {
        const val = word.toUpperCase();
        state.currentCoins = state.allCoins.filter(coin => coin.long.startsWith(val) || coin.short.startsWith(val));
      } else {
        state.currentCoins = state.allCoins.slice(0, state.offset);
      }
    }
  },

  actions: {
    fetchCoins({commit}) {
      axios.get('http://coincap.io/front').then(response => {
        commit('FETCH_COINS', response.data);
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

export default coins;