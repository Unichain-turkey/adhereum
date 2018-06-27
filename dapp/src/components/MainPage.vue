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
      <create-sponsorship></create-sponsorship>
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
export default {
  name: 'MainPage',
  components: {
    'create-sponsorship': CreateSponsorship,
    'statistics': Statistics
  },
  data () {
    return {
      posts: [],
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
