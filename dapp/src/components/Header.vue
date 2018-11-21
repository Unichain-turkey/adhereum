<template>
  <div
    class="hide-overflow"
    style="position: relative;"
  >
    <v-toolbar
      fixes
      color="teal lighten-3"
      dark
      scroll-off-screen
      scroll-target="#scrolling-techniques"
    >

      <v-spacer></v-spacer>

      <v-toolbar-title class="p-1">Total sponsor: {{ $store.getters.sponsorCount }}</v-toolbar-title>

      <v-toolbar-title class="p-1">Total amount {{ $store.getters.totalValue }} $</v-toolbar-title>

      <v-toolbar-title class="p-1 pr-2">Active sponsor {{ $store.getters.activeSponsorCount }}</v-toolbar-title>

      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>
    <div
      id="scrolling-techniques"
      class="scroll-y"
      style="max-height: 600px;"
    >
      <v-container style="height: 1000px;"></v-container>
    </div>
  </div>
</template>

<script>

  export default {

    name: 'Header',

  }
</script>

<style scoped>

</style>
