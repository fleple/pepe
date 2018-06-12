<template>
  <div>
    <h1>User Page</h1>
    <ul>
      <li v-for="(item, index) in userState" :key="index">{{item}}</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'userPage',
  computed: {
    ...mapGetters(['userState'])
  }
};
</script>
