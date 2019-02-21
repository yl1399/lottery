<template>
	<div id="container">
		<HeaderSon></HeaderSon>
		<div class="mine_cathectic">
		    <h1 class="allorder">全部订单</h1>
		    <ul class="order-list"
		    	v-infinite-scroll="loadMore"
  				infinite-scroll-disabled="loading"
  				infinite-scroll-distance="10"
  			>
		    	<li v-for="(item,idx) in orderInfo">
		    		<router-link :to="{path:'/cathectic_detail',query:{expect:item.expect}}">
			    		<div :class="item.state==1?'time hasdraw':'time'">
			    			<h1><span>{{item.month}}</span>月</h1>
			    			<h2>{{item.day}}</h2>
			    		</div>
			    		<div class="qishu">
			    			<h1><span>{{item.expect}}</span>期</h1>
			    			<h2><span>{{item.amountMoney}}</span>元</h2>
			    		</div>
			    		<div class="result">
			    			<button 
			    				v-text="item.state==0?'未中奖':(item.state==1?'中奖':'未开奖')"
			    				:class="item.state==1?'btndraw':''"
			    			></button>
			    			<i class="iconfont icon-arrow-right"></i>
			    		</div>
		    		</router-link>
		    	</li>
		    </ul>
		</div>
	</div>
</template>

<script>
	import HeaderSon from '@/components/header-son';
	import { mapState, mapActions } from 'vuex';
	import axios from 'axios';
	import router from "../router/index.js";
	export default{
		data(){
			return {
				curPage:1,
				pageSize:10,
			}
		},
		components: {
	        'HeaderSon': HeaderSon
	    },
	    computed:{
	    	...mapState([
				'userInfo',
				'urlInfo',
				'isExit',
				'deviceId',
				'orderInfo',
				'platform'
				
			]),
			exitStatus: function() {
				return this.isExit;
			},
		},
		mounted(){
            //兼容苹果安卓手机
			var u = navigator.userAgent;      
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
			//var isAndroid = u.indexOf('Android') 
			if(isAndroid == true){
				$(".mine_cathectic").addClass("andr_mine_cathectic");
			}else if(isiOS == true){
				$(".mine_cathectic").addClass("ios_mine_cathectic");
			}
		},
	    watch: {
			exitStatus: function(newVal) {
				
				if(newVal) 
				{
					//console.log(this.deviceId);
					this.ClearData();
					
				}
						
			},
		},
		methods: {
			...mapActions([
				"LogoutReq",
				"getMyOrderData",
				'ClearData',
				'clearOrderList'
			]),
			Logout: function() {
				var data = {
					url: this.urlInfo.baseUrl + this.urlInfo.logoutPath,
					data: JSON.stringify({
						userId: this.userInfo.userId,
						token: this.userInfo.token,
						deviceId: this.deviceId
					})
				};
				//console.log("Logout:"+this.userInfo.islogin);
				if(this.userInfo.islogin)
					this.LogoutReq(data);
			},
			loadMore(){
				var data = {
					url:this.urlInfo.baseUrl + this.urlInfo.orderCheck,
					data: JSON.stringify({
						userId: this.userInfo.userId,
						token: this.userInfo.token,
						pageNow:this.curPage,
						pageSize:this.pageSize
						//lotteyType:this.platform
					})
				}
				//console.log(data);
				this.getMyOrderData(data);
				this.curPage++;
			}
		},
		destroyed:function(){
			this.clearOrderList();
		}
		
	}
</script>

<style>
</style>