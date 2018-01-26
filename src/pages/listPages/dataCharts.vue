<template>
	<div class="dataCharts">
 		<div class="leftChart">
 			<div class="typeVisit">
	 			<bar-chart :options="{responsive: false, maintainAspectRatio: false}" :height="280"></bar-chart>
	 			<p>各类文章访问量</p>
	 		</div>
	 		<div class="typeChart">
	 			<doughnut-chart :options="{responsive: false, maintainAspectRatio: false}" :height="280"></doughnut-chart>
	 			<p>各类文章发布</p>
	 		</div>
 		</div>
 		<div class="rightChart">
 			<div class="RadarChart">
 				<radar-chart></radar-chart>
 				<p>各类文章预览趋势</p>
 			</div>
 		</div>
	</div>
</template>




<script>
	import BarChart from '../../components/BarChart.js'
	import DoughnutChart from '../../components/DoughnutChart.js'
	import RadarChart from '../../components/RadarChart.js'
	 export default {
    
      components: {
        BarChart,
        DoughnutChart,
        RadarChart
      }
      
    }
</script>

<style>
	.dataCharts{
		width: 100%;
		height: 100%;
		background: #ffffff;
	}
	.typeVisit{
		width: 500px;
	}
	.typeVisit p{
		width: 100%;
		text-align: center;
		font-weight: 600
	}
	.leftChart{
		width: 50%;
		float: left;
	}
	.rightChart{
		width: 50%;
		float: right;
	}
	.typeChart{
		width: 500px;
	}
	.typeChart p{
		width: 100%;
		text-align: center;
		font-weight: 600
	}
	.RadarChart{
		margin-top: 100px;
		margin-right: 100px;
	}
	.RadarChart p{
		width: 100%;
		text-align: center;
		font-weight: 600;
		margin-top: 20px;
	}
</style>
