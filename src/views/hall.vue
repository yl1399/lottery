<template>
	<div class="hall">
		<div class="headtip">
			<div class="selfinfo" @click="showmineinfo()">
				<img v-if="!userInfo.islogin" :src="userInfo.headimg">
				<img v-if="userInfo.islogin" :src="userInfo.headimg">
				<div class="infotxt">
					<p v-if="userInfo.islogin">{{this.userInfo.nickName}}</p>
					<p v-if="userInfo.islogin">ID:<i>{{this.userInfo.userId}}</i></p>
				</div>

			</div>
			
			<div class="drawing"><span>{{this.CountdownTimeString_pc}}</span></div>
			<div class="music" @click="changemusic()"><img :src="musicflag?musicOpenSrc:musicCloseSrc" /></div>
			<div class="openbarage" @click="changebarage()"><img :src="barrageShowFlag?barageOpenSrc:barageCloseSrc"></div>
			<div class="allpeople" @click="showallpeople()"><i class="iconfont icon-ren-copy-copy"></i><span>{{onlineInfo.onlineCount}}</span></div>
		    <audio id="bgm" autoplay="autoplay" loop="loop">
				<source src="http://113.10.236.174:9999/img/bgm.mp3" type="audio/mpeg" />
			</audio>
		</div>
		<div class="barragearea" @click="hideinput()">
			<div id="barrageContent"></div>
		</div>
		<div class="outcome" @click="hideinput()">
			<ul class="betlist">
		    		<!--<li v-for= "(item,idx) in getOutcomeResult.list"  >
		    			<span>{{item.userName}}</span>
		    			<span>{{item.barrage}}</span>
		    		</li>	    			    		-->
		    	</ul>
		</div>
		<div class="notice" @click="hideinput()">
			<ul class="noticemsg">
				<li v-for= "(item,idx) in getSystemResult.notice">
					<span :class=item.state >{{item.noticeInfo}}</span>
				</li>
				<li v-for= "(item1,idx1) in getSystemResult.list">
					<span>{{item1.noticeInfo}}</span>
				</li>	
				
			</ul>
		</div>
		<div class="footertip">
			<div class="btn" v-show="!showflag">
				<span ><i class="iconfont icon-duanxin" @click.stop="showinput()"></i></span>
				<div><b id="start_outcome">立即投注</b></div>
				<span><i class="iconfont icon-cross" @click="backhome()"></i></span>
			</div>
			<ul class="writetxt" v-show="showflag">
				<li>
					<img src="http://113.10.236.174:9999/img/barageopen.png" 
						 v-if="!changeflag"
						 id="img1"
				    />
					<img src="http://113.10.236.174:9999/img/outcome.png"
						 v-if="changeflag" 
						 id="img2"
				    />
				</li>
				<li>
					<input type="text" placeholder="说点什么" maxlength="20" v-if="!changeflag" id="barageInput" v-model="barrageContent">
					<input type="text" placeholder="请输入下注号" v-if="changeflag" v-model="playWayContent"/>
				</li>
				<li @click="sendMsgToService()">发送</li>
			</ul>
		</div>
        <!--下注菜单展示-->
		<div class="outcome_shadow">
            <div class="outcome_show">
				<div class="cancel" @click="hideOutcomeShow()"><i class="iconfont icon-cross"></i></div>
				<ul class="outcome_nav">
					<li :class="num == 0 ?'nav_select':''" @click="tabChange(0)">大小单双</li>
					<li :class="num == 1 ?'nav_select':''" @click="tabChange(1)">单点</li>
					<li :class="num == 2 ?'nav_select':''" @click="tabChange(2)">极大/极小</li>
					<li :class="num == 3 ?'nav_select':''" @click="tabChange(3)">顺/对/豹子</li>
				</ul>
				<ul class="outcome_content">
					<li class="li_one">
						<ul class="outcome_list1" >
							<li v-for="(item,idx) in numberPayRule" >
								<span>{{item.playName}}</span>
								<span>{{item.payMultiple}}</span>
							</li>
						</ul>
						<p class="tip"><span>Tip:</span>特殊数字13/14的赔率是1.6</p>
						<p class="outcome_num1">已选择<span>{{outcomenum1}}</span>注</p>
						<div class="confirm_btn1">
                            <input type="text" placeholder="请输入金额" v-model="outcomeMoney1" >
							<span @click="resetOutcomeOrder1()">重置</span>
							<span @click="ShowOutcomeList1()">下注</span>
						</div>

					</li>

					<li class="li_two">
						<ul class="outcome_list2" >
							<li v-for="(item,idx) in singlePointPayRule">
								<span>{{item.playName}}</span>
								<span>{{item.payMultiple}}</span>
							</li>
						</ul>
						<p class="outcome_num2">已选择<span>{{outcomenum2}}</span>注</p>
						<div class="confirm_btn2">
                            <input type="text" placeholder="请输入金额" v-model="outcomeMoney2">
							<span @click="resetOutcomeOrder2()">重置</span>
							<span @click="ShowOutcomeList2()">下注</span>
						</div>
					</li>

					<li class="li_three">
						<ul class="outcome_list3" >
							<li v-for="(item,idx) in maxminPayRule">
								<span>{{item.playName}}</span>
								<span>{{item.payMultiple}}</span>
							</li>
						</ul>
						<p class="outcome_num3">已选择<span>{{outcomenum3}}</span>注</p>
						<div class="confirm_btn3">
                            <input type="text" placeholder="请输入金额" v-model="outcomeMoney3">
							<span @click="resetOutcomeOrder3()">重置</span>
							<span @click="ShowOutcomeList3()">下注</span>
						</div>
					</li>

					<li class="li_four">
						<ul class="outcome_list4" >
							<li v-for="(item,idx) in assotedPayRule">
								<span>{{item.playName}}</span>
								<span>{{item.payMultiple}}</span>
							</li>
						</ul>
						<p class="outcome_num4">已选择<span>{{outcomenum4}}</span>注</p>
						<div class="confirm_btn4">
                            <input type="text" placeholder="请输入彩钻" v-model="outcomeMoney4">
							<span @click="resetOutcomeOrder4()">重置</span>
							<span @click="ShowOutcomeList4()">下注</span>
						</div>
					</li>
				</ul>
			</div>
			
		</div>
        <!--下注订单确认-->
		<div class="confirmOrder_shadow">
            <div class="confirmOrder">
                <div class="confirm_head">
					<i class="iconfont icon-cross" @click="hidenOutcomeList()"></i>
                    <span>确认注单</span>
					<b></b>
				</div>
				<ul class="confirm_list">
					<li>
						<span>下注名称</span>
						<span>赔率</span>
						<span>金额</span>
						<span>删除</span>
					</li>
					
				</ul>
				<p class="confirm_handle">
					<span>总注数<b>{{totalOutcomenum}}</b></span>
                    <span @click="deleteAll()">删除全部</span>
				</p>
				<div class="confirm_money">
					<span>合计<b>￥{{totalOutcomeMoney}}</b></span>
                    <span @click="commitOutcomeData()">确认下注</span>
				</div>
			</div>
		</div>

		<!--查看所有人的遮罩层-->
		<div class="shadow1">
			<div class="people-list">
				<header>当前在线人数<span>{{onlineInfo.onlineCount}}</span>人</header>
				<ul>
					<li v-for="(item,idx) in onlineInfo.array">
						<img :src="'http://113.10.236.174:9999/img/headpic/toux-'+item.headPic+'.png'" />
						<div>
							<p>{{item.userName}}</p>
							<p>ID:<i>{{item.userId}}</i></p>
						</div>
						<!--<span>@TA</span>-->
					</li>
				</ul>
			</div>
			<div class="cancel" @click="hideallpeople()"><i class="iconfont icon-cross"></i></div>
		</div>
		<!--查看自己信息的遮罩层-->
		<div class="shadow2">
			<div class="mine-list">
				<img :src="userInfo.headimg"/>
				<p>{{this.userInfo.nickName}}</p>
				<h1>ID:<i>{{this.userInfo.userId}}</i></h1>
			</div>
			<div class="cancel" @click="hidemineinfo()"><i class="iconfont icon-cross"></i></div>
		</div>
	</div>

