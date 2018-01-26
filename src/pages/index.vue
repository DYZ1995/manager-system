<template>
	<div class="indexPage" id="indexPage" :style="{height:navHeight}">
		<div class="indexTop">
			<p>
				<img class="userPhoto" :src="photo" alt="">
				<span class="username">{{username}}</span>&nbsp;&nbsp;<span class="userRole">{{role}}</span>
			</p>
			<span class="exitBtn" @click="exitBtn">退出</span>
		</div>

		<div class="index-left" >
			<ul class="nav-ul">

				<li v-for="navContent in navContents" :class="{changedColor:activeName==navContent||navContent.isCheck==true}" @click="navClick(navContent)" 
				@mouseenter="navHover(navContent)"
				@mouseleave="navHoverLeave(navContent)"
				><img class="listIcon" :src="navContent.iconUrl" alt="">{{navContent.content}}</li>
			</ul>
		</div>
		<div class="index-right" :style="{width:rightWidth}">
			<text-editor v-if="pageType==1"></text-editor>
			<text-sent v-if="pageType==2"></text-sent>
			<text-list v-if="pageType==3"></text-list>
			<text-manager v-if="pageType==4"></text-manager>
			<my-message v-if="pageType==5"></my-message>
			<data-charts v-if="pageType==6"></data-charts>
			<visit-charts v-if="pageType==7"></visit-charts>
			<user-info v-if="pageType==8"></user-info>
		</div>
		<my-dialog :is-show="exitDialog" @on-close="closeExitDialog()" @yes-btn="exitSystem">
			确认退出吗？
		</my-dialog>
	</div>
</template>

<script>
	import store from '../store/store'

	import myDialog from '../components/dialog'
	

	//列表组件
	import textEditor from './listPages/textEditor'
	import textSent from './listPages/textSent'
	import textList from './listPages/textList'
	import textManager from './listPages/textManager'
	import myMessage from './listPages/message'
	import dataCharts from './listPages/dataCharts'
	import visitCharts from './listPages/visitCharts'
	import userInfo from './listPages/userInfo'

	
	export default{
		components:{
			myDialog,
			textEditor,
			textSent,
			textList,
			textManager,
			myMessage,
			dataCharts,
			visitCharts,
			userInfo
		},
		data(){
			return{
				username:"",
				role:"",
				photo:"",
				navHeight:"",
				navContents:[],
				activeName:"",
				exitDialog:false,
				liIcon:"",
				pageType:1,
				rightWidth:""

			}
		},
		methods:{

		},
		mounted:function(){
			console.log('保存',sessionStorage.userId)
			console.log('保存',this.$route.params.userId)
			var userId=""
			if(this.$route.params.userId!=""&&this.$route.params.userId!=undefined){
				userId=this.$route.params.userId
			}else{
				userId=sessionStorage.userId
			}
			
			console.log("userId",userId)
			this.$http({
				method:'POST',
				url:"https://www.easy-mock.com/mock/5a0e5457ec27b206e2af042f/localhost:8081/userInfo?userId="+userId
			}).then((res)=>{
				this.username=res.body.data.userInfo.name
				if(res.body.data.userInfo.role=='admin'){
					this.role='管理员'
				}else if(res.body.data.userInfo.role=='general'){
					this.role='普通用户'
				}
				this.photo=res.body.data.userInfo.photo
				const role=res.body.data.userInfo.role
				console.log('role',role)
				if(role!=""||role!=undefined){
					this.$http({
					method:'POST',
					url:"https://www.easy-mock.com/mock/5a0e5457ec27b206e2af042f/localhost:8081/getNavList?role="+role
					}).then((res)=>{
						this.navContents=res.body.data.navList
					},(err)=>{
						console.log('err')
					})
				}
				
			},(err)=>{
				console.log('err')
			})


			 // 动态设置背景图的高度为浏览器可视区域高度
		    
		    // 首先在Virtual DOM渲染数据时，设置下背景图的高度．
		    let height=`${document.documentElement.clientHeight}`;
		    console.log('height',height)
		    this.navHeight = height+"px";
		    let width=`${document.documentElement.clientWidth}`;
		     console.log('width',width)
		    this.rightWidth = (width-160)+"px";
		    // 然后监听window的resize事件．在浏览器窗口变化时再设置下背景图高度．
		    const that = this;
		    window.onresize = function temp() {
		    	let height=`${document.documentElement.clientHeight}`;
		        that.navHeight = height+"px";
		        let width=`${document.documentElement.clientWidth}`;
		        console.log('width',width)
		    	this.rightWidth = (width-160)+"px";
		    	console.log('rightWidth',rightWidth)
		    };
		},
		methods:{
			navClick(elem){
				//点击样式
				this.navContents.forEach( function(item, index) {
					if(item.isCheck==true){
						item.isCheck=false
					}
				});
				this.activeName=elem.content
				elem.isCheck=!elem.isCheck
				//跳转组件

				if(elem.content=='文章编辑'){
					this.pageType=1
				}else if(elem.content=='文章发布'){
					this.pageType=2
				}else if(elem.content=='文章列表'){
					this.pageType=3
				}else if(elem.content=='文章管理'){
					this.pageType=4
				}else if(elem.content=='留言管理'){
					this.pageType=5
				}else if(elem.content=='数据统计'){
					this.pageType=6
				}else if(elem.content=='浏览统计'){
					this.pageType=7
				}else if(elem.content=='个人信息'){
					this.pageType=8
				}


			},
			navHover(elem){
				this.activeName=elem
			},
			navHoverLeave(elem){
				this.activeName=""
			},
			exitBtn(){
				this.exitDialog=true
				//this.$router.push('/')
			},
			closeExitDialog(){
				this.exitDialog=false
			},
			exitSystem(){
				this.$router.push('/');
				this.exitDialog=false
			}
		}
	}
</script>   

<style>	

	.index-left{
		width: 160px;
		height: 100%;
		float: left;
		background: #212D3D;
	}
	.nav-ul{
		display: block;
		color: #ffffff
	}
	.nav-ul li{
		display: block;
		height: 50px;
		line-height: 50px;
		cursor: pointer;
		text-align: center;
	}
	.changedColor{
		background:rgba(114,162, 180, 0.5);

	}
	.indexTop{
		width: 100%;
		height: 50px;
		background: #001629;
		color: #ffffff;
		line-height: 50px;
	}
	.userPhoto{
		width: 38px;
		height: 38px;
		border-radius: 50%;
		margin-top: 5px;
	}
	.indexTop p{
		float: left;
		margin-left: 10px;
	}
	.exitBtn{
		display: block;
		float: right;
		margin-right: 20px;
		cursor: pointer;
	}
	.listIcon{
		width: 23px;
		display: inline-block;
		margin-top: 13px;
		margin-right: 20px;
	}
	.index-right{
		float: right;
		height: 100%;
	}
</style>