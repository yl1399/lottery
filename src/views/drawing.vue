<template>
	<div class="drawing">
		<HeadComponent></HeadComponent>
		<ul class="nav">
            <li ><span :class="navIndex1 == 0 ?'selected':''">时时彩</span></li>
			<li ><span :class="navIndex1 == 1 ?'selected':''">PC28</span></li>
		</ul>
		<div class="swiper-container" >

			<div class="swiper-wrapper">
				<div class="swiper-slide">
					<div class="lydrawInfo">
                        <p>
							<span>{{this.showpageInfo.expect}}期　|　{{this.userPlayInfo}}</span>
							<router-link to="/lypastseach">往期</router-link>
						</p>
						<div class="lydrawCode">
							<div><span>{{showpageInfo.opencode[0]}}</span></div>
							<div><span>{{showpageInfo.opencode[1]}}</span></div>
							<div><span>{{showpageInfo.opencode[2]}}</span></div>
							<div><span>{{showpageInfo.opencode[3]}}</span></div>
							<div><span>{{showpageInfo.opencode[4]}}</span></div>
							
						</div>
						<div class="lydrawTime">距离下期开奖还剩 <span>{{this.CountdownString}}</span></div>
					</div>
					<div class="lydrawTop">
                        <img src="../../static/img/drawing/top10.png" alt="">
						<ul>
							<li v-for="(item,idx) in userTopList">{{item.userTop}}</li>
							
						</ul>
					</div>
				</div>
				<div class="swiper-slide">
					<div class="pcdrawInfo">
                        <p>
							<span>{{showpageInfo_pc.expect}}期　|　{{userPlayInfo_pc}}</span>
							<router-link to="/pcpastseach">往期</router-link>
						</p>
						<div class="pcdrawCode">
							<div><span>{{showpageInfo_pc.opencode[0]}}</span></div>
							<div><span>{{showpageInfo_pc.opencode[1]}}</span></div>
							<div><span>{{showpageInfo_pc.opencode[2]}}</span></div>
						</div>
						<div class="pcdrawTime">距离下期开奖还剩 <span>{{this.CountdownString_pc}}</span></div>
					</div>
					<div class="pcdrawTop">
                        <img src="../../static/img/drawing/top10.png" alt="">
						<ul>
							<li v-for="(item,idx) in userTopList_pc">{{item.userTop}}</li>
							
						</ul>
					</div>
				</div>
			</div>
			
		</div>
	</div>

</template>

<script>
	import { mapState, mapActions } from "vuex";
	import HeadComponent from '@/components/header';
	import axios from "axios";
	import router from "../router/index.js";
	import { Toast } from "mint-ui";
	import store from '../store/index';
	export default {
	
		data()
		{
			return{
				getHomeCountTimer:0,
				getHomeShowPageTimer:0,
				getHomeCountTimer_pc:0
			}
		},
		components: {
	        'HeadComponent': HeadComponent
	    },
		computed: {
			...mapState([
				'urlInfo',
				'deviceId',
				'userInfo',
				'showpageInfo',
				'CountdownInfo',
				'CountdownString',
				'CountdownString_pc',
				'DrawingIsSetTimer',
				'isExit',
				'userTopList',
				'CountdownTimeString',
				'CountdownTimeString_pc',
				'platform',
				'userPlayInfo',
				'showpageInfo_pc',
				'userTopList_pc',
				'userPlayInfo_pc',
				'CountdownInfo_pc',
				'navIndex1'
			
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
				"showpageinfo",
				"SetCountdownInfo",
				"SetDrawingIsSetTimer",
				"SetDrawingIsSetTimer_pc",
				"LogoutReq",
				'ClearData',
				'GoHome',
				'UpdateCountdown',
				'UpdateCountdown_pc',
				'modifyIndex'
				
			]),
			pastlogincheck: function(){
			if(!this.userInfo.islogin){
				router.push("/");
				
				}else{
					router.push("/pc28/pastseach");
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
				if(this.userInfo.islogin)
					this.LogoutReq(data);
			},
			GetShowPageInfo(nIndex)
			{
				var data = {
					url: this.urlInfo.baseUrl + this.urlInfo.showPagePath,
					data: JSON.stringify({
						lotteyType:nIndex
					}),
					index:nIndex
				};
				this.showpageinfo(data);
			}

		},
		mounted: function() {
			var that = this;
            //兼容苹果安卓手机
			var u = navigator.userAgent;      
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
			//var isAndroid = u.indexOf('Android') 
			if(isAndroid == true){
				$(".nav").addClass("andr_nav");
			}else if(isiOS == true){
					$(".nav").addClass("ios_nav");
			}


			if(this.userInfo.islogin){
				this.GetShowPageInfo(1);
				this.GetShowPageInfo(2);
				if(this.DrawingIsSetTimer == false) {
					//获取开奖信息
					this.getHomeShowPageTimer = setInterval(() => {
						this.GetShowPageInfo(1);
						this.GetShowPageInfo(2);
					}, 10000)
					//首页倒计时	


					this.getHomeCountTimer = setInterval(() => {
						this.UpdateCountdown({min:this.CountdownInfo.min, sec:this.CountdownInfo.sec});
					}, 1000)
					this.getHomeCountTimer_pc = setInterval(() => {
						this.UpdateCountdown_pc({min:this.CountdownInfo_pc.min, sec:this.CountdownInfo_pc.sec});
					}, 1000)


					this.SetDrawingIsSetTimer(true);
					this.SetDrawingIsSetTimer_pc(true);
				}
			}else{
				router.push("/login");
			}
			
			// var dom = document.querySelector(".swiper-slide");
			// dom.addEventListener('touchstart',function(event){
			// 	var touch = event.targetTouches[0];
			// 	console.log(touch.pageX);
			// });
			// dom.addEventListener('touchend',function(event){
			// 	var touch = event.changedTouches[0];
			// 	console.log(touch.pageX);
			// })
			//swiper
			var mySwiper = new Swiper('.swiper-container',{
				onSlideChangeStart: function(swiper){
					console.log(swiper.activeIndex);
					that.modifyIndex(swiper.activeIndex);
				}
			});
			//console.log(mySwiper);
			$(".nav li").on("click",function(){
				let index = $(this).index();
				that.modifyIndex(index);
				mySwiper.slideTo(that.navIndex1);     
			});
            mySwiper.slideTo(this.navIndex1);
            


		},
		
	    destroyed:function(){
			 var that = this;
			 that.SetDrawingIsSetTimer(false);
			 that.SetDrawingIsSetTimer_pc(false);
			 clearInterval(that.getHomeCountTimer);
			 clearInterval(that.getHomeCountTimer_pc);
			 clearInterval(that.getHomeShowPageTimer);
       }

	}
</script>

<style>

</style>