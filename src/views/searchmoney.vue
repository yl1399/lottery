<template>
	<div id="container">
		<HeaderSon></HeaderSon>
		<div class="searchmoney">
		    <div class="allasset">
		        <h1>{{this.queryWealthInfo.generalAssets}}</h1>
		        <h2>我的总资产</h2>
		    </div>
		    <ul class="classify">
		    	<li><i>{{this.queryWealthInfo.accountFunds}}</i><span>可提现金额</span></li>
		    	<li><i>{{this.queryWealthInfo.accountFreeze}}</i><span>冻结金额</span></li>
		    </ul>
		    <div class="record">
		    	<nav>
		    		<div><span @click="changeRecord(1)" :class="classFlag==1?'select':''">充值记录</span></div>
		    		<div><span @click="changeRecord(2)" :class="classFlag==2?'select':''">提现记录</span></div>
		    		
		    	</nav>
		    	<ul class="recordlist">
		    		<li v-for= "(item,idx) in queryRecordInfo">
		    			<div class="left">
		    				<h1 v-if="classFlag==1">客服充值</h1>
							<h1 v-if="classFlag==2">{{item.moneyGo}}</h1>
		    				<p>{{item.transactionDateYMD}}&nbsp; {{item.transactionDateHMS}}</p>
		    			</div>
						<span id="middle" v-text="item.state==0?'处理中':(item.state==1?'成功':(item.state==2?'失败':(item.state==3?'未知':(item.state==4?'待审核':'作废'))))"></span>
		    			<span class="right">{{item.transactionMoney}}</span>
		    		</li>	    			    		
		    	</ul>
		    </div>
		</div>
	</div>
</template>

<script>
	import HeaderSon from '@/components/header-son'
	import {mapState,mapActions} from "vuex";
	import axios from "axios";
	import router from "../router/index.js";
	export default{
		data(){
			return{
				classFlag:1,
				stateData:""
			}
		},
		components: {
	        'HeaderSon': HeaderSon
	    },
	    computed:{
			...mapState([
				'urlInfo',
				'deviceId',
				'userInfo',
				'queryWealthInfo',
				'queryRecordInfo',
				'isExit',
				
			]),
			exitStatus: function() {
				return this.isExit;
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
	    methods:{
	    	...mapActions([
				"queryWealthinfo",
				"queryRecordinfo",
				"LogoutReq",
				'ClearData'
			
			]),
	    	changeRecord:function(idx){
	    		this.classFlag = idx;
	    	 	
			  	if(this.userInfo.islogin){
						this.queryRecordinfo({
						url: this.urlInfo.baseUrl + this.urlInfo.queryRecordPath,
						userId:this.userInfo.userId,
						token:this.userInfo.token,
						types:idx,
						pageNow:1,
						pageSize:8,
					});
					
					
				}else{
					router.push("/login");
				}


	    		
	    	},
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
			GetState:function(state){
				let str = "";
				switch(state)
				{
					case 0:
						str = "处理中";
						break;
						case 1:
						str = "成功";
						break;
						case 2:
						str = "失败";
						break;
						case 3:
						str = "未知";
						break;
						case 4:
						str = "待审核";
						break;
						case 5:
						str = "作废";
						break;
						default:
						break;

				}
				return str;
			}
	    },
	    mounted: function(){
			//兼容苹果安卓手机
			var u = navigator.userAgent;      
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
			//var isAndroid = u.indexOf('Android') 
			if(isAndroid == true){
				$(".allasset").addClass("andr_allasset");
			}else if(isiOS == true){
				$(".allasset").addClass("ios_allasset");
			
			}
		
			if(this.userInfo.islogin){
			this.queryWealthinfo({
					url: this.urlInfo.baseUrl + this.urlInfo.queryWealthPath,
					userId:this.userInfo.userId,
					token:this.userInfo.token,
				
				});
			
			}else{
				router.push("/");
			}
			
			
			
			
			
			
		},
		  created(){
		  	
		  	if(this.userInfo.islogin&&this.classFlag==1){
					this.queryRecordinfo({
					url: this.urlInfo.baseUrl + this.urlInfo.queryRecordPath,
					userId:this.userInfo.userId,
					token:this.userInfo.token,
					types:1,
					pageNow:1,
					pageSize:8,
				});
				
				
			}else{
				router.push("/login");
			}
		  	
			  	 
		  	 
		  }
		
	   
	   
	}
</script>

<style>
</style>