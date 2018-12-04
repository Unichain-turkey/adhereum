<template>
  <div>
    <div v-for="(item, index) in pendingList" v-bind:key="index" class="pa-1">
      <v-layout align-center justify-center row class="ma-1">

        <v-flex xs1 class="pa-1">
          <div class="text-xs-center">
            <p class="subheading">{{item['name']}}</p>
          </div>
        </v-flex>
        <v-flex xs1 class="pa-1">
          <div class="text-xs-center">
            <p class="subheading">{{item['duration']}}</p>
          </div>
        </v-flex>
        <v-flex xs1 class="pa-1">
          <div class="text-xs-center">
            <p class="subheading">{{item['type']}}</p>
          </div>
        </v-flex>
        <v-flex xs2 class="pa-1">
          <div class="text-xs-center">
            <div v-if="item['flag']">
              <p class="subheading">{{item['url']}}</p>
            </div>
            <div v-else>
              <a class="subheading" :href="item['url']" target="_blank"> {{item['url']}}</a>
            </div>
          </div>
        </v-flex>
        <v-flex xs2 class="pa-1">
          <div class="text-xs-center">
            <div v-if="item['flag']">
              <p class="subheading">{{item['image']}}</p>
            </div>
            <div v-else>
              <img class="imgContainer " alt="Responsive image" :src="getImageUrl(item['image'])"/>
            </div>
          </div>
        </v-flex>
        <v-flex xs1>
          <div class="text-xs-center">
            <div v-if="item['flag']">
              <p class="subheading">{{item['options']}}</p>
            </div>
            <div v-else>
              <v-btn small color="success" v-on:click="acceptButton(item['index'])">Accept</v-btn>
              <v-btn small color="error" v-on:click="declineButton(item['index'])">Reject</v-btn>
            </div>
          </div>
        </v-flex>

      </v-layout>
    </div>
  </div>
</template>

<script>
  var Types = {
    0: "Gold",
    1: "Silver",
    2: "Bronze"
  };
  export default {
    name: "Demo-1-Admin",
    data() {
      return {
        pendingList: [
          {
            'flag': true,
            'name': "NAME",
            'url': "LINK",
            'duration': "DURATION",
            'type': "TYPE",
            'image': "IMAGE",
            'options': "OPTIONS"

          }
        ],
        contract: this.$store.getters.contractOne
      }
    },
    methods: {
      acceptButton(e) {
        let that = this
        that.$store.commit('setLoader', true);
        this.contract.methods.confirm(e).send({from: this.$store.getters.currentAddress})
          .then(function (tx) {
            that.$store.commit('success', tx);
            that.$store.commit('setLoader', false);
            console.log(tx)
          }).catch((e) => {
          console.log(e)
          that.$store.commit('error', e);
          that.$store.commit('setLoader', false);
        }).finally(function() {
          console.log("Finaly")
          that.$store.commit('setLoader', false);
        });
      },
      declineButton(e) {
        let that = this
        that.$store.commit('setLoader', true);
        this.contract.methods.deny(e).send({from: this.$store.getters.currentAddress})
          .then(function (tx) {
            that.$store.commit('success', tx);
            that.$store.commit('setLoader', false);
            console.log(tx)
          }).catch((e) => {
          console.log(e)
          that.$store.commit('error', e);
          that.$store.commit('setLoader', false);
        }).finally(function() {

          that.$store.commit('setLoader', false);
        });
      },
      getImageUrl: function (hash) {
        return 'http://46.101.182.159:8080/ipfs/' + hash + '/'
      }
    },
    mounted: function () {
      console.log(this.$store.getters.getContract)
      var count = this.contract.methods.getNumberPending().call();
      count.then(function (value) {
        var i;
        for (i = 0; i < value; i++) {
          this.contract.methods.getPendingList(i).call().then(function (val) {
            console.log(val)
            this.pendingList.push({
              'name': val[0],
              'url': val[1],
              'image': val[2],
              'duration': val[3],
              'type': Types[val[4]],
              'index': i - 1,
            })
          }.bind(this))
        }
      }.bind(this))
    }
  }
</script>

<style scoped>
  .imgContainer {
    height: 110px;
    weight: 110px;
  }

</style>

