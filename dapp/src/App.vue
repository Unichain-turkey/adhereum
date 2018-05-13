<template>
  <div id="app">
    <header></header>
    <router-view/>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
export default {
  name: 'App',
  components:{
    header:Header
  }
}
</script>

<style>
</style>
