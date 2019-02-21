<template>
  <div id="app">

    <router-view/>
    <div class="Appcustomer" @click="GotoCustomer()">
      <img src="http://113.10.236.174:9999/img/custome/kefu.png">
      <i v-if="!customerCount == 0">{{customerCount}}</i>
    </div>
  </div>
</template>

<script>
import router from "./router/index.js";
import { mapState } from "vuex";
import { Toast } from "mint-ui";
export default {
  name: "app",
  mounted(){
    //拖拽效果的实现-------------
      var dom = document.querySelector(".Appcustomer");
      var oW,oH;
      // 绑定touchstart事件
        dom.addEventListener("touchstart", function(e) {
            //console.log(e);
            var touches = e.touches[0];
            oW = touches.clientX - dom.offsetLeft;
            oH = touches.clientY - dom.offsetTop;
            //阻止页面的滑动默认事件
            document.addEventListener("touchmove",defaultEvent,false);
        },false);

        dom.addEventListener("touchmove", function(e) {
            var touches = e.touches[0];
            var oLeft = touches.clientX - oW;
            var oTop = touches.clientY - oH;
            if(oLeft < 0) {
              oLeft = 0;
            }else if(oLeft > document.documentElement.clientWidth - dom.offsetWidth) {
              oLeft = (document.documentElement.clientWidth - dom.offsetWidth);
            }
            if(oTop<0){
              oTop =0;
            }else if(oTop > document.documentElement.clientHeight - dom.offsetHeight){
              oTop = (document.documentElement.clientHeight - dom.offsetHeight);
            }
            dom.style.left = oLeft + "px";
            dom.style.top = oTop + "px";
        },false);
        
        dom.addEventListener("touchend",function() {
            document.removeEventListener("touchmove",defaultEvent,false);
        },false);
        function defaultEvent(e) {
            e.preventDefault();
        }
        //拖拽效果的实现-------------

  },
  methods: {
    GotoCustomer() {
      if(this.userInfo.islogin)
      {
       console.log("999999999");
       console.log(this.userInfo.isTourist);
          if (this.userInfo.isTourist) {
        Toast({
          message: "请登录正式账号体验!",
          position: "middle",
          duration: 3000
        });
        router.push("/home");
      } 
      else
      {
        router.push("/customservice");
      }
      }
      else
      {
        router.push("/login");
      }
      
      
    }
  },
  computed: {
    ...mapState(["userInfo","customerCount"])
  }
};
</script>

<style>

</style>

     

