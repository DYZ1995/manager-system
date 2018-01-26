<template>
	<div class="articelManager">
		<div class="searchTable-m">
			<date-picker v-model="value7" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期"
      		end-placeholder="结束日期" :picker-options="pickerOptions2" format="yyyy-MM-dd"  value-format="yyyy-MM-dd" @change="timeSelect()"></date-picker>
      		<el-select v-model="value4" clearable placeholder="请选择">
			    <el-option
			      v-for="item in options"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			 </el-select>

			 <el-input placeholder="请输入内容" v-model="input10" clearable @change="setZero"></el-input><button @click="fuzzySearch">查询</button>
		</div>
		<div class="operationDiv">
			<span class="resetEditor">【再编辑】</span>
			<span class="setEssence">【加精】</span>
			<span class="visit">【浏览】</span>
			<span class="del">【删除】</span>
		</div>
		<div class="tableDiv-m">
			<table>
				<thead>
					<tr>
						<td width="5%"><input name="article" title="全选" v-model="checked" type="checkbox" @click="allCheck"></td>
						<td width="18%">标题</td>
						<td width="10%">状态</td>
						<td width="15%">发表日期</td>
						<td width="10%">作者</td>
						<td width="10%">类别</td>
						<td width="18%">关键词</td>
						<td width="7%">精华</td>
						<td width="7%">热度</td>
					</tr>
				</thead>
				<tbody>	
					<tr v-for="(item,index) in realTextArr">
						<td><input name="article" type="checkbox" ischecked=false :value="item.articleId" :checked="item.checked" @click="selfCheck(item.articleId,item.checked)"></td>
						<td>{{item.title}}</td>
						<td>已发布</td>
						<td>{{item.createTime}}</td>
						<td>{{item.author}}</td>
						<td>{{item.type}}</td>
						<td>{{item.keyword}}</td>
						<td>是</td>
						<td>高</td>
					</tr>
					<tr style="height:30px;">
						<td v-show="sentTextList.length==0||selectShow==true||fuzzyShow==true" colspan="9" style="text-align:center;">没有待发布文章</td>
					</tr>
				</tbody>
			</table>
			<div class="page-div">
				<pagination v-if="sentTextList.length!=0&&pageSize>1"  background layout="prev, pager, next" :total="pageSize" @current-change="handleCurrentChange"  :current-page.sync="currentPage"></pagination>
			</div>
		</div>
		
	</div>
</template>




