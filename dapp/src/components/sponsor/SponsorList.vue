<template>

</template>

<script>
  import sponsorAbi from '../../../../build/contracts/Sponsor.json'

  export default {
    name: "Sponsors",
    data() {
      return {
        sponsors: [],
        paginationSize: 10,
        paginationPadding: 10,
        loop: true,
        navigationEnabled: true,
        perPage: 3

      }
    },
    methods: {
      getImageUrl: function (hash) {
        console.log(hash)
        return 'https://gateway.ipfs.io/ipfs/' + hash + '/'
      }
    },
    mounted: function () {
      setTimeout(function () {
        this.init()
      }.bind(this), 1100)
    },
    methods: {
      getSposnsor: function (address) {
        let _web3 = this.$store.getters.web3
        return new _web3.eth.Contract(sponsorAbi.abi, address)
      },
      getImageUrl: function (hash) {
        return 'http://46.101.182.159:8080/ipfs/' + hash + '/'
      },
      init: function () {
        var self = this
        let _contract = this.$store.getters.contractInstance()
        _contract.getPastEvents('beenSponsor', {fromBlock: 0, toBlock: 'latest'}, function (error, events) {
          events.forEach((element) => {
            var address = element.returnValues[0]
            var _sponsor = this.getSposnsor(address)
            _sponsor.methods.getSponsor().call().then(function (val) {
              self.sponsors.push({
                "name": val[0],
                "url": val[1],
                "imageHash": val[2],
                "duration": val[3],
              })
            })

          });
        }.bind(this))
      }
    }
  }
</script>

<style scoped>
  .imgContainer {
    display: block;
    max-width: 180px;
    max-height: 180px;
    width: auto;
    height: auto;
  }

</style>
