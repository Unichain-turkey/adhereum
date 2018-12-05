<template>
  <div>
    <div v-for="(item, index) in pendingList" v-bind:key="index" class="pa-1">
      <v-layout align-center justify-center row class="ma-1">

        <v-flex xs1 class="pa-1">
          <div class="text-xs-center">
            <p class="subheading">{{item['index']}}</p>
          </div>
        </v-flex>
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
  import store from '../../store/index'

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
            'index': "INDEX",
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
        store.commit('setLoader', true);
        this.contract.methods.confirm(e).send({from: this.$store.getters.currentAddress})
          .then(function (tx) {
            console.log(tx)
            store.commit('success', "Successfully delivered tx");
          }).catch((e) => {
          console.log(e)
          store.commit('error', "Fail");
        }).finally(function () {
          store.commit('setLoader', false);
        });
      },
      declineButton(e) {
        store.commit('setLoader', true);
        this.contract.methods.deny(e).send({from: this.$store.getters.currentAddress})
          .then(function (tx) {
            console.log(tx)
            store.commit('success', "Successfully delivered tx");
          }).catch((e) => {
          console.log(e)
          store.commit('error', "Fail");
        }).finally(function () {
          store.commit('setLoader', false);
        });
      },
      getImageUrl: function (hash) {
        return 'http://46.101.182.159:8080/ipfs/' + hash + '/'
      }
    },
    mounted: function () {
      var count = this.contract.methods.getPendingsCount().call();
      count.then(function (value) {
        for (let i = 0; i < value; i++) {
          this.contract.methods.getPendingSponsor(i).call().then(function (val) {
            if (val[5] === '0') {//status is not confirmed
              this.pendingList.push({
                'name': val[0],
                'url': val[1],
                'image': val[2],
                'type': Types[val[3]],
                'duration': val[4],
                'status': val[5],
                'index': i,
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
    height: 110px;
    weight: 110px;
  }

</style>

