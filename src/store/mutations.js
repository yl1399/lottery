//mutations 只能同步修改state

//export default{
//各种请求方法，以及修改状态值

//}
import router from "../router/index.js"
import { randomBytes } from "crypto";
import { Toast } from 'mint-ui';
import { setTimeout } from "timers";

//微信充值
export const wxchangebg = (state, preload) => {
	state.wxbgflag = preload;
}
//支付宝充值
export const zfbchangebg = (state, preload) => {

	state.zfbbgflag = preload;
}

export const Ghide = (state)=>{
	state.gclose=true;
}


//登录获取个人信息
export const logingetinfo = (state, preload) => {
	//console.log(preload);
	//console.log("登录获取用户信息");
	switch(preload.result.result) {
		case "0":
			{
				//登录成功设置state.userInfo信息
				//console.log("登录状态:"+ state.userInfo.islogin);
				//console.log("login success");
				var imgIndex = preload.result.headPic;
				state.userInfo.userId = preload.result.userId;
				//state.userInfo.headimg = preload.result.headPic;//需要转为本地img地址
				//state.userInfo.headimg = "../../static/img/headpic/toux-"+preload.result.headPic+".png";  //修改图像
				state.userInfo.isTourist = preload.tourist;
				state.userInfo.islogin = true; //表示登录成功
				state.userInfo.nickName = preload.result.nickName;
				state.userInfo.phone = preload.result.phoneNum;
				state.userInfo.token = preload.result.token;
				state.userInfo.password = preload.password;
				state.userInfo.realName = preload.result.realName;
				state.userInfo.idCard = preload.result.identityCard;
				state.userInfo.recomCode = preload.result.recommendCode;
				if(preload.result.headPic.length <= 3) {
					state.userInfo.headimg = "http://113.10.236.174:9999/img/headpic/toux-" + preload.result.headPic + ".png"; //修改图像
				} else {
					state.userInfo.headimg = preload.result.headPic; //修改图像
				}

				

				if(!preload.tourist)
				{
					if (state.rememberPwd)
						localStorage.setItem("isRememberPwd", state.rememberPwd);
					else
						localStorage.setItem("isRememberPwd", "");
					if (state.isAuto)
						localStorage.setItem("isAutoLogin", state.isAuto);
					else
						localStorage.setItem("isAutoLogin", "");

					if (state.rememberPwd) {
						let jInfo = JSON.stringify(state.userInfo);
						if (jInfo)
							localStorage.setItem("userInfo", jInfo);
					}
				}
				
			}
			break;
		default:
		//	$(".shadownew").css("display", "block");
		//	$(".qop").html("用户名或者密码错误");
		//	$(".qop").html(preload.result.msg);
			Toast({
				message: preload.result.msg,
				position:"middle",
				duration:3000
			});
			break;
	}
}
//切换弹幕显示与隐藏
export const changeBarrageShow = (state) =>{
    state.barrageShowFlag = ! state.barrageShowFlag;
}
//修改barrageType 发弹幕
export const insertBarrage = (state) => {

	state.barrageType = "1";
	//console.log(state.barrageType)
}
//修改barrageType 发下注内容
export const insertPlayWay = (state) => {
	state.barrageType = "2";
	//console.log(state.barrageType)
}

