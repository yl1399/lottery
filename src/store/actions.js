
//export const increment = ({commit}) => {
//  commit('INCREMENT')
//}
import axios from "axios"

import router from "../router/index.js"
import store from './index'

//修改充值页面的微信充值时，点击金额时修改背景颜色
export const wxchangebg = ({commit},preload)=>{
	commit('wxchangebg',preload)
}
//修改充值页面的支付宝充值时，点击金额时修改背景颜色
export const zfbchangebg = ({commit},preload)=>{
	commit('zfbchangebg',preload)
}

//登录发送请求参数
export const logingetinfo = ({commit},obj)=>{
	axios.defaults.responseType = 'json';
	axios.post( obj.url,{phoneNum:obj.phoneNum,password:obj.password,deviceId:obj.deviceId}
	    )
	    .then(res=>{
			return res.data;
		})
		.then(result=>{
			//console.log(result);
			commit('logingetinfo',{result:result,password:obj.password,tourist:false})
		})
		.catch(function(error) {
			//console.log(error);
		});
	
}
export const Ghide = ({commit})=>{
	commit('Ghide')
}

//游客登录
export const TouristLoginReq = ({commit},obj)=>{
	axios.defaults.responseType = 'json';
	axios.post( obj.url,obj.data )
	    .then(res=>{
			return res.data;
		})
		.then(result=>{
			//console.log(result);
			commit('logingetinfo',{result:result,password:obj.password,tourist:true})
		})
		.catch(function(error) {
			//console.log(error);
		});
	
}

//返回上一级的函goback()
export const  goback=()=>{
	router.go(-1);
}
//返回home页面
export const GoHome=({commit})=>{
	commit("GoHome");
}
//时时彩点击“X”后底部footer索引值变成0
export const changeFooterIndex = ({commit})=>{
	commit("changeFooterIndex");
}
//hall页面的函数
//切换开启关闭弹幕设置
export const changeBarrageShow = ({commit})=>{
	commit('changeBarrageShow');
}
//修改是弹幕还是下注
export const insertBarrage = ({commit})=>{
	commit('insertBarrage')
}
//修改是弹幕还是下注
export const insertPlayWay = ({commit})=>{
	commit('insertPlayWay')
}

//退出当前页面时barrageType回到最初值
export const changeBarrageType = ({commit})=>{
	commit('changeBarrageType');
}
//获取弹幕消息
export const BarrageMsg = ({commit},obj)=>{
	axios.post(obj.url,obj.data ).then(res=>{
			return res.data;
		}).then(result=>{
			commit('BarrageMsg',result)
		}).catch(function(error) {
			//console.log(error);
		});
}
//获取下注消息显示到公告栏
export const OutcomeMsg = ({commit},obj)=>{
	console.log("bet:"+obj.index);
	axios.post(obj.url,obj.data
        ).then(res=>{
	        return res.data;
        }).then(result=>{
        	commit('OutcomeMsg',result)
        }).catch(err=>{
        	//console.log(err);
        })
}
//获取中奖消息显示到公告栏
export const winningResultsMsg = ({commit},obj)=>{
//	console.log("bet:"+obj.index);
	axios.post(obj.url,obj.data
        ).then(res=>{
	        return res.data;
        }).then(result=>{
        	commit('winningResultsMsg',result)
        }).catch(err=>{
        	//console.log(err);
        })
}
//获取系统公告到页面显示
export const SystemNotice = ({commit},obj)=>{
	axios.post(obj.url,obj.data
        ).then(res=>{
	        return res.data;
        }).then(result=>{
        	commit('SystemNotice',result)
        }).catch(err=>{
        	//console.log(err);
        })
}
//插入消息到服务器
export const MsgToService=({commit},obj)=>{
    axios.defaults.responseType = 'json';
	axios.post(obj.url,JSON.stringify(obj.data)
	   ).then(res=>{
		    return res.data;
		}).then(result=>{
			commit("MsgToService",result)
		}).catch(error=>{
		   console.log(error);
	    })
}

