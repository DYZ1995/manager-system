<template>
	<div>
		<div class="dialogCover-alert" v-if="isShow">
			<div class="dialog-alert" v-if="isShow">
				<slot>被执行</slot>
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
		}

		
	}
</script>

<style>
	.dialogCover-alert{
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: 999;
		top: 0;
  		left: 0;
	}
	.dialog-alert{
		width: 260px;
		height: 50px;
		line-height: 50px;
		background: #ffffff;
		border: 2px solid #cccccc;
		margin: 0 auto;
		margin-top: 20%;
		text-align: center;
		
		
	}
	.dialogContent-alert{
		width: 100%;
		margin-top: 60px;
	}
	.dialogContent-alert p{
		width: 100%;
		height: 100%;
		text-align: center;

	}
	.dialogBtn-alert{
		width: 200px;
		margin: 0 auto;
		margin-top: 50px;
	}
	.dialogBtn-alert button{
		width: 80px;
		height: 30px;
		display: block;
		border-radius: 15px;
		border: 1px solid #212D3D;
	}
	.dialogBtn-alert button:first-child{
		color: #ffffff;
		background: #212D3D;	
		float: left;
	}
	.dialogBtn-alert button:last-child{
		color: #212D3D;
		background: #ffffff;
		float: right;
	}
	.closeDialog-alert{
		display: block;
		float: right;
		margin-right: 15px;
		margin-top: 10px;
		cursor: pointer;
	}
</style>