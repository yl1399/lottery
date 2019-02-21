<template>
	<div class="pastseach">
		
		<div class="pastseach_top">
			<div class="past_info_box" v-if="!searchFlag">
				<i class='iconfont icon-jiantou' @click="goback()"></i>
				<span>往期开奖</span>
				<i v-on:click="showSearch()" class="iconfont icon-sousuo1"></i>	
			</div>
			<div class="seachbox" v-if="searchFlag">
				<div class="seachbox_center_left">
					<i class="iconfont icon-sousuo"></i>
					<input type="number"  class="search_input"  onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"   placeholder="请输入需要搜索的期号"  oninput="if(value.length>11)value=value.slice(0,11)"  autocomplete="off" v-model="searchInput"/>
				</div>
		       <div v-on:click="hideSearch()" class="seachbox_center_right">取消</div>
			</div>
			
			
			
		</div>
		
		
		<div class="specific_box">
			<ul v-infinite-scroll="loadMore"
  				infinite-scroll-disabled="loading"
  				infinite-scroll-distance="10">
				
				<li v-for="(item,idx) in pastInfo">
					<div class="specific_box_top">
						<i class="iconfont icon-jiantou"></i>
						<span class="Issue">第<b>{{item.expect}}</b>期</span>
						<span>{{item.yeartime}}</span>
						<span>{{item.hourtime}}</span>
					</div>
					<div class="specific_box_bottom">
						<span class="numcolor">{{item.opencode[0]}}</span>
						<span class="numcolor">{{item.opencode[1]}}</span>
						<span class="numcolor">{{item.opencode[2]}}</span>
						<!--<span :class="'state_'+idx" id="spelast" ></span>-->
						<span >{{item.playInfo}}</span>
					</div>
				</li>
			
			</ul>
		</div>
		
		
		
	</div>
</template>

<script>
	import { mapState ,mapActions } from 'vuex';
	import axios from "axios";
	import router from "../router/index.js";
	export default{
		data() {
			return {
				curPage:1,
				pageSize:8,
				searchInput:"",
				
			}
		},
		computed:{
			...mapState([
				'urlInfo',
				'deviceId',
				'userInfo',
				'showpageInfo',
				'pastInfo',
				'searchFlag',
				'isExit',
				'platform'
		    ])
		     
		},
		mounted(){
			//兼容苹果安卓手机
			var u = navigator.userAgent;      
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
			//var isAndroid = u.indexOf('Android') 
			if(isAndroid == true){
				$(".pastseach_top").addClass("andr_pastseach_top");
				$(".specific_box").addClass("andr_specific_box");
			}else if(isiOS == true){
				$(".pastseach_top").addClass("ios_pastseach_top");
				$(".specific_box").addClass("ios_specific_box");
			}
		},
		watch: {
            searchInput:function(val){
				if(!val){
					this.curPage = 1;
					var data = {
					    url: this.urlInfo.baseUrl + this.urlInfo.pastPath,
					    data: JSON.stringify({
						    expect:this.searchInput,
						    pageNow: this.curPage,
						    pageSize:this.pageSize,
						    lotteyType: 2
					    })
				    };	
					this.pastinfo(data);
					this.curPage ++;
					$('.specific_box ul').html("");


				}else{
					console.log("searchInput");
					console.log(val);
					this.curPage=1;
					axios.defaults.responseType = 'json';
					axios.post(this.urlInfo.baseUrl + this.urlInfo.pastPath,{  
						expect:this.searchInput,					
						pageNow:this.curPage,
						pageSize:this.pageSize,
						lotteyType: 2
					})
					.then(response => {
						console.log(response);
						var arr=new Array();
						var html="";
						if(response.data.result==0&&response.data.array.length>0){
							arr=response.data.array;
							console.log(arr);
							for(var i=0;i<arr.length;i++){  
								html+='<li>'+
								"<div class='specific_box_top'>"+"<i class='iconfont icon-jiantou'></i>"+
								"<span class='Issue'>"+"第"+"<b>"+arr[i].expect+"</b>"+"期"+"</span>"+
								"<span>"+arr[i].yeartime+"</span>"+"<span>"+arr[i].hourtime+"</span>"+"</div>"+
								"<div class='specific_box_bottom'>"+
								"<span class='numcolor'>"+arr[i].opencode[0]+"</span>"+
								"<span class='numcolor'>"+arr[i].opencode[1]+"</span>"+
								"<span class='numcolor'>"+arr[i].opencode[2]+"</span>"+
								"<span >"+arr[i].playInfo+"</span>"+
								"</div>"+'</li>'; 
								$('.specific_box ul').html(html);  								 								
							}  	

						}

						if(response.data.result==0&&response.data.array.length==0){
								  html+='<li class="not_match">'+"没有匹配到相关结果"+'</li>';   
								$('.specific_box ul').html(html);  

						}
																	
					})
					.catch(error => {
						console.log(error);
					});
					this.curPage++;
					}
				},
				//当输入框中有内容时，点击取消按钮时内容要是搜索所有
				searchFlag:function(val){
					this.curPage = 1;
                    if(val == false){
						var data = {
					        url: this.urlInfo.baseUrl + this.urlInfo.pastPath,
					        data: JSON.stringify({
						        expect:"",
						        pageNow:this.curPage,
						        pageSize:this.pageSize,
						        lotteyType: 2
					        })
				        };	
					    this.pastinfo(data);
						this.curPage ++;
						console.log(this.curPage);
						$('.specific_box ul').html("");
					}
					this.searchInput ="";
				},
				exitStatus: function(newVal) {
					
					if(newVal) 
					{
						//console.log(this.deviceId);
						this.ClearData();
					}
							
				},
				
                
				
			},
	        methods:{
	      		...mapActions([
					"pastinfo",
					"showSearch",
					"hideSearch",
					"goback",
					"clearPastInfo"
					
				]),
				loadMore()
				{
					var exportNum = "";
					if(!this.searchInput){
						exportNum = this.searchInput;
					}else if(this.searchFlag == false && this.searchInput){
						exportNum = "";
					}else if(this.searchFlag == true && this.searchInput){
                        exportNum = this.searchInput;
					}
					var data = {
					url: this.urlInfo.baseUrl + this.urlInfo.pastPath,
					data: JSON.stringify({
						expect: exportNum,
						pageNow: this.curPage,
						pageSize: this.pageSize,
						lotteyType: 2
					})
				};	
					this.pastinfo(data);
					this.curPage ++;
				},

				Logout: function() {
					//console.log("1111");
					var data = {
						url: this.urlInfo.baseUrl + this.urlInfo.logoutPath,
						data: JSON.stringify({
							userId: this.userInfo.userId,
							token: this.userInfo.token,
							deviceId: this.deviceId
						})
					};
					//console.log("Logout:" + this.userInfo.islogin);
					if(this.userInfo.islogin)
						this.LogoutReq(data);
				},
			
		
			},
			
			destroyed:function(){
				this.clearPastInfo();
			}
			 
		
			
		
        }
	  
</script>

<style>
</style>