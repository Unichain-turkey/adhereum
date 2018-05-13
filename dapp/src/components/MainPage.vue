<template>
  <div>
    <div class="jumbotron elma">
      <h1 class="display-4">Let's be a Sponsor of Us!</h1>
      <p class="lead">This is a blockchain based sponsor application ...</p>
      <hr class="my-4">
      <p>You can be a sponsor of us here, which is a blockchain based application</p>
      <p class="lead">
        <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
      </p>
    </div>
    <div class="container">
      <div style="color:red">
          <h1>{{$route.name}}</h1>
          <div v-if="msg">
          </div>
      </div>
    </div>
  </div>
</template>
<script>
/*
sponsorluk formu
bütün sponsorların countu
loop ile sponsor[index] şeklinde bütün sponsorları çek
aktif olanları listele

 */
export default {
  name: 'MainPage',
  components: {},
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
      console.log('function')
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
    color: #2c3e50;
  }
</style>