//hall页面的函数
//修改BGM状态
export const changeBGM = ({commit})=>{
	commit('changeBGM');
}
//大厅获取在线人数
export const GetOnlinePeople = ({commit},obj)=>{
	//console.log("online:");
	//console.log(obj.data);
	axios.defaults.responseType = 'json';
	axios.post( obj.url,obj.data )
	    .then(res=>{
			return res.data;
		})
		.then(result=>{
			//console.log(result);
			commit('GetOnlinePeople',result)
		})
		.catch(function(error) {
			//console.log(error);
		});
	
}

//登录 设置自动登录标志
export const SetAutoLogin = ({commit},bAuto)=>
{
	commit("SetAutoLogin",bAuto);
}
//登录，设置记住密码
export const SetRememberPwd = ({commit},rpwd)=>{
	commit("SetRememberPwd",rpwd);
}
//发送心跳包
export const HeartbeatReq = ({commit},obj)=>{
	axios.defaults.responseType = 'json';
	axios.post( obj.url,obj.data )
	    .then(res=>{
			return res.data;
		})
		.then(result=>{
			//console.log(result);
			commit('HeartbeatRsp',result)
		})
		.catch(function(error) {
			//console.log(error);
		});
	
}

//登出请求
export const LogoutReq = ({commit},obj)=>{
	//console.log("logout 1");
	axios.defaults.responseType = 'json';
	axios.post( obj.url,obj.data )
	    .then(res=>{
			return res.data;
		})
		.then(result=>{
			//console.log(result);
			commit('LogoutRsp',result)
		})
		.catch(function(error) {
			//console.log(error);
		});
	
}

//设置心跳定时器
export const SetHeartbeatTimer = ({commit},nID)=>
{
	commit("SetHeartbeatTimer",nID);
}

//设置hall定时器
export const SetHallTimer = ({commit},nID)=>
{
	
	commit("SetHallTimer",nID);
}

export const SetHallTimer_pc = ({commit},nID)=>
{
	
	commit("SetHallTimer_pc",nID);
}

//首页获取设备ID
export const deviceIdinfo = ({commit},obj)=>{
	axios.defaults.responseType = 'json';
	axios.post( obj.url
	    )
	    .then(res=>{
			return res.data;
		})
		.then(result=>{
//			console.log(result);
			commit('deviceIdinfo',result)
		})
		.catch(function(error) {
			//console.log(error);
		});
	
}
//设置deviceId
export const SetDeviceId = ({commit},deviceId)=>
{
	commit("SetDeviceId",deviceId);
}


//财富获取当日流水
export const queryDayRecordinfo = ({commit},obj)=>{
	axios.defaults.responseType = 'json';
	axios.post( obj.url,
		JSON.stringify({userId:obj.userId,token:obj.token})
	    )
	    .then(res=>{
			return res.data;
		})
		.then(result=>{
//			console.log(result);
			commit('queryDayRecordinfo',result)
		})
		.catch(function(error) {
			//console.log(error);
		});
	
}


//财富查询
export const queryWealthinfo = ({commit},obj)=>{
	axios.defaults.responseType = 'json';
	axios.post( obj.url,
		JSON.stringify({userId:obj.userId,token:obj.token})
	    )
	    .then(res=>{
			return res.data;
		})
		.then(result=>{
//			console.log(result);
			commit('queryWealthinfo',result)
		})
		.catch(function(error) {
			//console.log(error);
		});
	
}





//充值提现记录查询
export const queryRecordinfo = ({commit},obj)=>{
	axios.defaults.responseType = 'json';
	axios.post( obj.url,
		JSON.stringify({userId:obj.userId,token:obj.token,types:obj.types,pageNow:obj.pageNow,pageSize:obj.pageSize})
	    )
	    .then(res=>{
			return res.data;
		})
		.then(result=>{
//			console.log(result);
			commit('queryRecordinfo',result)
		})
		.catch(function(error) {
			//console.log(error);
		});
	
}
//完善个人信息
export const perfectUserInfo = ({commit},obj)=>{
	axios.defaults.responseType = 'json';
	axios.post( obj.url,JSON.stringify(obj.data)
	    )
	    .then(res=>{
			return res.data;
		})
		.then(result=>{
			commit('perfectUserInfo',{result:result,data:obj.data})
		})
		.catch(function(error) {
			console.log(error);
		});
}

