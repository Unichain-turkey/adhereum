<template>
  <v-app id="app">
    <header-component></header-component>
    <v-content>
      <v-container fluid>
        <v-alert
          :value="this.commonStore.getters.successFlag"
          type="success"
        >
          {{this.commonStore.getters.successMessage()}}
        </v-alert>

        <v-alert
          :value="this.commonStore.getters.errorFlag"
          type="error"
        >
          {{this.commonStore.getters.successMessage()}}
        </v-alert>

        <router-view></router-view>
      </v-container>
    </v-content>
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
