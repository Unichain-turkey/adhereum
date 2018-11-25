<template>

  <v-toolbar
    fixes
    color="primary lighten-1"
    dark
    scroll-off-screen
    scroll-target="#scrolling-techniques"
  >
    <v-spacer></v-spacer>

    <v-toolbar-title class="p-1">
      <router-link class="nav-link white--text" to="demo3">Market Place</router-link>
    </v-toolbar-title>

    <v-toolbar-title class="p-1">
      <router-link  class="nav-link white--text" to="demo2">Advertisement</router-link>
    </v-toolbar-title>

    <v-toolbar-title class="p-1 pr-2">
      <router-link  class="nav-link white--text" to="demo1">Sponsorship</router-link>
    </v-toolbar-title>

    <v-btn icon>
      <v-icon>more_vert</v-icon>
    </v-btn>
  </v-toolbar>

</template>

<script>
export default {
  name: 'Header',

}
</script>

<style scoped>

</style>
