import {Doughnut} from 'vue-chartjs'

export default {
  extends: Doughnut,
  data () {
    return {
      datacollection: {
        labels : ["January","February","March","April","May","June","July"],
		datasets : [{
			data:[1,2,4,5,6,7,8],
			backgroundColor:['#AAF5AA','#AAE0F5','#F5AAF5','#F50362','#F59003','#F52903','#9D03F5']
		}]
      }
    }
  },
  mounted () {
    this.renderChart(this.datacollection, {responsive: true, maintainAspectRatio: false})
  }
}
