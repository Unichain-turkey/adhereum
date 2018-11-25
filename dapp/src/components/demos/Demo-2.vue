<template>
  <div>
    <div v-for="(banner, index) in banners" v-bind:key="index" class="pa-1">
      <v-layout align-center justify-center row class="ma-1">

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
          flag: 0,
          position: "g-1",
          src: "http://matthewjamestaylor.com/responsive-ads/ad.html"
        },
        {
          flag: 0,
          position: "g-1",
          src: "http://matthewjamestaylor.com/responsive-ads/ad.html"
        },
        {
          flag: 0,
          position: "g-1",
          src: "http://matthewjamestaylor.com/responsive-ads/ad.html"
        },
        {
          flag: 1,
          position: "g-1",
          src: "http://matthewjamestaylor.com/responsive-ads/ad.html"
        },
        {
          flag: 0,
          position: "g-1",
          src: "http://matthewjamestaylor.com/responsive-ads/ad.html"
        },
        {
          flag: 0,
          position: "g-1",
          src: "http://matthewjamestaylor.com/responsive-ads/ad.html"
        },
      ],

    })
  }
</script>

<style scoped>

  .banner-header {
    height: 60px;
    width: 100%;

  }

</style>
