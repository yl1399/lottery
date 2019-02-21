<template>
	<div class="wealth">
		<HeadComponent></HeadComponent>
	  	<div class="profile">
	  	    <h1>今日盈亏</h1>
	  	    <b >{{this.wealthInfo.todayincom}}</b>
	  	    <p>
	  	        <span>投注彩钻:<i>{{this.wealthInfo.bettingMoney}}</i></span>
	  	        <span>中奖彩钻:<i>{{this.wealthInfo.winningaMount.toFixed(2)}}</i></span>
	  	    </p>
	  	</div>
	  	<div  class="recommend"><i class="iconfont icon-shouyi"></i><span>推荐收益</span><i>{{this.wealthInfo.fallintoMoney}}</i></div>
	  	<ul class="list">
	  		<li @click="showShadow()">
  				<i class="iconfont icon-chongzhi"></i>
  				<span>充值</span>
  				<i class="iconfont icon-jiantou-copy-copy"></i>
	  			
	  		</li>
	  		<li>
	  			<router-link to="/withdrawcash/提现">
	  				<i class="iconfont icon-tixian"></i>
	  				<span>提现</span>
	  				<i class="iconfont icon-jiantou-copy-copy"></i>
	  			</router-link>
	  		</li> 
	  		<!--<li>
	  			<router-link to="/cashcard/银行卡">
	  				<i class="iconfont icon-yinhangqia"></i>
	  				<span>银行卡</span>
	  				<i class="iconfont icon-jiantou-copy-copy"></i>
	  			</router-link>
	  		</li> -->
	  		<li>
	  			<router-link to="/searchmoney/财富查询">
	  				<i class="iconfont icon-dingdanchaxun"></i>
	  				<span>财富查询</span>
	  				<i class="iconfont icon-jiantou-copy-copy"></i>
	  			</router-link>
	  		</li> 
	  	</ul>
	  	<div class="wealth-shadow">
	  	     <div class="box">
	  	     	<p>充值选择</p>
	  	     	<p>是否跳转到客服页面进行人工充值？</p>
	  	     	<p><span @click="gotoService()">确定</span><span @click="hideShadow()">取消</span></p>
	  	     </div>
	  	</div>
	</div>
	
</template>

<script>
	import {mapState,mapActions} from "vuex";
	import HeadComponent from '@/components/header';
	import axios from "axios";
	import router from "../router/index.js";
	import { Toast } from 'mint-ui';
	export default{
		data(){
			return{
				title1:"充值中心",
				
			}
		},
		components: {
	        'HeadComponent': HeadComponent
	    },
		computed:{
			...mapState([
				'urlInfo',
				'deviceId',
				'userInfo',
				'wealthInfo',
				'isExit',
				
			]),
			exitStatus: function() {
				return this.isExit;
			},
		},
		methods: {
			...mapActions([
				"queryDayRecordinfo",
				"LogoutReq",
				'ClearData'
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
			//点击充值跳到客服页面
			showShadow(){
				$(".wealth-shadow").css("display","block");
			},
			//点击确定跳转到客服页面
			gotoService(){
				//window.location.href = "https://www.baidu.com";
				router.push("/customservice?title=客服");
			},
			//点击取消模态框消失
			hideShadow(){
				$(".wealth-shadow").css("display","none");
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
		mounted: function(){
			//兼容苹果安卓手机
			var u = navigator.userAgent;      
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
			//var isAndroid = u.indexOf('Android') 
			if(isAndroid == true){
				$(".profile").addClass("andr_profile");
			}else if(isiOS == true){
				$(".profile").addClass("ios_profile");
			}

		
			if(this.userInfo.islogin){
				if(this.userInfo.isTourist)
				{
					Toast({
							message: "请登录正式账号体验!",
							position:"middle",
							duration:3000
						});
						router.push("/home");
				}
				else
				{
					this.queryDayRecordinfo({
					url: this.urlInfo.baseUrl + this.urlInfo.queryDayRecordPath,
					userId:this.userInfo.userId,
					token:this.userInfo.token,
				
					});
				}
			}else{
				router.push("/login");
			}
		}
		
		
	}
</script>

<style>
</style>