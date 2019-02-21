<template>
  <footer>
    <div v-for="(item,idx) in lyFooterList" :id="idx" @click="changeImg(idx)">
			<router-link :to="item.weburl" :key="idx"  >
				<img :src="imgnum==idx?item.ActiveIconUrl:item.UnActiveIconUrl"/>
			</router-link>
		</div>
		
	</footer>
</template>

<style>

</style>

<script>
	import {mapState,mapActions} from "vuex";
	export default{
		computed:{
			...mapState([
				'lyFooterList',
				'imgnum'
			])
		},
		methods:{
			
			...mapActions([
				'changeImg',
			]),
		},
		
	}
</script>