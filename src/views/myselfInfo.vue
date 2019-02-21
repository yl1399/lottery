<template>
	<div id="container">
		<header class="myself-head">
			<i class="iconfont icon-jiantou" @click="backMine()"></i>
			<span>个人信息</span>
			<b></b>
		</header>
		<div class="myselfinfo">
		    <ul class="myinfo-list">
		      	<li><router-link to="/modifyheadimg/修改图像"><span>头像</span><img :src="imgsrc"/></router-link></li>
		      	<li><span>ID</span><b>{{userid}}</b></li>
		      	<li><span>昵称</span>
				    <input type="text" placeholder="中文,字母,数字的组合,4-10个字符" v-model="nickname" maxlength="10" onkeyup='this.value=this.value.replace(/[^0-9a-zA-Z\u4e00-\u9fa5]+/gi,"")' id="NickName" />
				</li>
				<span class="nickname_tip" ></span>
                <li><span>手机号</span><b>{{phone}}</b></li>
                <li><span>真实姓名</span><input type="text" placeholder="请与身份证保持一致" v-model="realname" maxlength="10" class="keycase"/></li>
                <li><span>身份证号</span><input type="text" placeholder="仅支持大陆第二代身份证" v-model="IDcard" maxlength="18" id="IDcard" class="keycase"/><i id="IDcardval"></i></li>
                <li><span>邀请码</span><input type="text" placeholder="请填写邀请码(选填)" v-model="recommendCode" readonly/></li>
		    </ul>
		    <router-link to="/modifypwd/修改密码" class="changepwd">修改密码</router-link>
		    <span class="mykeep" @click="saveUserInfo()">保存修改</span>
		</div>
		
	</div>
</template>

<script>
	import {mapState,mapActions} from "vuex"
	import router from "../router/index.js"
	import { Toast } from 'mint-ui'

	export default{
		data(){
			return{
				imgsrc:"",
				userid:"",
				nickname:"",
				phone:"",
				realname:"",
				IDcard:"",
				recommendCode:""
				
			}
		},
	    computed:{
	    	...mapState([
	    		'userInfo',
	    		'urlInfo',
				'isExit',
				'platform'
				
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
	    mounted(){
			console.log(this.userInfo);
            //兼容苹果安卓手机
			var u = navigator.userAgent;      
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
			//var isAndroid = u.indexOf('Android') 
			if(isAndroid == true){
				$(".myself-head").addClass("andr_myself-head");
			}else if(isiOS == true){
				$(".myself-head").addClass("ios_myself-head");
			}

            var imgIndex = this.$route.query.imgIndex;
         	if(imgIndex!=undefined){
         		 this.imgsrc = "http://113.10.236.174:9999/img/headpic/toux-"+imgIndex+".png"
         	}else{
            	this.imgsrc = this.userInfo.headimg;
            }
	    	var that = this ;
	    	var reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
	    	this.userid = this.userInfo.userId;
	    	this.nickname = this.userInfo.nickName; 
			this.phone = this.userInfo.phone;
			this.realname = this.userInfo.realName;
			this.IDcard = this.userInfo.idCard;
			this.recommendCode = this.userInfo.recomCode;
    		$("#IDcard").blur(function(){
    			if(that.IDcard){
					that.IDcard = that.IDcard.toUpperCase();
		    		if(!reg.test(that.IDcard)){
		    			$("#IDcardval").html("格式非法").css({color:"red"})
		    		}else{
		    			$("#IDcardval").html("√").css({color:"green"})
		    		}
	    		}else{
	    			$("#IDcardval").html("")
	    		}
	    	});		    
	    	$("#NickName").blur(function(){
				if(!that.nickname){
                    $(".nickname_tip").html("昵称不能为空");
				}else{
					
					$(".nickname_tip").html("");
					
				}
			});
	    },
	    methods:{
	    	...mapActions([
	    		'perfectUserInfo',
				'LogoutReq',
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
	    	saveUserInfo(){
					//console.log(this.nickname);
					//昵称为空时点击修改时提示不能为空
				    if(!this.nickname){
                        Toast({
						    message:"昵称不能为空",
							position:"middle",
							duration:2000
						});
					}else{
						var imgstr = this.imgsrc.split("-")[1].split(".")[0];
						var data ={
							url: this.urlInfo.baseUrl+this.urlInfo.perfectUserInfo,
							data:{
								userId:this.userInfo.userId,
								userName:this.nickname,
								phoneNum:this.phone,
								realName:this.realname,
								identityCard:this.IDcard,
								headPic:imgstr,
								token:this.userInfo.token,
								recommendCode:this.recommendCode
							}
						}
						this.perfectUserInfo(data);
					}
					
					
				
	    	},
	    	backMine(){
				router.push("/mine?title=我的");    		
	    	}
	    }
	    
	}
</script>

<style>
</style>