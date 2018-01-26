<template>
	<div>
		<h2>{{msg}}</h2>
		<hr>
		<!-- <h3>{{$store.state.count}}</h3>
		<h3>getters:   {{count}}</h3>
		<div>
			<button  @click="add(10)">+</button>
			<button @click="reduce">-</button>
		</div>
		<div>
			<button  @click="addAction">+</button>
			<button @click="reduceAction">-</button>
		</div> -->
		<h3>{{$store.state.a.count}}</h3>
	</div>


</template>

<script>
	import store from '../store/store'
	import {mapState,mapMutations,mapGetters,mapActions} from "vuex"

	export default{
		data(){
			return{
				msg:'Hello Vuex'
			}
		},
		store,
		/*methods:{
			...mapMutations([
			'add','reduce'
			]),
			...mapActions([
			'addAction','reduceAction'
			])
		},
		computed:{
			...mapState(["count"]),
			...mapGetters(["count"])
			/*count(){
				return this.$store.getters.count;
			}*/
		/*}*/
		computed:{
			count(){
				return this.$store.state.a.count
			}
		}
	}
</script>