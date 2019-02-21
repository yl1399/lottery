<template>
  <div id="container">
    <v-header></v-header>
       <div class="ly_rulePhoto">
            <img src="http://113.10.236.174:9999/lyimg/playrule/ly_rule.png" alt="">
      </div>
  </div>
 
</template>

<script>
  import HeaderSon from '@/components/header-son';
  export default {
    components: {
      'v-header': HeaderSon,
    },
    mounted(){
        //兼容苹果安卓手机
				var u = navigator.userAgent;      
				var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
				var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
				//var isAndroid = u.indexOf('Android') 
				if(isAndroid == true){
					$(".ly_rulePhoto").addClass("andr_ly_rulePhoto");
				}else if(isiOS == true){
					$(".ly_rulePhoto").addClass("ios_ly_rulePhoto");
				}
    }
   
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
