<template>
	<ul class="wcharlist">
		<li>
			<img src="../../static/img/diamondicon.png"/>
			<span><i>{{money*10}}</i>彩钻</span>
			<input type="text" placeholder="输入金额" v-model="money" />
		</li>
		<li>
			<img src="../../static/img/diamondicon.png"/>
			<span>30彩钻</span>
			<span @click="zfbchangebg(1)" :class="zfbbgflag==1?'active':''">￥30</span>
		</li>
		<li>
			<img src="../../static/img/diamondicon.png"/>
			<span>80彩钻</span>
			<span @click="zfbchangebg(2)" :class="zfbbgflag==2?'active':''">￥80</span>
		</li>
		<li>
			<img src="../../static/img/diamondicon.png"/>
			<span>150彩钻</span>
			<span @click="zfbchangebg(3)" :class="zfbbgflag==3?'active':''">￥150</span>
		</li>
		<li>
			<img src="../../static/img/diamondicon.png"/>
			<span>200彩钻</span>
			<span @click="zfbchangebg(4)" :class="zfbbgflag==4?'active':''">￥200</span>
		</li>
		<li>
			<img src="../../static/img/diamondicon.png"/>
			<span>300彩钻</span>
			<span @click="zfbchangebg(5)" :class="zfbbgflag==5?'active':''">￥300</span>
		</li>
	</ul>
</template>

<script>
	import {mapState,mapActions} from 'vuex'
	export default{
		data(){
			return{
				money:""
				
			}
		},
		computed:{
			...mapState([
				'zfbbgflag'
			])
		},
		methods:{
			...mapActions([
				'zfbchangebg'
			])
		}
	}
</script>

<style>
</style>