//退出大厅时barrageType回到初始值
export const changeBarrageType = (state)=>{
	state.barrageType = "2";
}
//插入数据成功返回给前端结果
export const MsgToService = (state, preload) => {
	//console.log("下注信息");
	//console.log(preload);
	state.getSystemResult.result = preload.result;
	if(preload.msg){
        if(preload.result == "0"){
			for(let i=0;i<preload.msg.length;i++){
				state.getSystemResult.notice.push({
					noticeInfo: preload.msg[i],
					state: 'color0'
				});
			}
			
		}else{
			state.getSystemResult.notice.push({
				noticeInfo: preload.msg,
				state: 'color3'
			});
		}
	}
	
	
	
	if(state.getSystemResult.notice.length > 20) {
		let num = state.getSystemResult.notice.length -20;
		state.getSystemResult.notice.splice(0,num);
	}
}
//中奖信息
export const winningResultsMsg = (state, preload) => {
	//console.log("中奖");
	//console.log(state.winExpect);
	//console.log(preload.data.expect);
	//console.log(preload.data);
	if(preload.data.result == 1)    //为1的时候返回异常数据
	{
		return;
	}
	if(state.winExpect == preload.data.expect)
	{
		//console.log("中奖期号相同");
		return;
	}
    state.winExpect = preload.data.expect;
	var jlist = JSON.parse(preload.data.jsonlist);
	//console.log(typeof(jlist));
	for(let i = 0;i < jlist.length;i++)
	{
		//let aa = parseInt(jlist.jlist[i].substr(0,1));
		//console.log("aaaaaaaaa" + aa);
		//var s = (jlist[i].message).split(" ")[1].substring(0,2);
		let state_0 = ""
		//console.log(JSON.jlist[i]);
		if(jlist[i].state == "1"){
			//console.log("中奖");
		    state_0 = "color1";
		}else if(jlist[i].state == "0"){
			//console.log("未中奖");
			state_0 = "color2";
		}
		state.getSystemResult.notice.push({
			//noticeInfo: jlist[i].substr(1,jlist.length - 1)
			noticeInfo: jlist[i].message,
			state: state_0
		});
	}
	//console.log(state.getSystemResult.notice.length);
	if(state.getSystemResult.notice.length > 10) {
		let num = state.getSystemResult.notice.length -10;
		state.getSystemResult.notice.splice(0,num);
	}
	
}

//获取弹幕消息以及进行修改
export const BarrageMsg = (state, result) => {
	//console.log("拉取弹幕消息");
    //console.log(result);
	if(result.message * 1 > 0) {
		state.getBarrageResult.message = result.message * 1;
	} else {
		state.getBarrageResult.message = state.getBarrageResult.message;
	}
	//console.log("msg:"+state.getBarrageResult.message);
	state.getBarrageResult.list = result.array;
	

}
//获取下注消息以及对数据进行更新
export const OutcomeMsg = (state, result) => {
	//console.log("下注公告:");
	//console.log(result);
	if(result.message * 1 > 0){
		state.getOutcomeResult.message = result.message * 1;
	}else{
		state.getOutcomeResult.message = state.getOutcomeResult.message;
	}
	state.getOutcomeResult.list = state.getOutcomeResult.list.concat(result.array);

	var betlist = state.getOutcomeResult.list;
	//console.log("下注信息获取:");
	//console.log(betlist);
	for(var i = 0; i < betlist.length; i++) {
		if(!betlist[i].userName) {
			betlist[i].userName = "";
			betlist[i].state = "outcome_color1"
		}else{
			var words = betlist[i].barrage.split(" ")[0];
			//console.log(words);
			if(words == "下注"){
				//console.log(words);
				betlist[i].state = "outcome_color2"
			}else{
				//betlist[i].userName = "";
				betlist[i].state = "outcome_color3"
			}
		}
		
	}
	if(betlist.length > state.betlistLen) {
		//console.log("shift删除");
		//console.log(betlist.length);
		let num = betlist.length - state.betlistLen;
		state.getOutcomeResult.list.splice(0,num);
		//console.log(betlist.length);
	}
	if(betlist.length > 0) {
		var str = "";
		for(let i = 0; i < betlist.length; i++) {

			str += `<li class=${betlist[i].state}>
		    			<span>${betlist[i].userName}</span>
		    			<span>${betlist[i].barrage}</span>
		    		</li>	`;
		}

		$(".betlist").html(str);
	}

}
//获取系统公告以及对数据进行更新
export const SystemNotice = (state, result) => {
	//console.log("系统SystemNotice");
	//console.log(result);
	if(result.array.length){
		state.getSystemResult.list = state.getSystemResult.list.concat(result.array);
		//console.log(state.getSystemResult.list);
	}

	if(state.getSystemResult.list.length>10){
		let num = state.getSystemResult.list.length-10;
		state.getSystemResult.list.splice(0,num);
	}
    
	
}
//修改大厅音乐BGM状态
export const changeBGM = (state) => {
	state.musicflag = !state.musicflag;
}
//获取在线人数数据
export const GetOnlinePeople = (state, data) => {
	//console.log(data);
	state.onlineInfo = data;
	//console.log(state.onlineInfo.array.length);
}
//登录 设置自动登录标志
export const SetAutoLogin = (state, bAuto) => {
	state.isAuto = bAuto;
	if(bAuto){
		state.rememberPwd = bAuto;
		localStorage.setItem("isRememberPwd",true);
	}
}
//登录，设置记住密码
export const SetRememberPwd = (state,rpwd)=>{
	state.rememberPwd = rpwd;
	if(!rpwd){
		state.isAuto = false;
		localStorage.setItem("isAutoLogin","");
	}
}

