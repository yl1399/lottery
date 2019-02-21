<template>
	<ul class="wcharlist">
		<li>
			<img src="../../static/img/diamondicon.png"/>
			<span><i>{{money*10}}</i>彩钻</span>
			<input type="text" placeholder="输入金额" v-model="money"/>
		</li>
		<li>
			<img src="../../static/img/diamondicon.png"/>
			<span>30彩钻</span>
			<span @click="wxchangebg(1)" :class="wxbgflag==1?'active':''">￥30</span>
		</li>
		<li>
			<img src="../../static/img/diamondicon.png"/>
			<span>80彩钻</span>
			<span @click="wxchangebg(2)" :class="wxbgflag==2?'active':''">￥80</span>
		</li>
		<li>
			<img src="../../static/img/diamondicon.png"/>
			<span>150彩钻</span>
			<span @click="wxchangebg(3)" :class="wxbgflag==3?'active':''">￥150</span>
		</li>
		<li>
			<img src="../../static/img/diamondicon.png"/>
			<span>200彩钻</span>
			<span @click="wxchangebg(4)" :class="wxbgflag==4?'active':''">￥200</span>
		</li>
		<li>
			<img src="../../static/img/diamondicon.png"/>
			<span>300彩钻</span>
			<span @click="wxchangebg(5)" :class="wxbgflag==5?'active':''">￥300</span>
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
				'wxbgflag'
			])
		},
		methods:{
			...mapActions([
				'wxchangebg'
			])
		}
	}
</script>

<style>
</style>