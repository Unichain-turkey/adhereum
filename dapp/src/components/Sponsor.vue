<template>
  <div class="container" style="background: floralwhite">
    <div class="row">
      <div class="col-md-3" v-for="sponsor in sponsors">
        <div class="thumbnail">
          <a :href="sponsor['url']" class="link">
            <img :src="getImageUrl(sponsor['imageHash'])" alt="Lights" style="width:100%">
          </a>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

  import store from '@/store/'
  import sponsorJson from '../../../build/contracts/Sponsor.json'
  function getSposnsor (address) {
    let _web3 = store.getters.web3InstanceGetter()
    return new _web3.eth.Contract(sponsorJson.abi, address)
  }
  export default {
    name: "Sponsor",
    data () {
      return {
        sponsors: []
      }
    },
    methods: {
      getImageUrl: function (hash) {
        console.log(hash)
        return 'https://gateway.ipfs.io/ipfs/' + hash + '/'
      }
    },
    mounted: function () {
      var self = this
      let _contract = this.$store.getters.contractInstance()
      _contract.getPastEvents('beenSponsor', { fromBlock: 0, toBlock: 'latest' }, function(error, events) {
        events.forEach((element) => {
          var address=element.returnValues[0]
          var _sponsor = getSposnsor(address)
          _sponsor.methods.getSponsor().call().then(function (val) {
            console.log("Here",val)
            self.sponsors.push({
              "name":val[0],
              "url":val[1],
              "imageHash":val[2],
              "duration":val[3],
            })
          })

        });
      })
    }
  }
</script>

<style scoped>

</style>
