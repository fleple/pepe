<template>
  <div class='user-page'>
    <div class="user-state">
      <h2 class='user-name'>@{{userState.name}}</h2>
      <h4 class='user-cash'>{{userState.money}}$</h4>
      <hr>
      <ul>
        <li class='coin-item' v-for="(coin, index) in userState.coins" :key="index">
          <h4>{{coin.shortName}}</h4>
          <h4>{{coin.count}}</h4> 
        </li>
      </ul>
    </div>
    <div class='user-history'>
      <!-- <ul>
        <li v-for="(item, index) in userState" :key="index">{{item}}</li>
      </ul> -->
      <table class='history-table'>
        <thead>
          <tr>
            <th>Date</th>
            <th>Info</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in userState.tradeHistory" :key="item._id">
            <td>{{item.date}}</td>
            <td>{{item.info}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'userPage',
  created() {
    if(!this.userState.name) {
      this.$router.push('/');
    }
  },
  computed: {
    ...mapGetters(['userState'])
  }
};
</script>

<style>
.user-page {
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  min-height: 550px;
}

ul {
  list-style: none;
}

.user-cash {
  text-align: left;
}

.coin-item {
  display: flex;
  justify-content: space-between;
}

.user-state {
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  padding: 10px;
  padding-top: 20px;
  border-radius: 4px;
  width: 300px;
}

.user-history {
  width: 750px;
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  padding: 10px;
  border-radius: 4px;
}

.user-name {
  text-align: left;
  color: #fff;
}

.history-table {
  width: 90%;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 50px;
  table-layout: fixed;
  border-collapse: collapse;
  border: 1px solid  rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  text-transform: uppercase;
  text-align: left;
}

thead {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.3);
  font-weight: bolder;
  border-bottom: 1px solid  rgba(255, 255, 255, 0.2);
}
td, th {
  text-align: center;
  color: #fff;
  font-weight: bolder;
  padding: 15px;
}
td {
  border-bottom: 1px solid  rgba(255, 255, 255, 0.2);
  font-size: 14px;
}

hr {
  background: white;
  height: 1px;
  border: none;
}
</style>

