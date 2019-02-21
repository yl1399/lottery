	<template>
		<div id="home">
			<div class="back">
				<img src="http://113.10.236.174:9999/img/home/logo.png">
				<div v-if = "!userInfo.islogin" class="login_no"> 
					<span @click="GotoRegister()">注册</span>
					<span @click="GotoLogin()">登录</span>
					<span@click="TouristLogin()">试玩1</span>
				</div>
				<div v-if = "userInfo.islogin" class="login_yes">
					<span @click="Logout()">退出当前账号</span>
					<span>|</span>
					<span>{{userInfo.nickName}}</span>
				</div>
			</div>
			<div id="wrap">
				<ul id="content">
					<li :class="index==0?'selected':''"  v-for="(item,index) in homeAdArray"><img :src="item.pictureUrl"></li>
				</ul>
				<ul id="nav">
					<li class="selected" v-for="(item,index) in homeAdArray"></li>
				</ul>
			</div>
			<div class="appnotice">
				<router-link to="/noticeAdd/公告详情">
					<img src="http://113.10.236.174:9999/img/home/notice_add.png"/>
					<!-- <div class="swiper-container">
						<div class="swiper-wrapper" >
							<div class="swiper-slide" v-for="(item,idx) in appNoticeInfo" >{{item.noticeTitle}}</div>
						</div>
						<div class="swiper-wrapper" v-if="scrollFlag" id="scroll_div">
							<div class="swiper-slide" id="scroll_begin">
								<span v-for="(item,idx) in appNoticeInfo">{{item.noticeInfo}}</span>
							</div>
							<div class="swiper-slide" id="scroll_end"></div>
						</div>
					</div> -->
					<div class="noticeContent">
						<div class="notice1" v-if="!scrollFlag">
                            <div class="swiper-title" v-for="(item,idx) in appNoticeInfo" >{{item.noticeTitle}}</div>
						</div>
						<div class="notice2" v-if="scrollFlag" id="scroll_div" >
                            <div class="swiper-content" id="scroll_begin">
                                <span v-for="(item,idx) in appNoticeInfo" v-text="item.noticeShow?item.noticeInfo+'　':''"></span>
								
								<!-- 选择显示公告 -->
								
								<!-- 全部显示公告 -->
								<!-- <span v-for="(item,idx) in appNoticeInfo">{{item.noticeInfo}}　</span> -->
							</div>
							<div class="swiper-content" id="scroll_end"></div>
						</div>
					</div>
				</router-link>
			</div>
			<ul class="appList">
				<li @click="GoLottery()">
					<img src="http://113.10.236.174:9999/img/home/sscLogo.png"/>
				</li>
				<li @click="GoPc28()">
					<img src="http://113.10.236.174:9999/img/home/pc28Logo.png"/>
				</li>
			</ul>

			<!-- <span class="exitbtn" @click="Logout()">退出登录</span> -->
			<div class="download_info" v-if = "!gclose">
					<div  @click="Ghide()" class="close-btn" ><i class="iconfont icon-cross"></i></div>
					<div class="app_info">下载APP,体验更多购彩乐趣</div>
					<div class="down_button">
						<a href="https:www.baidu.com" target="_blank">下载APP</a>
					</div>
			</div>
		</div>
	</template>

	<script>
	import { mapState, mapActions } from "vuex";
	//import VueMarquee from 'vue-marquee-ho';
	//import Css from 'vue-marquee-ho/dist/vue-marquee.min.css'
	import router from "../router/index.js";
	import { Toast } from "mint-ui";
	import store from '../store/index';
	export default {

		data(){
			return {
					timer:null,
					testval:999,
					scrollFlag: true,
					MyMar: null
					
			}
		},
        components:{
		   // "vue-marquee": VueMarquee
		},
		computed: {
			...mapState([
				"userInfo",
				"urlInfo",
				'isExit',
				"deviceId",
				"appNoticeInfo",
				"homeAdArray",
				"gclose"
			]),
			exitStatus: function() {
					return this.isExit;
			},
		},
		watch: {
			exitStatus: function(newVal) {
				if(newVal)
				{
						console.log("clearData....");
						this.ClearData();
				}

			},
		},
		methods: {
			...mapActions([
				"LogoutReq",
				"SetPlatform",
				"ClearData",
				"TouristLoginReq",
				"AppNoticeReq",
				"HomeAdReq",
				"Ghide"
				]),
			
			GotoLogin(){
				router.push("/login");
			},
			GotoRegister(){
				router.push("/register");
			},
			GoPc28() {
				if(this.userInfo.islogin){
						this.SetPlatform(2);
						router.push("/pc28hall");
				}else{
					router.push("/login");
				}
			},
			GoLottery() {
				if(this.userInfo.islogin){
						this.SetPlatform(1);
						router.push("/lyhall");
				}else{
					router.push("/login");
				}
					
			},
			GotoPcPlayerRule(){
                router.push("/pc28PlayerRule/pc28玩法规则");
			},
			GotoLyPlayerRule(){
                router.push("/lyPlayerRule/时时彩玩法规则");
			},
			Logout: function() {
				//console.log("1111");
				var data = {
					url: this.urlInfo.baseUrl + this.urlInfo.logoutPath,
					data: JSON.stringify({
						userId: this.userInfo.userId,
						token: this.userInfo.token,
						deviceId: this.deviceId,
						loginType: this.userInfo.isTourist?1:0
					})
				};
				this.LogoutReq(data);
			},
			 TouristLogin: function() {
      			var data = {
        		url: this.urlInfo.baseUrl + this.urlInfo.loginPath,
        		data: JSON.stringify({
          		deviceId: this.deviceId,
          		loginType: 1
        		})
      			};
      			this.TouristLoginReq(data);
			},
			GetAppNotice:function()
			{
				var data = {
        		url: this.urlInfo.baseUrl + this.urlInfo.appNoticePath,
				  };
				if(this.appNoticeInfo.length<=0)
      				this.AppNoticeReq(data);
			},
			GetTestValue:function()
			{
				return this.testval;
			},
			GetHomeAds:function()
			{
				var data = {
        		url: this.urlInfo.baseUrl + this.urlInfo.adPicturePath,
				  };
				//if(this.homeAdArray.length<=0)
      				this.HomeAdReq(data);
			},
			
		},
		
		mounted(){
			//console.log(this.$route);
            //兼容苹果安卓手机
			var u = navigator.userAgent;      
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
			//var isAndroid = u.indexOf('Android') 
			if(isAndroid == true){
				$(".back").addClass("andr_back");
			}
			// else if(isiOS == true){
			// 	$(".back").addClass("ios_back");
			// }

			this.GetHomeAds();
			setTimeout(() => {
				var index = 0;
				var that = this;
				var length = this.homeAdArray.length;
				var $before = 0;
				start();
				$("#nav li").mouseover(function(){
					index = $(this).index();
					clearInterval(that.timer);
					show(true);
					$before = index;
				}).mouseout(function(){
					start();
				});
				//flag = true表示鼠标放在了索引上
				function show(flag){  //定义一个标量表示是否将鼠标放在索引上
					$("#nav li").eq(index).addClass("selected").siblings().removeClass("selected");
					if(flag){
						if($before < index){  //从右向左滑动
							$("#content li").eq($before).stop().animate({"left":"-100%"});
							$("#content li").eq(index).css({"left": "100%"}).stop().animate({"left": 0});
						}else if($before > index){   //从左向右滑动
							$("#content li").eq($before).stop().animate({"left":"100%"});
							$("#content li").eq(index).css({"left": "-100%"}).stop().animate({"left": 0});
						}
					}else{
						$("#content li").eq($before).stop().animate({"left":"-100%"});
						$("#content li").eq(index).css({"left": "100%"}).stop().animate({"left": 0});
					}
				}
				function start(){
					clearInterval(that.timer);
					that.timer = setInterval(function(){
						index++;
						if(index == length){
							index = 0;
						}
						show(false);//表示鼠标没有放在索引上
						$before = index;
					},2000);
				}	
			}, 200);
			

			this.GetAppNotice();
			//公告竖向滚动
			// var mySwiper = new Swiper('.swiper-container', {
			// 	loop : true,
			// 	autoplay: true,//可选选项，自动滑动
			// 	speed:5000,   //滚动速度
			// 	//direction : 'vertical',  //竖向滚动
			// 	direction : 'horizontal', //水平方向
				
			// })
			//console.log(this.userInfo.islogin);
			//js实现文字横向滚动
			var that =this;
			function ScrollImgLeft(){ 
				var speed=100;
				var scroll_begin = document.getElementById("scroll_begin"); 
				var scroll_end = document.getElementById("scroll_end"); 
				var scroll_div = document.getElementById("scroll_div"); 
				scroll_end.innerHTML=scroll_begin.innerHTML;
				//console.log(scroll_begin.offsetWidth);
				//console.log(scroll_div.scrollLeft);
                //console.log(scroll_end.offsetWidth);
				function Marquee(){ 
					var w = scroll_begin.offsetWidth-scroll_div.scrollLeft;
					//console.log(w);
				    if(w*1<=5){
						scroll_div.scrollLeft-=scroll_begin.offsetWidth; 
						
					}
				    else
				        scroll_div.scrollLeft +=6; 
				    
				    
					// scroll_div.onmouseover = function(){
					// 　　　clearInterval(MyMar);
					// }
					// scroll_div.onmouseout = function(){
					// 　　　MyMar = setInterval(Marquee,speed); 　　　　
					// }  
				}
				that.MyMar=setInterval(Marquee,speed); 
		    }
			setTimeout(ScrollImgLeft,100);
			//----------------------横向跑马灯
			function scrollTextLeft(){
				clearInterval(that.MyMar);
				var liWidth = 0;   //内容的宽度
				var moveWidth = 0;  //移动的宽度
				var boxEle = document.querySelector(".notice2");
				var div_content = document.querySelector(".swiper-content");
				var boxWidth = $(boxEle).width();
				var span_list = $(".swiper-content span");
				span_list.each(function(){
					liWidth += $(this).width();
				});
				//console.log(liWidth);
				moveWidth = boxWidth;
				//console.log(moveWidth);
				that.MyMar = setInterval(function(){
					//console.log("ddd");
					moveWidth -= 5;
					var w = liWidth+moveWidth;
					//console.log(w);
					if(w*1 <= 5){
						//console.log(w);
						$(".swiper-content").css("left","100%");
						moveWidth = boxWidth;
					}
					$(".swiper-content").css("left",moveWidth);
					
				},100);
			}
			// this.$nextTick(()=>{
			// 	scrollTextLeft();
			// })
			//setTimeout(scrollTextLeft,1000);
            //----------------------横向跑马灯
				
		},
		destroyed(){
			var that = this;
			clearInterval(that.timer);
			clearInterval(that.MyMar);
		}
	}
	</script>

	<style>

	</style>
