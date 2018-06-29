<template>
  <div class="statistics">
    <div class="row">
      <div class="col">Total sponsor: {{ $store.getters.sponsorCount }}</div>
      <div class="col">Total amount {{ $store.getters.totalValue }} $</div>
      <div class="col">Active sponsor {{ $store.getters.activeSponsorCount }}</div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Statistics"
    }
    // <!--fonksiyonlarla countu, priceları, actifleri bul göster. ya da en başta alıp store da tut bu değerleri-->
</script>

<style scoped>

</style>
