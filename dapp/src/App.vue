<template>
  <div id="app">
    <header-component></header-component>
    <router-view/>
    <footer-component></footer-component>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
export default {
  name: 'App',
  components: {
    'header-component': Header,
    'footer-component': Footer
  }
}
</script>

<style>
</style>
