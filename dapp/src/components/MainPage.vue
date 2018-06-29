<template>
  <div>
    <div class="jumbotron elma">
      <h1 class="display-4">this field intentionally left blank</h1>
      <p class="lead">...</p>
      <hr class="my-4">
      <p>...</p>
      <p class="lead">
        <a class="btn btn-outline-info btn-block"
           href="https://github.com/Unichain-turkey"
           role="button"
           target="_blank">Learn more</a>
      </p>
    </div>
    <div class="container">
      <statistics></statistics>
      <br/>
      <create-sponsorship></create-sponsorship>
      <br/>
      <sponsor></sponsor>
    </div>
  </div>
</template>
<script>
/*

header
giriş
istatistikler

loop ile sponsor[index] şeklinde bütün sponsorları çek
aktif olanları listele
pasif olanları da listeleme olabilir. geçmiş alanında

eklemeyi modal ile yap
sponsorluk formu

 */
import CreateSponsorship from '@/components/CreateSponsorship.vue'
import Statistics from '@/components/Statistics.vue'
import Sponsor from '@/components/Sponsor.vue'
export default {
  name: 'MainPage',
  components: {
    'create-sponsorship': CreateSponsorship,
    'statistics': Statistics,
    'sponsor': Sponsor
  },
  data () {
    return {
      posts: [],
      sponsors: [],
      msg: false,
      length: null,
      count: 0
    }
  },
  methods: {
    getHello () {
      // console.log('function')
      return 5
    }
  },
  created: function () {
    this.getHello()
  },
  mounted: function () {
    var self = this
    let _contract = this.$store.getters.contractInstance()
    _contract.getPastEvents('beenSponsor', { fromBlock: 0, toBlock: 'latest' }, function(error, events) {
      if (error) {
        alert(error)
      }
    })
      .then(function(events){
        if (events){
          var count = events.length
          self.$store.dispatch('setSponsorCount', count)
          self.$store.dispatch('setActiveSponsorCount', count)
          self.$store.dispatch('setTotalValue', count * 415)
          events.forEach(function (event) {
            self.sponsors.push(event.returnValues)
          })
        }
      });
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
