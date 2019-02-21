//存储整个项目大部分的数据

export default {
	pcFooterList: [
        {
			icon: "iconfont icon-renwudating",
			title: "首页",
			weburl: "/home"
		},
		{
			icon: "iconfont icon-kaijiang-hover",
			title: "开奖",
			weburl: "/drawing"
		},
		{
			icon: "iconfont icon-caifuzhi",
			title: "财富",
			weburl: "/wealth"
		},
		{
			icon: "iconfont icon-wode",
			title: "我的",
			weburl: "/mine"
		}
	],
	gclose:false,
	imgnum:0,	
	headerTitle: "开奖",
	headeSonTitle: "",
	flag: false, //是否加载头部组件
	serviceTxt:true, //客服页面显示人工客服或者自助客服
	isCustomer:false, //是否是人工客服
	isCustomerClick:false,//是否是点击人工客服按钮退出
	isStopIDtimer:false,// 是否关闭获取客服ID定时器
	isStopMsgtimer:false,//是否关闭获取客服消息定时器	
	deviceId: "abcdef1599uih",
	customerTimerInterval:3*60*1000,  //客服三分钟定时器
	customerTimer:0,                  //客服三分钟定时器句柄
	customerCount:0,                  //客服条数
    //deviceId: "",
	userInfo: {
		headimg: "http://113.10.236.174:9999/img/photo.png",
		nickName: "",
		userId: 0,
		token: "",
		phone: "",
		password: "",
		islogin: false,
		realName: "",
		idCard: "",
		recomCode: "",
		isTourist:false //是否游客登录
	},
	urlInfo: {
        //baseUrl:"http://192.168.2.136:8080/CrazyPc28_1.0.0v/api/", //协议地址
        //baseUrl:"http://192.168.2.59:8080/api/ ", //协议地址
		//baseUrl:"http://113.10.236.174:8080/api/", //协议地址
        baseUrl:"http://www.saiweizz.com:7123/api/", //协议地址
		deviceIdPath:"user/public/deviceId", //路径
		yzmPath:"user/public/verificationcode",
		smsPath:"user/public/smscode",//短信验证码
		registPath:"user/public/createaccount",
		loginPath:"user/public/login",
		insert_barrage:"hall/playWay",//插入弹幕和下注内容到服务器的接口 
		onlineNumPath:"user/public/sonlinenum", //大厅获取在线人数
		get_barrage:"hall/public/barrage", //获取弹幕消息
		get_outcome:"hall/public/bet", //获取下注消息
		get_sysnotice:"hall/notice", //获取系统公告
		heartbeatPath:"user/public/heartbeat",  //心跳包
		findpwd:"user/public/forgetpassword",//忘记密码
		logoutPath:"user/public/logout",//登出
		queryDayRecordPath:"wealth/queryDayRecord",//当日流水
		queryWealthPath:"wealth/queryWealth" , //财富查询
		queryRecordPath:"wealth/queryRecord", //充值提现记录
		perfectUserInfo:"user/perfectdata", //完善个人信息
		showPagePath:"homepage/public/showPage", //首页查询
		pastPath:"homepage/public/past", //往期查询
		orderCheck:"homepage/myOrder", //投注查询
		orderDetailCheck:"homepage/orderDetails",//投注明细查询
		winningResultsPath:"homepage/winningResults",//中奖信息
		getQuestionPath:"customer/public/getquestions", //客服-获取自助问题列表
		getCustomerIdPath:"customer/public/getCustomerId", //客服-获取人工客服ID
		sendmsgPath:"customer/public/userSendMsg", //客服-发送消息(人工)
		getMsgPath:"customer/public/clientGetMsg", //客服-获取消息(人工)
		userFinishServerPath:"customer/public/userFinishServer", //客服-用户结束客服(人工)
		inviteHasGift:"user/getsharedata",//邀请有礼
		updatepasswordPath:"user/updatepassword",//修改密码
		clientgetcashPath:"wealth/clientgetcash" ,//彩钻转金额
		autocashPath:"wealth/autocash",//自动提现
		wxSharePath:"hall/weixinRequest",  //微信分享调用jdsk
		appNoticePath:"hall/public/appNotice",//首页滚动公告
		importantPath:"hall/importantNotice", //重要消息
		adPicturePath:"homepage/public/getadpicture", //获取首页广告页地址
		lotteryoddsPath:"homepage/public/getlotteryodds"  //时时彩赔率计算
	},
	wxbgflag: 0, //修改充值页面的微信充值时，点击金额时修改背景颜色
	zfbbgflag: 0, //修改充值页面的支付宝充值时，点击金额时修改背景颜色
	barrageType: "2", //1表示插入的是弹幕，2表示的是插入下注内容
	barrageShowFlag: true,
	getBarrageResult: {
		message: -1,
		list: []
	}, //弹幕返回的结果
	getOutcomeResult: {
		message: -1,
		list: []
	}, //获取下注 消息返回到页面展示
	getSystemResult: { 
		list: [],
		notice:[]  //系统消息
	}, //获取系统公告消息
	betlistLen:50, //下注信息滚动条数
	musicflag: false,
	onlineInfo: {}, //大厅在线人数信息
	isAuto: false, //登录界面 自动登录标志
	rememberPwd:false,//记住密码标识
	autoInterval: 2000, //登录界面 自动登录延迟时间2秒
	heartbeatInterval: 8000, //心跳包间隔
	heartbeatTimer: 0, //定时器ID
	isExit: false, //是否需要退出,用于多点登录时强行退出用户
	wealthInfo: {
		todayincom: 0.00, //今日盈亏
		bettingMoney: 0.00, //投注彩钻
		winningaMount: 0.00, //中奖彩钻
		fallintoMoney: 0.00 //推荐收益

	},
	queryWealthInfo: {
		generalAssets: 0.00, //账户总资产
		accountFunds: 0.00, //账户余额
		accountFreeze: 0.00 //冻结资产
	},
	queryRecordInfo: [], //充值记录
	
	showpageInfo: {  //时时彩首页开奖信息
		expect: "", //已开奖期号
		opencode: [], //开奖号码
		nextTime: "", //下一期时间
		dateTime: "", //开奖倒计时 "02:58"格式分:秒
	},
	userTopList:[] ,//中奖TOP10
	userPlayInfo: "", //单双显示
	CountdownInfo:{min:0,sec:0}, //倒计时分秒
	CountdownString:"00:00",//倒计时显示


	showpageInfo_pc: {//pc28首页开奖信息
		expect:"", //已开奖期号
		opencode: [], //开奖号码
		nextTime: "", //下一期时间
		dateTime: "", //开奖倒计时 "02:58"格式分:秒
	},
	userTopList_pc:[] ,//中奖TOP10
	userPlayInfo_pc: "", //单双显示
	CountdownInfo_pc:{min:0,sec:0}, //倒计时分秒
	CountdownString_pc:"00:00",//倒计时显示
	

	DrawingIsSetTimer:false, //开奖页是否设置倒计时定时器
	DrawingIsSetTimer_pc:false, //开奖页是否设置倒计时定时器
	pastInfo:[], //往期开奖信息
	HallIsStartTimer:0,//用于hall页面开启定时器
	HallTime:8000,//hall定时器设置时间
	HallTime_pc:8000,//hall定时器设置时间
	cathecticList:false,//详情列表的点击下拉上拉
	orderInfo:[],//下注查询我的订单
	orderDetail:{},//每次下注明细查询
	CustomerAutoInfo:{
		autochats:[],//自助客服聊天信息
		array:[],
		msgTime:"",
		welcome:"",
		otheranswer:"",
		chats:[] //人工客服聊天信息
	}, //自助客服问题
	CustomerServerId:0,  //人工客服ID
	inviteData:{},//邀请有礼页面数据
	searchFlag:false,//往期里面的搜索框的显示隐藏
	CustomerMsgInfo:{
		array:[],
		prompt:"",
		chats:[]
	}, //人工客服获取消息
	GetCustomerIdTimer:0, //客服获取人工客服ID定时器
	GetMsgTimer:0, //客服获取人工客服消息
	withdrowCashInfo:"", //提现金额
	clickPeopleCustomeIndex:0,//记录点击人工客服的次数
	leavePeopleCustomeTime:0,//用来存放每次离开人工客服的时间
	winExpect:""  ,   //大厅中奖信息期号防止重复添加
	
	platform:0, //平台标记 1-时时彩 2-pc28

	//首页
	
	//以下是下注列表数据-------------------------------------------
	//大小单双玩法
	numberPayRule:[
		{playName:"大",payMultiple:"2.4"},
		{playName:"小",payMultiple:"2.4"},
		{playName:"单",payMultiple:"2.4"},
		{playName:"双",payMultiple:"2.4"},
		{playName:"大单",payMultiple:"4.2"},
		{playName:"小单",payMultiple:"4.6"},
		{playName:"大双",payMultiple:"4.6"},
		{playName:"小双",payMultiple:"4.2"}
		
	],
	//单点玩法
	singlePointPayRule:[
		{playName:"00",payMultiple:"500"},
		{playName:"01",payMultiple:"100"},
		{playName:"02",payMultiple:"50"},
		{playName:"03",payMultiple:"40"},
		{playName:"04",payMultiple:"30"},
		{playName:"05",payMultiple:"20"},
		{playName:"06",payMultiple:"17"},
		{playName:"07",payMultiple:"16"},
        {playName:"08",payMultiple:"15"},
		{playName:"09",payMultiple:"15"},
		{playName:"10",payMultiple:"14"},
		{playName:"11",payMultiple:"14"},
		{playName:"12",payMultiple:"12"},
		{playName:"13",payMultiple:"12"},
		{playName:"14",payMultiple:"12"},
		{playName:"15",payMultiple:"12"},
		{playName:"16",payMultiple:"14"},
		{playName:"17",payMultiple:"14"},
        {playName:"18",payMultiple:"15"},
		{playName:"19",payMultiple:"15"},
		{playName:"20",payMultiple:"16"},
		{playName:"21",payMultiple:"17"},
		{playName:"22",payMultiple:"20"},
		{playName:"23",payMultiple:"30"},
		{playName:"24",payMultiple:"40"},
		{playName:"25",payMultiple:"50"},
		{playName:"26",payMultiple:"100"},
		{playName:"27",payMultiple:"500"},
	],
	//极大极小玩法
	maxminPayRule:[
		{playName:"极大",payMultiple:"15"},
		{playName:"极小",payMultiple:"15"}
	],
	//顺子对子豹子玩法/数字组合玩法
	assotedPayRule:[
		{playName:"对子",payMultiple:"4"},
		{playName:"顺子",payMultiple:"12"},		
		{playName:"豹子",payMultiple:"50"}
	],

	//以下是时时彩下注列表数据-------------------------------------------
	//大小单双玩法
	ssc_addPayRule:[
		
	],
	//数字玩法/数字组合/数字定位
	ssc_numberPayRule:[
		{playName:"0",payMultiple:"1.99"},
		{playName:"1",payMultiple:"1.99"},
		{playName:"2",payMultiple:"1.99"},
		{playName:"3",payMultiple:"1.99"},
		{playName:"4",payMultiple:"1.99"},
		{playName:"5",payMultiple:"1.99"},
		{playName:"6",payMultiple:"1.99"},
		{playName:"7",payMultiple:"1.99"},
		{playName:"8",payMultiple:"1.99"},
		{playName:"9",payMultiple:"1.99"},
	],
	ssc_numberPositionRule:[
		{playName:"0",payMultiple:""},
		{playName:"1",payMultiple:""},
		{playName:"2",payMultiple:""},
		{playName:"3",payMultiple:""},
		{playName:"4",payMultiple:""},
		{playName:"5",payMultiple:""},
		{playName:"6",payMultiple:""},
		{playName:"7",payMultiple:""},
		{playName:"8",payMultiple:""},
		{playName:"9",payMultiple:""},
	],
	//首页滚动公告
	appNoticeInfo:[],
	//重要通知
	importantNotice:[],
	//彩种切换
	navIndex1:0,
	//首页广告地址
	homeAdArray:[{pictureUrl:"http://113.10.236.174:9999/img/home/banner1.png"},{pictureUrl:"http://113.10.236.174:9999/img/home/banner2.png"}]
}
