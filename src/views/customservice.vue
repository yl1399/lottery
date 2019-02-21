<template>
	<div class="customservice">
	    <header class="service-header">
	    	<span @click="goHome()"><i class="iconfont icon-jiantou"></i>返回首页</span>
	    	<span>客服</span>
	    	<span v-text="serviceTxt ? '人工客服':'结束对话'" @click="changeServiceTxt()"></span> 
	    </header>
	    <ul class="service-content1">
	    	<li class="msgTime">
	    		<span>{{CustomerAutoInfo.msgTime}}</span>
	    	</li>
	    	<li class="welcomeWords">
	    		<span>{{CustomerAutoInfo.welcome}}</span>
	    	</li>
	    	<li v-for="(item,idx) in CustomerAutoInfo.array " class="normal-questions">
	    		
	    		<div v-if="item.type==1">
	    			<span >{{idx+':'}}</span>
	    			<span >{{item.question}}</span>
	    		</div>
	    		
	    	</li>
	    	<!--聊天内容-->
	    	<li v-for="(item,idx) in CustomerAutoInfo.autochats" class="msgContent" >
	    		<div :class="item.type==1?'left':'right'">
	    			<img v-if="item.type==0" :src="userInfo.headimg" />
	    			<img v-if="item.type==1" :src="autohead" />
	    			<span>{{item.name}}</span>
	    			<span><i v-for="(item1,idx1) in item.content">{{item1}}<br/></i></span>
	    		</div>
	    	</li>
	    
	    </ul>
	    <ul class="service-content2">
	    	<li class="tipWord">
	    		<span>{{CustomerMsgInfo.prompt}}</span>
	    	</li>
			<li v-for="(item,idx) in CustomerMsgInfo.array" class="msgcontent">
	    		<div :class="item.from_id==CustomerServerId?'left':'right'">
	    			<img v-if="item.from_id==CustomerServerId" :src="autohead" />
	    			<img v-if="item.from_id==userInfo.userId" :src="userInfo.headimg" />
	    			<span ></span> 
	    			<span>{{item.message}}</span>
	    		</div>
	    	</li>	    	
	    </ul>
		<div class="customer_chat" >
			<input id="sendinput" v-model="msg" :type="serviceTxt ?'number':'text'" placeholder="请输入您的问题"/>
			<span v-on:click="SendMsg()">发送</span>
		</div>
		<div class="service-shadow">
	  	     <div class="box">
	  	     	<p>选择客服</p>
	  	     	<p>确定要退出人工客服吗？</p>
	  	     	<p><span @click="confirmOK()">确定</span><span @click="hideShadow()">取消</span></p>
	  	     </div>
	  	</div>
	</div>
	
</template>

