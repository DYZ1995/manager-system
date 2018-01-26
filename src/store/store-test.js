import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state={
	count:1
}

const mutations={
	add(state,n){
		state.count+=n
	},
	reduce(state){
		state.count-=1
	}
}

const getters={
	count:function(state){
		return state.count+=100;
	}
}

const actions={
	addAction(context){
		context.commit('add',10)//context上下文对象，可以理解为store本身
		setTimeout(()=>{context.commit('reduce')},3000)
		console.log('我比reduce先执行')
	},
	reduceAction({commit}){//{commit}:直接把commit对象传递过来，可以让方法体逻辑和代码更清晰明了
		commit('reduce')

	}
	
}

const moduleA={
	state,mutations,getters,actions
}

export default new Vuex.Store({
	/*state,mutations,getters,actions*/
	modules:{a:moduleA}
})

