<template>
  <div>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Advertisement Request</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Advertisement Name*" required v-model="name"></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field label="Email*" required v-model="email"></v-text-field>
              </v-flex>

              <v-flex xs12 sm6>
                <v-select
                  v-model="duration"
                  :items="['3', '6', '9', '12']"
                  label="Duration in month *"
                  required
                ></v-select>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Banner hash*" disabled required v-model="fileHash"></v-text-field>
              </v-flex>
              <v-flex xs12>

                <v-form ref="form">
                  <input type="file" class="form-control" @change="onFileChanged" id="inputFile"
                         aria-describedby="fileHelp" placeholder="Place File">

                  <v-btn
                    :loading="ipfsLoading"
                    :disabled="fileUploadValid"
                    @click="fileUplaod"
                  >
                    Upload file to Ipfs
                    <span slot="loader">Loading...</span>
                  </v-btn>
                </v-form>
              </v-flex>

            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat :disabled="adsValid" v-on:click="requestAds">Send</v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>

    <div v-for="(banner, index) in banners" v-bind:key="index" class="pa-1">
      <v-layout align-center justify-center row class="ma-1" style="width:100%;">

        <div v-if="banner['flag']===0" style="width:100%;height:90px;">
          <v-card
            class="pa-1"
            hover>
            <div class=" text-md-center align-content-center pt-2" style="height:70px;">
              <span class="text-md-center text--white headline">Give an Advertisement</span>
              <v-btn fab dark small color="indigo" icon v-on:click="selected(banner['position'])">
                <v-icon>add</v-icon>
              </v-btn>
            </div>
          </v-card>
        </div>
        <div v-else style="width:100%;">
          <div class="banner-header" style="width:100%;height:90px;">
            <iframe
              v-bind:src="getFile(banner['src'])"
              border="0"
              scrolling="no"
              allowtransparency="true"
              width="100%"
              height="100%"
              style="border:0;">
            </iframe>
          </div>
        </div>

      </v-layout>
    </div>
  </div>
</template>

<script>
  import api from "../../api/ipfs/index"
  import apiContract from "../../api/contract/index"
  import store from '../../store/index'
  import {mapState} from 'vuex'

  var Types = {
    0: "Header",
    1: "Footer",
    2: "LeftSide",
    3: "RightSide"
  };
  export default {
    name: "Demo-2",
    data: () => ({
      dialog: false,
      ipfsLoading: false,
      name: null,
      email: null,
      type: null,
      duration: null,
      file: null,
      fileBuffer: null,
      fileHash: null,
      banners: [
        {
          flag: 0,
          position: 0,
          src: "static/banner_template/ad-1.html"
        },
        {
          flag: 0,
          position: 0,
          src: "static/banner_template/ad-2.html"
        },
        {
          flag: 0,
          position: 0,
          src: "static/banner_template/ad-3.html"
        },
        {
          flag: 0,
          position: 0,
          src: "static/banner_template/ad-4.html"
        },
        {
          flag: 0,
          position: 0,
          src: "static/banner_template/ad-3.html"
        },
        {
          flag: 0,
          position: 0,
          src: "static/banner_template/ad-2.html"
        },
      ],

    }),
    watch: {
      contract(val, oldVal) {
        if (val && !oldVal)
          this.getAds()
      }
    },
    computed: {
      ...mapState({
        contract: state => state.main.contractTwo
      }),
      fileUploadValid() {
        return (this.fileHash === null && this.file === null && this.file == null)
      },
      adsValid() {
        return (this.name === null || this.fileHash === null || this.email === null)
      },
    },
    methods: {
      selected(pos) {
        this.dialog = true
        this.type = pos
      },
      requestAds() {

        apiContract.requestAds(this.name, this.fileHash, this.type, this.duration, (e) => {
          console.log(e)
          this.dialog = false
        });
      },
      onFileChanged(event) {
        this.file = event.target.files[0]
      },
      fileUplaod() {
        this.ipfsLoading = true;
        api.readFile(this.file, this.fileReadDone)
      },
      fileReadDone(data) {
        this.fileBuffer = data;
        api.ipfsAdd(this.fileBuffer).then((response) => {
          this.ipfsLoading = false
          this.fileHash = response[0].hash;
          api.ipfsPin(response[0].hash)
        }).catch((err) => {
          console.log(err)
          this.ipfsLoading = false
        })
      },

      findItem: function (array, newItem) {
        let newArray = []
        array.forEach((item) => {
          if (item.flag == 1) {
            newArray.push(item)
          } else if (newItem !== null) {
            newArray.push(
              {
                flag: 1,
                position: Types[newItem[3]],
                position: 0,
                src: newItem[1]
              })
            newItem = null;
          } else {
            newArray.push(item)
          }
        })
        return newArray;
      },
      addItem: function (item) {
        this.banners = this.findItem(this.banners, item)
      },
      getAds: function () {
        let contract = store.getters.contractTwo
        apiContract.readEvents(contract, 'createdAds', (events) => {

          apiContract.getAdsList(events, (item) => {
            this.addItem(item)
          })
        })
      },
      getFile: function (hash) {
        return 'http://46.101.182.159:8080/ipfs/' + hash + '/'
      }


    },
    mounted() {
      if (this.contract !== null)
        this.getAds();
    }
  }
</script>

<style scoped>

  .banner-header {
    height: 60px;
    width: 100%;

  }
</style>
