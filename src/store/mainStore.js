import Vue from 'vue'
import Vuex from 'vuex';

import coins from './coins';
import user from './user';
import singleCoin from './singleCoin';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    coins,
    user,
    singleCoin
  }
});

export default store;