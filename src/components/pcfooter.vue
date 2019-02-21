<template>
  <footer>
    <div v-for="(item,idx) in pcFooterList" :id="idx">
      <router-link :to="{path:item.weburl,query:{title:item.title}}" :key="idx"  >
        <i :class="item.icon"></i>
        <span>{{item.title}}</span>
      </router-link>
    </div>
  </footer>
</template>

<style>

</style>

<script>
  import { mapState ,mapActions } from 'vuex'
  export default{
    computed:{
      ...mapState([
        'pcFooterList'
      ])
    }

  }
</script>
