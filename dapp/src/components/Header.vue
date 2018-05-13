<template>
  <div>
    <nav class="navbar sticky-top navbar-light bg-light">
      <a class="navbar-brand" href="#">Registhereum</a>
      <b>Balance: {{$store.getters.balance}} ETH</b>
      <b>Address: {{$store.getters.currentAddress}}</b>
      <b>Network: {{$store.getters.network}}</b>
      <b>TotalActivity: {{totalActivity}}</b>
      <b></b>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data: function () {
    return {
      totalActivity: null
    }
  },
  created () {
    const temp = this.$store.getters.contractInstance().methods.getTotalActivity().call()
    let that = this
    temp.then(function (val) {
      that.totalActivity = val
    })
  }
}
</script>

<style scoped>

</style>
