<template>
	<div class="register">
		<div class="title">
			<router-link to="/">
				<i class="iconfont icon-jiantou"></i>
			</router-link>
			<span>手机号注册</span>
			<b></b>
		</div>
		<form class="registerform inputOnfocus" id="commentForm">
			<div class="one">
				<span>手机号</span>
				<input type="number" placeholder="请输入手机号码" v-model="regInfo.phoneNum" id="phoneNum" name="phoneNum"  autocomplete="off"  oninput="if(value.length>11)value=value.slice(0,11)"  onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))" />
			</div>
			<p class="phoneNum"></p>

			<div class="one">
				<span>密码</span>
				<input type="password" placeholder="6-16位数字和字母的组合" v-model="regInfo.password" id="password" name="password" minlength="6" maxlength="16"  />
			</div>
			<p class="password"></p>

			<div class="one">
				<span>确认密码</span>
				<input type="password" name="repassword" id="repassword" placeholder="请再次输入密码" maxlength="16"   />
			</div>
			<p class="repassword"></p>

			<div class="three">
				<span>验证码</span>
				<input type="text" placeholder="请输入右侧验证码" v-model="smsInfo.yzmCode" id="recommendCode" name="recommendCode" maxlength="4" autocomplete="off"   />
				<i><img id="YzmImg" @click="GetYzm()" src=""/></i>
			</div>
			<p class="recommendCode"></p>

			<!--<input type="submit"  value="提交"  style="color:sandybrown; font-size: 25px; width: 100px; height:40px" />-->

			<div class="two">
				<span>短信验证</span>
				<input type="text" placeholder="请输入验证码" class="megClass" id="megCode" v-model="regInfo.smscode" name="megCode" maxlength="6" autocomplete="off" />
				<input type="button" value="获取验证码" v-on:click="GetsmsCode()" id="res" name="dinfo">
			</div>
			<p class="megCode"></p>

			<div class="four">
				<span>邀请码</span>
				<input type="text" maxlength="8"   placeholder="(选填)输入邀请码" class="invited_code" id="invited_code" v-model="regInfo.invitedCode" name="recommendCode"/>
			</div>

			<input type="submit" class="spanbtn" value="立即注册">
		</form>
		<div class="shadownew" @click="hideshadownew()">
			<div class="mine-list">
				<p class="qop"></p>
				<div class="sclose"><i class="iconfont icon-cross"></i></div>
			</div>

		</div>

	</div>
</template>