//心跳包
export const HeartbeatRsp = (state, data) => {
	//console.log(state.deviceId);
	//console.log("心跳包"+data.result);
	//$("#heartmsg").html(state.deviceId);
	switch(data.result) {
		case "1":
			{
				state.isExit = true;
			}
		default:
			break;
	}
}

//登出
export const LogoutRsp = (state) => {
	//console.log("登出:999");
	clearInterval(state.heartbeatTimer); //关闭心跳包定时器
	clearInterval(state.HallIsStartTimer); //关闭大厅定时器
	state.userInfo.islogin = false;
	state.userInfo.headimg = "http://113.10.236.174:9999/img/photo.png";
	state.userInfo.nickName = "";
	state.userInfo.userId = 0;
	state.userInfo.token = "";
	//state.userInfo.phone = ""; //客户要求退出保留用户名(手机号)
	state.userInfo.password = "";
	state.userInfo.realName = "";
	state.userInfo.idCard = "";
	state.userInfo.recomCode = "";
	
	state.rememberPwd = false;
	state.isAuto 	  = false;
	let jInfo = JSON.stringify(state.userInfo);
	if(jInfo)
		localStorage.setItem("userInfo", jInfo);
	localStorage.setItem("isRememberPwd","");    //清除记住密码
	localStorage.setItem("isAutoLogin","");      //清除自动登陆


	//是否开启弹幕，回复到默认值开启
	state.barrageShowFlag = true;

	//回到首页之前清空一下数据
	//---------------------首页---------------------
	//页面
	state.showpageInfo.expect = "";
	state.showpageInfo.opencode = [];
	state.showpageInfo.nextTime = "";
	state.showpageInfo.dateTime = "";
	state.userPlayInfo = "";
	state.CountdownTimeString = "";
	//中奖TOP10
	state.userTopList = [];
	//倒计时
	state.CountdownInfo.min = 0;
	state.CountdownInfo.sec = 0;
	//往期
	state.pastInfo = [];
	//---------------------财富---------------------
	//---------------------大厅---------------------
	//弹幕
	state.getBarrageResult.message = -1;
	state.getBarrageResult.list = [];
	//下注
	state.getOutcomeResult.message = -1;
	state.getOutcomeResult.list = [];
	//系统消息
	state.getSystemResult.list = [];
	state.getSystemResult.notice = [];
	//中奖期号
	state.winExpect = "";

	router.push("/");

	if(state.isExit) {
		Toast({
			message:"您的账号正在另外一个地方登陆,您将被迫下线",
			position:"middle",
			duration:2000
		});
		setTimeout(()=>{
            router.push("/");
			router.go(0);
		},2500);
		
	}else{
		router.push("/");
		
	}
	state.isExit = false;
	
}

//修改心跳包定时器ID
export const SetHeartbeatTimer = (state, nID) => {
	state.heartbeatTimer = nID;
}

//修改hall定时器ID
export const SetHallTimer = (state, nID) => {
	state.HallIsStartTimer = nID;
}



//修改hall定时器ID
export const SetHallTimer_pc = (state, nID) => {
	state.HallIsStartTimer_pc = nID;
}
//获取设备ID
export const deviceIdinfo = (state, result) => {
	//console.log(result);
	if(result.result == "0") {
		state.deviceId = result.deviceId;
		localStorage.setItem("deviceId", result.deviceId);
		console.log(state.deviceId);
	}
}
//设置deviceId
export const SetDeviceId = (state, deviceId) => {
	state.deviceId = deviceId;
}

//获取当日流水
export const queryDayRecordinfo = (state, result) => {
	//console.log(result);

	if(result.result == "0") {
		state.wealthInfo.todayincom = result.array.incom;
		state.wealthInfo.bettingMoney = result.array.bettingMoney;
		state.wealthInfo.winningaMount = result.array.winningaMount;
		state.wealthInfo.fallintoMoney = result.array.fallintoMoney;
	}

}

//获取资产财富
export const queryWealthinfo = (state, result) => {
	//console.log(result);

	if(result.result == "0") {
		state.queryWealthInfo.generalAssets = result.array.generalAssets;
		state.queryWealthInfo.accountFunds = result.array.accountFunds;
		state.queryWealthInfo.accountFreeze = result.array.accountFreeze;

	}

}

