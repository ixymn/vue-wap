<template>
  <div class="hot-sales">
    <title class="banner">
      HOT SALE
    </title>
    <div class="">

    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'hot-sales',
  data () {
    return {
    }
  },
  computed: {
    ...mapState([
       'flashSales'
    ])
  },
  created(){
    //console.log(this.props.flashList);
  }
}
</script>
<style >


</style>
