<template>
	<div id="container">
		<HeaderSon></HeaderSon>
		<div class="withdrawcash">
			
		    <ul class="withdraw">
		   	    <li>
		   	    	<span>可提金额</span>
		   	    	<span>{{this.queryWealthInfo.accountFunds}}彩钻</span>
		   	    </li>
		   	    <li>
		   	    	<span>提现彩钻</span>
		   	    	<input type="text"  id="Withmoney" class="Withmoney" v-model="Mgetcash" maxlength="7" autocomplete="off" placeholder="提现限额10-1000000彩钻" onkeyup='this.value=this.value.replace(/[^\d]*/gi,"")' />
		   	    </li>
		   	    <li>
		   	    	<span>提现金额</span>
		   	    	<span class="Gcashmoney">{{this.Mgetcash}}</span>
		   	    </li>
		   	    <li>
		   	    	<i class="iconfont icon-zhifubao"></i>
		   	    	<span>提现至支付宝</span>  
		   	    	<!--<span @click="zfbChoose()">
		   	    		<img v-if="zfbflag" src="../../static/img/yuan1.png"/>
		   	    		<img v-if="!zfbflag" src="../../static/img/yuan2.png"/>
		   	    	</span>-->
		   	    	<input type="radio"  value="2" name="tixian"  checked="checked" @click="change()"/>
		   	    			   	    	
		   	    </li>
		   	    <li>
		   	    	<i class="iconfont icon-weixin"></i>
		   	    	<span>提现至微信</span>
		   	    	<!--<span @click="wxChoose()">
		   	    		<img v-if="wxflag" src="../../static/img/yuan1.png"/>
		   	    		<img v-if="!wxflag" src="../../static/img/yuan2.png"/>
		   	    	</span>-->
		   	    	<input type="radio"  value="3" name="tixian" @click="change()"/>
		   	    	
		   	    	
		   	    </li>
		   	    <li>
		   	    	<span>收款账号</span>
		   	    	<input type="text"  v-model="Cashaccount" placeholder="请输入收款账号" class="one"/>
		   	    </li>
		    </ul>
		    <ul class="confirminfo">
		    	<li>
		    		<span>提现姓名</span>
		    		<input type="text"  v-model="reyname"  placeholder="请输入真实姓名" class="one"/>
		    	</li>
		    	<li>
		    		<span>手机号</span>
		    		<input type="text"   v-model="regInfo.phoneNum" placeholder="请输入手机号" class="one"/>
		    	</li>
		    	<li>
		    		<span>验证码</span>
		    		<input type="text"   v-model="smsInfo.yzmCode" placeholder="请输入验证码" class="one"/>
		    		<img id="YzmImg" @click="GetYzm()" src=""/>
		    	</li>
		    	<li>
		    		<span>短信验证码</span>
		    		<input type="text"   v-model="regInfo.smscode"  placeholder="填写验证码" class="one"/>
		    		<!--<i>获取验证码</i>-->
		    		<input type="button" value="获取验证码" v-on:click="GetsmsCode()" id="res" name="dinfo">
		    	</li>
		    </ul>
		</div>
		
		<div class="submit" @click="getcashMoney()">提交</div>
		
		
		
		<div class="shadownew" @click="hideshadownew()">
			<div class="mine-list">
				<!--<img src="../../static/img/diamondicon.png" alt="" />-->
				<p class="qop"></p>
				<div class="sclose"><i class="iconfont icon-cross"></i></div>
				<router-link to="/wealth" class="ahide">确定</router-link>
			</div>

		</div>
		
		
		
		
		
	</div>
</template>

