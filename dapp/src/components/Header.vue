<template>
  <div>
    <!--<nav class="navbar sticky-top navbar-light bg-light">
      <router-link class="navbar-brand" to="/">
        Adhereum
      </router-link>
      <router-link class="navbar-brand" to="/ipfs">
        File Upload
      </router-link>
      <b>Balance: {{$store.getters.balance}} ETH</b>
      <b>{{$store.getters.currentAddress}}</b>
      <b>Network: {{$store.getters.network}}</b>
      <b></b>
    </nav>-->
    <nav class="navbar sticky-top navbar-light bg-light">
      <router-link class="navbar-brand" to="/">
        Adhereum
      </router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="navbar-brand" to="/ipfs">
            File Upload
          </router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/">About</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>

</style>