//获取充值提现记录
export const queryRecordinfo = (state, result) => {
	//console.log(result);
    //console.log("充值提现记录");
	if(result.result == "0") {
		state.queryRecordInfo = result.array;

	}

}

//完善个人信息
export const perfectUserInfo = (state, preload) => {
	//console.log(result);
	var flag = preload.result.result;
	switch(flag) {
		case "0":

			state.userInfo.headimg = "http://113.10.236.174:9999/img/headpic/toux-" + preload.data.headPic + ".png";
			state.userInfo.nickName = preload.data.userName;
			state.userInfo.phone = preload.data.phoneNum;
			state.userInfo.realName = preload.data.realName;
			state.userInfo.idCard = preload.data.identityCard;
			state.userInfo.recomCode = preload.data.recommendCode;
			Toast({
				message:"保存成功",
				position:"middle",
				duration:1000
			});
			setTimeout(()=>{
                router.push("/mine?title=我的");
			},1500);
			
			break;
		default:
			//$(".myselfinfo-shadow").css("display", "block");
			//$(".errmsg").html(preload.result.msg);
			Toast({
				message:preload.result.msg,
				position:"middle",
				duration:3000
			});
			break;

	}

}

//获取首页开奖信息
export const showpageinfo = (state, result) => {
	//console.log("开奖信息");
	//console.log(result);

	if(result.result.result == "0") {
		if(result.index==1){
			state.showpageInfo.expect = result.result.expect;
			state.showpageInfo.nextTime = result.result.nextTime;
			state.showpageInfo.dateTime = result.result.dateTime;
			state.CountdownInfo.min = parseInt(result.result.dateTime.substr(0, 2));
			state.CountdownInfo.sec = parseInt(result.result.dateTime.substr(3, 2));
			state.showpageInfo.opencode = result.result.opencode.split("");
			state.userPlayInfo = result.result.playInfo;
			state.userTopList=result.result.userTop10List;
		}else if(result.index==2){
			state.showpageInfo_pc.expect = result.result.expect;
			state.showpageInfo_pc.nextTime = result.result.nextTime;
			state.showpageInfo_pc.dateTime = result.result.dateTime;
			state.CountdownInfo_pc.min = parseInt(result.result.dateTime.substr(0, 2));
			state.CountdownInfo_pc.sec = parseInt(result.result.dateTime.substr(3, 2));
			state.showpageInfo_pc.opencode = result.result.opencode.split("");
			state.userPlayInfo_pc = result.result.playInfo;
			state.userTopList_pc=result.result.userTop10List;
		}
		// var mySwiper = new Swiper('.swiper-container', { 
		// 	autoplay: 3000,
		// 	autoplayDisableOnInteraction : false
		// })
		// if(result.userTop10List.length==0){
		// 	$(".swiper-wrapper").css("display","none");
		// }
		// if(result.userTop10List.length<=5){
		// 	mySwiper.lockSwipes();
		// 	$(".swiper-wrapper ul:first-child").css("display","block");
		// 	$(".swiper-wrapper ul:last-child").css("display","none");
			
		// }
		// if(result.userTop10List.length>5){
		// 	mySwiper.unlockSwipes();
		// 	$(".swiper-wrapper ul:first-child").css("display","block");
		// 	$(".swiper-wrapper ul:last-child").css("display","block");
		// }

	}

}

//获取首页倒计时信息
export const HallCountdowninfo = (state, result) => {
	// console.log(result);

	if(result.result.result == "0") {
		state.CountdownInfo.min = parseInt(result.result.dateTime.substr(0, 2));
		state.CountdownInfo.sec = parseInt(result.result.dateTime.substr(3, 2));
	}

}

//获取首页倒计时信息
export const HallCountdowninfo_pc = (state, result) => {
	// console.log(result);

	if(result.result.result == "0") {
		state.CountdownInfo_pc.min = parseInt(result.result.dateTime.substr(0, 2));
		state.CountdownInfo_pc.sec = parseInt(result.result.dateTime.substr(3, 2));
	}

}

//设置倒计时
export const SetCountdownInfo = (state, obj) => {
	state.CountdownInfo.min = obj.min;
	state.CountdownInfo.sec = obj.sec;
}
//
export const SetDrawingIsSetTimer = (state, obj) => {
	state.DrawingIsSetTimer = obj;
}

export const SetDrawingIsSetTimer_pc = (state, obj) => {
	state.DrawingIsSetTimer_pc = obj;
}

