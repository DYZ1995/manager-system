// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VRouter from 'vue-router'
import VResource from 'vue-resource'
import MainFrame from './components/mainFrame'

import LoginPage from './pages/login'
import IndexPage from './pages/index'

import { DatePicker,Pagination,Input,Select,Option } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

 Vue.use(DatePicker)
 Vue.use(Pagination)
 Vue.use(Input)
  Vue.use(Select)
   Vue.use(Option)

 let ElInpur=Input
 let ElSelect=Select
 let ElOption=Option

//富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

/*import CountPage from './components/count'*/
import store from './store/store'


Vue.use(VRouter)
Vue.use(VResource)
Vue.use(VueQuillEditor)

let router=new VRouter({
	mode:'history',
	routes:[
		{
			path:'/',
			component:LoginPage
		},
		{
			name:'index',
			path:'/index',
			component:IndexPage
			
		}
		/*{
			path:'/count',
			component:CountPage
		}*/
	]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<MainFrame/>',
  components: { MainFrame }
})
