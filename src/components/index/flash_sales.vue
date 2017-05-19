<template>
  <div class="flash-sales">
    <div class="countdown-banner"></div>
    <div class="">

    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'flash-sales',
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
