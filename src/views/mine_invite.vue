<template>
	<div id="container">
		<HeaderSon></HeaderSon>
		<div class="mine_invite">
		    <img src="http://113.10.236.174:9999/img/mine/invitebg.png" class="imgbg"/>
		    <ul class="invite-box">
		    	<li>
		    		<span>邀请码</span>
		    		<input type="text" v-model="inviteData.myRecommendCode" disabled/>
		    		<!-- <i @click="copyRecommendCode($event)">复制</i> -->
		    	</li>
		    	<li>
		    		<span>已邀请好友</span>
		    		<input type="text" v-model="inviteData.recommendNum" disabled/>
		    		<i>人</i>
		    	</li>
		    	<li>
		    		<span>获得的彩钻</span>
		    		<input type="text" v-model="inviteData.selectTransactionMoney" disabled/>
		    		<i>彩钻</i>
		    	</li>
		    </ul>
		    <div class="invite-scan">
		    	<img src="http://113.10.236.174:9999/img/mine/scan.png"/>
		    </div>
		</div>
		<!--
		<div class="inviteBtn">
			<span @click="shareToFriend()">立即发起邀请</span>
		</div>
		-->
	</div>
</template>

<script>
	import HeaderSon from '@/components/header-son';
	import { mapState, mapActions } from 'vuex';
	import axios from 'axios';
	import router from "../router/index.js";
	import { Toast } from 'mint-ui';

	// import { WechatPlugin} from 'vux'
	// Vue.use(WechatPlugin); //  微信
	// const wx = Vue.wechat;

	export default{
		data(){
			return{
				inviteCode:"",
				peopleNumber:"",
				diamondNumber:""
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
				'inviteData',
				'ClearData'
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
				"getInviteData"
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
			copyRecommendCode:function(event){
				var copyValue = $(event.target).prev().val();
				if(copyValue){
                    Toast({
						message: "复制成功",
						position:"middle",
						duration:2000
					});
				}else{
					Toast({
						message: "邀请码为空",
						position:"middle",
						duration:2000
					});
				}
			},
			shareToFriend(){
				var urlstr = window.location.href.split("#")[0];
				console.log(urlstr);
				axios.post("http://192.168.2.192:8080/CrazyPc28_1.0.0v/api/hall/weixinRequest",JSON.stringify({
					token:this.userInfo.token,
					userId:this.userInfo.userId,
					appid:"wx1157595052d6f325",
					secret:"91bd4b4032309a399ac7d5a23b3a3762",
					URL:urlstr
				    })).then((res)=>{
						//console.log(res.data);
						alert(JSON.stringify(res.data));
						wx.config({
							debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
							appId: 'wx1157595052d6f325', // 必填，公众号的唯一标识
							timestamp: res.data.timestamp, // 必填，生成签名的时间戳
							nonceStr: res.data.noncestr, // 必填，生成签名的随机串
							signature: res.data.signature,// 必填，签名，见附录1
							// debug: false,
							// appId: 'wxf8b4f85f3a794e77',
							// timestamp: 1517298395,
							// nonceStr: 'MG2Ua8SKfF7jJo7y',
							// signature: '8ca1ef7f0ba043cd2a39374086d9ad4d4a302ea8',
							jsApiList: [
								'checkJsApi',
								'onMenuShareTimeline',
								'onMenuShareAppMessage'
								
							] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
						});
						
						wx.ready(function(){
							alert("接入微信成功");
							wx.checkJsApi({
								jsApiList: [
									'getNetworkType',
									'previewImage'
								],
								success: function (res) {
									alert(JSON.stringify(res));
								}
							})
							wx.onMenuShareTimeline({
								title: '彩票', // 分享标题
								link: encodeURI("http://awtgfpm365.xicp.net"), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
								imgUrl: 'http://demo.open.weixin.qq.com/jssdk/images/p2166127561.jpg', // 分享图标
								success: function () {
									alert("分享成功");
								// 用户确认分享后执行的回调函数
							    },
							})
							wx.onMenuShareAppMessage({
								title: '这是一个自定义的标题！', // 分享标题
								desc: '这是一个自定义的描述！', // 分享描述
								link: encodeURI("http://awtgfpm365.xicp.net"), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
								imgUrl: 'http://demo.open.weixin.qq.com/jssdk/images/p2166127561.jpg', // 自定义图标
								type: 'link', // 分享类型,music、video或link，不填默认为link
								dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
								success: function () {
									// 用户确认分享后执行的回调函数
								},
								cancel: function () {
									// 用户取消分享后执行的回调函数
								}
							});
						});
						wx.error(function(res){
							alert(res.errMsg);
						})
		
				    }).catch((err)=>{
					    console.log(err);
				    })
			}
		},
		mounted(){
			//兼容苹果安卓手机
			var u = navigator.userAgent;      
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
			//var isAndroid = u.indexOf('Android') 
			if(isAndroid == true){
				$(".mine_invite").addClass("andr_mine_invite");
			}else if(isiOS == true){
				$(".mine_invite").addClass("ios_mine_invite");
			}


			var data ={
				url: this.urlInfo.baseUrl + this.urlInfo.inviteHasGift,
				data:{
					userId: this.userInfo.userId,
					token: this.userInfo.token
				}
			}
			this.getInviteData(data);


		}
	}
</script>

<style>
</style>