<template>
  <header class="head">
    Header
  </header>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Header'
    }
  }
}
</script>
<style scoped>
header {
  position:fixed;
  top:0;
  text-align:center;
  height:3rem;
}

</style>
