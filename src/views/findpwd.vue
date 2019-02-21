<template>
	<div id="findpwd">
		<header>
			<i class="iconfont icon-jiantou"  @click="goback()"></i>
			<span>重置密码</span>
			<b></b>
		</header>
		<form id="commentForm1">
			<label>
				<span>手机号</span>
				<input type="number" placeholder="请输入您绑定的手机号码"  oninput="if(value.length>11)value=value.slice(0,11)"  onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"  v-model="account" name="account" id="account"/>
			</label>
			<p class="account"></p>
			
			
			<label class="firstinfo">
				<span>验证码</span>
				<input type="text" placeholder="请输入右侧验证码"  autocomplete="off" v-model="yzmCode" name="recommendCode" id="recommendCode" maxlength="4"  />
				<i><img id="YzmImg" @click="GetYzm()" src=""/></i>
			</label>
			<p class="recommendCode"></p>
			
			
			
			
			<label class="secondinfo">
				<span>短信验证</span>
				<input type="text" placeholder="请输入验证码"  autocomplete="off"  v-model="smscode" name="smscode" id="smscode" maxlength="6"  />
				<input type="button" value="获取验证码" name="rany" id="res"  v-on:click="GetsmsCode()"/>
			</label>
			<p class="smscode"></p>
			
			<label>
				<span>新密码</span>
				<input type="password" placeholder="请输入新的登录密码" v-model="pwd" name="password" id="password" minlength="6" maxlength="16"    />
			</label>
			<p class="password"></p>
			
			
			
			<label class="threeinfo">
				<span >确认密码</span>
				<input type="password" placeholder="请确认新的登录密码" v-model="repwd" name="repassword" id="repassword"  maxlength="16"  />
			</label>
			<p class="repassword"></p>
			
			
			<input type="submit" class="find_submit" value="重置密码"  />
		</form>
		
		
		
		
		<!-- <div class="shadownew" @click="hideshadownew()">
			<div class="mine-list">
				<p class="qop"></p>
				<div class="sclose"><i class="iconfont icon-cross"></i></div>
				<router-link :to="{path:'/login',query:{phoneNum:this.account}}" class="ahide">确定</router-link>
			</div>
			
		</div>		 -->
		
		
		
	</div>
</template>

