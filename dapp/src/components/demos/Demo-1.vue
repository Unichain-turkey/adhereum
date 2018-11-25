<template>
  <div>
    <v-layout align-center justify-center row class="pa-1">
      <p class="title">Gold Sponsors</p>
    </v-layout>
    <v-layout align-center justify-center row class="ma-1"  >

      <v-flex xs2 v-for="(item, index) in goldSponsors" v-bind:key="index">
        <v-card
          hover>
          <v-img
            v-bind:src="item['img']"
          >
          </v-img>
          <v-card-title>
            <div>
              <span>{{item['title']}}</span><br>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>

    </v-layout>
    <v-layout align-center justify-center row class="pa-1 pt-1">
      <p class="title">Silver Sponsors</p>
    </v-layout>
    <v-layout align-center justify-center row class="ma-1" >
      <v-flex xs2 v-for="(item, index) in silverSponsors" v-bind:key="index">
        <v-card
          hover>
          <v-img
            v-bind:src="item['img']"
          >
          </v-img>
          <v-card-title>
            <div>
              <span>{{item['title']}}</span><br>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>

    </v-layout>
    <v-layout align-center justify-center row class="pa-1 pt-1">
      <p class="title">Bronze Sponsors</p>
    </v-layout>

    <v-layout align-center justify-center row class="ma-1" >
      <v-flex xs2 v-for="(item, index) in bronzeSponsors" v-bind:key="index">
        <v-card
          hover
        >
          <v-img
            v-bind:src="item['img']"
          >
          </v-img>
          <v-card-title>
            <div>
              <span>{{item['title']}}</span><br>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>


    </v-layout>


  </div>
</template>

<script>
  export default {
    name: "Demo-1",
    data: () => ({
      goldSponsors: [
        {title: 'Finartz', link: "https://finartz.com/", img: "http://via.placeholder.com/110x110"},
        {title: 'Finartz', link: "https://finartz.com/", img: "http://via.placeholder.com/110x110"},
        {title: 'Finartz', link: "https://finartz.com/", img: "http://via.placeholder.com/110x110"},
      ],
      silverSponsors: [
        {title: 'Finartz', link: "https://finartz.com/", img: "http://via.placeholder.com/110x110"},
        {title: 'Finartz', link: "https://finartz.com/", img: "http://via.placeholder.com/110x110"},
        {title: 'Finartz', link: "https://finartz.com/", img: "http://via.placeholder.com/110x110"},
        {title: 'Finartz', link: "https://finartz.com/", img: "http://via.placeholder.com/110x110"},
        {title: 'Finartz', link: "https://finartz.com/", img: "http://via.placeholder.com/110x110"},
      ],
      bronzeSponsors: [
        {title: 'Finartz', link: "https://finartz.com/", img: "http://via.placeholder.com/110x110"},
        {title: 'Finartz', link: "https://finartz.com/", img: "http://via.placeholder.com/110x110"},
        {title: 'Finartz', link: "https://finartz.com/", img: "http://via.placeholder.com/110x110"},
        {title: 'Finartz', link: "https://finartz.com/", img: "http://via.placeholder.com/110x110"},
        {title: 'Finartz', link: "https://finartz.com/", img: "http://via.placeholder.com/110x110"},
        {title: 'Finartz', link: "https://finartz.com/", img: "http://via.placeholder.com/110x110"},
        {title: 'Finartz', link: "https://finartz.com/", img: "http://via.placeholder.com/110x110"},

      ]

    }),

  }
</script>

<style scoped>

</style>