//首页开奖信息查询
export const showpageinfo = ({commit},obj)=>{
	axios.defaults.responseType = 'json';
	axios.post( obj.url,obj.data)
	    .then(res=>{
			return res.data;
		})
		.then(result=>{
//			console.log(result);
			commit('showpageinfo',{result:result,index:obj.index})
		})
		.catch(function(error) {
			//console.log(error);
		});
	
}

//首页倒计时查询
export const HallCountdowninfo = ({commit},obj)=>{
	axios.defaults.responseType = 'json';
	axios.post( obj.url,obj.data)
	    .then(res=>{
			return res.data;
		})
		.then(result=>{
//			console.log(result);
			commit('HallCountdowninfo',{result:result,index:obj.index})
		})
		.catch(function(error) {
			//console.log(error);
		});
	
}

//首页倒计时查询
export const HallCountdowninfo_pc = ({commit},obj)=>{
	axios.defaults.responseType = 'json';
	axios.post( obj.url,obj.data)
	    .then(res=>{
			return res.data;
		})
		.then(result=>{
//			console.log(result);
			commit('HallCountdowninfo_pc',{result:result,index:obj.index})
		})
		.catch(function(error) {
			//console.log(error);
		});
	
}


//设置倒计时
export const SetCountdownInfo = ({commit},obj)=>
{
	commit("SetCountdownInfo",obj);
}

//
export const SetDrawingIsSetTimer = ({commit},obj)=>
{
	commit("SetDrawingIsSetTimer",obj);
}

export const SetDrawingIsSetTimer_pc = ({commit},obj)=>
{
	commit("SetDrawingIsSetTimer_pc",obj);
}


//往期开奖信息查询
export const pastinfo = ({commit},obj)=>{
	axios.defaults.responseType = 'json';
	axios.post( obj.url,obj.data)
	    .then(res=>{
			return res.data;
		})
		.then(result=>{
//			console.log(result);
			commit('pastinfo',result)
		})
		.catch(function(error) {
			//console.log(error);
		});
	
}

//离开页面时清除往期列表数据
export const clearPastInfo = ({commit})=>{
	commit('clearPastInfo');
}


//修改密码
//export const updatepassinfo = ({commit},obj)=>{
//	axios.defaults.responseType = 'json';
//	axios.post( obj.url,
//		JSON.stringify({userId:obj.userId,oldpassword:obj.oldpassword,newpassword:obj.newpassword,token:obj.token})
//	    )
//	    .then(res=>{
//			return res.data;
//		})
//		.then(result=>{
////			console.log(result);
//			commit('updatepassinfo',result)
//		})
//		.catch(function(error) {
//			//console.log(error);
//		});
//	
//}}

//投注详情页面的下拉展开
export const XialaToShangla = ({commit})=>{
	commit("XialaToShangla");
}
export const clearxiala = ({commit})=>{
	commit("clearxiala");
}

//订单查询接口
export const getMyOrderData = ({commit},obj)=>{
	//console.log(obj.data);
	axios.post(obj.url,obj.data
        ).then(res=>{
        	return res.data;
        }).then(result=>{
        	//console.log(result);
        	commit("getMyOrderData",result);
        }).catch(err=>{
        	console.log(err);
        });
}

//清除下注列表
export const clearOrderList = ({commit})=>{
	commit("clearOrderList");
}
//订单详情接口
export const getOrderDetail = ({commit},obj)=>{
	//console.log(obj.data);
	axios.post(obj.url,obj.data
        ).then(res=>{
        	return res.data;
        }).then(result=>{
        	console.log(result);
        	commit("OrderDetail",result);
        }).catch(err=>{
        	console.log(err);
        });
}



//客服页面逻辑实现
//切换人工客服以及自助客服
export const changeServiceTitleReq = ({commit},obj)=>{
	 commit("changeServiceTitleRsp",obj);
}