<script>
	import { DatePicker,Pagination} from 'element-ui'
	export default{
		components:{
			DatePicker,
			Pagination
		},
		data(){
			return{
				checked:false,
				realTextArr:[],
				sentTextList:[],
				selectShow:false,
				fuzzyShow:false,
				currentPage:1,
				checkedArr:[],
				pickerOptions2: {
		          shortcuts: [{
		            text: '今天',
		            onClick(picker) {
		              const end = new Date();
		              const start = new Date();
		              start.setTime(start.getTime());
		              picker.$emit('pick', [start, end]);
		            }
		          },{
		            text: '昨天',
		            onClick(picker) {
		              const end = new Date();
		              const start = new Date();
		              start.setTime(start.getTime() -3600 * 1000 * 24);
		              end.setTime(start.getTime());
		              picker.$emit('pick', [start, end]);
		            }
		          },{
		            text: '最近三天',
		            onClick(picker) {
		              const end = new Date();
		              const start = new Date();
		              start.setTime(start.getTime() - 3600 * 1000 * 24 *3);
		              picker.$emit('pick', [start, end]);
		            }
		          },   {
		            text: '最近一周',
		            onClick(picker) {
		              const end = new Date();
		              const start = new Date();
		              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
		              picker.$emit('pick', [start, end]);
		            }
		          }, {
		            text: '最近一个月',
		            onClick(picker) {
		              const end = new Date();
		              const start = new Date();
		              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
		              picker.$emit('pick', [start, end]);
		            }
		          }, {
		            text: '最近三个月',
		            onClick(picker) {
		              const end = new Date();
		              const start = new Date();
		              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
		              picker.$emit('pick', [start, end]);
		            }
		          }]
		        },
		        value7: '',
		        value4:'',
		        options:[{
		        	value:1,
		        	label:"在线"

		        },{
		        	value:2,
		        	label:"下线"

		        },{
		        	value:3,
		        	label:"精华"

		        },{
		        	value:4,
		        	label:"热度（高）"

		        },{
		        	value:5,
		        	label:"热度（中）"

		        },{
		        	value:6,
		        	label:"热度（低）"

		        }],
		        input10:''
			}
		},
		mounted:function(){
			
			this.$http({
				method:'GET',
				url:"https://www.easy-mock.com/mock/5a0e5457ec27b206e2af042f/localhost:8081/textSent"
			}).then((res)=>{
				console.log(res)
				this.sentTextList=res.body.data[0].sendTextList
				this.pageSize=res.body.data[0].sendTextList.length
				console.log('列表',res.body.data[0].sendTextList)
				 this.realTextArr=this.sentTextList.slice(0,10)
			},(err)=>{
				console.log('err')
			})
		},
		methods:{
			allCheck(){
				var _this=this
				if(this.checked==true){
					_this.checkedArr=[];
					_this.realTextArr.forEach(function(item){
						
						item.checked=false
					})
				}else{
					_this.realTextArr.forEach(function(item){
						_this.checkedArr.push(item.articleId)
						item.checked=true
					})
				}
			},
			selfCheck(id,status){
				var arr=this.checkedArr
				var listArr=this.sentTextList
				if(status==true){
					arr.forEach(function(item,index){
						console.log("ewew",arr[index])
						if(arr[index]==id){

							arr.splice(index, 1);
						}
					})
					listArr.forEach(function(item,index){
						if(item.articleId==id){
							item.checked=!item.checked
						}
					})
				}else{
					arr.push(id)
					listArr.forEach(function(item,index){
						if(item.articleId==id){
							item.checked=!item.checked
						}
					})
				}
				console.log("checkedArr",this.checkedArr)

				
			},
			delThis(id,index){
				var arr=this.sentTextList
				arr.forEach(function(item,index){
					console.log(item)
					if(arr[index].articleId==id){
						arr.splice(index, 1);
					}
				})
				var start=0
				var end=10
				if(this.currentPage==1){
					start=0
					end=10
				}else if(this.currentPage>1){
					start=(this.currentPage-1)*10,
					end=this.currentPage*10
				}
				this.realTextArr=this.sentTextList.slice(start,end)
				this.pageSize=this.sentTextList.length
					console.log("呵呵呵呵",this.realTextArr)
				this.alertMessage="删除成功！(*^▽^*)"
				this.alertShow=true
				this.value7=""
				this.input10=""
			},
			delAll(){
				var _this=this
				var idArr=this.checkedArr
				var textArr=this.sentTextList
				if(idArr.length==0){
					this.alertMessage="没有选中任何文章哦！！(ಥ﹏ಥ)"
					this.alertShow=true
				}else{
					idArr.forEach(function(item,index){
					var _checkedId=item
					textArr.forEach(function(item,index){
						if(_checkedId==item.articleId){
							textArr.splice(index,1)
						}
					})
					var start=0
					var end=10
					if(_this.currentPage==1){
						start=0
						end=10
					}else if(_this.currentPage>1){
						start=(_this.currentPage-1)*10,
						end=_this.currentPage*10
					}
					_this.realTextArr=_this.sentTextList.slice(start,end)
					_this.pageSize=textArr.length
						_this.alertMessage="删除成功！(*^▽^*)"
						console.log('sentTextList',_this.sentTextList)
						_this.alertShow=true
						_this.checked=false
					})
					this.value7=""
				}
				
				
			},
			sentAll(){
				var _this=this
				var idArr=this.checkedArr
				var textArr=this.sentTextList
				if(idArr.length==0){
					this.alertMessage="没有选中任何文章哦！！(ಥ﹏ಥ)"
					this.alertShow=true
				}else{
					idArr.forEach(function(item,index){
					var _checkedId=item
					textArr.forEach(function(item,index){
						if(_checkedId==item.articleId){
							textArr.splice(index,1)
						}
					})
					var start=0
					var end=10
					if(_this.currentPage==1){
						start=0
						end=10
					}else if(_this.currentPage>1){
						start=(_this.currentPage-1)*10,
						end=_this.currentPage*10
					}
					_this.realTextArr=_this.sentTextList.slice(start,end)
					_this.pageSize=textArr.length
						_this.alertMessage="发布成功！(*^▽^*)"
						_this.alertShow=true
					})
					this.value7=""
				}
				
			},
			sentOne(id,index){
				var arr=this.sentTextList
				arr.forEach(function(item,index){
					console.log(item)
					if(arr[index].articleId==id){
						arr.splice(index, 1);
					}
				})
				var start=0
				var end=10
				if(this.currentPage==1){
					start=0
					end=10
				}else if(this.currentPage>1){
					start=(this.currentPage-1)*10,
					end=this.currentPage*10
				}
				this.realTextArr=this.sentTextList.slice(start,end)
				this.pageSize=this.sentTextList.length
				this.alertMessage="发布成功！(*^▽^*)"
				this.alertShow=true
				this.value7=""
			},
			handleCurrentChange(val) {
		       var val=`${val}`
		       var num=0
		       if(val==1){
		       	num=0
		       }else if(val>1){
		       	num=(val-1)*10
		       }
		     console.log(this.value7)
		      if(this.value7!=""){
				this.realTextArr=this.timeSelectArr.slice(num,val*10)
		      }else if(this.input10!=""){
		      	this.realTextArr=this.fuzzyArr.slice(num,val*10)
		      }else if(this.value7==""){
		      	this.realTextArr=this.sentTextList.slice(num,val*10)
		      }
		       

		    },
		    timeSelect(){
		    	var start=''
		    	var end =''
		    	if(this.value7!=null){

		    		start=this.value7[0]
		    		end=this.value7[1]
		    		start=start.replace(/-/g,"")
		    		end=end.replace(/-/g,"")
		    		start=Number(start)
		    		end=Number(end)


		    		console.log('start',start)
			    	console.log('end',end)
			    	var allTextArr=this.sentTextList
			    	var realArr=this.realTextArr
			    	realArr=[]
			    	var createT=""
			    	allTextArr.forEach(function(item,index){
			    		createT=item.createTime
			    		createT=createT.replace(/-/g,"")
			    		createT=new Number(createT)
			    		if(createT==start&&createT==end){
			    			realArr.push(item)
			    		}else if(createT>=start&&createT<=end){
							realArr.push(item)
			    		}	
			    	})
			    	if(realArr.length==0){
			    		this.selectShow=true
			    	}else{
			    		this.selectShow=false
			    	}
			    	this.realTextArr=realArr
			    	var selectAllArr=realArr
			    	var start=0
					var end=10
					if(this.currentPage==1){
						start=0
						end=10
					}else if(this.currentPage>1){
						start=(this.currentPage-1)*10,
						end=this.currentPage*10
					}
					this.realTextArr=selectAllArr.slice(start,end)
			    	this.pageSize=selectAllArr.length
			    	this.timeSelectArr=selectAllArr
			    	console.log('selectAllArr',selectAllArr)

		    	}else{
		    		var start=0
					var end=10
					if(this.currentPage==1){
						start=0
						end=10
					}else if(this.currentPage>1){
						start=(this.currentPage-1)*10,
						end=this.currentPage*10
					}
					this.realTextArr=this.sentTextList.slice(start,end)
			    	this.pageSize=this.sentTextList.length
			    	this.currentPage=1
		    	}
		    	
		    },
		    fuzzySearch(){
		    	const self = this;
		    	self.fuzzyArr=[]
               	self.sentTextList.filter(function(d){
                    if(d.title.indexOf(self.input10) > -1 ||d.author.indexOf(self.input10) > -1||d.type.indexOf(self.input10) > -1||d.keyword.indexOf(self.input10) > -1){
                    	console.log("d",d)
                    	
                    	self.fuzzyArr.push(d)
                    	console.log("d-real",self.realTextArr)
                          
                    }
                    if(self.fuzzyArr.length==0){
                    	self.fuzzyShow=true
                    }else{
                    	self.fuzzyShow=false
                    }
                })
                self.pageSize=self.fuzzyArr.length
                	var start=0
					var end=10
					if(this.currentPage==1){
						start=0
						end=10
					}else if(this.currentPage>1){
						start=(this.currentPage-1)*10,
						end=this.currentPage*10
					}
                self.realTextArr=self.fuzzyArr.slice(start,end)
		    },
		    setZero(){
		    	if(this.input10==""){
		    		var start=0
					var end=10
					if(this.currentPage==1){
						start=0
						end=10
					}else if(this.currentPage>1){
						start=(this.currentPage-1)*10,
						end=this.currentPage*10
					}
					this.realTextArr=this.sentTextList.slice(start,end)
			    	this.pageSize=this.sentTextList.length
			    	this.currentPage=1
			    	this.fuzzyShow=false
		    	}
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
		}

	}
</script>



<style>
	.articelManager{
		background: #ffffff;
		height: 100%;
		overflow: hidden;
	}
	.searchTable-m{
		width: 85%;
		margin: 0 auto;
		margin-top: 20px;
	}
	.operationDiv{
		width: 86%;
		margin: 0 auto;
		margin-top: 10px;
	}
	.operationDiv span{
		cursor: pointer;
	}
	.resetEditor{
		color: #3AD90E;
	}
	.setEssence{
		color: #FAB403;
	}
	.visit{
		color: #46AAED;
	}
	.del{
		color: #FA0308;
	}
	.el-date-editor .el-range-input {
		width: 35%;
	}
	.el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner {
		width: 250px;
	}
	.el-input{
		display: inline;
	}
	.el-select .el-input__inner {
		width: 120px!important;
	}
	div.el-input input{
		width: 350px;
		border-top-right-radius: 0px;
		border-bottom-right-radius: 0px;
	}
	.searchTable-m button{
		width: 60px;
		height: 38px;
		color: #ffffff;
		background: #212D3D;
		border: 1px solid #212D3D;
		border-top-right-radius: 5px;
		border-bottom-right-radius: 5px;
	}
	.el-input__inner input{
		border-radius: 4px;
	}
	.tableDiv-m{
		width: 86%;
		margin: 0 auto;
	}
	.tableDiv-m table{
		width: 100%;
		text-align: center;
		margin-top: 10px;
		
	}
	.tableDiv-m table thead tr{
		height: 50px;
		background: #7CB9FA;
		font-weight: bold;

	}
	.tableDiv-m table tbody tr{
		height: 40px;
	}
	.tableDiv-m table td{
		border: 1px solid #cccccc;
	}
	input[type=checkbox]{
		background: #ffffff;
		cursor: pointer;
	}
	.fabu{
		width: 22px;
		cursor: pointer;
	}
	.quxiao{
		width:19px;
		margin-top: 2px;
		cursor: pointer;
	}
	.bianji{
		width:19px;
		margin-top: 2px;
		cursor: pointer;
		margin-right: 10px;
	}

</style>