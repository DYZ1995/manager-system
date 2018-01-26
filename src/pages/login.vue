<template>
	<div>
		<div class="login">
			<h1>后台管理系统</h1>
			<input type="text" placeholder="用户名" v-model="username" @focus="delErrText">
			<br>
			<input type="password" placeholder="密码" v-model="password" @focus="delErrText">
			<p v-show="loginError" class="login-err">{{errText}}</p>
			<button @click="getData">登录</button>

		</div>
	</div>
</template>



<style>
	.login{
		width: 400px;
		height: 400px;
		margin: 0 auto;
		margin-top: 150px;
		border: 1px solid #002240;
		background: #002240;
		color: white;
	}
	.login h1{
		display: block;
		width: 100%;
		text-align: center;
		margin-top: 50px;
	}
	.login input{
		width: 70%;
		height: 30px;
		display: block;
		margin: 0 auto;
		border-radius: 5px;
		border: 1px solid white;
		background: #08365D;
		color: white;
		
	}
	.login > input:nth-child(2){
		margin-top: 50px;
	}
	.login button{
		width: 70%;
		display: block;
		margin: 0 auto;
		margin-top: 30px;
		height: 32px;
		border-radius: 5px;
		border: 1px solid;
		background: white;
		color: #002240;
		font-weight: bold;
		cursor: pointer;
	}
	.login-err{
		color: red;
		margin-left: 56px;
	}
</style>

<script>

	
	export default{
		data(){
			return{
				username:"",
				password:"",
				loginError:false,
				errText:""
			}
		},
		/*computed:{//通过计算属性对表单进行验证
			userVerify(){
				let errorText
				if(/^[a-zA-Z0-9_-]{4,16}$/.test(this.username)){
					errorText=""
				}else{
					errorText="用户名不符合规则"
				}
				return{
					errorText
				}
			},
			passVerify(){
				let errorText
				if(/^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/.test(this.password)){
					errorText=""
				}else{
					errorText="密码不符合规则"
				}
				return{
					errorText
				}
			}
		},*/
		methods:{
			getData(){
				if(this.username==""||password==""){
					this.loginError=true
					this.errText="用户名或密码不能为空！"
				}else{
					var password=this.password;
					var username=this.username;		 
				
					this.$http({
						method:'POST',
						url:'https://www.easy-mock.com/mock/5a0e5457ec27b206e2af042f/localhost:8081/login?password='+password+'&username='+username,
					}).then(function(res){
						if(res.body.data.status.loginCode==1){
							console.log('userId',)
							if(res.body.data.status.userId!=undefined||res.body.data.status.userId!=""){
								this.$emit('userSignIn', res.body.data.status.userId);
								this.$router.push({name:'index',params:{"userId":res.body.data.status.userId}})
							}else{
								this.$router.push("/")
							}
							
						}else{
							this.loginError=true
							this.errText="用户名或密码错误！"
						}
					},function(err){
						console.log('err')
					})
					}
			},
			delErrText(){
				this.loginError=false
				this.errText=""
			}
		}
	}
</script>


