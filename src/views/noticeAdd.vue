<template>
  <div id="container">
    <v-header></v-header>
    <div class="notice_box">
      <ul>
        <li v-for="item in appNoticeInfo">
         <div class="notice_msg">
          <div class="notice_left">
              <div class="voice_box">
                  <div class="voice_icon"></div>
              </div>
          </div>

          <div class="notice_right">
                <div class="notice_right_box">
                  <p>{{item.noticeTitle}}</p>
                  <div class="notice_con">{{item.noticeInfo}}</div>
                  <div class="notice_time">
                    <span>{{item.noticeDate}}</span>
                    </div>
                </div>
          </div>
          </div>
        </li>
      </ul>
      

    </div>
    
  </div>
</template>

<script>
  import HeaderSon from '@/components/header-son';
  import { mapState, mapActions } from "vuex";
  export default {
    components: {
      'v-header': HeaderSon,
    },
    computed: {
			...mapState([
				"appNoticeInfo"
			])
    },
    mounted(){
      //兼容苹果安卓手机
			var u = navigator.userAgent;      
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
			//var isAndroid = u.indexOf('Android') 
			if(isAndroid == true){
				$(".notice_box").addClass("andr_notice_box");
			}else if(isiOS == true){
				$(".notice_box").addClass("ios_notice_box");
			}
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
