<template>
  <div class="max-w-md mx-auto p-8 mt-6 rounded-lg">
    <Home msg="Welcome to Your Vue.js App"/>
    <div class="flex py-2 items-baseline">
      <div class="w-32 text-grey font-light">Name</div>
      <div class="flex-1"><h1 class="text-5xl">Project name <i class="ion-md-heart"></i></h1></div>
    </div>
    <div class="flex pt-6 pb-2 items-baseline">
      <div class="w-32 text-grey font-light">Desciption</div>
      <div class="flex-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit at omnis cupiditate animi ut libero sit nobis? Accusamus rerum corporis cupiditate architecto quisquam nihil, consectetur numquam sapiente maiores, nemo praesentium? </div>
    </div>
    <div class="flex pt-4 pb-2 items-baseline">
      <div class="w-32 text-sm text-grey font-light">Platform</div>
      <div class="flex-1">Desktop / Mobile</div>
    </div>
    <div class="flex pt-4 pb-2 items-baseline">
      <div class="w-32 text-sm text-grey font-light">Created by</div>
      <div class="flex-1"><a class="no-underline text-blue" href="http://twitter.com" target="_blank">Best guy ever</a></div>
    </div>
  </div>
</template>

<script>
import '@/styles.css'
// import Home from '@/components/Home.vue'

export default {
  name: 'app',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
</style>
