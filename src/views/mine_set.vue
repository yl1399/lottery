<template>
	<div id="container">
		<HeaderSon></HeaderSon>
		<div class="mine_set">
		    <ul class="set-list">
		    	<!--<li>
		    		<router-link to="/updateversion/检查新版本">
		    			<i class="iconfont icon-jianchagengxin"></i>
		    			<span>检查新版本</span>
		    			<i class="iconfont icon-jiantou-copy-copy"></i>
		    		</router-link>
		    	</li>-->
		    	<li>
		    	    <router-link to="/aboutme/关于App">
		    			<i class="iconfont icon-guanyu"></i>
		    			<span>关于</span>
		    			<i class="iconfont icon-jiantou-copy-copy"></i>
		    		</router-link>
		    	</li>
		    </ul>
		    <!--<span to="" class="exit" @click="LogoutApp()">退出pc28</span>-->
		</div>
		
	</div>
</template>

<script>
	import HeaderSon from '@/components/header-son';
	import { mapState, mapActions } from 'vuex';
	import router from "../router/index.js";
	export default{
		components: {
	        'HeaderSon': HeaderSon
	    },
	    computed: {
			...mapState([
				'userInfo',
				'urlInfo',
				'isExit',
				"deviceId",
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
				$(".mine_set").addClass("andr_mine_set");
			}else if(isiOS == true){
				$(".mine_set").addClass("ios_mine_set");
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
				'ClearData'
			]),
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
			LogoutApp: function(){
				router.push("/home");
			}
		}
	    
	}
</script>

<style>
</style>