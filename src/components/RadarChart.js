import {Radar} from 'vue-chartjs'

export default {
  extends: Radar,
  data () {
    return {
      datacollection: {
        labels : ["January","February","March","April","May","June","July"],
    		datasets : [{
            label:"A",
            borderColor : "#AAE0F5",
            data : [15,59,90,81,56,55,49],
            backgroundColor:'rgba(170,224,245,0.5)'
          },{
            label:"B",
            borderColor : "#AAF5AA",
            data : [28,8,40,12,96,21,100],
            backgroundColor:'rgba(170,225,170,0.5)'
          },
          {
            label:"C",
            borderColor : "#F5AAF5",
            data : [68,48,30,19,21,27,20],
            backgroundColor:'rgba(245,170,245,0.5)'
        }]
      }
    }
  },
  mounted () {
    this.renderChart(this.datacollection, {responsive: true, maintainAspectRatio: false})
  }
}