//投注详情的下拉上拉列表
export const XialaToShangla = (state) => {
	state.cathecticList = !state.cathecticList;
}
export const  clearxiala = (state) =>{
	state.cathecticList = false;
}
//投注查询
export const getMyOrderData = (state,preload)=>{
	//console.log("投注");
	//console.log(preload);
	//state.orderInfo = [];
	state.orderInfo = state.orderInfo.concat(preload.array);

}

//清除投注列表
export const clearOrderList = (state)=>{
	//console.log("清除");
	state.orderInfo = [];
}

//投注查询详情
export const OrderDetail = (state,preload)=>{
	//console.log("投注详情");
	//console.log(preload);
	state.orderDetail = preload;
}

//获取往期开奖
export const pastinfo = (state, result) => {
	//console.log("往期开奖");
	//console.log(result);

	if(result.result == "0") {
		state.pastInfo = state.pastInfo.concat(result.array);

		var summation = new Array();
		//根据开奖结果判断开奖类型
		for(var i = 0; i < state.pastInfo.length; i++) {
			summation[i] = parseInt(state.pastInfo[i].opencode[0]) + parseInt(state.pastInfo[i].opencode[1]) + parseInt(state.pastInfo[i].opencode[2]);

		}
//		console.log(state.pastInfo);
//		console.log(summation);
		for(var j = 0; j < summation.length; j++) {
			var id = "state_" + j;
			if(summation[j] % 2 == 0) {
				if(summation[j] >= 14) {
					document.getElementsByClassName(id)[0].innerHTML = "大双";
				} else {

					document.getElementsByClassName(id)[0].innerHTML = "小双";
				}
			} else if(summation[j] % 2 == 1) {

				if(summation[j] >= 14) {
					document.getElementsByClassName(id)[0].innerHTML = "大单";
				} else {
					document.getElementsByClassName(id)[0].innerHTML = "小单";
				}
			}

		}

	}

}
//清除往期数据
export const clearPastInfo = (state)=>{
	state.pastInfo = [];
}

//修改密码
//export const updatepassinfo = (state, result) => {
//	console.log(result);
//	if(result.result == "0"){
//		$(".shadownew").css('display', 'block');
//		$(".qop").html("修改成功");
//		$(".sclose").css('display', 'none');
//		$(".ahide").css('display', 'block');
//	}else{
//		$(".shadownew").css('display', 'block');
//		$(".qop").html(result.msg);
//	}
//
//}


//切换人工客服以及自助客服
export const changeServiceTitleRsp = (state,obj)=>{
	state.serviceTxt = obj;
	//console.log("serviceTxt:");
	//console.log(state.serviceTxt);
}

//获取自助客服问题
export const GetAutoQuestionRsp = (state, result) => {
	//console.log("获取自助客服问题");
	//console.log(result);
	if(result.result == "0") 
	{
		state.CustomerAutoInfo.array = result.array;
		state.CustomerAutoInfo.msgTime = result.msgTime;
		for(var i=0;i<result.array.length;i++)
		{
			if(result.array[i].type==0)
				state.CustomerAutoInfo.welcome = result.array[i].question;
			else if(result.array[i].type==2)
				state.CustomerAutoInfo.otheranswer = result.array[i].question;
		}
		state.isCustomer = false;
		state.serviceTxt = true;
	}

}
//获取人工客服ID
export const GetCustomerIdRsp = (state, result) => {
	//console.log(result);
//	state.serviceTxt = false;
	if(result.result == "0") 
	{
		state.CustomerServerId = result.serverId;
		state.CustomerMsgInfo.prompt = "";
		state.isCustomer = true;
	//	state.isCustomerClick = true;
		state.isStopIDtimer = true;
		state.serviceTxt = false;
	}
	else if(result.result=="1") //结束客服
	{
		//置空
		//state.CustomerAutoInfo.autochats = [];
		//state.CustomerAutoInfo.array = [];
		//state.CustomerAutoInfo.chats = [];
		//state.CustomerAutoInfo.msgTime = "";
		//state.CustomerAutoInfo.welcome = "";

		state.CustomerMsgInfo.prompt = result.msg;
		state.isCustomer = false;
		Toast({
			message: result.msg,
			position:"middle",
			duration:2000
		});
	 //   state.isCustomerClick = false;
	}
	else if(result.result=="2")
	{
		state.CustomerMsgInfo.prompt = result.msg;
		state.isCustomer = false;
		Toast({
			message: result.msg,
			position:"middle",
			duration:2000
		});
    //	state.isCustomerClick = true;
	}
}
//用户发送消息给人工客服
export const SendMsgRsp = (state, result) => {
	//console.log(result);
	if(result.result == "0") 
	{
		//state.queryRecordInfo = result.array;

	}

}
//用户获取消息(人工客服)
export const GetMsgRsp = (state, result) => {
	//console.log("获取自助消息");
	//console.log(result);
	if(result.result == "0") 
	{
		state.CustomerMsgInfo.array = state.CustomerMsgInfo.array.concat(result.Arraymsg);
		if(state.customerTimer > 0)
		{
			state.customerCount += result.msg_count;
		}else
		{
			state.customerCount = 0;
		}
		
		if(result.Arraymsg[0].msgid==-1)
		{
			//客服结束对话
			console.log("客服聊天结束");
			state.isStopIDtimer = true;
			state.isStopMsgtimer = true;
			state.isCustomer = false;
			state.serviceTxt = true;
		}
		else if(result.Arraymsg[0].msgid==0)
		{
			state.isStopIDtimer = true;
		}
		
	}
}
//用户结束(人工客服)
export const FinshServerRsp = (state, result) => {
	//console.log(result);
	if(result.result == "0") 
	{
		//state.queryRecordInfo = result.array;

	}

}
//
export const SetAutoChatsNull = (state) => {
	state.CustomerAutoInfo.autochats = [] ;
}

