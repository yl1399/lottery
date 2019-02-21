<template>
  <div id="container">
    <router-view></router-view>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import PcFoot from '@/components/pcfooter'
  import Head from '@/components/header'
  export default {
//    name: 'layout',
    components: {
      'v-header': Head,
      'v-footer': PcFoot
    }
   
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