<script> 
	import HeaderSon from '@/components/header-son'
	import { mapState, mapActions } from "vuex";
	import axios from "axios";
	import router from "../router/index.js";
	import { Toast } from 'mint-ui';
	
	export default{
		data() {
			return {
				zfbflag: true,
				wxflag: true,
				Mgetcash:"",
				reyname:"",
				Cashaccount:"", //提现账号
				regInfo: {
					phoneNum: "",
					smscode: "",
					agencyId: 888,
					recommendCode: ""
				},
				smsInfo: {
					yzmCode: "",
					smsFlag: 0

				},
				timer:null
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
					'isExit',
					'withdrowCashInfo',
					'queryWealthInfo'
				
				
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
					this.Logout();
				}
						
			},
		},
	    methods: {
	    	...mapActions([
				'withdrowCashinfo',
				'getcashMoneyinfo',
				'queryWealthinfo',
				'LogoutReq',
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
	    	hideshadownew: function() {
				$(".shadownew").css('display', 'none');
			},
	    	
	   	    zfbChoose: function(){
				this.zfbflag = !this.zfbflag

			},
			wxChoose: function(){
				this.wxflag = !this.wxflag

			},
			change: function(){
			//	console.log($('input[name="tixian"]:checked').val());

			},
			Countdown: function() {
				var sec = 60;
				var that = this;
				$("#res").val("重新发送(" + sec + ")").attr('disabled', true);

				this.timer = setInterval(function() {

					sec--;
					$("#res").val("重新发送(" + sec + ")").attr('disabled', true);
					if(sec == 0) {
						$("#res").val("获取验证码").attr('disabled', false);

						clearInterval(that.timer);

					}
				}, 1000);

			},
			GetYzm: function() {
				//console.log(this.deviceId);
				axios.defaults.responseType = 'blob';
				var yzmImg = document.getElementById("YzmImg");
				//console.log(eleAppend);
				var data = new FormData;
				data.append("deviceId", "223232");
				axios.post(this.urlInfo.baseUrl + this.urlInfo.yzmPath, {
						deviceId: this.deviceId
					})
					.then(response => {
						var blob = new Blob([response.data]);
						yzmImg.onload = function(e) {
							window.URL.revokeObjectURL(yzmImg.src); // 清除释放
						};
						yzmImg.src = window.URL.createObjectURL(blob);
					})
					.catch(error => {
						//console.log(error);
					});
			},
			GetsmsCode: function() {
                console.log("获取验证码");
				axios.defaults.responseType = 'json';
				axios.post(this.urlInfo.baseUrl + this.urlInfo.smsPath, {
						deviceId: this.deviceId,
						phoneNum: this.regInfo.phoneNum,
						vercode: this.smsInfo.yzmCode,
						smsFlag: this.smsInfo.smsFlag
					})
					.then(response => {
						console.log(response.data);
						
						this.backresult = response.data.result;
						if(response.data.result == "3" || response.data.result == "2") {
							//$(".shadownew").css('display', 'block');
							//$(".qop").html(response.data.msg); 
							Toast({
								message: response.data.msg,
								position: "middle",
								duration: 2000
							});
							setTimeout(()=>{
                                this.GetYzm();
							},2010)
							
						}else if(response.data.result == "0") {
							this.Countdown();
							
						}

					})
					.catch(error => {
						//console.log(error);
					});
			},
			getcashMoney: function(){
				
				if(!this.Mgetcash){
                    Toast({
						message: "提现彩钻不能为空",
						position:"middle",
					    duration:2000
					});
				}else if(!this.Cashaccount){
                    Toast({
						message: "提现账号不能为空",
						position:"middle",
					    duration:2000
					});
				}else if(!this.reyname){
                    Toast({
						message: "真实姓名不能为空",
						position:"middle",
					    duration:2000
					});
				}else if(!this.regInfo.phoneNum){
					Toast({
						message: "手机号不能为空",
						position:"middle",
					    duration:2000
					});
				}else if(!this.smsInfo.yzmCode){
                    Toast({
						message: "图片验证码不能为空",
						position:"middle",
					    duration:2000
					});
				}else if(!this.regInfo.smscode){
                    Toast({
						message: "短信验证码不能为空",
						position:"middle",
					    duration:2000
					});
				}else{
					
					this.getcashMoneyinfo({
						url: this.urlInfo.baseUrl + this.urlInfo.autocashPath,
						userId:this.userInfo.userId*1,
						token:this.userInfo.token,
						withdrawDiamond:this.Mgetcash*1,  
						cashType:$('input[name="tixian"]:checked').val()*1,
						cashName:this.reyname,
						code:this.regInfo.smscode,
						phoneNum:this.regInfo.phoneNum,
						cashAccout:this.Cashaccount,
						amount:this.withdrowCashInfo*1
					});
				}
			}
			
			
			
	   },
	    mounted: function() {
			//兼容苹果安卓手机
			var u = navigator.userAgent;      
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
			//var isAndroid = u.indexOf('Android') 
			if(isAndroid == true){
				$(".withdrawcash").addClass("andr_withdrawcash");
			}else if(isiOS == true){
				$(".withdrawcash").addClass("ios_withdrawcash");
			}
			 


			this.GetYzm();								
			$(".Withmoney").on("input",()=>{	  
				// if(this.Mgetcash==""){
				// 	$(".Gcashmoney").html("");
				// }
				this.withdrowCashinfo({
					url: this.urlInfo.baseUrl + this.urlInfo.clientgetcashPath,
					userId:this.userInfo.userId*1,
					token:this.userInfo.token,
					withdrawDiamond:this.Mgetcash*1
						
				});
				
			});		
			
			this.queryWealthinfo({
					url: this.urlInfo.baseUrl + this.urlInfo.queryWealthPath,
					userId:this.userInfo.userId,
					token:this.userInfo.token,
			});

			//软键盘弹出时隐藏底部footer
			var oHeight = $(document).height(); //浏览器当前的高度
			$(window).resize(function(){
			    //alert(oHeight);
                //alert($(document).height());
				if($(document).height() < oHeight){  //软键盘弹出时
					$(".submit").hide();
					
			    }else{
					$(".submit").show();
				}
			});
		},
		destroyed:function(){
			var that = this;
			clearInterval(that.timer);
		}
	    
	    	
	}
</script>

<style>
</style>