//邀请有礼数据
export const getInviteData = (state,preload)=>{
	if(preload.result=="0"){
		state.inviteData = preload;
	}
}

//
export const showSearch = (state)=>{
	
	state.searchFlag = !state.searchFlag;
	//console.log("往期显示"+state.searchFlag);
}
export const hideSearch = (state)=>{
	state.searchFlag = !state.searchFlag;
	//console.log("往期隐藏"+state.searchFlag);
}

export const SetAutoNull = (state) => {
	state.CustomerAutoInfo.autochats = [];
	state.CustomerAutoInfo.array = [];
	state.CustomerAutoInfo.chats = [];
	state.CustomerAutoInfo.msgTime = "";
	state.CustomerAutoInfo.welcome = "";

}
//修改客服Id定时器ID
export const SetCustomerIdTimer = (state,nID)=>{
	state.GetCustomerIdTimer = nID;
}

//修改拉取消息定时器
export const SetGetMsgTimer = (state,nID)=>{
	state.GetMsgTimer = nID;
}
//设置客服是否为人工客服状态
export const SetCustomerValueRsp = (state,nID)=>{
	state.isCustomer = nID;
}
//设置客服是否是点击退出
export const SetCustomerClickRsp = (state,bClick)=>{
	state.isCustomerClick = bClick;
}
//设置是否关闭客服获取客服ID定时器
export const SetStopIDtimer = (state,bVal)=>{
	state.isStopIDtimer = bVal;
}
//设置是否关闭客服获取消息定时器
export const SetStopMsgtimer = (state,bVal)=>{
	state.isStopMsgtimer = bVal;
}//}

//设置是否关闭客服获取消息三分钟定时器
export const SetCustomertimer = (state,nID)=>{
	state.customerTimer = nID;
}//}

//设置客服获取消息条数
export const SetCustomerCount = (state,nNumber)=>
{
	state.customerCount = nNumber;
}

//设置是否人工客服
export const SetIsCustomer = (state,bVal)=>
{
	state.isCustomer = bVal;
}

//彩钻转金额
export const withdrowCashinfo = (state, result) => {
	//console.log(result);

	if(result.result == "0") {
		state.withdrowCashInfo = result.withdrawDiamond;

	}
	if(result.result == "1") {
		//$(".shadownew").css('display', 'block');
		//$(".qop").html(result.msg);
		Toast({
			message: result.msg,
			position: "middle",
			duration: 2000
		});

	}
	// if(result.result == "2") {
	// 	$(".Gcashmoney").html(0);

	// }

}

//自动提现
export const getcashMoneyinfo = (state, result) => {
	console.log(result);

	if(result.result == "0") {
		// $(".shadownew").css('display', 'block');
		// $(".qop").html(result.msg);
		// $(".sclose").css('display', 'none');
		// $(".ahide").css('display', 'block');
		Toast({
			message: result.msg,
			position: "middle",
			duration: 2000
		});
		setTimeout(()=>{
			router.push("/wealth?title=财富");
		},2010)

	}else{
		Toast({
			message: result.msg,
			position: "middle",
			duration: 3000
		});
	}

}

