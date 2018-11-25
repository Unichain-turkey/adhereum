<template>
  <div>
    <div v-for="(banner, index) in banners" v-bind:key="index" class="pa-1">
      <v-layout align-center justify-center row class="ma-1" style="width:100%;">

        <div v-if="banner['flag']===0" style="width:100%;height:90px;">
          <v-card
            class="pa-1"
            hover>
            <div class=" text-md-center align-content-center pt-2" style="height:70px;">
              <span class="text-md-center text--white headline">Give an Advertisement</span>
              <v-btn fab dark small color="indigo" icon v-on:click="test">
                <v-icon>add</v-icon>
              </v-btn>
            </div>
          </v-card>
        </div>
        <div v-else style="width:100%;">
          <div class="banner-header" style="width:100%;height:90px;">
            <iframe
              v-bind:src="banner['src']"
              border="0"
              scrolling="no"
              allowtransparency="true"
              width="100%"
              height="100%"
              style="border:0;">
            </iframe>
          </div>
        </div>

      </v-layout>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Demo-2",
    data: () => ({
      banners: [
        {
          flag: 1,
          position: "g-1",
          src: "static/banner_template/ad.html"
        },
        {
          flag: 0,
          position: "g-1",
          src: "static/banner_template/ad.html"
        },
        {
          flag: 1,
          position: "g-1",
          src: "static/banner_template/ad.html"
        },
        {
          flag: 1,
          position: "g-1",
          src: "static/banner_template/ad.html"
        },
        {
          flag: 1,
          position: "g-1",
          src: "static/banner_template/ad.html"
        },
        {
          flag: 1,
          position: "g-1",
          src: "static/banner_template/ad.html"
        },
      ],

    }),
    methods: {
      test() {
        console.log("Clicked")
        this.dialog = true;
      }
    }
  }
</script>

<style scoped>

  .banner-header {
    height: 60px;
    width: 100%;

  }

</style>
