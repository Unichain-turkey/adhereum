<template>
  <div class="container">
    <sponsorlist></sponsorlist>
    <br/>
    <being-sponsor></being-sponsor>
    <br/>
  </div>
</template>
<script>
  import SponsorList from './sponsor/SponsorList'
  import BeingSponsor from "./sponsor/BeingSponsor";

  export default {
    name: 'MainPage',
    components: {
      BeingSponsor,
      'sponsorlist': SponsorList,
      'being-sponsor': BeingSponsor
    },
    data() {
      return {
        posts: [],
        sponsors: [],
        msg: false,
        length: null,
        count: 0
      }
    },
    methods: {
      getHello() {
        // console.log('function')
        return 5
      }
    },
    created: function () {
      this.getHello()
    },
    mounted: function () {
      var self = this
      let _contract = this.$store.getters.contractInstance
      console.log(_contract)
      /*
      _contract.getPastEvents('beenSponsor', {fromBlock: 0, toBlock: 'latest'}, function (error, events) {
        if (error) {
          alert(error)
        }
      })
        .then(function (events) {
          if (events) {
            var count = events.length
            self.$store.dispatch('setSponsorCount', count)
            self.$store.dispatch('setActiveSponsorCount', count)
            self.$store.dispatch('setTotalValue', count * 415)
            events.forEach(function (event) {
              self.sponsors.push(event.returnValues)
            })
          }
        });
        */
    }
  }
</script>
<style>
  .elma {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: rgba(235, 0, 66, 0.78);
  }
</style>