//退出时清理数据
export const ClearData = (state) =>{
	clearInterval(state.heartbeatTimer); //关闭心跳包定时器
	clearInterval(state.HallIsStartTimer); //关闭大厅定时器
	state.userInfo.islogin = false;
	state.userInfo.headimg = "http://113.10.236.174:9999/img/photo.png";
	state.userInfo.nickName = "";
	state.userInfo.userId = 0;
	state.userInfo.token = "";
	//state.userInfo.phone = ""; //客户要求保留20180222 cl
	state.userInfo.password = "";
	state.userInfo.realName = "";
	state.userInfo.idCard = "";
	state.userInfo.recomCode = "";
	
	state.rememberPwd = false;
	state.isAuto 	  = false;
	let jInfo = JSON.stringify(state.userInfo);
	if(jInfo)
		localStorage.setItem("userInfo", jInfo);
	localStorage.setItem("isRememberPwd","");    //清除记住密码
	localStorage.setItem("isAutoLogin","");      //清除自动登陆
	state.userInfo.isTourist = false;


	
	
	//是否开启弹幕，回复到默认值开启
	state.barrageShowFlag = true;

	//回到首页之前清空一下数据
	//---------------------首页---------------------
	//页面
	state.showpageInfo.expect = "";
	state.showpageInfo.opencode = [];
	state.showpageInfo.nextTime = "";
	state.showpageInfo.dateTime = "";
	state.userPlayInfo = "";
	state.CountdownTimeString = "";
	//中奖TOP10
	state.userTopList = [];
	//倒计时
	state.CountdownInfo.min = 0;
	state.CountdownInfo.sec = 0;
	//往期
	state.pastInfo = [];
	//---------------------财富---------------------
	//---------------------大厅---------------------
	//弹幕
	state.getBarrageResult.message = -1;
	state.getBarrageResult.list = [];
	//下注
	state.getOutcomeResult.message = -1;
	state.getOutcomeResult.list = [];
	//系统消息
	state.getSystemResult.list = [];
	state.getSystemResult.notice = [];
	//中奖期号
	state.winExpect = "";

	if(state.isExit) {
		Toast({
			message:"您的账号正在另外一个地方登陆,您将被迫下线",
			position:"middle",
			duration:2000
		});
		setTimeout(()=>{
            router.push("/");
			router.go(0);
		},2500);
		
	}else{
		router.push("/");
	}

}

//点击修改人工客服的次数
export const getPeopleCustomeIndex = (state)=>{
	state.clickPeopleCustomeIndex++;
	//console.log(state.clickPeopleCustomeIndex);
}

//获取离开人工客服时当前时间
export const getNowTime = (state)=>{
	state.leavePeopleCustomeTime = new Date().getTime();
	//console.log(state.leavePeopleCustomeTime);
}

export const UpdateCountdown = (state,obj)=>{
	state.CountdownInfo.min = obj.min;
	state.CountdownInfo.sec = obj.sec;
	if(state.CountdownInfo.min == 0 && state.CountdownInfo.sec == 0) {
		state.CountdownString = "即将开奖";
	} else if(state.CountdownInfo.min >= 0) {
		state.CountdownInfo.sec--;
		if(state.CountdownInfo.sec < 0) {
			if(state.CountdownInfo.min > 0) {
				state.CountdownInfo.sec = 59;
				state.CountdownInfo.min--;
			} else
			state.CountdownInfo.sec = 0;
		}
	
		var str = "";
		if(state.CountdownInfo.min < 10) {
			str += "0";
		}
		str += state.CountdownInfo.min;
		str += ":";

		if(state.CountdownInfo.sec < 10) {
			str += "0";
		}
		str += state.CountdownInfo.sec;
		
		state.CountdownString = str;
	}
}