</template>

<script>
	import { mapState, mapActions } from "vuex"
	import router from "../router/index.js"
	import axios from "axios";
	import { Toast } from 'mint-ui';
	export default{
		
		data(){
			return{
				musicOpenSrc: "http://113.10.236.174:9999/img/musicopen.png",
				musicCloseSrc: "http://113.10.236.174:9999/img/musicclose.png",
				barageOpenSrc: "http://113.10.236.174:9999/img/barageopen.png",
				barageCloseSrc: 'http://113.10.236.174:9999/img/barageclose.png',
				changeflag:false,
				barageflag:true,
				showflag:false,
				barrageContent:"", //弹幕内容
				playWayContent:"",//下注内容
				getAllPeopleTimer:null,
				getHallTimer:null,
				getHallTimer_pc:null,
				getHallCountTimer:null,
				getHallCountTimer_pc:null,
				getHomeShowPageTimer:null,
				getHomeShowPageTimer_pc:null,
				gotoBottomTimer:null,  //用定时器去控制回到底部
				num:0,   //选项卡的索引值
				outcomeMoney1:'',
				outcomeMoney2:'',
				outcomeMoney3:'',
				outcomeMoney4:'',
				outcomeMoney1:'',
				outcomenum1:0, //数字玩法下注总数
				outcomenum2:0, //单点玩法下注总数
				outcomenum3:0, //极大极小玩法下注总数
				outcomenum4:0, //顺/对/豹子玩法下注总数
				totalOutcomenum:0,  //确认下注总注数
				totalOutcomeMoney:0, //确认下注金额
				confirmFlag:true,   //在点击确认按钮时判断有没有输入框的数字是其他字符
				
			}
		},
		computed:{
			...mapState([
				'barrageType',
				'urlInfo',
				'userInfo',
				'getBarrageResult',
				'musicflag',
				'getOutcomeResult',
				'onlineInfo',
				'getSystemResult',
				'CountdownTimeString',
				'CountdownTimeString_pc',
				'CountdownInfo_pc',
				'isExit',
				'HallTime',
				'HallTime_pc',
				'CountdownInfo',
				'platform',
				'barrageShowFlag',
				'imgBaseUrl',
				'numberPayRule',
				'singlePointPayRule',
				'maxminPayRule',
				'assotedPayRule',
				'CountdownString_pc'
			]),
			
			listenBarrageIndex:function(){  
                return this.getBarrageResult.list;
			},
			listenBarrageHide:function(){  
                return this.barrageShowFlag;
            },
           //监听数组变化，就将滚动条拉到最下边
            // listenOutcomeScrollToTop:function(){
           	//    return this.getOutcomeResult.list;
            // },
            listenNoticeScrollToTop:function(){
           	   return this.getSystemResult.list;
			},
			listenWingNoticeScrollToTop:function(){
            return this.getSystemResult.notice
			},
            exitStatus: function() {
				return this.isExit;
			},
			bgmstatus:function(){
				return this.musicflag;
			}
		},
		watch:{
			listenBarrageIndex:function(newval){
			// 弹幕消息推送
				if(this.barageflag == true)
				{
					var oBox = document.querySelector('#barrageContent');   //获取.box元素
					var cW = oBox.offsetWidth;   //获取box的宽度
					var cH = oBox.offsetHeight;   //获取box的高度
					//console.log(newval);
					if(newval){
						
						for(let i = 0;i<newval.length;i++){
							createEle(newval[i].barrage);
							
						}	
					
						function createEle(txt) {
							//动态生成span标签
							var oMessage = document.createElement('span');   //创建标签
								oMessage.innerHTML = txt;   //接收参数txt并且生成替换内容
								oMessage.style.left = '100%';  //初始化生成位置x    
								oBox.appendChild(oMessage);   //把标签塞到oBox里面
						    var colorList=["#0c1cf7","#fb0012","#fc04dc","#04fc0a","#01163a","#04e8fc","#fc6d04"];
							roll.call(oMessage, {
								//call改变函数内部this的指向
								//timing: ['linear', 'ease-out'][~~(Math.random() * 2)],
								//color: '#' + (~~(Math.random() * (1 << 24))).toString(16),
								color: colorList[random(0,6)],
								top: random(0, cH-50),
								//fontSize: random(16, 32)
							});
							function roll(opt) {
								//弹幕滚动
								//如果对象中不存在timing 初始化
							    opt.timing = opt.timing || 'linear';
						
								opt.color = opt.color || '#f00';
			
								opt.top = opt.top || 0;
							
								//opt.fontSize = opt.fontSize || 24;
								this._left = parseInt(this.offsetLeft);   //获取当前left的值
								this.style.color = opt.color;   //初始化颜色
								this.style.top = opt.top + 'px';
								//this.style.fontSize = opt.fontSize + 'px';
								this.timer = setInterval(function () {
									if (this._left <= 0) {
										//console.log("this._left <= 10");
										clearInterval(this.timer);   //终止定时器
										this.parentNode.removeChild(this);
										return;   //终止函数
									}
									switch (opt.timing) {
										case 'linear':   //如果匀速
											//console.log("linear");
											this._left += -3;
											break;
										case 'ease-out':   //
											console.log("ease-out");
											this._left += (0 - this._left) * .01;
											break;
									}
									this.style.left = this._left + 'px';
								}.bind(this), 1000 / 60);
							}
							function random(start, end) {
								//随机数封装
								return start + ~~(Math.random() * (end - start));
							}
						}
					}
				}
			},
			exitStatus: function(newVal) {
				
				if(newVal) 
				{
					//console.log("强制退出"+newVal);
					this.ClearData();
					
				}
						
			},
			// listenOutcomeScrollToTop:function(oldval,newval){
			// 	//console.log(newval.length);
			// 	//让滚动条出现在底部
			// 	var boxHeight =  $('.outcome').height();
			// 	var Height = $('.outcome')[0].scrollHeight;
			// 	if(Height>boxHeight){
			// 		$('.outcome').scrollTop(Height);

			// 	}
			// },
			listenNoticeScrollToTop:function(oldval,newval){
				setTimeout(function(){
                    var boxHeight = $(".notice").height();
				    var Height = $('.notice')[0].scrollHeight;
				    if(Height>boxHeight){
					//console.log("触发");
					    $('.notice').scrollTop(Height);
				    }
				},20)
				
				
			},
			listenWingNoticeScrollToTop:function(oldval,newval){
				setTimeout(function(){
                    var boxHeight = $(".notice").height();
					var Height = $('.notice')[0].scrollHeight;
					if(Height>boxHeight){
						//console.log("触发");
						$('.notice').scrollTop(Height);
					}
				},20);
				
			},
			bgmstatus:function(newVal){
				var mAudio = document.getElementById('bgm');
				if(newVal)
				{
					if(mAudio)
						mAudio.play();
				}
				else
				{
					if(mAudio)
						mAudio.pause();
				}
			},
			//监听是否关闭弹幕
			barrageShowFlag:function(newVal){
				console.log(newVal);
				if(newVal == false){
					console.log($("#barrageContent"));
				    $("#barrageContent").css("display","none");
				}else if(newVal == true){
                    $("#barrageContent").css("display","block");
				}
				 
			},
			num:function(newval){
                 //切换选项卡
				if(newval == 0){
					console.log("数字");
					$(".li_one").show().siblings().hide();
				}else if(newval == 1){
					console.log("单点");
					$(".li_two").show().siblings().hide();
				}else if(newval == 2){
					$(".li_three").show().siblings().hide();
				}else if(newval == 3){
					$(".li_four").show().siblings().hide();
				}
			}
		},
		methods:{
			...mapActions([
				'insertBarrage',
				'insertPlayWay',
				'sendMsgToService',
				'BarrageMsg',
				'changeBGM',
				'OutcomeMsg',
				'GetOnlinePeople',
				'SystemNotice',//系统公告消息
				'LogoutReq',
				'SetHallTimer',
				'SetHallTimer_pc',
				'MsgToService',
				'ClearData',
				'winningResultsMsg', //中奖信息
				"HallCountdowninfo",
				"HallCountdowninfo_pc",
				'UpdateCountdown_pc',
				'changeBarrageType',
				'changeBarrageShow',
				'CountdownString_pc'
			]),
			//d点击消息符号，隐藏的输入框出现
			showinput() {
				this.showflag = true;
			},
			//点击input框消失
			hideinput() {
				this.showflag = false;
			},
			//点击×号回到首页
			backhome() {
				if(this.userInfo.isTourist)
				{
					router.push("/home");
				}
				else
					router.push("/pc28/drawing?title=开奖")
			},
			//点击切换弹幕和下注按钮
			changeimg() {
				this.changeflag = !this.changeflag;
				var imgId =$(".writetxt li img").attr("id");
				if(imgId=="img1"){ //调用插入弹幕接口 barrageType==1
					this.insertPlayWay()
				}else if(imgId=="img2"){//调用插入下注内容接口barrageType==2
					this.insertBarrage()
				}
			},
			processMusic()
			{
				var mAudio = document.getElementById('bgm');
				if(mAudio)
				{
					if(this.musicflag)
						mAudio.play();
					else
						mAudio.pause();
				}
					this.musicflag ? mAudio.play() : mAudio.pause();
			},
			//点击音乐符号切换
			changemusic(){
				this.changeBGM();
				this.processMusic();
			},
			//点击切换开关弹幕、弹幕消息也随之切换
			changebarage() {
				this.changeBarrageShow();
				//this.barageflag = !this.barageflag;
			},
			//点击显示总人数的遮罩层
			showallpeople() {
				if(!this.userInfo.islogin){
					router.push("/");
				}else{
				    $(".shadow1").css("display", "block");
				}
			},
			//点击显示我的信息
			showmineinfo() {
				if(!this.userInfo.islogin){
					router.push("/");
				}else{
				    $(".shadow2").css("display", "block");
				}
			},
			//点击隐藏总人数的遮罩层
			hideallpeople() {
				
				    $(".shadow1").css("display", "none");
				
			},
			//点击隐藏我的遮罩层
			hidemineinfo() {
				$(".shadow2").css("display", "none");
			},
			hideOutcomeShow(){
				$(".outcome_shadow").css("display", "none");
			},
			//将消息发送到服务器
			sendMsgToService(){
				//console.log(this.barrageType*1);
				//if(this.barrageType*1==1){
				var param = this.barrageContent;
				//}else if(this.barrageType*1==2){
					//var param = this.playWayContent;
				//}
				var data={
					url:this.urlInfo.baseUrl+this.urlInfo.insert_barrage,
					data:{
						userId:this.userInfo.userId,
						type:1,
						receiveId:0,
						param:param,
						token:this.userInfo.token,
						lotteyType:this.platform,
						loginType:this.userInfo.isTourist?1:0
					}
				}
				if(this.barrageContent || this.playWayContent){
					console.log(data);
					this.MsgToService(data);
					this.barrageContent="";
					this.playWayContent="";
					setTimeout(function(){
						var boxHeight = $(".notice").height();
						var Height = $('.notice')[0].scrollHeight;
						if(Height>boxHeight){
						//console.log("触发");
							$('.notice').scrollTop(Height);
						}
				    },20);
				}else{
					Toast({
					    message:"内容不能为空",
						position:"middle",
					    duration:2000
					});
				}
			},
			
			Logout: function() {
				var data = {
					url: this.urlInfo.baseUrl + this.urlInfo.logoutPath,
					data: JSON.stringify({
						userId: this.userInfo.userId,
						token: this.userInfo.token,
						deviceId: this.deviceId
					})
				};
				console.log("Logout:"+this.userInfo.islogin);
				if(this.userInfo.islogin)
					this.LogoutReq();
			},
			GetBarrageMsg()
			{
				var data = {
					url:this.urlInfo.baseUrl+this.urlInfo.get_barrage,
					data: JSON.stringify({
						index:this.getBarrageResult.message,
						lotteyType:this.platform
					})
				};	
				this.BarrageMsg(data);
			},
			GetOutcomeMsg()
			{
				var data = {
					url:this.urlInfo.baseUrl+this.urlInfo.get_outcome,
					data: JSON.stringify({
						index:this.getOutcomeResult.message,
						token:this.userInfo.token,
						lotteyType:this.platform
					})
				};
				this.OutcomeMsg(data);
			},
			GetSystemNotice()
			{
				var data = {
					url:this.urlInfo.baseUrl+this.urlInfo.get_sysnotice,
					data: JSON.stringify({
						userId:this.userInfo.userId,
						token:this.userInfo.token,
						lotteyType:this.platform
					})
				};
				this.SystemNotice(data);
			},
			GetWinningResultsMsg()
			{
				var data = {
					url:this.urlInfo.baseUrl+this.urlInfo.winningResultsPath,
					data: JSON.stringify({
						userId:this.userInfo.userId,
						token:this.userInfo.token,
						lotteyType:this.platform
					})
				};
				this.winningResultsMsg(data);
			},
			GetShowPageInfo(nIndex)
			{
				var data = {
					url: this.urlInfo.baseUrl + this.urlInfo.showPagePath,
					data: JSON.stringify({
						lotteyType:nIndex
					}),
					index:nIndex
				};
				this.HallCountdowninfo_pc(data);
			},
			//vue实现选项卡
			tabChange(idx){
                  this.num = idx;
			},
			//点击切换索引值
			clickChange(idx){
				this.indexFlag1 = idx;
			},
			//点击数字玩法下注切换到确认下注订单页面
			ShowOutcomeList1(){
				var that =this;
				var activeLi = document.querySelectorAll(".outcome_list1 .click_li1");
				var reg = /[^0-9]+/gi;
				if(!activeLi.length){
                    Toast({
					    message:"下注类型未选择",
						position:"middle",
					    duration:2000
					});
				}else if(!this.outcomeMoney1){  
                    Toast({
					    message:"下注彩钻不能为空",
						position:"middle",
					    duration:2000
					});
				}else if(this.outcomeMoney1 && reg.test(this.outcomeMoney1)){
                    Toast({
					    message:"请输入正整数",
						position:"middle",
					    duration:2000
					});
				}else if(this.outcomeMoney1*1<10){
                    Toast({
					    message:"下注不能低于10彩钻",
						position:"middle",
					    duration:2000
					});
				}else{
					var str = '';
					this.totalOutcomenum += activeLi.length;
					this.totalOutcomeMoney += activeLi.length * this.outcomeMoney1;
					for(let i =0; i<activeLi.length;i++){
						var span1_val = $(activeLi[i]).find("span").eq(0).html();
						var span2_val = $(activeLi[i]).find("span").eq(1).html();
						var span3_val = this.outcomeMoney1;
						str += `<li>
									<span>${span1_val}</span>
									<span>${span2_val}</span>
									<span><input type="text" value="${span3_val}" class="inputChange"></span>
									<span class="delete_one"><i class="iconfont icon-cross"></i></span>
								</li>`
					}
					$(".confirm_list").append(str);
					$(".confirmOrder_shadow").show();
					for(let i =0; i<activeLi.length;i++){
                           activeLi[i].className = "";
					}
				    this.outcomenum1 = 0 ; 
					this.outcomeMoney1 = "" ;
					var deleteList = document.querySelectorAll(".delete_one");
					//console.log(deleteList)
					for(let i=0;i<deleteList.length;i++){
						deleteList[i].onclick=function(){
							//console.log(this);
							let moneynum = this.parentNode.children[2].children[0].value*1;
							that.totalOutcomenum = that.totalOutcomenum*1 -  1;
							that.totalOutcomeMoney = that.totalOutcomeMoney*1 - moneynum;
							$(this).parent().remove();
						}
						
					}
					//在下注页面修改金额时时变化
					var inputList = document.querySelectorAll(".inputChange");
					for(let i=0;i<inputList.length;i++){
						inputList[i].onblur = function(){
								console.log(inputList[i].value);
								if(reg.test(inputList[i].value)){
									Toast({
										message:"只能输入正整数",
										position:"middle",
										duration:2000
									});
									that.confirmFlag = false;
								}else{
									that.confirmFlag = true;
									var inputList1 = document.querySelectorAll(".inputChange");
									that.totalOutcomeMoney = 0;
									for(let i=0;i<inputList1.length;i++){
										
										that.totalOutcomeMoney += inputList1[i].value*1;
									}
							}
						}
					}

					
				}
				

			},
			//点击单点玩法下注切换到确认下注订单页面
			ShowOutcomeList2(){
				var that = this;
				var activeLi = document.querySelectorAll(".outcome_list2 .click_li2");
				var reg = /[+.-]+/gi;
				var reg1 = /[^0-9]+/gi;
				
				if(!activeLi.length){
                    Toast({
					    message:"下注类型未选择",
						position:"middle",
					    duration:2000
					});
				}else if(!this.outcomeMoney2){
                    Toast({
					    message:"下注彩钻不能为空",
						position:"middle",
					    duration:2000
					});
				}else if(this.outcomeMoney2*1<10){
                    Toast({
					    message:"下注不能低于10彩钻",
						position:"middle",
					    duration:2000
					});
				}else if(this.outcomeMoney2 && reg.test(this.outcomeMoney2)){
                    Toast({
					    message:"请输入正整数",
						position:"middle",
					    duration:2000
					});
				}else{
					var str = '';
					this.totalOutcomenum += activeLi.length;
					this.totalOutcomeMoney += activeLi.length * this.outcomeMoney2;
					for(let i =0; i<activeLi.length;i++){
						var span1_val = $(activeLi[i]).find("span").eq(0).html();
						var span2_val = $(activeLi[i]).find("span").eq(1).html();
						var span3_val = this.outcomeMoney2;
						str += `<li>
									<span>单点${span1_val}</span>
									<span>${span2_val}</span>
									<span><input type="text" value="${span3_val}" class="inputChange"></span>
									<span class="delete_one"  @click="deleteOne($event)"><i class="iconfont icon-cross"></i></span>
								</li>`
					}
					$(".confirm_list").append(str);
					$(".confirmOrder_shadow").show();
					for(let i =0; i<activeLi.length;i++){
                           activeLi[i].className = "";
					}
				    this.outcomenum2 = 0 ; 
					this.outcomeMoney2 = "" ;
                    var deleteList = document.querySelectorAll(".delete_one");
					//console.log(deleteList)
					for(let i=0;i<deleteList.length;i++){
						deleteList[i].onclick=function(){
							//console.log(this);
							let moneynum = this.parentNode.children[2].children[0].value*1;
							that.totalOutcomenum = that.totalOutcomenum*1 -  1;
							that.totalOutcomeMoney = that.totalOutcomeMoney*1 - moneynum;
							$(this).parent().remove();
						}
					}

                    //在下注页面修改金额时时变化
					var inputList = document.querySelectorAll(".inputChange");
					for(let i=0;i<inputList.length;i++){
						inputList[i].onblur = function(){
								console.log(inputList[i].value);
								if(reg.test(inputList[i].value)){
									Toast({
										message:"只能输入正整数",
										position:"middle",
										duration:2000
									});
									that.confirmFlag = false;
								}else{
									that.confirmFlag = true;
									var inputList1 = document.querySelectorAll(".inputChange");
									that.totalOutcomeMoney = 0;
									for(let i=0;i<inputList1.length;i++){
										
										that.totalOutcomeMoney += inputList1[i].value*1;
									}
							}
						}
					}
				}
			},
			//点击极大极小玩法下注切换到确认下注订单页面
			ShowOutcomeList3(){
				var that = this;
				var activeLi = document.querySelectorAll(".outcome_list3 .click_li3");
				var reg = /[^0-9]+/gi;
				
				if(!activeLi.length){
                    Toast({
					    message:"下注类型未选择",
						position:"middle",
					    duration:2000
					});
				}else if(!this.outcomeMoney3){
                    Toast({
					    message:"下注彩钻不能为空",
						position:"middle",
					    duration:2000
					});
				}else if(this.outcomeMoney3*1<10){
                    Toast({
					    message:"下注不能低于10彩钻",
						position:"middle",
					    duration:2000
					});
				}else if(this.outcomeMoney3 && reg.test(this.outcomeMoney3)){
                    Toast({
					    message:"请输入正整数",
						position:"middle",
					    duration:2000
					});
				}else{
					var str = '';
					this.totalOutcomenum += activeLi.length;
					this.totalOutcomeMoney += activeLi.length * this.outcomeMoney3;
					for(let i =0; i<activeLi.length;i++){
						var span1_val = $(activeLi[i]).find("span").eq(0).html();
						var span2_val = $(activeLi[i]).find("span").eq(1).html();
						var span3_val = this.outcomeMoney3;
						str += `<li>
									<span>${span1_val}</span>
									<span>${span2_val}</span>
									<span><input type="text" value="${span3_val}" class="inputChange" ></span>
									<span class="delete_one"><i class="iconfont icon-cross"></i></span>
								</li>`
					}
					$(".confirm_list").append(str);
					$(".confirmOrder_shadow").show();
					for(let i =0; i<activeLi.length;i++){
                           activeLi[i].className = "";
					}
				    this.outcomenum3 = 0 ; 
					this.outcomeMoney3 = "" ;
                    var deleteList = document.querySelectorAll(".delete_one");
					//console.log(deleteList)
					for(let i=0;i<deleteList.length;i++){
						deleteList[i].onclick=function(){
							//console.log(this);
							let moneynum = this.parentNode.children[2].children[0].value*1;
							that.totalOutcomenum = that.totalOutcomenum*1 -  1;
							that.totalOutcomeMoney = that.totalOutcomeMoney*1 - moneynum;
							$(this).parent().remove();
						}
					}

					//在下注页面修改金额时时变化
					var inputList = document.querySelectorAll(".inputChange");
					for(let i=0;i<inputList.length;i++){
						inputList[i].onblur = function(){
								console.log(inputList[i].value);
								if(reg.test(inputList[i].value)){
									Toast({
										message:"只能输入正整数",
										position:"middle",
										duration:2000
									});
									that.confirmFlag = false;
								}else{
									that.confirmFlag = true;
									var inputList1 = document.querySelectorAll(".inputChange");
									that.totalOutcomeMoney = 0;
									for(let i=0;i<inputList1.length;i++){
										
										that.totalOutcomeMoney += inputList1[i].value*1;
									}
							   }
						}
					}
				}
			},
			ShowOutcomeList4(){
				var that = this;
				var activeLi = document.querySelectorAll(".outcome_list4 .click_li4");
				var reg = /[^0-9]+/gi;
				
				if(!activeLi.length){
                    Toast({
					    message:"下注类型未选择",
						position:"middle",
					    duration:2000
					});
				}else if(!this.outcomeMoney4){
                    Toast({
					    message:"下注彩钻不能为空",
						position:"middle",
					    duration:2000
					});
				}else if(this.outcomeMoney4*1<10){
                    Toast({
					    message:"下注不能低于10彩钻",
						position:"middle",
					    duration:2000
					});
				}else if(this.outcomeMoney4 && reg.test(this.outcomeMoney4)){
                    Toast({
					    message:"请输入正整数",
						position:"middle",
					    duration:2000
					});
				}else{
					var str = '';
					this.totalOutcomenum += activeLi.length;
					this.totalOutcomeMoney += activeLi.length * this.outcomeMoney4;
					for(let i =0; i<activeLi.length;i++){
						var span1_val = $(activeLi[i]).find("span").eq(0).html();
						var span2_val = $(activeLi[i]).find("span").eq(1).html();
						var span3_val = this.outcomeMoney4;
						str += `<li>
									<span>${span1_val}</span>
									<span>${span2_val}</span>
									<span>
										<input type="text" value="${span3_val}" class="inputChange" >
									</span>
									<span class="delete_one"><i class="iconfont icon-cross"></i></span>
								</li>`
					}
					$(".confirm_list").append(str);
					$(".confirmOrder_shadow").show();
					for(let i =0; i<activeLi.length;i++){
                           activeLi[i].className = "";
					}
				    this.outcomenum4 = 0 ; 
					this.outcomeMoney4 = "" ;
                    var deleteList = document.querySelectorAll(".delete_one");
					//console.log(deleteList)
					for(let i=0;i<deleteList.length;i++){
						deleteList[i].onclick=function(){
							//console.log(this);
							let moneynum = this.parentNode.children[2].children[0].value*1;
							that.totalOutcomenum = that.totalOutcomenum*1 -  1;
							that.totalOutcomeMoney = that.totalOutcomeMoney*1 - moneynum;
							$(this).parent().remove();
						}
					}

					//在下注页面修改金额时时变化
					var inputList = document.querySelectorAll(".inputChange");
						for(let i=0;i<inputList.length;i++){
						inputList[i].onblur = function(){
								console.log(inputList[i].value);
								if(reg.test(inputList[i].value)){
									Toast({
										message:"只能输入正整数",
										position:"middle",
										duration:2000
									});
									that.confirmFlag = false;
								}else{
									that.confirmFlag = true;
									var inputList1 = document.querySelectorAll(".inputChange");
									that.totalOutcomeMoney = 0;
									for(let i=0;i<inputList1.length;i++){
										
										that.totalOutcomeMoney += inputList1[i].value*1;
									}
							}
						}
					}
				}
			},
			//点击重置按钮，所有的数据清空
			resetOutcomeOrder1(){
			    let list1 = document.querySelectorAll(".outcome_list1 li");
			    for(let i=0;i<list1.length;i++){
                    list1[i].className = '';
				} 
				this.outcomenum1 = 0;
				this.outcomeMoney1 = "";
			},
			resetOutcomeOrder2(){
			    let list2 = document.querySelectorAll(".outcome_list2 li");
			    for(let i=0;i<list2.length;i++){
                    list2[i].className = '';
				} 
				this.outcomenum2 = 0;
				this.outcomeMoney2 = "";
			},
			resetOutcomeOrder3(){
			    let list3 = document.querySelectorAll(".outcome_list3 li");
			    for(let i=0;i<list3.length;i++){
                    list3[i].className = '';
				} 
				this.outcomenum3 = 0;
				this.outcomeMoney3 = "";
			},
			resetOutcomeOrder4(){
			    let list4 = document.querySelectorAll(".outcome_list4 li");
			    for(let i=0;i<list4.length;i++){
                    list4[i].className = '';
				} 
				this.outcomenum4 = 0;
				this.outcomeMoney4 = "";
			},
			//点击确认下单按钮，提交数据到后台
			commitOutcomeData(){
                var confirmList = document.querySelectorAll(".confirm_list li");
				var msgList=[];
				if(confirmList.length>1 && this.confirmFlag == true){
					for(let i=1;i<confirmList.length;i++){
						let data = {};
						data.outcomeName = $(confirmList[i]).find("span").eq(0).html();
						data.outcomeMoney = $(confirmList[i]).find("span").eq(2).find("input").val();
						msgList.push(data);
					}
					//console.log(msgList);
					var dataObj={
							url:this.urlInfo.baseUrl+this.urlInfo.insert_barrage,
							data:{
								userId:this.userInfo.userId,
								type:2,
								receiveId:0,
								param:msgList,
								token:this.userInfo.token,
								lotteyType:this.platform,
								loginType:this.userInfo.isTourist?1:0
							}
						}
						this.MsgToService(dataObj);
						$(".confirmOrder_shadow").hide();
						$(".outcome_shadow").hide();
						$(".confirm_list li").eq(0).siblings().remove();
						this.totalOutcomenum = 0; //确认下注总注数
						this.totalOutcomeMoney = 0; //确认下注金额
				}else if(confirmList.length<=1){
					Toast({
					    message:"订单为空",
						position:"middle",
					    duration:2000
					});
					setTimeout(()=>{
						$(".confirmOrder_shadow").hide();
					},2200);
				}else if(this.confirmFlag == false){
                    Toast({
					    message:"输入金额有不合法字符",
						position:"middle",
					    duration:2000
					});
				}

			},
			//点击删除所有
            deleteAll(){
				$(".confirm_list li").eq(0).siblings().remove();
				this.totalOutcomenum = 0;  //确认下注总注数
				this.totalOutcomeMoney = 0; //确认下注金额
			},
			hidenOutcomeList(){
				$(".confirmOrder_shadow").hide();
			}
	    },
	    mounted:function(){
				this.GetShowPageInfo(2);
			var that = this;
	    	//默认开启背景音乐
	    	this.processMusic();
	    	var data = {url:this.urlInfo.baseUrl+this.urlInfo.onlineNumPath,data:JSON.stringify({
					userId:this.userInfo.userId,
					token:this.userInfo.token,
					pageNum:1,
					pageSize:100
				})};
			
			//**显示在线人数**//
			this.GetOnlinePeople(data);
			this.getAllPeopleTimer = setInterval(()=>{
				console.log("this.getAllPeopleTimer");
				this.GetOnlinePeople(data);
			},8000);	
			
			this.getHomeShowPageTimer_pc = setInterval(() => {
					this.GetShowPageInfo(2);
				}, 10000)
			//显示倒计时
			this.getHallCountTimer_pc = setInterval(() => {
				this.UpdateCountdown_pc({min:this.CountdownInfo_pc.min, sec:this.CountdownInfo_pc.sec});
				// console.log("this.CountdownInfo.min:"+this.CountdownInfo.min+"this.CountdownInfo.sec:"+this.CountdownInfo.sec);	
			}, 1000)
			
		
		//		this.SetDrawingIsSetTimer(true);
		//	}
	    	//console.log(this.userInfo.islogin);
	    	if(this.userInfo.islogin){
               this.getHallTimer_pc = setInterval(()=>{
					//console.log("索引值："+this.getOutcomeResult.message);
	    		    this.GetBarrageMsg();
	    		    this.GetOutcomeMsg();
	    		    this.GetSystemNotice();
			        this.GetWinningResultsMsg();
			},this.HallTime);   
	    		this.SetHallTimer_pc(this.getHallTimer_pc);
	    	}
	    	//**显示弹幕区，下注区，系统消息区**//
	    		
			//定时拉取使信息在底部显示
			this.gotoBottomTimer = setInterval(()=>{
				// var noticeHeight = $(".notice").height();
				// var sHeight = $('.notice')[0].scrollHeight;
				// if(sHeight>noticeHeight){
				// 	$('.notice').scrollTop(sHeight);
				// }
				var outcomeHeight =  $('.outcome').height();
				var oHeight = $('.outcome')[0].scrollHeight;
				if(oHeight>outcomeHeight){
					$('.outcome').scrollTop(oHeight);

				}
			},3000);
			
			//兼容苹果安卓手机
			var u = navigator.userAgent;      
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            //var isAndroid = u.indexOf('Android') 
			if(isAndroid == true){
				$(".headtip").css("padding-top","1%");
				$(".barragearea").addClass("barragearea_add")
			}else if(isiOS == true){
                $(".headtip").css("padding-top","6%");
			}


			//点击开始下注弹出下注列表
			$("#start_outcome").click(()=>{
				$(".outcome_shadow").css("display","block");
			});
			
			//点击每一项，切换样式标识选中
			var  li_list1 = document.querySelectorAll(".outcome_list1 li");
		    for(let i =0; i<li_list1.length; i++){
				//console.log(li_list1[i]);
				let li_num1 = 0;
				li_list1[i].onclick = function(){
					li_num1++;
					if(li_num1 % 2 ==1){
						this.className = "click_li1";
					}else{
						this.className = "";
					}
                    that.outcomenum1 = document.querySelectorAll(".outcome_list1 .click_li1").length;
				}
			}
			//单点玩法
            var  li_list2 = document.querySelectorAll(".outcome_list2 li");
			for(let i =0; i<li_list2.length; i++){
				let li_num2 = 0;
				li_list2[i].onclick = function(){
					li_num2++;
					if(li_num2 % 2 ==1){
						this.className = "click_li2";
					}else{
						this.className = "";
					}
					that.outcomenum2 = document.querySelectorAll(".outcome_list2 .click_li2").length;
				}
			}
			//极大极小玩法
			var  li_list3 = document.querySelectorAll(".outcome_list3 li");
			for(let i =0; i<li_list3.length; i++){
				let li_num3 = 0;
				li_list3[i].onclick = function(){
					li_num3++;
					if(li_num3 % 2 ==1){
						this.className = "click_li3";
					}else{
						this.className = "";
					}
					that.outcomenum3 = document.querySelectorAll(".outcome_list3 .click_li3").length;
				}
			}
			//豹子顺子对子玩法
			var  li_list4 = document.querySelectorAll(".outcome_list4 li");
			for(let i =0; i<li_list4.length; i++){
				let li_num4 = 0;
				li_list4[i].onclick = function(){
					li_num4++;
					if(li_num4 % 2 ==1){
						this.className = "click_li4";
					}else{
						this.className = "";
					}
					that.outcomenum4 = document.querySelectorAll(".outcome_list4 .click_li4").length;
				}
			}
			
           
	    },
        destroyed:function(){
        	var that = this;
			clearInterval(that.getAllPeopleTimer);
			clearInterval(that.getHallTimer);
			// clearInterval(that.getHallCountTimer);
			clearInterval(that.getHallCountTimer_pc);
			// clearInterval(that.getHomeShowPageTimer);
			clearInterval(that.getHomeShowPageTimer_pc);
			clearInterval(that.gotoBottomTimer);
			this.changeBarrageType();
        }
    }
</script>

<style>

</style>