<script>
import { mapState ,mapActions } from 'vuex'
import router from "../router/index.js";
import { Toast } from 'mint-ui';
	  export default{
	  	data(){
	  		return{
	  			msg:'',
	  			autoName:"机器人小星星",
	  			autohead:"http://113.10.236.174:9999/img/custome/robot.png",
				customerhead:"http://113.10.236.174:9999/img/headpic/toux-0.png",
				getCustomerIDTimer:0,
				idTimerInterval:8000,
				msgTimerInterval:8000,
				getCustomerMsgTimer:0, 
				daojishiTimer:null,
				getChatTimer:null
	  		}
	  	},
	    computed:{
			...mapState([
			    'headerTitle',
			    'flag',
			    'isExit',
			    'userInfo',
				'urlInfo',
				'deviceId',
				'serviceTxt',
				'CustomerAutoInfo',
				'CustomerServerId',
				'CustomerMsgInfo',
				'isCustomer',
				'isCustomerClick',
				'isStopIDtimer',
				'isStopMsgtimer',
				'clickPeopleCustomeIndex',
				'leavePeopleCustomeTime',
				'clickPeopleCustomeTime',
				'imgBaseUrl',
				'customerTimer',
				'customerTimerInterval',
				'customerCount',
			]),
	        exitStatus: function() {
				return this.isExit;
			},
			showDlg:function()
			{
				return this.isCustomer;
			},
			stopIDtimer:function()
			{
				return this.isStopIDtimer;
			},
			stopMsgtimer:function()
			{
				return this.isStopMsgtimer;
			},
			CustomerAutoInfoListen:function(){
				return this.CustomerMsgInfo.array;
			},
			serviceTxtListen:function(){
				return this.serviceTxt;
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
			showDlg:function(newVal)
			{
				if(newVal)
				{
					//开定时器
					document.getElementById("sendinput").type = "text";
					// this.getCustomerIDTimer = setInterval(()=>{
					// 	this.GetCustomerId();
					// },this.idTimerInterval);
					this.getCustomerMsgTimer = setInterval(()=>{
						this.GetCustomerMsg();
					},this.msgTimerInterval);
				    //console.log("this.getCustomerIDTimer:" +this.getCustomerIDTimer + " this.getCustomerMsgTimer:" +this.getCustomerMsgTimer);
					// if(!this.isCustomerClick)
					// 	$(".service-shadow").css("display","block");
				}
				else
				{
					console.log("isCustomer false");
					document.getElementById("sendinput").type = "number";
					//关定时器
				//	clearInterval(this.getCustomerIDTimer);
					clearInterval(this.getCustomerMsgTimer);
				}
			},
			stopIDtimer:function(newVal)
			{
				//clearInterval(this.getCustomerIDTimer);
				this.SetStopIDtimer(false);
			},
			stopMsgtimer:function(newVal)
			{
				clearInterval(this.getCustomerMsgTimer);
				this.SetStopMsgtimer(false);
			},
			CustomerAutoInfoListen:function(newVal){
				//console.log(newVal);
				setTimeout(function(){
					var Height = $('.service-content2')[0].scrollHeight;
					$('.service-content2').scrollTop(Height);
				},10);
			},
			serviceTxtListen:function(newVal){
				console.log(newVal);
				if(newVal == false){
					$('.service-content1').hide();
					$('.service-content2').show();
				}
			}
		},
        methods:{
        	...mapActions([
        		'LogoutReq',
        		'changeServiceTitleReq',
        		'GetAutoQuestionReq',
        		'GetCustomerIdReq',
        		'SendMsgReq',
        		'GetMsgReq',
        		'FinshServerReq',
				'SetAutoChatsNull',
				'SetCustomerClick',
				'SetStopIDtimer',
				'SetStopMsgtimer',
				'ClearData',
				'getPeopleCustomeIndex',//修改点击人工客服的次数
				'getNowTime',//获取离开人工客服的时间
				'GoHome',
				'SetCustomertimer',
				'SetIsCustomer',
        	]),
			SendMsg:function()
			{
				
				if(this.msg==""){
					Toast({
							message: "发送消息不能为空",
							position:"middle",
							duration:2000
					    });
					return;
				}
				console.log(this.isCustomer);
				if(!this.serviceTxt)  //人工客服发送消息
				{
					
					var data = {
					url: this.urlInfo.baseUrl + this.urlInfo.sendmsgPath,
					data: JSON.stringify({
						srcId: this.userInfo.userId,
						token: this.userInfo.token,
						dstId: this.CustomerServerId,
						message:this.msg
						})
					};
					console.log(this.CustomerMsgInfo.prompt.length);
					if(this.CustomerMsgInfo.prompt === "当前没有客服服务 "){
						console.log("无客服");
						Toast({
							message: "当前无客服，请等待···",
							position:"middle",
							duration:3000
					    });
					}else{
                        this.SendMsgReq(data);
						this.CustomerMsgInfo.array.push({from_id:this.userInfo.userId,message:this.msg});
						setTimeout(function(){
							var Height = $('.service-content2')[0].scrollHeight;
							$('.service-content2').scrollTop(Height);
						},10);
						this.msg = "";
					
					}
					
				}
				else //自助客服发送消息时
				{
					var index = this.msg*1;
					var len = this.CustomerAutoInfo.array.length;
					var answer = "";
					if(index > len-2)
						answer = this.CustomerAutoInfo.otheranswer;
					else
						answer = this.CustomerAutoInfo.array[index].answer;
					console.log("自助客服的回答");
					console.log(answer);
					this.CustomerAutoInfo.autochats.push({name:this.userInfo.nickName,content:this.msg,type:0}); //0显示右边
					this.CustomerAutoInfo.autochats.push({name:this.autoName,content:answer,type:1});//1显示左边
						
						setTimeout(function(){
							var Height = $('.service-content1')[0].scrollHeight;
							$('.service-content1').scrollTop(Height);
						},10);

				}
				this.msg = "";
				
	        },
	        Logout: function() {
	        	//console.log("执行logout()");
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
			changeServiceTxt:function(){
				if(this.serviceTxt) //人工客服
				{
					//console.log("customer");
					//当点击人工客服时记录下点击的次数
					this.getPeopleCustomeIndex();
					if(this.clickPeopleCustomeIndex>1){
						
						var clickTime = new Date().getTime();
						//console.log(clickTime);
						//console.log(this.leavePeopleCustomeTime);
						var intervalTime = (clickTime - this.leavePeopleCustomeTime)/1000;
						//console.log(intervalTime);
						if(8-intervalTime>0){
							Toast({
								message:Math.ceil(8-intervalTime)+"s后才可以再次启用人工服务",
								position:"middle",
								duration:1000
							});
							return;
						}
					}
					this.GetCustomerId();
					
				}
				else //结束
				{
					$(".service-shadow").css("display","block");
				}
				
			},
			GetAutoQuestion: function() //获取自助客服问题列表
			{
				var data = {
					url: this.urlInfo.baseUrl + this.urlInfo.getQuestionPath,
					data: JSON.stringify({
						userId: this.userInfo.userId,
						token: this.userInfo.token
					})
				};
				this.GetAutoQuestionReq(data);
			},
			hideShadow(){
				$(".service-shadow").css("display","none");
			},
			confirmOK(){
				console.log("this.getCustomerIDTimer:" +this.getCustomerIDTimer + " this.	Q:" +this.getCustomerMsgTimer);
					//关定时器
			//	clearInterval(this.getCustomerIDTimer);
				clearInterval(this.getCustomerMsgTimer);
			//	this.CustomerServerId = 0;
				this.SetCustomertimer(0);
				this.SetIsCustomer(false);
				//点击确定时做的一些操作
				this.getNowTime();//获取每次离开人工客服的时间
				this.SetCustomerClick(false);
				this.changeServiceTxt(false);
				console.log("confirmOK this.customerTimer:",this.customerTimer);
				if(this.CustomerServerId>0)
					this.FinishServer();
				router.push("/home?title=首页");
				$(".service-shadow").css("display","none");
				
			},
			goHome(){
				router.push("/home?title=首页");
			},
			GetCustomerId: function() //获取人工客服ID
			{
				var data = {
					url: this.urlInfo.baseUrl + this.urlInfo.getCustomerIdPath,
					data: JSON.stringify({
						userId: this.userInfo.userId,
						token: this.userInfo.token
					})
				};
				this.GetCustomerIdReq(data);
			},
			GetCustomerMsg: function() //获取人工客服消息
			{
				var data = {
					url: this.urlInfo.baseUrl + this.urlInfo.getMsgPath,
					data: JSON.stringify({
						userId: this.userInfo.userId,
						token: this.userInfo.token
					})
				};
				this.GetMsgReq(data);
			},
			FinishServer:function() //客户结束客服对话
			{
				var data = {
				url: this.urlInfo.baseUrl + this.urlInfo.userFinishServerPath,
				data: JSON.stringify({
					userId: this.userInfo.userId,
					token: this.userInfo.token
				})
				};
				this.FinshServerReq(data);
			},
			CloseServer:function()   //三分钟处理函数
			{
				// console.log("三分钟处理函数this.customerTimer:" +this.customerTimer + "  this.CustomerServerId:" + this.CustomerServerId +
				// "  this.customerCount:" +this.customerCount);
					//关定时器
			//	clearInterval(this.getCustomerIDTimer);
				clearInterval(this.getCustomerMsgTimer);
			//	this.SetCustomertimer(0);
				this.SetIsCustomer(false);
			    this.SetCustomerClick(false);
				this.changeServiceTxt(false);
				if(this.CustomerServerId>0)
					this.FinishServer();

				clearInterval(this.customerTimer);
				console.log("CloseServer this.customerTimer:",this.customerTimer);
			//	this.CustomerServerId = 0;
			}

		},
		mounted: function()
		{
			if(this.customerTimer > 0)
			{
				// this.SetServiceTxt(true);
				// this.SetServiceTxt(false);
				$('.service-content1').hide();
				$('.service-content2').show();
				clearInterval(this.customerTimer);
				this.SetCustomertimer(0);
			//	console.log("this.customerTimer3333333333:",this.customerTimer);
			}else{
				//登录后获取自助问题
				this.SetAutoChatsNull();
				this.GetAutoQuestion();
				//当有聊天记录时，滚动条自动滚动到底部
				// var Height = $('.service-content1')[0].scrollHeight;
				// $('.service-content1').scrollTop(Height);
				
				//兼容苹果安卓手机
				var u = navigator.userAgent;    
				var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
				var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
				//var isAndroid = u.indexOf('Android') 
				//alert(u);
				if(isiOS == true){  //苹果footer上移问题
					$(".service-header").addClass("ios_service-header");
					$(".service-content1").addClass("ios_service-content1");
					$(".service-content2").addClass("ios_service-content2");
					$("input").on("focus",function(){
						//alert("聚焦");
						$("footer").hide();
						$(".customer_chat").addClass("customer_chat_add");
					});
					$("input").on("blur",function(){
						//alert("失去焦点");
						$("footer").show();
						$(".customer_chat").removeClass("customer_chat_add");
					});
				
				}else if(isAndroid){
					$(".service-header").addClass("andr_service-header");
					$(".service-content1").addClass("andr_service-content1");
					$(".service-content2").addClass("andr_service-content2");
					//软键盘弹出时隐藏底部footer
					var oHeight = $(document).height(); //浏览器当前的高度
					$(window).resize(function(){
						//alert(oHeight);
						//alert($(document).height());
						if($(document).height() < oHeight){  //软键盘弹出时
							$("footer").hide();
							//$("footer").css("display","none");
							$(".customer_chat").addClass("customer_chat_add");
						}else{
							$("footer").show();
							//$("footer").css("display","block");
							$(".customer_chat").removeClass("customer_chat_add");
						}
					});
				}
	    	}	
			
		},
		destroyed:function(){
			//clearInterval(this.getChatTimer);
		//	console.log("destroyed isCustomer:" + this.isCustomer);
			if(this.isCustomer) //人工客服
			{
				
				let interval = setTimeout(()=>{
					this.CloseServer();
				},this.customerTimerInterval);
				this.SetCustomertimer(interval);
			}
			
		}
		
			
	    	
	  }
	  
	
</script>

<style>
</style>