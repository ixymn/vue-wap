<template>
  <div class="hello">
    <Header />
    <div class="main-container">
      <app-banner :listImg="listImg"></app-banner>
    </div>

  </div>
</template>

<script>
import Header from '../components/header.vue'
import Slide from '../components/slide.vue'
import a from '../static/banner1.jpg'
import b from '../static/banner2.jpg'
import c from '../static/banner3.jpg'

export default {
  name: 'index',
  data () {
    return {
      listImg: [
        {url: a},
        {url: b},
        {url: c}
      ]
    }
  },
  components:{
    Header,
    "app-banner":Slide
  }
}
</script>

<style scoped>

#imageUploader { display: none;}
.upload-label { display: block;width: 1.33rem;height: 1.33rem;background: red;}
</style>
