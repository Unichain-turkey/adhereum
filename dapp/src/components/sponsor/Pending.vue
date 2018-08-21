<template>
  <div class="pend">

    <table class="table table-striped">
      <thead>
      <tr>
        <th>Name</th>
        <th>Url</th>
        <th>Duration</th>
        <th>Image</th>
        <th>Accept</th>
        <th>Decline</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(pending, key) in pendings">
        <td> {{pending['name']}} </td>
        <td> {{pending['url']}} </td>
        <td> {{pending['duration']}} </td>
        <td>  <img class="imgContainer img-thumbnail" alt="Responsive image" :src="getImageUrl(pending['imageHash'])" /> </td>
        <td> <button type="button" class="btn btn-success" v-on:click="acceptButton(pending['index'])">Accept</button></td>
        <td> <button type="button" class="btn btn-danger" v-on:click="declineButton(pending['index'])">Ignore</button></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: "Pending",
    data () {
      return {
        pendings: [],
        contract: this.$store.getters.contractInstance()
      }
    },
    methods: {
      acceptButton(e) {
        this.contract.methods.confirm(e).send({from: this.$store.getters.currentAddress})
          .then(function(receipt){
            console.log(receipt)
          });
      },
      declineButton(e) {
        this.contract.methods.deny(e).send({from: this.$store.getters.currentAddress})
          .then(function(receipt){
            console.log(receipt)
          });
      },
      getImageUrl: function (hash) {
        return 'http://46.101.182.159:8080/ipfs/' + hash + '/'
      }
    },
    mounted: function () {
      var count=this.contract.methods.getNumberPending().call();
      count.then(function(value){
        var i;
        for (i = 0; i < value; i++) {
          this.contract.methods.getPendingList(i).call().then(function(val){

            if (val[4]==="0"){

              this.pendings.push({
                'name': val[0],
                'url': val[1],
                'imageHash': val[2],
                'duration': val[3],
                'status': val[4],
                'index':(i-1),
              })
            }
          }.bind(this))
        }
      }.bind(this))
    }
  }
</script>

<style scoped>
  .imgContainer {
    height: 200px;
    weight: 150px;
  }

  .pend {
    background-color: #ffffff;
    width: 100%;
    position: absolute;
  }
</style>
