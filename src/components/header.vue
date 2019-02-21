<template>
  <header class="header">{{headerTitle}}</header>
</template>

<style>
      
</style>

<script>
	import { mapState ,mapActions } from 'vuex'
	import router from '../router/index.js'
	  export default{
		    computed:{
				  ...mapState([
				    'headerTitle',
				    'flag',
				  ]),
				  headerTitle:function(){
		    		return this.$route.query.title;
		      },
				},
				mounted(){
					  //兼容苹果安卓手机
						var u = navigator.userAgent;      
						var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
						var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
						//var isAndroid = u.indexOf('Android') 
						if(isAndroid == true){
							$(".header").addClass("andr_header");
						}else if(isiOS == true){
								$(".header").addClass("ios_header");
						}

				}
	    
	    	
	  }
</script>
