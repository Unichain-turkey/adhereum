<template>
  <v-app id="app">
    <header-component></header-component>
    <v-content>
      <v-container fluid>


        <v-snackbar
          v-model="successFlag"
          :timeout="timeout"
          top
        >
          {{successMsg}}
          <v-btn
            color="green"
            flat
            @click="reset"
          >
            Close
          </v-btn>
        </v-snackbar>


        <v-snackbar
          v-model="errorFlag"
          :timeout="timeout"
          top
        >
          {{ errorMsg }}
          <v-btn
            color="red"
            flat
            @click="reset"
          >
            Close
          </v-btn>
        </v-snackbar>


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
    },
    data() {
      return {
        timeout: 3000,
      }
    },
    methods: {
      reset() {
        this.$store.commit('reset');
      },

    }
  }
</script>

<style>
  #app {
    font-family: 'Ubuntu', sans-serif;
  }
</style>
