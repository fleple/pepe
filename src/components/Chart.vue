<script>
import { Line } from 'vue-chartjs';
import { mapGetters } from 'vuex';

export default {
  extends: Line,
  props: [ 'name' ],
  
  data () {
    return {
      gradient: null  
    }
  },
  
  created() {
    this.$store.dispatch('fetchHistory', { coinShort: this.name,daysNum: 180});
  },

  mounted () {
    this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 400);
    this.gradient.addColorStop(0, 'rgba(255, 0,0, 0.5)')
    this.gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.25)');
    this.gradient.addColorStop(1, '#ff0000');

    this.renderChart({
      labels: this.getHistory.labels,
      datasets: [{
        label: this.$props.name,
        borderColor: '#FC2525',
        pointBackgroundColor: 'transparent',
        borderWidth: 0.1,
        pointBorderColor: 'transparent',
        backgroundColor: this.gradient,
        data: this.getHistory.prices
      }]
    }, {responsive: true, maintainAspectRatio: false});
    
  },

  updated() {
    console.log('updated')
  },
  beforeUpdated() {
    console.log('before updated')
  },

  computed: {
    ...mapGetters(['getHistory'])
  },

};


</script>

