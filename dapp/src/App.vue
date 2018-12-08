<template>
  <v-app id="app">
    <header-component></header-component>
    <v-content>
      <v-container fluid>

        <v-snackbar
          :value="successFlag"
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
          :value="errorFlag"
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
        v-model="pageLoader"
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
  import store from './store/index'

  export default {
    name: 'App',
    computed: {
      ...mapState({
        loader: state => state.common.loader,
        successFlag: state => state.common.successFlag,
        errorFlag: state => state.common.errorFlag,
        successMessage: state => state.common.successMessage,
        errorMessage: state => state.common.errorMessage,

      }),
      pageLoader() {
        if (store.getters.web3 === null) {
          return true || this.loader
        } else {
          this.initilaze()
          return false || this.loader
        }
      },
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
        store.commit('reset');
      },
      initilaze: function () {
        let web3 = store.getters.web3;
        web3 = web3()
        let contractOne = new web3.eth.Contract(store.getters.jsonDemoOne.abi, store.getters.addressDemoOne)
        store.commit('SETCONTRACTONE', contractOne)
        let contractTwo = new web3.eth.Contract(store.getters.jsonDemoTwo.abi, store.getters.addressDemoTwo)
        store.commit('SETCONTRACTTWO', contractTwo)
      },

    }
  }
</script>

<style>
  #app {
    font-family: 'Ubuntu', sans-serif;
  }
</style>
