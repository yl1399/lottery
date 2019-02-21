<template>
	<div id="cathectic-detail">
		<header>
			<i class="iconfont icon-jiantou" @click="goback()"></i>
			<span>订单详情</span>
			<b></b>
		</header>
		<ul class="money-detail">
			<li>
				<h1><span>{{orderDetail.betTotalAmount}}</span>元</h1>
				<h2>订单金额</h2>
			</li>
			<li>
				<h1><span>{{orderDetail.winTotalAmount}}</span>元</h1>
				<h2>中奖金额</h2>
			</li>
		</ul>
		<div class="draw-detail">
			<p><span>订单状态</span><span v-text="orderDetail.state1==0?'未中奖':(orderDetail.state1==1?'中奖':'未开奖')"></span></p>
			<p><span>开奖号码</span><span>{{orderDetail.opencode}}</span></p>
		</div>
		<div class="order-detail">
			<p>
				<span>选号详情</span>
				<span>{{orderDetail.totalCount}}注</span>
				<i 
					:class="cathecticList?'iconfont icon-shangla':'iconfont icon-xiala'"
					id="pull-down"
				></i>
			</p>
			<ul v-if="cathecticList" class="order-list" >
				<li v-for="(item,idx) in orderDetail.listdata">
					<span>{{item.bettingrule}}</span>
					<span v-text="item.state==0?'未中奖':(item.state==1?'中奖':'未开奖')"></span>
					<span>{{item.winningamount}}</span>
				</li>
			</ul>
		</div>
		<div class="foot-tip">
			<p><span>下单时间</span><span>{{orderDetail.bettingDate}}</span></p>
			<p><span>温馨提示</span><span>奖金直接打入您的账户</span></p>
		</div>
	</div>
</template>

<script>
	import { mapState ,mapActions } from 'vuex'
	import router from "../router/index.js"
	export default{
		data(){
			return{
				curPage:1,
				pageSize:100
			}
		},
		computed:{
			...mapState([
				'cathecticList',
				'userInfo',
				'urlInfo',
				'isExit',
				"deviceId",
				'orderDetail',
				'platform'
				
			]),
			exitStatus: function() {
				return this.isExit;
			},
//			bettintTime:function(){
//				var list = this.orderDetail.listdata;
//				var time = "";
//				for(let i=0;i<list.length;i++){
//					list[i].
//				}
//			}
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
		methods:{
			...mapActions([
				'goback',
				'XialaToShangla',
				'LogoutReq',
				'getOrderDetail',
				'ClearData',
				'clearxiala'
				

			]),
		},
		mounted(){
			//console.log(this.$route.query);
			//兼容苹果安卓手机
			var u = navigator.userAgent;      
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
			//var isAndroid = u.indexOf('Android') 
			if(isAndroid == true){
				$("#cathectic-detail header").addClass("andr_header");
			}else if(isiOS == true){
				$("#cathectic-detail header").addClass("ios_header");
			}

			var that = this;
			$("#pull-down").click(function(){
				that.XialaToShangla();
			})
			var expect = this.$route.query.expect;
				//console.log(this.$route.query);
				var data = {
					url:this.urlInfo.baseUrl + this.urlInfo.orderDetailCheck,
					data: JSON.stringify({
						userId: this.userInfo.userId,
						token: this.userInfo.token,
						pageNow:this.curPage,
						pageSize:this.pageSize,
						expect:expect,
						lotteyType:this.platform
					})
				}
			//	console.log(data);
				this.getOrderDetail(data);
		},
		destroyed:function(){
			this.clearxiala();
		}
	    
	}
</script>

<style>
</style>