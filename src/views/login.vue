<template>
	<div class="login">
		<div class="back">
      <span @click="GoHome()"><i class="iconfont icon-jiantou"></i>返回</span>
		</div>
		<div class="img">
			<img src="http://113.10.236.174:9999/img/logo.png" />
		</div>
		<form>
			<label>
				<i class="iconfont icon-nav3"></i>
				<input type="tel" maxlength="11" placeholder="请输入手机号码" v-model="account" class="login_account" />
			</label>
			<label>
				<i class="iconfont icon-password"></i>
				<input type="password" minlength="6" maxlength="16" placeholder="请输入登录密码" class="login_pwd"  v-model="pwd"/>
			</label>

		</form>
		<div class="btn">
			<span @click="loginFun(0)">登录</span>
			<span @click="OnRegister()">注册</span>

		</div>
		<div class="txt">
			<span @click="takePwd()">
				<i>
					<img v-if="!rememberPwd" src="http://113.10.236.174:9999/img/login1.png"/>
					<img v-if="rememberPwd" src="http://113.10.236.174:9999/img/login2.png"/>
			    </i>记住密码</span>
			<span @click="autologin()">
				<i>
					<img v-if="!isAuto" src="http://113.10.236.174:9999/img/login1.png"/>
					<img v-if="isAuto" src="http://113.10.236.174:9999/img/login2.png"/>
			    </i>自动登录</span>
			<router-link to="/findpwd" class="findpwd">忘记密码？</router-link>
		</div>
		<!-- <div id ="box">

		</div> -->
		<div class="shadownew">
			<div class="mine-list">
			  <p class="title">{{this.importantTitle}}</p>
				<div>
          <p>{{this.importantWelcome}}</p>
          <p>{{this.importantInfo}}</p>
          <p>{{this.importantDetail}}</p>
          <p>{{this.importantRemark}}</p>
        </div>
				<span>确定</span>
			</div>

		</div>

	</div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import axios from "axios";
