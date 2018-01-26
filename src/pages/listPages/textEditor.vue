<template>
	<div class="editorPage">
		<p class="topP"><span class="font18">文章标题:</span><button @click="saveContent()">保存</button></p>
		<input v-model="contentTitle" class="titleInput" type="text" placeholder="请输入标题..."><br>
		<span class="font18">文章内容：</span><br>
		<quill-editor  class="myTextEditor" ref='myTextEditor'
			v-model="content"
			 
			  @change="onEditorChange($event)">
		</quill-editor>
		

		<alert-dialog :is-show="alertShow">{{alertMessage}}</alert-dialog>
	</div>
</template>


<script>
	import { quillEditor } from 'vue-quill-editor'

	import alertDialog from '../../components/alertDialog'

	export default{
		components:{
			quillEditor,
			alertDialog
		},
		data(){
			return{
				content:"",
				contentTitle:"",
				alertMessage:"",
				alertShow:false
			}
		},
		watch:{
			alertShow:function(val,oldVal){
				const that=this
				if(val==true&&oldVal==false){
					setTimeout(function(){
						that.alertShow=false
					},3000)
				}
			}
		},
		methods:{
			onEditorChange(ev){

			},
			saveContent(){
				if(this.content==""&&this.contentTitle==""){
					this.alertShow=true
					this.alertMessage="没有可以保存的信息呦！(ಥ﹏ಥ)"
					return;
				}
				if(this.content==""){
					this.alertShow=true
					this.alertMessage="内容为空保存失败！(ಥ﹏ಥ)"
					return;
					
				}
				if(this.contentTitle==""){
					this.alertShow=true
					this.alertMessage="标题为空保存失败！(ಥ﹏ಥ)"
					return;
					
				}
				const article=this.content
				const articletitle=this.contentTitle
				this.$http({
						method:'POST',
						url:"https://www.easy-mock.com/mock/5a0e5457ec27b206e2af042f/localhost:8081/saveArticle?article="+article+"&articletitle="+articletitle
					}).then((res)=>{
						if(res.body.data.ecode==1){
							this.alertShow=true
							this.alertMessage="文章保存成功！(*^▽^*)"
							const that=this
							setTimeout(function(){
								that.content=""
								that.contentTitle=""
							},2000)
						}else if(res.body.data.ecode==-1){
							this.alertShow=true
							this.alertMessage="保存失败！(ಥ﹏ಥ)"
							return;
						}
					},(err)=>{
						this.alertShow=true
						this.alertMessage="系统错误！(ಥ﹏ಥ)"
						return;
					})
			}
		}
	}
</script>

<style>
	.editorPage{
		width: 100%;
		height: 100%;
		background: #ffffff;
	}
	.quill-editor{
		height: 70%;
	}
	.titleInput{
		width: 100%;
		height: 40px;
		border-top: 1px solid #CCCCCC;
		border-bottom: 1px solid #CCCCCC;
		padding-left: 10px;
		padding-right: 10px;
	}
	.font18{
		font-size: 18px;
		line-height: 35px;
	}
	.topP button，.topP span{
		display: block;
	}
	.topP button{
		width: 60px;
		height: 30px;
		float: right;
		margin-right: 50px;
		margin-top: 2px;
		border-radius: 15px;
		border: 1px solid #444444;
		background: #ffffff;
		color: #444444;
		
	}
	.topP span{
		flaot: left;
	}
</style>
