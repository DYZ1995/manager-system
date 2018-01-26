import Vue from 'vue'
import Vuex from 'Vuex'

Vue.use(Vuex)

const state={
	userId:''
}

const mutations={
	saveUserId(state,userId){
			state.userId=userId
	}
}

export default new Vuex.Store({
		state,mutations
})