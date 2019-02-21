<template>
	<div class="mine">
		<HeadComponent></HeadComponent>
		<div class="head">
			<router-link to="/myselfInfo">
				<img :src="userInfo.headimg" />
				<div id="selfInfo">
					<p v-if="userInfo.islogin">{{this.userInfo.nickName}}</p>
					<p v-if="userInfo.islogin">ID:{{this.userInfo.userId}}</p>

				</div>
				<i class="iconfont icon-jiantou-copy-copy"></i>
			</router-link>
		</div>
		<ul class="minelist">
			<li>
				<router-link to="/mine_cathectic/我的投注">
					<i class="iconfont icon-touzhue"></i>
					<span>我的投注</span>
					
					<i class="iconfont icon-jiantou-copy-copy"></i>
					<span>查看全部订单</span>
				</router-link>
			</li>
			<li>
				<router-link to="/mine_invite/邀请有礼">
					<i class="iconfont icon-liwu"></i>
					<span>邀请有礼</span>
					
					<i class="iconfont icon-jiantou-copy-copy"></i>
					<span>邀好友 拿提成 </span>
				</router-link>
			</li>
			<li>
				<router-link to="/mine_set/设置">
					<i class="iconfont icon-shezhi"></i>
					<span>设置</span>
					
					<i class="iconfont icon-jiantou-copy-copy"></i>
					<span>功能设置</span>
				</router-link>
			</li>
			
		</ul>
		
	</div>

</template>

<script>
	import { mapState, mapActions } from 'vuex';
	import HeadComponent from '@/components/header';
	import axios from 'axios';
	import router from "../router/index.js";
	import { Toast } from 'mint-ui';
	export default {
        components: {
	        'HeadComponent': HeadComponent
	    },
        computed: {
			...mapState([
				'userInfo',
				'urlInfo',
				'isExit',
				'deviceId',
			]),
			exitStatus: function() {
				return this.isExit;
			},
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
			Test:function()
			{
				Toast("test");
			}
		},
		mounted(){
            //兼容苹果安卓手机
			var u = navigator.userAgent;      
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
			//var isAndroid = u.indexOf('Android') 
			if(isAndroid == true){
				$(".head").addClass("andr_head");
			}else if(isiOS == true){
				$(".head").addClass("ios_head");
			}


			if(!this.userInfo.islogin){
				router.push("/login");
			}
			else
			{
				if(this.userInfo.isTourist)
				{
					Toast({
							message: "请登录正式账号体验!",
							position:"middle",
							duration:3000
						});
						router.push("/home");
				}
			}
			
		}
		

	}
</script>

<style>

</style>