//获取自助客服问题
export const GetAutoQuestionReq = ({commit},obj)=>{
	axios.defaults.responseType = 'json';
	axios.post( obj.url,obj.data )
	    .then(res=>{
			return res.data;
		})
		.then(result=>{
			commit('GetAutoQuestionRsp',result)
		})
		.catch(function(error) {
			//console.log(error);
		});
	
}
//获取人工客服ID
export const GetCustomerIdReq = ({commit},obj)=>{
	axios.defaults.responseType = 'json';
	axios.post( obj.url,obj.data )
	    .then(res=>{
			return res.data;
		})
		.then(result=>{
			commit('GetCustomerIdRsp',result)
		})
		.catch(function(error) {
			//console.log(error);
		});
	
}
//用户发送消息给人工客服
export const SendMsgReq = ({commit},obj)=>{
	axios.defaults.responseType = 'json';
	axios.post( obj.url,obj.data )
	    .then(res=>{
			return res.data;
		})
		.then(result=>{
			commit('SendMsgRsp',result)
		})
		.catch(function(error) {
			//console.log(error);
		});
	
}
//用户获取消息(人工客服)
export const GetMsgReq = ({commit},obj)=>{
	axios.defaults.responseType = 'json';
	axios.post( obj.url,obj.data )
	    .then(res=>{
			return res.data;
		})
		.then(result=>{
			commit('GetMsgRsp',result)
		})
		.catch(function(error) {
			//console.log(error);
		});
	
}

//用户结束(人工客服)
export const FinshServerReq = ({commit},obj)=>{
	axios.defaults.responseType = 'json';
	axios.post( obj.url,obj.data )
	    .then(res=>{
			return res.data;
		})
		.then(result=>{
			commit('FinshServerRsp',result)
		})
		.catch(function(error) {
			//console.log(error);
		});
	
}

//设置自助客服聊天消息为空
export const SetAutoChatsNull = ({commit})=>{
	commit("SetAutoChatsNull");
}

//获取邀请有礼的数据
export const getInviteData = ({commit},obj)=>{
	axios.post(obj.url,JSON.stringify(obj.data)
        ).then(res=>{
        	return res.data;
        }).then(result=>{
        	console.log(result);
        	commit("getInviteData",result);
        }).catch(err=>{
        	console.log(err);
        });
}

//往期搜索框的显示隐藏
export const hideSearch = ({commit})=>{
	commit("hideSearch");
}
export const showSearch = ({commit})=>{
	commit("showSearch");
}
//设置自助客服消息为空
export const SetAutoNull = ({commit})=>{
	commit("SetAutoNull");
}
//设置客服获取客服ID定时器
export const SetCustomerIdTimer = ({commit},nID)=>
{
	commit("SetCustomerIdTimer",nID);
}

//设置客服拉取消息时器
export const SetGetMsgTimer = ({commit},nID)=>
{
	commit("SetGetMsgTimer",nID);
}

export const SetCustomerValue = ({commit},nID)=>
{
	commit("SetCustomerValueRsp",nID);
}
//设置是否是点击人工客服按钮退出
export const SetCustomerClick = ({commit},bClick)=>
{
	commit("SetCustomerClickRsp",bClick);
}
//设置是否关闭客服获取客服ID定时器
export const SetStopIDtimer = ({commit},bVal)=>
{
	commit("SetStopIDtimer",bVal);
}
//设置是否关闭客服获取消息定时器
export const SetStopMsgtimer = ({commit},bClick)=>
{
	commit("SetStopMsgtimer",bClick);
}

//设置是否关闭客服获取消息三分钟定时器
export const SetCustomertimer = ({commit},nID)=>
{
	commit("SetCustomertimer",nID);
}
//设置客服获取消息条数
export const SetCustomerCount = ({commit},nNumber)=>
{
	commit("SetCustomerCount",nNumber);
}

//设置是否人工客服
export const SetIsCustomer = ({commit},bVal)=>
{
	commit("SetIsCustomer",bVal);
}

//彩钻转金额
export const withdrowCashinfo = ({commit},obj)=>{
	axios.defaults.responseType = 'json';
	axios.post( obj.url,
		JSON.stringify({userId:obj.userId,token:obj.token,withdrawDiamond:obj.withdrawDiamond})
	    )
	    .then(res=>{
			return res.data;
		})
		.then(result=>{
//			console.log(result);
			commit('withdrowCashinfo',result)
		})
		.catch(function(error) {
			//console.log(error);
		});
	
}


