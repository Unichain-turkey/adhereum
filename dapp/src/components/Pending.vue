<template>
  <div>

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
          <td> <button type="button" class="btn btn-success" v-on:click="acceptButton(key)">Accept</button></td>
          <td> <button type="button" class="btn btn-danger" v-on:click="declineButton(key)">Ignore</button></td>
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
        deployedContract: this.$store.getters.contractInstance()
      }
    },
    methods: {
      acceptButton(e) {
        console.log("adadasd")
        console.log(e);

        let _contract = this.$store.getters.contractInstance();
        console.log(_contract);

        _contract.methods.confirm(e).send({from: this.$store.getters.currentAddress})
          .then(function(receipt){
            console.log(receipt)
          });
      },
      declineButton(e) {
        console.log(e);

        let _contract = this.$store.getters.contractInstance();
        console.log(_contract);

        _contract.methods.deny(e).send({from: this.$store.getters.currentAddress})
          .then(function(receipt){
            console.log(receipt)
          });
      },
      getImageUrl: function (hash) {
        console.log(hash)
        return 'https://gateway.ipfs.io/ipfs/' + hash + '/'
      }
    },
    mounted: function () {
      let self = this;
      let _contract = this.$store.getters.contractInstance();
      var count=_contract.methods.getNumberPending().call();
      count.then(function(value){
        var i;
        for (i = 0; i < value; i++) {
          _contract.methods.getPendingList(i).call().then(function(val){
            console.log(val)
            if (val[4]==="0"){
              self.pendings.push({
                'name': val[0],
                'url': val[1],
                'imageHash': val[2],
                'duration': val[3],
                'status': val[4],
              })
            }
          })
        }
      })
    }
  }
</script>

<style scoped>
.imgContainer {
  height: 200px;
  weight: 150px;
}
</style>
