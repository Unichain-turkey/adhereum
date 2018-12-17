<template>
  <v-container class="pa-5">
    <div class="text-xs-center pa-5">
      <v-btn round color="primary" dark large v-on:click="route('/demo1')">Demo-1</v-btn>
      <v-btn round color="primary" dark large v-on:click="route('/demo1')">Demo-2</v-btn>
    </div>
  </v-container>
</template>

<script>
  export default {
    name: "Main",
    methods: {
      route(link) {
        this.$router.push(link) //named route, see later

      },
    }
  }
</script>

<style scoped>

</style>