<script>
    import router from "../router/index.js";
	import {mapState,mapActions} from "vuex";
	import axios from "axios";
	import { Toast } from 'mint-ui';
	export default{
		data() {
			return {
				account: "",
				smscode:"",
				pwd: "",
				yzmCode:"",
				smsFlag:1,
				repwd:"",
				timer:null
				
			}
		},
		computed:{
			...mapState([
				'urlInfo','deviceId','userInfo'
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
						
			}
		},
		methods:{
		...mapActions([
				'goback',
				'ClearData'
			]),
			Countdown1: function() {
				var that = this;
				var sec=60;
				$("#res").val("重新发送("+sec+")").attr('disabled',true);
  				this.timer = setInterval(function(){	
           		    sec--;
           		    $("#res").val("重新发送("+sec+")").attr('disabled',true);
            	    if(sec==0){
				        $("#res").val("获取验证码").attr('disabled',false);
                        clearInterval(that.timer);
                    }
                },1000);
			
			},
			
			hideshadownew:function(){
				$(".shadownew").css('display','none');
			},
			
			GetYzm: function() 
			{
				//console.log(this.deviceId);
				axios.defaults.responseType = 'blob';
				var yzmImg = document.getElementById("YzmImg");
				//console.log(eleAppend);
				axios.post(this.urlInfo.baseUrl+this.urlInfo.yzmPath, {
						deviceId: this.deviceId
					})
					.then(response => {
						var blob = new Blob([response.data]);
						yzmImg.onload = function(e) {
							window.URL.revokeObjectURL(yzmImg.src); // 清除释放
						};
						yzmImg.src = window.URL.createObjectURL(blob);
					})
					.catch(error=>{
						//console.log(error);
					});
			},
			GetsmsCode: function() 
			{
				axios.defaults.responseType = 'json';
				axios.post(this.urlInfo.baseUrl+this.urlInfo.smsPath, {
						deviceId: this.deviceId,
						phoneNum:this.account,
						vercode:this.yzmCode,
					})
					.then(response => {
						console.log(response.data);
//						console.log(response.data.msg);
//						alert(response.data.msg);
					 if(response.data.result=="3"){
						//$(".shadownew").css('display','block');
						//$(".qop").html(response.data.msg);
						Toast({
							message:response.data.msg,
							position:"middle",
							duration:3000
						});
					}
					 if(response.data.result=="2"){	
						//$(".shadownew").css('display','block');
						//$(".qop").html(response.data.msg);
						Toast({
							message:response.data.msg,
							position:"middle",
							duration:3000
						});
						this.GetYzm();
						
					}
					if(response.data.result=="4"){	
						//$(".shadownew").css('display','block');
						//$(".qop").html(response.data.msg);
						Toast({
							message:response.data.msg,
							position:"middle",
							duration:3000
						});
						this.GetYzm();
						
					}
					if(response.data.result=="5"){	
						//$(".shadownew").css('display','block');
						//$(".qop").html(response.data.msg);
						Toast({
							message:response.data.msg,
							position:"middle",
							duration:3000
						});
						this.GetYzm();
						
					}
					if(response.data.result=="0"){	
					
						this.Countdown1();
						
					}
					
						
						
					})
					.catch(error=>{
						//console.log(error);
					});
			},
			Resetpwd:function (){
				
				axios.defaults.responseType = 'json';
				axios.post(this.urlInfo.baseUrl+this.urlInfo.findpwd, {
						phoneNum: this.account,
						password:this.pwd,
						smscode:this.smscode,
						token:""
						
					})
					.then(response => {
							//console.log(response.data);
							if(response.data.result=="0"){
							//$(".shadownew").css('display','block');
							//$(".qop").html(response.data.msg);
							//$(".sclose").css('display','none');
							//$(".ahide").css('display','block');
								Toast({
									message:response.data.msg,
									position:"middle",
									duration:2000
								});
								setTimeout(()=>{
									router.push("/");
								},2010);
							}
							
							if(response.data.result == "1") {
							//$(".shadownew").css('display', 'block');
							//$(".qop").html(response.data.msg);
							Toast({
									message:response.data.msg,
									position:"middle",
									duration:3000
							});

						}
							
							
							
						
					})
					.catch(error=>{
						//console.log(error);
					});
				
				
				
				
				
			}
		
		
		
		
		
		},
		
		mounted: function() {
            //兼容苹果安卓手机
			var u = navigator.userAgent;      
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
			//var isAndroid = u.indexOf('Android') 
			if(isAndroid == true){
				$("#findpwd header").addClass("andr_header");
				$("#findpwd form").addClass("andr_form");
			}else if(isiOS == true){
				$("#findpwd header").addClass("ios_header");
				$("#findpwd form").addClass("ios_form");
			}

			var that=this;
			this.GetYzm(); //进入注册场景时就请求验证码
			// 手机号码验证
			jQuery.validator.addMethod("isMobile", function(value, element) {
			var length = value.length;
    		var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
   		 return this.optional(element) || (length == 11 && mobile.test(value));
			}, "请正确填写您的手机号码");
			
			jQuery.validator.addMethod("alnum", function(value, element) {
            return this.optional(element) || /^[a-zA-Z0-9]+$/.test(value);
        }, "只能包括英文字母和数字");
			
			 var validator = $("#commentForm1").validate({
   
   
   			submitHandler: function(form) {

					that.Resetpwd();
				},
   
   			
		     errorElement: "p",
		     focusInvalid:true,
//		     debug:true,
		     // success: "valid",
		     //   submitHandler:function() { 
		     //        alert("Submitted!") 
		     
		     //    },
			success: function(label,element) {
//  		label.html("&nbsp;").addClass("checked");
//   			 label.addClass("valid").text("√");
//   			  label.css('color','darkgreen');
//   			 $(element).after(label);
				},
			
							 				  			 	
              
			errorPlacement : function(error, element) {
      			
      			 error.css('color','red');
  				$( element).closest( "form" ).find( "p[class='" + element.attr( "id" ) + "']").append(error);

     },
		
		   rules: {
		      account: {
		        required: true,
		        isMobile:true
		       
		      },
		     
		     smscode:{
		      	required: true,
		      	minlength: 4
		     },
		     recommendCode:{
		     	required: true,
		      	minlength: 4
		     },
		       password:{
		      	required: true,
		      	minlength: 6,
		      	maxlength:16,
		      	alnum:true
		      	
		      	
		      },  
		       repassword:{
		      	required: true,
	      		equalTo: "#password"
		      	
		      } 
		    },
		     messages: {
		      account: {
		        required: " 请输入您注册的手机号码",
		        isMobile:"请正确填写您的手机号码"
		        
		      },
		      recommendCode:{
		     	required: " (验证码不能为空)",
		      	maxlength: "请输入正确的验证码位数"
		     },
		    	  	  
		  	   smscode:{
		      	required: " (验证码不能为空)",
		      	minlength: "请输入正确的验证码位数"
		      },
		  	   
		  	    password: {
		        required: " (密码不能为空)",
		        minlength: " (字母数字不能少于 6 个且不能大于 16 个)",
		        maxlength: " (字母数字不能少于 6个且不能大于 16 个)",
		        alnum:"只能包括英文字母和数字"
		      },
		       repassword: {
		        required: " (确认密码不能为空)",
		        equalTo:"两次密码输入不一致"
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