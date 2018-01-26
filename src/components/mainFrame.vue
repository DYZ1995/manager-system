<template>
  <div>
    <router-view @userSignIn="userSignIn"></router-view>
  </div>
</template>


<script>
	// import store from '../store/store'
	export default{
		data(){
			return{
				userId:sessionStorage.userId
			}
		},
		methods:{
			userSignIn(userId){
				sessionStorage.userId=userId,
				this.userName=sessionStorage.userId
				/*this.$store.commit('saveUserId',sessionStorage.userId)*/
				console.log('保存',sessionStorage.userId)
			}
		}
	}
</script>




<style>
	body,html,div,p,h1,h2,h3,h4,h5,h6,ul,ol,li,dl,dt,dd,em,i,a,img{ margin: 0;padding: 0; font-weight:400; font-family: 微软雅黑;font-size: 14px;}
	table,tr,td{ margin: 0;padding: 0;}
	ul,ol{ list-style: none;}
	img{ border:none; vertical-align: top;}
	em,i{font-style:normal;}
	body,html{
		height:auto;
		width:100%;
	}
	input,th,select,option{outline:none;border:none;}
	table{ border-collapse: collapse;}
	button{outline:none;cursor:pointer;}
	/*[2]继承部分*/
	body{
		background:#E5E3E0;
		
	}
	a{ color: #000; text-decoration: none;}
</style>