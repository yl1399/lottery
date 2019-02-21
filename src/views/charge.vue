<template>
	<div id="container">
		<HeaderSon></HeaderSon>
		<div class="userinfo">
		    <p>账户:<span>小苏打一号</span></p>
		    <p>余额:<span>10.00</span>彩钻</p>
		</div>
		<div class="charge">
			<ul class="chargenav">
				<li @click="currentindex(0)" :class="idx==0?'select':''" >
					<router-link to="/charge/充值中心">
						<i class="iconfont icon-weixin"></i><span>微信充值</span>
					</router-link>
				</li>
				<li @click="currentindex(1)" :class="idx==1?'select':''" >
					<router-link to="/charge/充值中心">
						<i class="iconfont icon-zhifubao"></i><span>支付宝充值</span>
					</router-link>
				</li>
				<li @click="currentindex(2)">
					<router-link to="/customservice?title=客服">
						<i class="iconfont icon-kefu"></i><span>客服充值</span>
					</router-link>
				</li>
			</ul>
			<div class="tabs">
				<weixin v-if="idx==0?true:false"></weixin>
				<zhifubao v-if="idx==1?true:false"></zhifubao>
			</div>
		</div>
		<div class="pay" @click="nowpay()">立即支付</div>
	</div>
</template>

<script>
	import HeaderSon from '@/components/header-son'
	import Weixin from '@/components/weixin'
    import Zhifubao from '@/components/zhifubao'
    import router from "../router/index.js"
	export default{
		data(){
			return {
				a:'Weixin',
				idx:0
			}
		},
		components: {
	        'HeaderSon': HeaderSon,
	        'Weixin':Weixin,
	        'Zhifubao':Zhifubao
		},
		mounted(){
			 //兼容苹果安卓手机
			var u = navigator.userAgent;      
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
			//var isAndroid = u.indexOf('Android') 
			if(isAndroid == true){
				$(".userinfo").addClass("andr_userinfo");
			}else if(isiOS == true){
				$(".userinfo").addClass("ios_userinfo");
			}
		},
	    methods:{
	  	    currentindex:function(idx){
	  		    this.idx=idx;
	  	    },
	  	    nowpay:function(){
	  		    router.push("/");
	  	    }
	    }
	   
	}
</script>

<style>
</style>