<template>
  <div>
    <div v-for="(item, index) in pendingList" v-bind:key="index" class="pa-1">
      <v-layout align-center justify-center row class="ma-1" style="width:100%;">

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
        <v-flex xs8 class="pa-1">
          <div class="text-xs-center">
            <div v-if="item['flag']">
              <p class="subheading">{{item['banner']}}</p>
            </div>
            <div v-else>
              <div class="banner-header" style="width:100%;height:90px;">
                <iframe
                  v-bind:src="getfileUrl(item['banner'])"
                  border="0"
                  scrolling="no"
                  allowtransparency="true"
                  width="100%"
                  height="100%"
                  style="border:0;">
                </iframe>
              </div>
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
    0: "Header",
    1: "Footer",
    2: "LeftSide",
    3: "RightSide"
  };
  export default {
    name: "Demo-2-Admin",
    data() {
      return {
        pendingList: [
          {
            'flag': true,
            'index': "INDEX",
            'name': "NAME",
            'duration': "DURATION",
            'type': "TYPE",
            'banner': "BANNER",
            'options': "OPTIONS"
          }
        ],
        contract: store.getters.contractTwo
      }
    },
    methods: {
      acceptButton(e) {
        store.commit('setLoader', true);
        this.contract.methods.confirm(e).send({from: store.getters.coinbase})
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
        this.contract.methods.deny(e).send({from: store.getters.coinbase})
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
      getfileUrl: function (hash) {
        return 'http://46.101.182.159:8080/ipfs/' + hash + '/'
      }
    },
    mounted: function () {
      var count = this.contract.methods.getPendingsCount().call();
      count.then(function (value) {
        for (let i = 0; i < value; i++) {
          this.contract.methods.getPendingAds(i).call().then(function (val) {
            if (val[4] === '0') {//status is not confirmed
              console.log(val)
              this.pendingList.push({
                'flag': false,
                'name': val[0],
                'banner': val[1],
                'type': Types[val[2]],
                'duration': val[3],
                'status': val[4],
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

</style>
