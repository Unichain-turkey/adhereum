<template>
  <v-app id="app">
    <header-component></header-component>
    <v-content>
      <v-container fluid>
        <v-alert
          :value="successFlag"
          type="success"
        >
          {{successMsg}}
        </v-alert>

        <v-alert
          :value="errorFlag"
          type="error"
        >
          {{errorMsg}}
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
    computed: {
      successFlag() {
        return this.$store.getters.successFlag
      },
      errorFlag() {
        return this.$store.getters.errorFlag
      },
      successMsg() {
        return this.$store.getters.successMessage
      },
      errorMsg() {
        return this.$store.getters.errorMessage
      }
    },
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
