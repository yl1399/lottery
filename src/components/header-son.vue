<template>
	<header class="head-son">
	    <i class="iconfont icon-jiantou" @click="goback()"></i>
	    <span>{{headerSonTitle}}</span>
		<b></b>
	</header>
</template>

<script>
	import { mapState ,mapActions } from 'vuex'
	import router from "../router/index.js"
	export default{
	    computed:{
			...mapState([
			    'headerSonTitle',
			]),
			headerSonTitle:function(){
	    		return this.$route.params.title;
	        }
		},
		methods:{
			...mapActions([
				'goback'
			])
		},
	    mounted:function(){
	   	    //兼容苹果安卓手机
			var u = navigator.userAgent;      
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
			//var isAndroid = u.indexOf('Android') 
			if(isAndroid == true){
				$(".head-son").addClass("andr_head-son");
			}else if(isiOS == true){
				$(".head-son").addClass("ios_head-son");
			}
	    }
	    
	}
</script>

<style>
   
</style>