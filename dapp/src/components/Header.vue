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
      <router-link class="navbar-brand" to="/admin">
            Admin
          </router-link>
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