//	import router from "../router"
import router from "../router/index.js";
//	import  state from "../store/rootState.js";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      account: "",
      pwd: "",
      autoTimer: 0,
      heartTimer: 0,
      defaultPwd: "****************",
      realPwd: "",
      importantTitle:"",// 重要通知标题
      importantWelcome:"", //重要通知欢迎语
      importantInfo:"", //
      importantDetail:"", //重要通知详情
      importantRemark:"", //备注
    };
  },

  computed: {
    ...mapState([
      "urlInfo",
      "deviceId",
      "userInfo",
      "autoInterval",
      "isAuto",
      "heartbeatInterval",
      "heartbeatTimer",
	  "rememberPwd",
	  
    ]),
    loginStatus: function() {
      return this.userInfo.islogin;
    }
  },

  watch: {
    loginStatus: function(newVal) {
      if (newVal) {

		  if(!this.userInfo.isTourist)
		  {
			  var timerID = setInterval(() => {
            //console.log("heartbeat...");
            this.StartHeartbeat();
          	}, this.heartbeatInterval);
		  	this.SetHeartbeatTimer(timerID);
      }
      
      // $(".shadownew").css("display","block");
      // $(".mine-list span").click(function(){
      //      router.push({path:'/home',query:{title:"首页"}});
      // })   
		  this.GetImportantNotice();
		  
        
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
      $(".back").addClass("andr_back");
    }else if(isiOS == true){
      $(".back").addClass("ios_back");
    }



    //如果注册成功把phoneNum带过来
    if (this.$route.query) {
      this.account = this.$route.query.phoneNum;
    }
    this.pwd = "";
    //获取自动保存的数据
    this.GetAutoData();

    if (this.isAuto) {
      this.autoTimer = setTimeout(() => {
        this.loginFun(1);
      }, this.autoInterval); //自动登录处理
    }

    //设备deviceId设置
    var did = localStorage.getItem("deviceId");
    if (!did || did.length == 0) {
      //console.log("生成deviceId");
      this.deviceIdinfo({
        url: this.urlInfo.baseUrl + this.urlInfo.deviceIdPath
      });
    } else {
      //console.log("设置deviceId");
      this.SetDeviceId(did);
    }
  },
  methods: {
    ...mapActions([
      "deviceIdinfo",
      "SetDeviceId",
      "logingetinfo",
      "SetAutoLogin",
      "HeartbeatReq",
      "SetHeartbeatTimer",
      "SetRememberPwd",
	  "TouristLoginReq",
    ]),
    GoHome(){
      router.push({path:'/home',query:{title:"首页"}});
    },
    //点击切换自动登录的
    autologin: function() {
      this.SetAutoLogin(!this.isAuto);
      if (!this.isAuto) {
        if (this.autoTimer) {
          clearTimeout(this.autoTimer);
          //		this.pwd = "";
        }
      } else {
      }
    },
    takePwd: function() {
      //点击切换记住密码
      if (this.isAuto) return;
      this.SetRememberPwd(!this.rememberPwd);
      if (!this.rememberPwd) {
        this.pwd = "";
      }
    },
    hideshadownew: function() {
      $(".shadownew").css("display", "none");
    },
    loginFun: function(nType) {
      //nType 0-点击登录按钮 1-自动登录
      var lPwd = "";
      if (nType == 0) {
        if (this.rememberPwd && this.realPwd != "") lPwd = this.realPwd;
        else lPwd = this.pwd;
      } else if (nType == 1) {
        lPwd = this.realPwd;
      }

      this.logingetinfo({
        url: this.urlInfo.baseUrl + this.urlInfo.loginPath,
        phoneNum: this.account,
        password: lPwd,
        deviceId: this.deviceId
      });
    },
    OnRegister: function() {
      router.push("register");
    },
    GetAutoData: function() //如果设置了自动登录,查询本地账号和密码
    {
      //显示手机号
      var uInfo = localStorage.getItem("userInfo");
      if(uInfo)
      {
         uInfo = JSON.parse(uInfo);
         this.account = uInfo.phone;
      }

      var isRem = localStorage.getItem("isRememberPwd");
      isRem = Boolean(isRem);
      if (isRem) 
      {
        this.SetRememberPwd(isRem);
        //var uInfo = localStorage.getItem("userInfo");
        if (uInfo)
        {
          //uInfo = JSON.parse(uInfo);
          //this.account = uInfo.phone;
          this.realPwd = uInfo.password;
          this.pwd = this.defaultPwd;
        }
      }

      var vAuto = localStorage.getItem("isAutoLogin");
      vAuto = Boolean(vAuto);
      if (vAuto) {
        this.SetRememberPwd(vAuto);
        this.SetAutoLogin(vAuto);
      }
    },
    GetRememberPwd: function() {
      // var isRememberPwd = localStorage.getItem("isRememberPwd");
      // let isBoolPwd = Boolean(isRememberPwd);
      // this.SetRememberPwd(isBoolPwd);
      // if(isBoolPwd) {
      // 	this.SetRememberPwd(true);
      // 	return true;
      // }
      // return false;
    },
    StartHeartbeat: function() //心跳包
    {
      var data = {
        url: this.urlInfo.baseUrl + this.urlInfo.heartbeatPath,
        data: JSON.stringify({
          userId: this.userInfo.userId,
          token: this.userInfo.token,
          deviceId: this.deviceId
        })
      };
      this.HeartbeatReq(data);
    },
    GetImportantNotice:function() //获取重要通知
    {
      axios.defaults.responseType = 'json';
				axios.post(this.urlInfo.baseUrl + this.urlInfo.importantPath,JSON.stringify({
            id: 0,
            userId: this.userInfo.userId,
            token: this.userInfo.token
					}))
					.then(response => {
            if(response.data.result=="0")
            {
              //设置重要消息
              this.importantTitle = response.data.noticeTitle;
              this.importantWelcome = response.data.welcome;
              this.importantInfo = response.data.noticeInfo;
              this.importantDetail = response.data.noticeImportant;
              this.importantRemark = response.data.remark;

              if(response.data.display=="1")
              {
                $(".shadownew").css("display","block");
                $(".mine-list span").click(function(){
                router.push({path:'/home',query:{title:"首页"}});
                })
              }
              else
              {
                router.push({path:'/home',query:{title:"首页"}});
              }
            }
              
					})
					.catch(error => {
						//console.log(error);
					});
    }
  
  }
};
</script>

<style>

</style>