export const UpdateCountdown_pc = (state,obj)=>{
	state.CountdownInfo_pc.min = obj.min;
	state.CountdownInfo_pc.sec = obj.sec;
	if(state.CountdownInfo_pc.min == 0 && state.CountdownInfo_pc.sec == 0) {
		state.CountdownString_pc = "即将开奖";
	} else if(state.CountdownInfo_pc.min >= 0) {
		state.CountdownInfo_pc.sec--;
		if(state.CountdownInfo_pc.sec < 0) {
			if(state.CountdownInfo_pc.min > 0) {
				state.CountdownInfo_pc.sec = 59;
				state.CountdownInfo_pc.min--;
			} else
			state.CountdownInfo_pc.sec = 0;
		}
	
		var str = "";
		if(state.CountdownInfo_pc.min < 10) {
			str += "0";
		}
		str += state.CountdownInfo_pc.min;
		str += ":";

		if(state.CountdownInfo_pc.sec < 10) {
			str += "0";
		}
		str += state.CountdownInfo_pc.sec;
		
		state.CountdownString_pc = str;
	}
}


//设置平台标记
export const SetPlatform = (state,id)=>{
	state.platform = id;
    //底部footer的图片索引值回归到0
	state.imgnum = 0;
	
		//弹幕下注标识回归到最初的状态
		//state.barrageType = "2";
	
		//是否开启弹幕，回复到默认值开启
		state.barrageShowFlag = true;
		
		//回到首页之前清空一下数据
		//---------------------首页---------------------
		//页面
		state.showpageInfo.expect = "";
		state.showpageInfo.opencode = [];
		state.showpageInfo.nextTime = "";
		state.showpageInfo.dateTime = "";
		state.userPlayInfo = "";
		state.CountdownTimeString = "";
		//中奖TOP10
		state.userTopList = [];
		//倒计时
		state.CountdownInfo.min = 0;
		state.CountdownInfo.sec = 0;
		//往期
		state.pastInfo=[];
		//---------------------财富---------------------
		//---------------------大厅---------------------
		//弹幕
		state.getBarrageResult.message = -1;
		state.getBarrageResult.list = [];
		//下注
		state.getOutcomeResult.message = -1;
		state.getOutcomeResult.list = [];
		//系统消息
		state.getSystemResult.list = [];
		state.getSystemResult.notice = [];
		//中奖期号
		state.winExpect = "";
		//---------------------客服--------------------

}



//时时彩app
export const changeImg = (state,idx)=>{
	state.imgnum = idx;
}
export const changeFooterIndex = (state)=>{
	state.imgnum = 0;
}
export const GoHome = (state)=>{
	router.push("/home?title=首页");
}
export const gotoService = (state)=>{
	state.imgnum = 3;
	router.push("/lottery/customservice?title=客服");
}

//获取时时彩首页开奖信息
export const showpageinfo_ly = (state, result) => {
	if(result.result == "0") {
		state.showpageInfo.expect = result.expect;
		state.showpageInfo.nextTime = result.nextTime;
		state.showpageInfo.dateTime = result.dateTime;
		state.userTopList=result.userTop10List;
	    state.userPlayInfo = result.playInfo;
		state.showpageInfo.opencode = result.opencode.split("");
		state.CountdownInfo.min = parseInt(result.dateTime.substr(0, 2));
		state.CountdownInfo.sec = parseInt(result.dateTime.substr(3, 2));
	}
}

//获取首页滚动公告
export const AppNoticeRsp = (state, data) => {
	//console.log("获取首页滚动公告");
	//console.log(data);
	if(data.result=="0"&&data.arrayMsg.length>0)
	{
		state.appNoticeInfo = data.arrayMsg;
	}
	//console.log(state.appNoticeInfo);
}

export const modifyIndex = (state,idx)=>{
	state.navIndex1 = idx;
}

//获取首页广告地址
export const HomeAdRsp = (state, data) => {
	//console.log("获取首页广告地址");
	//console.log(data);
	if(data.result=="0"&&data.array.length>0)
	{
		state.homeAdArray = data.array;
	}
	
}

export const GetLotteryOdds = (state,result)=>{
	//console.log(result);
	var oddsList = result.ssc_PayRule;
	for(let i=0;i<oddsList.length;i++){
		if(i<9){
			state.ssc_addPayRule.push(oddsList[i]);
		}
		if(i== oddsList.length-1){
			var payMultiple = oddsList[i].payMultiple;
			//var ssc_numberPositionRule = state.ssc_numberPositionRule;
			for(let j=0;j<state.ssc_numberPositionRule.length;j++){
				state.ssc_numberPositionRule[j].payMultiple = payMultiple;
			}
		}
	}
	//state.ssc_numberPayRule = result.ssc_PayRule.splice(0,9);
	//console.log(state.ssc_numberPayRule);
}