//自动提现
export const getcashMoneyinfo = ({commit},obj)=>{
	axios.defaults.responseType = 'json';
	axios.post( obj.url,
		JSON.stringify({userId:obj.userId,
						token:obj.token,
						withdrawDiamond:obj.withdrawDiamond,
						cashType:obj.cashType,
						cashName:obj.cashName,
						code:obj.code,
						phoneNum:obj.phoneNum,
						cashAccout:obj.cashAccout,
						amount:obj.amount
		})
	    )
	    .then(res=>{
			return res.data;
		})
		.then(result=>{
//			console.log(result);
			commit('getcashMoneyinfo',result)
		})
		.catch(function(error) {
			//console.log(error);
		});
	
}

//退出清理,注意点击退出时发送logout请求,强制退出时不发
export const ClearData = ({commit})=>{
	commit("ClearData");
}
//修改点击人工客服的次数
export const getPeopleCustomeIndex = ({commit})=>{
	commit("getPeopleCustomeIndex");
}

//获取离开人工客服时的时间
export const getNowTime = ({commit})=>{
	commit("getNowTime");
}

//倒计时
export const UpdateCountdown = ({commit},obj)=>{
	commit("UpdateCountdown",obj);
}
//倒计时
export const UpdateCountdown_pc = ({commit},obj)=>{
	commit("UpdateCountdown_pc",obj);
}

//设置平台标记
export const SetPlatform = ({commit},id)=>{
	commit("SetPlatform",id);
}

//以下是时时彩
//----------------------------------------------------------
//修改底部footer
export const changeImg = ({commit},idx)=>{
	commit("changeImg",idx);
}
export const gotoService = ({commit})=>{
	commit("gotoService");   
}
//首页开奖信息查询
export const showpageinfo_ly = ({commit},obj)=>{
	axios.defaults.responseType = 'json';
	axios.post( obj.url,obj.data)
	    .then(res=>{
			return res.data;
		})
		.then(result=>{
//			console.log(result);
			commit('showpageinfo_ly',result)
		})
		.catch(function(error) {
			//console.log(error);
		});
	
}
//倒计时
// export const UpdateCountdown_ly = ({commit},obj)=>{
// 	commit("UpdateCountdown_ly",obj);
// }
//-----------------------------------------------------------

//获取重要通知
export const ImportantNoticeReq = ({commit},obj)=>{
	axios.defaults.responseType = 'json';
	axios.post( obj.url,obj.data )
	    .then(res=>{
			return res.data;
		})
		.then(result=>{
			//console.log(result);
			commit('ImportantNoticeRsp',result)
		})
		.catch(function(error) {
			//console.log(error);
		});
	
}

//获取首页滚动公告
export const AppNoticeReq = ({commit},obj)=>{
	axios.defaults.responseType = 'json';
	axios.post( obj.url,obj.data )
	    .then(res=>{
			return res.data;
		})
		.then(result=>{
			//console.log(result);
			commit('AppNoticeRsp',result)
		})
		.catch(function(error) {
			//console.log(error);
		});
	
}
//开奖页面切换不同的彩种的开奖
export const modifyIndex =({commit},idx)=>{
	commit('modifyIndex',idx);
}

//获取首页广告地址
export const HomeAdReq = ({commit},obj)=>{
	axios.defaults.responseType = 'json';
	axios.post( obj.url,obj.data )
	    .then(res=>{
			return res.data;
		})
		.then(result=>{
			//console.log(result);
			commit('HomeAdRsp',result)
		})
		.catch(function(error) {
			//console.log(error);
		});
	
}

//时时彩赔率
export const GetLotteryOdds =({commit},obj)=>{
	axios.defaults.responseType = 'json';
	axios.post( obj.url)
	    .then(res=>{
			return res.data;
		})
		.then(result=>{
			//console.log(result);
			commit('GetLotteryOdds',result);
		})
		.catch(function(error) {
			//console.log(error);
		});
	
}