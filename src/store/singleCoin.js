import axios from 'axios';

const singleCoin = {
  state: {
    coinName: '',
    currentCoinInfo: {},
    history: {
      prices: [],
      labels: []
    }
  },

  mutations: {
    SET_INFO(state, infoCoin) {
      state.currentCoinInfo = infoCoin;
    },
    SET_HISTORY(state, hist) {
      const {labels, prices} = makeLabsAndPrices(hist);
      state.history = {
        labels, prices
      }
    }
  },

  actions: {
    fetchInfo({ commit }, coinShort) {
      axios.get(`http://coincap.io/page/${coinShort}`).then(res => {
        commit('SET_INFO', res.data);
      });
    },
    fetchHistory({ commit }, { daysNum, coinShort }) {
      // console.log('req his', daysNum, coinShort);
      axios.get(`http://coincap.io/history/${daysNum}day/${coinShort}`).then(res => {
        commit('SET_HISTORY', res.data.price);
      });
    }
  },

  getters: {
    getHistory(state) {
      return state.history;
    }
  }
}

function makeLabsAndPrices(arr) {
  const labels = [];
  const prices = [];
  for(let i = 0; i < arr.length; i++) {
    labels.push(arr[i][0]);
    prices.push(arr[i][1]);
  }
  return {
    labels,
    prices
  };
}

export default singleCoin;