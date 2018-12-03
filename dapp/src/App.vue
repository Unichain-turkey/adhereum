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
      <v-dialog
        v-model="loader"
        hide-overlay
        persistent
        width="300"
      >
        <v-card
          color="primary"
          dark
        >
          <v-card-text>
            Please stand by
            <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
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
      loader() {
        return this.$store.getters.loader;
      },
      flag() {
        this.state.successFlag = this.$store.getters.successFlag
        this.state.errorFlag = this.$store.getters.errorFlag
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
        successFlag: this.$store.getters.successFlag,
        errorFlag: this.$store.getters.errorFlag,

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
