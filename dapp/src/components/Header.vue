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
      <router-link to="demo3">Demo-3</router-link>
    </v-toolbar-title>

    <v-toolbar-title class="p-1">
      <router-link to="demo2">Demo-2</router-link>
    </v-toolbar-title>

    <v-toolbar-title class="p-1 pr-2">
      <router-link to="demo1">Demo-1</router-link>
    </v-toolbar-title>

    <v-btn icon>
      <v-icon>search</v-icon>
    </v-btn>

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
