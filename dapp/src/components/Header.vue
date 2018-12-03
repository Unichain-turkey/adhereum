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

      <v-menu>
        <v-toolbar-title slot="activator">
          <span>Advertisement</span>
          <v-icon dark>arrow_drop_down</v-icon>
        </v-toolbar-title>

        <v-list>
          <v-list-tile
            v-for="item in demo1"
            :key="item['title']"
            @click="route(item['link'])"
          >
            <v-list-tile-title v-text="item['title']"></v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar-title>

    <v-toolbar-title class="p-1 pr-2">

      <v-menu>
        <v-toolbar-title slot="activator">
          <span>Sponsorship</span>
          <v-icon dark>arrow_drop_down</v-icon>
        </v-toolbar-title>

        <v-list>
          <v-list-tile
            v-for="item in demo1"
            :key="item['title']"
            @click="route(item['link'])"
          >
            <v-list-tile-title v-text="item['title']"></v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar-title>

    <v-btn icon>
      <v-icon>more_vert</v-icon>
    </v-btn>
  </v-toolbar>

</template>

<script>
  export default {
    name: 'Header',
    data: () => ({
      demo1: [
        {title: 'Demo', link: '/demo1'}, {title: 'Admin', link: '/demo1/admin'}
      ],
      demo2: [
        {title: 'Demo', link: '/demo2'}, {title: 'Admin', link: '/demo2/admin'}
      ]
    }),
    methods: {
      route(link) {
        this.$router.push(link) //named route, see later

      },
    }

  }
</script>

<style scoped>

</style>
