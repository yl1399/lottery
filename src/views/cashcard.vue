<template>
	<div id="container">
		<div class="cashcard">
		    <header>
		        <i class="iconfont icon-jiantou" @click="goback()"></i>
		        <span>银行卡</span>
		        <i class="iconfont icon-iconjia"></i>
		    </header>
		    <ul class="cashcardinfo">
		        <li class="card1">
		            <div class="name">
		                <i class="iconfont icon-caifuzhi"></i>
		                <span>
		                    <h1>交通银行</h1>
		                    <h2>信用卡</h2>
		                </span>
		            </div>
		            <div class="num">**** **** **** 3119</div>
		        </li>
		        <li class="card2">
		            <div class="name">
		                <i class="iconfont icon-caifuzhi"></i>
		                <span>
		                    <h1>交通银行</h1>
		                    <h2>信用卡</h2>
		                </span>
		            </div>
		            <div class="num">**** **** **** 3119</div>
		        </li>
		    </ul>
		</div>
	</div>
</template>

<script>
	import HeaderSon from '@/components/header-son'
	import {mapState,mapActions} from "vuex"
	export default{
		components: {
	        'HeaderSon': HeaderSon
	    },
	    methods:{
	   	    ...mapActions([
	   	    	'goback'
	   	    ])
	    }
	}
</script>

<style>
</style>