<template>
  <div>
    <nav class="navbar sticky-top navbar-light bg-light">
      <a class="navbar-brand" href="#">Registhereum</a>
      <!-- <b>Balance: {{$store.getters.balance}} ETH</b> -->
      <b>Address: {{$store.getters.currentAddress}}</b>
      <!-- <b>Network: {{$store.getters.network}}</b> -->
      <b></b>
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
