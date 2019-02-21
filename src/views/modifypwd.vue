<template>
	<div id="container">
		<HeaderSon></HeaderSon>
		<div class="modifypwd">
			<form id="commentForm2">
				<label>
		    	    <i>旧密码</i>
		    	    <input type="password" value="" v-model="oldpwd" placeholder="请输入原始密码" minlength="6" maxlength="16" name="oldpass" id="oldpass" />
		    	</label>
				<p class="oldpass"></p>

				<label>
		    	    <i>新密码</i>
		    	    <input type="password" value="" v-model="pwd" placeholder="请输入新密码" minlength="6" maxlength="16" name="newpass" id="newpass"/>
		    	</label>
				<p class="newpass"></p>

				<label>
		    	    <i>确认密码</i>
		    	    <input type="password" value="" v-model="rePwd" placeholder="确认密码"   maxlength="16" name="renewpass" id="renewpass" />
		    	</label>
				<p class="renewpass"></p>

				<input type="submit" value="修改密码"  class="modifybtn" />

			</form>

		</div>

		<div class="pwd_shadownew" @click="hideshadownew()">
			<div class="mine-list">
				<!--<img src="../../static/img/diamondicon.png" alt="" />-->
				<p class="qop"></p>
				<div class="sclose"><i class="iconfont icon-cross"></i></div>
			</div>

		</div>

	</div>
</template>

<script>
import HeaderSon from "@/components/header-son";
import { mapState, mapActions } from "vuex";
import axios from "axios";
import router from "../router/index.js";
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      pwd: "",
      oldpwd: "",
      rePwd: ""
    };
  },
  components: {
    HeaderSon: HeaderSon
  },
  computed: {
    ...mapState([
      "urlInfo",
      "deviceId",
      'isExit',
      "userInfo"
    ]),
    exitStatus: function() {
				return this.isExit;
		},
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
  methods: {
    ...mapActions([
      "ClearData",
      "LogoutReq"
    ]),

    UpdatePass: function() {
      var that = this;
      axios.defaults.responseType = "json";
      axios.post(
          this.urlInfo.baseUrl + this.urlInfo.updatepasswordPath,
          JSON.stringify({
            userId: this.userInfo.userId,
            oldpassword: this.oldpwd,
            newpassword: this.pwd,
            token: this.userInfo.token
          })
        )
        .then(response => {
          console.log(that.userInfo);
          if (response.data.result == "0") {
            let phoneNum = that.userInfo.phone;
            this.Logout();
            Toast({
							message:"修改成功",
							position:"middle",
							duration:1000
            });
            setTimeout(()=>{
               router.push({path:"/",query:{phoneNum:phoneNum}});
            },1500);
          }
          if (response.data.result == "1") {
            $(".pwd_shadownew").css("display", "block");
            $(".qop").html(response.data.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    Logout: function() {
      //console.log("1111");
      var data = {
        url: this.urlInfo.baseUrl + this.urlInfo.logoutPath,
        data: JSON.stringify({
          userId: this.userInfo.userId,
          token: this.userInfo.token,
          deviceId: this.deviceId
        })
      };
      this.LogoutReq(data);
    },

    hideshadownew: function() {
      $(".pwd_shadownew").css("display", "none");
    }
  },
  mounted: function() {
    //兼容苹果安卓手机
			var u = navigator.userAgent;      
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
			//var isAndroid = u.indexOf('Android') 
			if(isAndroid == true){
				$(".modifypwd").addClass("andr_modifypwd");
			}else if(isiOS == true){
				$(".modifypwd").addClass("ios_modifypwd");
			}

    var that = this;

    jQuery.validator.addMethod(
      "alnum",
      function(value, element) {
        return this.optional(element) || /^[a-zA-Z0-9]+$/.test(value);
      },
      "只能包括英文字母和数字"
    );

    var validator = $("#commentForm2").validate({
      submitHandler: function(form) {
        that.UpdatePass();
      },

      errorElement: "p",
      focusInvalid: true,
      debug: true,
      //				onsubmit:true,
      // success: "valid",
      //   submitHandler:function() {
      //        alert("Submitted!")

      //    },

      errorPlacement: function(error, element) {
        error.css("color", "red");
        $(element)
          .closest("form")
          .find("p[class='" + element.attr("id") + "']")
          .append(error);
      },

      rules: {
        oldpass: {
          required: true,
          minlength: 6,
          maxlength: 16
        },
        newpass: {
          required: true,
          minlength: 6,
          maxlength: 16,
          alnum: true
        },
        renewpass: {
          required: true,
          equalTo: "#newpass"
        }
      },
      messages: {
        oldpass: {
          required: " (旧密码不能为空)",
          minlength: " 建议使用字母和数字组合，6-16个字符",
          maxlength: " 建议使用字母和数字组合，6-16个字符"
        },
        newpass: {
          required: " (密码不能为空)",
          minlength: " 建议使用字母和数字组合，6-16个字符",
          maxlength: " 建议使用字母和数字组合，6-16个字符",
          alnum: "只能包括英文字母和数字"
        },
        renewpass: {
          required: " (密码不能为空)",
          equalTo: " 两次密码输入不一致"
        }
      }
    });
  }
};
</script>

<style>

</style>