<script>
	import router from "../router/index.js";
	import { mapState, mapActions } from 'vuex';
	import axios from "axios";
    import { Toast } from 'mint-ui';
	export default {
		computed: {
			...mapState([
				'urlInfo', 'deviceId'
			])
		},
		data() {
			return {
				regInfo: {
					phoneNum: "",
					password: "",
					smscode: "",
					agencyId: "88888",
					invitedCode: ""
				},
				smsInfo: {
					yzmCode: "",
					smsFlag: 1

				},
				backresult: "",
				timer: null

			}
		},
        
		methods: {

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

				axios.defaults.responseType = 'json';
				axios.post(this.urlInfo.baseUrl + this.urlInfo.smsPath, {
						deviceId: this.deviceId,
						phoneNum: this.regInfo.phoneNum,
						vercode: this.smsInfo.yzmCode,
						smsFlag: this.smsInfo.smsFlag
					})
					.then(response => {
				//		console.log(response.data);
						//						console.log(response.data.msg);
						//						alert(response.data.msg);
						this.backresult = response.data.result;
						console.log(response.data.result);
						if(response.data.result == "3") {
							Toast({
								message:response.data.msg,
								position:"middle",
								duration:3000
							});
							this.GetYzm();
						} else if(response.data.result == "2") {   
							Toast({
								message:response.data.msg,
								position:"middle",
								duration:3000
							});
							this.GetYzm();
						}else if(response.data.result == "0") {
							this.Countdown();
							
						}

					})
					.catch(error => {
						//console.log(error);
					});
			},
			Countdown: function() {

				//			
                var that = this;
				var sec = 60;
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
			hideshadownew: function() {
				$(".shadownew").css('display', 'none');
			},
			Register: function() {
                var that = this;
				axios.defaults.responseType = 'json';
				axios.post(this.urlInfo.baseUrl + this.urlInfo.registPath, {
						phoneNum: this.regInfo.phoneNum,
						password: this.regInfo.password,
						smscode: this.regInfo.smscode,
						agencyId: this.regInfo.agencyId,
						invitedCode: this.regInfo.invitedCode

					})
					.then(response => {
						//console.log(response.data)
						if(response.data.result == "0") {
							localStorage.removeItem('userInfo');
							localStorage.removeItem('isAutoLogin');
							localStorage.removeItem('isRememberPwd');
							//$(".qop").html(response.data.msg);
							Toast({
								message:response.data.msg,
								position:"middle",
								duration:2000
							});
							setTimeout(()=>{
								router.push({path:'/login',query:{phoneNum:that.regInfo.phoneNum}});

							},2010);
						}
						else if(response.data.result == "1" || response.data.result == "7") {
							Toast({
								message:response.data.msg,
								position:"middle",
								duration:3000
							});

						}

					})
					.catch(error => {
						console.log(error);
					});
			},
			

		},
		
		mounted: function() {

			//兼容苹果安卓手机
			var u = navigator.userAgent;      
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
			//var isAndroid = u.indexOf('Android') 
			if(isAndroid == true){
				$(".title").addClass("andr_title");
				$(".registerform").addClass("andr_registerform");
			}else if(isiOS == true){
				$(".title").addClass("ios_title");
				$(".registerform").addClass("ios_registerform");
			}


			this.GetYzm(); //进入注册场景时就请求验证码
			var that = this;
			// 手机号码验证
			jQuery.validator.addMethod("isMobile", function(value, element) {
				var length = value.length;
				var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
				return this.optional(element) || (length == 11 && mobile.test(value));
			}, "请正确填写您的手机号码");
			
			jQuery.validator.addMethod("alnum", function(value, element) {
            return this.optional(element) || /^[a-zA-Z0-9]+$/.test(value);
        }, "只能包括英文字母和数字");
			
			var validator = $("#commentForm").validate({

				submitHandler: function(form) {

					that.Register();
				},

				//		     errorElement: "span",
				focusInvalid: true,
				debug: true,
				// success: "valid",
				//   submitHandler:function() { 
				//        alert("Submitted!") 

				//    },
				success: function(label, element) {
					//  		label.html("&nbsp;").addClass("checked");
					//   			 label.addClass("valid").text("√");
					//   			  label.css('color','darkgreen');
					//   			 $(element).after(label);
				},

				errorPlacement: function(error, element) {
					error.css('color', 'red');
					$(element).closest("form").find("p[class='" + element.attr("id") + "']").append(error);

				},

				rules: {
					phoneNum: {
						required: true,
						minlength: 11,
						isMobile: true

					},
					password: {
						required: true,
						minlength: 6,
						maxlength: 16,
						alnum:true

					},
					repassword: {
						required: true,
						equalTo: "#password"
					},
					megCode: {
						required: true,
						minlength: 4

					},
					recommendCode: {
						required: true,
						minlength: 4
					}

				},
				messages: {
					phoneNum: {
						required: " (手机号不能为空)",
						minlength: " (不能少于 11 位数)",
						isMobile: "请正确填写您的手机号码"

					},
					password: {
						required: " (密码不能为空)",
						minlength: " (字母数字不能少于 6 个且不能大于 16 个)",
						maxlength: " (字母数字不能少于 6个且不能大于 16 个)",
						alnum:"只能包括英文字母和数字"
					},
					repassword: {
						required: " (密码不能为空)",
						equalTo: "两次密码输入不一致"
					},
					megCode: {
						required: " (验证码不能为空)",
						minlength: " 请输入正确的验证码位数"
					},
					recommendCode: {
						required: " (验证码不能为空)",
						minlength: "请输入正确的验证码位数"
					}
				}
			});

		},
		destroyed:function(){
             clearInterval(this.timer);
		}
		
	}
</script>

<style>

</style>