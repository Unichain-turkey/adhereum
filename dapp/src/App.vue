<template>
  <v-app id="app">
    <header-component></header-component>
    <router-view/>
    <footer-component></footer-component>
  </v-app>
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
  #app {
    font-family: 'Ubuntu', sans-serif;
  }
</style>
