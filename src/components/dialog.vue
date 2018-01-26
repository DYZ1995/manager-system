<template>
	<div>
		<div class="dialogCover" v-if="isShow">
			<div class="dialog" v-if="isShow">
				<span class="closeDialog" @click="closeSelf">X</span>
				<div class="dialogContent">
					<p>
						<slot>确认执行此操作吗？</slot>
					</p>
				</div>
				<div class="dialogBtn">
					<button @click="closeSelf">取消</button>
					<button @click="yesBtn">确认</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		props:{
			isShow:{
				type:Boolean,
				default:false
			}
		},
		methods:{
			closeSelf(){
				this.$emit('on-close')
			},
			yesBtn(){
				this.$emit('yes-btn')
			}
		}
	}
</script>

<style>
	.dialogCover{
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		position: fixed;
		z-index: 999;
		top: 0;
  		left: 0;
	}
	.dialog{
		width: 300px;
		height: 200px;
		background: #ffffff;
		margin: 0 auto;
		margin-top: 18%;
		overflow: hidden;
	}
	.dialogContent{
		width: 100%;
		margin-top: 60px;
	}
	.dialogContent p{
		width: 100%;
		text-align: center;

	}
	.dialogBtn{
		width: 200px;
		margin: 0 auto;
		margin-top: 50px;
	}
	.dialogBtn button{
		width: 80px;
		height: 30px;
		display: block;
		border-radius: 15px;
		border: 1px solid #212D3D;
	}
	.dialogBtn button:first-child{
		color: #ffffff;
		background: #212D3D;	
		float: left;
	}
	.dialogBtn button:last-child{
		color: #212D3D;
		background: #ffffff;
		float: right;
	}
	.closeDialog{
		display: block;
		float: right;
		margin-right: 15px;
		margin-top: 10px;
		cursor: pointer;
	}
</style>