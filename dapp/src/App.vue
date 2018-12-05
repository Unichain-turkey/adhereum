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
          {{successMessage}}
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
          {{ errorMessage }}
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
  import {mapState} from 'vuex'

  export default {
    name: 'App',
    computed: mapState({
      loader: state => state.common.loader,
      successFlag: state => state.common.successFlag,
      errorFlag: state => state.common.errorFlag,
      successMessage: state => state.common.successMessage,
      errorMessage: state => state.common.errorMessage,

    }),
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
