<template>
  <div class="container" style="background: sandybrown">
    </br></br>
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
      <ol class="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner" role="listbox">
        <div class="carousel-item active">
          <div class="row">
            <div class="col-md-3" v-for="sponsor in sponsors">
              <div class="thumbnail">
                <a href="https://upload.wikimedia.org/wikipedia/commons/0/0c/Scarlett_Johansson_Césars_2014.jpg" class="link">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/0/0c/Scarlett_Johansson_Césars_2014.jpg" alt="Lights" style="width:100%">
                </a>
              </div>
            </div>
            <div class="col-md-3" v-for="sponsor in sponsors">
              <div class="thumbnail">
                <a href="https://upload.wikimedia.org/wikipedia/commons/0/0c/Scarlett_Johansson_Césars_2014.jpg" class="link">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/0/0c/Scarlett_Johansson_Césars_2014.jpg" alt="Lights" style="width:100%">
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <div class="row">
            <div class="col-md-3" v-for="sponsor in sponsors">
              <div class="thumbnail">
                <a href="https://upload.wikimedia.org/wikipedia/commons/0/0c/Scarlett_Johansson_Césars_2014.jpg" class="link">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/0/0c/Scarlett_Johansson_Césars_2014.jpg" alt="Lights" style="width:100%">
                </a>
              </div>
            </div>
            <div class="col-md-3" v-for="sponsor in sponsors">
              <div class="thumbnail">
                <a href="https://upload.wikimedia.org/wikipedia/commons/0/0c/Scarlett_Johansson_Césars_2014.jpg" class="link">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/0/0c/Scarlett_Johansson_Césars_2014.jpg" alt="Lights" style="width:100%">
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="carousel-item">
          <div class="row">
            <div class="col-md-3" v-for="sponsor in sponsors">
              <div class="thumbnail">
                <a href="https://upload.wikimedia.org/wikipedia/commons/0/0c/Scarlett_Johansson_Césars_2014.jpg" class="link">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/0/0c/Scarlett_Johansson_Césars_2014.jpg" alt="Lights" style="width:100%">
                </a>
              </div>
            </div>
            <div class="col-md-3" v-for="sponsor in sponsors">
              <div class="thumbnail">
                <a href="https://upload.wikimedia.org/wikipedia/commons/0/0c/Scarlett_Johansson_Césars_2014.jpg" class="link">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/0/0c/Scarlett_Johansson_Césars_2014.jpg" alt="Lights" style="width:100%">
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      </br></br>
      <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
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
  mounted: function () {
    var self = this
    let _contract = this.$store.getters.contractInstance()
    _contract.getPastEvents('beenSponsor', { fromBlock: 0, toBlock: 'latest' }, function(error, events) {
      events.forEach((element) => {
        var address=element.returnValues[0]
        var _sponsor = getSposnsor(address)
        _sponsor.methods.getSponsor().call().then(function (val) {
          console.log(val)
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
