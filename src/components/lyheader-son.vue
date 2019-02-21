<template>
	<header class="lyhead-son">
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
	   	   console.log(this.$route.params.title);
	    }
	    
	}
</script>

<style>
   
</style>