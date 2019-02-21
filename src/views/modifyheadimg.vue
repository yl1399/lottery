<template>
	<div id="container">
		<headerSon></headerSon>
		<ul class="img-list">
			<li>
			    <img src="http://113.10.236.174:9999/img/headpic/toux-0.png" alt="" />
			</li>
			<li>
			    <img src="http://113.10.236.174:9999/img/headpic/toux-1.png" alt="" />
			</li>
			<li>
			    <img src="http://113.10.236.174:9999/img/headpic/toux-2.png" alt="" />
			</li>
			<li>
			    <img src="http://113.10.236.174:9999/img/headpic/toux-3.png" alt="" />
			</li>
			<li>
			    <img src="http://113.10.236.174:9999/img/headpic/toux-4.png" alt="" />
			</li>
			<li>
			    <img src="http://113.10.236.174:9999/img/headpic/toux-5.png" alt="" />
			</li>
			<li>
			    <img src="http://113.10.236.174:9999/img/headpic/toux-6.png" alt="" />
			</li>
			<li>
			    <img src="http://113.10.236.174:9999/img/headpic/toux-7.png" alt="" />
			</li>
			<li>
			    <img src="http://113.10.236.174:9999/img/headpic/toux-8.png" alt="" />
			</li>
			<li>
			    <img src="http://113.10.236.174:9999/img/headpic/toux-9.png" alt="" />
			</li>
			<li>
			    <img src="http://113.10.236.174:9999/img/headpic/toux-10.png" alt="" />
		    </li>
			<li>
			    <img src="http://113.10.236.174:9999/img/headpic/toux-11.png" alt="" />
			</li>
			<li>
			    <img src="http://113.10.236.174:9999/img/headpic/toux-12.png" alt="" />
			</li>
			<li>
			    <img src="http://113.10.236.174:9999/img/headpic/toux-13.png" alt="" />
		    </li>
			<li>
			    <img src="http://113.10.236.174:9999/img/headpic/toux-14.png" alt="" />
			</li>
			<li>
			    <img src="http://113.10.236.174:9999/img/headpic/toux-15.png" alt="" />
			</li>
			<li>
			    <img src="http://113.10.236.174:9999/img/headpic/toux-16.png" alt="" />
			</li>
			<li>
			    <img src="http://113.10.236.174:9999/img/headpic/toux-17.png" alt="" />
			</li>
			<li>
			    <img src="http://113.10.236.174:9999/img/headpic/toux-18.png" alt="" />
			</li>
		</ul>
		<span class="save-img">保存</span>
	</div>
</template>

<script>
	import HeaderSon from '@/components/header-son';
	import { mapState, mapActions } from 'vuex';
	import router from "../router/index.js"
	export default{
		components: {
	        'HeaderSon': HeaderSon
		},
		computed: {
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
	    mounted:function(){
			//兼容苹果安卓手机
			var u = navigator.userAgent;      
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
			//var isAndroid = u.indexOf('Android') 
			if(isAndroid == true){
				$(".img-list").addClass("andr_img-list");
			}else if(isiOS == true){
				$(".img-list").addClass("ios_img-list");
			}


	    	var imgIndex = null;
            $(".img-list li img").click(function(){
            	imgIndex = $(this).parent().index();
            	$(this).parent().siblings().find("img").removeClass("img-se");
            	$(this).addClass("img-se");
            	
            });
            $(".save-img").click(function(){
            	if(imgIndex!=null){
            		router.push({path:"/myselfInfo",query:{imgIndex:imgIndex}});
            	}
            })
		},
		methods: {
			...mapActions([
				'ClearData',
			]),
		}
	}
</script>

<style>
</style>