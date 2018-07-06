import { Line, mixins } from 'vue-chartjs';
import { mapGetters } from 'vuex';
const { reactiveProp } = mixins;

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: [ 'dataHistory' ],
  
  // data () {
  //   return {
  //     gradient: null,
  //   }
  // },

  
  mounted() {
    // this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 400);
    // this.gradient.addColorStop(0, '#683794')
    // this.gradient.addColorStop(0.5, '#E821D7');
    // this.gradient.addColorStop(1, '#22BDC5');

    this.renderChart(
      dataHistory,
      { responsive: true, maintainAspectRatio: false }
    );
    
  },

  computed: {
    ...mapGetters(['getHistory'])
  },

};
