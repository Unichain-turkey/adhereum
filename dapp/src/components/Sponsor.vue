git<template>
  <div>
    <div class="row" v-for="sponsor in sponsors">
      <div class="col">
        {{sponsor}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sponsor",
  data () {
    return {
      sponsors: []
    }
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

<style scoped>

</style>
