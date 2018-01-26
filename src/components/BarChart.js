import {Bar} from 'vue-chartjs'

export default {
  extends: Bar,
  data () {
    return {
      datacollection: {
        labels : ["January","February","March","April","May","June","July"],
		datasets : [
			{
				label:"A",
				backgroundColor : "#AAE0F5",
				data : [65,59,90,81,56,55,40]
			},{
				label:"B",
				backgroundColor : "#AAF5AA",
				data : [18,8,40,12,96,21,100]
			},
			{
				label:"C",
				backgroundColor : "#F5AAF5",
				data : [28,48,30,19,21,27,80]
			}

		]
      }
    }
  },
  mounted () {
    this.renderChart(this.datacollection, {responsive: true, maintainAspectRatio: false})
  }
}
