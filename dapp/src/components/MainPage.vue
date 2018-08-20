<template>
    <div class="container">

        <statistics class="p-3 m-2"></statistics>

        <sponsors class="p-3 m-2"></sponsors>

        <beingsponsor class="p-3 m-2"></beingsponsor>

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
import Sponsors from '@/components/sponsor/Sponsors'
import BeingSponsor from '@/components/sponsor/BeingSponsor.vue'
import Statistics from '@/components/Statistics.vue'

export default {
  name: 'MainPage',
  components: {
    sponsors: Sponsors,
    beingsponsor:BeingSponsor,
    statistics: Statistics
  },

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
