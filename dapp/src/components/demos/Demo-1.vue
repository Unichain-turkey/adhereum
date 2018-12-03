<template>
  <div>
    <v-dialog
      v-model="pageLoader"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          Please stand by
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Sponsor Shipment Request</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Sponsor Name*" required v-model="name"></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field label="Email*" required v-model="email"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Url*" required v-model="url"></v-text-field>
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
                <v-text-field label="Image hash*" disabled required v-model="fileHash"></v-text-field>
              </v-flex>
              <v-flex xs12>

                <v-form ref="form">
                  <input type="file" class="form-control" @change="onFileChanged" id="inputFile"
                         aria-describedby="fileHelp" placeholder="Place File">

                  <v-btn
                    :loading="loading"
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
          <v-btn color="blue darken-1" flat :disabled="sponsorValid" v-on:click="requestSponsor">Send</v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>
    <v-layout align-center justify-center row class="pa-1">
      <p class="title">Gold Sponsors</p>
    </v-layout>
    <v-layout align-center justify-center row class="ma-1">

      <v-flex xs2 v-for="(item, index) in goldSponsors" v-bind:key="index" class="pa-1">

        <div v-if="item['flag']===0">
          <v-card
            class="pa-1"
            hover>
            <v-img
              v-bind:src="item['img']"
            >
            </v-img>
            <v-card-title>
              <div>
                <span>Empty Slot</span>

                <v-btn fab dark small color="indigo" icon
                       v-on:click="(e)=>{
                       selected(item['position'])
                       }">
                  <v-icon>add</v-icon>
                </v-btn>
              </div>
            </v-card-title>


          </v-card>
        </div>
        <div v-else>
          <v-card
            class="pa-1"
            v-bind:href="item['link']"
            target="_blank"
            hover>
            <v-img
              v-bind:src="item['img']"
            >
            </v-img>
            <v-card-title>
              <div>
                <span>{{item['title']}}</span>
              </div>
            </v-card-title>
          </v-card>
        </div>

      </v-flex>

    </v-layout>
    <v-layout align-center justify-center row class="pa-1 pt-1">
      <p class="title">Silver Sponsors</p>
    </v-layout>
    <v-layout align-center justify-center row class="ma-1">
      <v-flex xs2 v-for="(item, index) in silverSponsors" v-bind:key="index" class="pa-1">
        <div v-if="item['flag']===0">
          <v-card
            class="pa-1"
            hover>
            <v-img
              v-bind:src="item['img']"
            >
            </v-img>

            <v-card-title>
              <div>
                <span>Empty Slot</span>

                <v-btn fab dark small color="indigo" icon
                       v-on:click="(e)=>{
                       selected(item['position'])
                       }">
                  <v-icon>add</v-icon>
                </v-btn>
              </div>
            </v-card-title>


          </v-card>
        </div>
        <div v-else>
          <v-card
            class="pa-1"
            v-bind:href="item['link']"
            target="_blank"
            hover>

            <v-img
              v-bind:src="item['img']"
            >
            </v-img>
            <v-card-title>
              <div>
                <span>{{item['title']}}</span><br>
              </div>
            </v-card-title>
          </v-card>
        </div>
      </v-flex>

    </v-layout>
    <v-layout align-center justify-center row class="pa-1 pt-1">
      <p class="title">Bronze Sponsors</p>
    </v-layout>
    <v-layout align-center justify-center row class="ma-1">
      <v-flex xs2 v-for="(item, index) in bronzeSponsors" v-bind:key="index" class="pa-1">
        <div v-if="item['flag']===0">
          <v-card
            class="pa-1"
            hover>
            <v-img

              v-bind:src="item['img']"
            >
            </v-img>
            <v-card-title>
              <div>
                <span>Empty Slot</span>

                <v-btn fab dark small color="indigo" icon
                       v-on:click="(e)=>{
                       selected(item['position'])
                       }">
                  <v-icon>add</v-icon>
                </v-btn>
              </div>
            </v-card-title>
          </v-card>
        </div>
        <div v-else>
          <v-card
            class="pa-1"
            v-bind:href="item['link']"
            target="_blank"
            hover>
            <v-img
              v-bind:src="item['img']"
            >
            </v-img>
            <v-card-title>
              <div>
                <span>{{item['title']}}</span><br>
              </div>
            </v-card-title>
          </v-card>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import api from "../../api/ipfs/index"

  export default {
    name: "Demo-1",
    data: () => ({
      contract: null,
      txLoader: false,
      loading: false,
      dialog: false,
      name: null,
      email: null,
      url: null,
      type: null,
      duration: null,
      file: null,
      fileBuffer: null,
      fileHash: null,
      goldSponsors: [
        {
          flag: 1,
          position: "g-1",
          title: 'Finartz',
          link: "https://finartz.com/",
          img: "http://via.placeholder.com/110x110"
        },
        {
          flag: 1,
          position: "g-2",
          title: 'Finartz',
          link: "https://finartz.com/",
          img: "http://via.placeholder.com/110x110"
        },
        {
          flag: 0,
          position: "g-3",
          title: 'Finartz',
          link: "https://finartz.com/",
          img: "http://via.placeholder.com/110x110"
        },
      ],
      silverSponsors: [
        {
          flag: 0,
          position: "s-1",
          title: 'Finartz',
          link: "https://finartz.com/",
          img: "http://via.placeholder.com/110x110"
        },
        {
          flag: 0,
          position: "s-2",
          title: 'Finartz',
          link: "https://finartz.com/",
          img: "http://via.placeholder.com/110x110"
        },
        {
          flag: 0,
          position: "s-3",
          title: 'Finartz',
          link: "https://finartz.com/",
          img: "http://via.placeholder.com/110x110"
        },
        {
          flag: 0,
          position: "s-4",
          title: 'Finartz',
          link: "https://finartz.com/",
          img: "http://via.placeholder.com/110x110"
        },
        {
          flag: 0,
          position: "s-5",
          title: 'Finartz',
          link: "https://finartz.com/",
          img: "http://via.placeholder.com/110x110"
        },
      ],
      bronzeSponsors: [
        {
          flag: 0,
          position: "b-1",
          title: 'Finartz',
          link: "https://finartz.com/",
          img: "http://via.placeholder.com/110x110"
        },
        {
          flag: 0,
          position: "b-2",
          title: 'Finartz',
          link: "https://finartz.com/",
          img: "http://via.placeholder.com/110x110"
        },
        {
          flag: 0,
          position: "b-3",
          title: 'Finartz',
          link: "https://finartz.com/",
          img: "http://via.placeholder.com/110x110"
        },
        {
          flag: 0,
          position: "b-4",
          title: 'Finartz',
          link: "https://finartz.com/",
          img: "http://via.placeholder.com/110x110"
        },
        {
          flag: 1,
          position: "b-5",
          title: 'Finartz',
          link: "https://finartz.com/",
          img: "http://via.placeholder.com/110x110"
        },
        {
          flag: 0,
          position: "b-6",
          title: 'Finartz',
          link: "https://finartz.com/",
          img: "http://via.placeholder.com/110x110"
        },
        {
          flag: 0,
          position: "b-7",
          title: 'Finartz',
          link: "https://finartz.com/",
          img: "http://via.placeholder.com/110x110"
        },
      ]
    }),
    computed: {
      fileUploadValid() {
        return (this.fileHash === null && this.file === null && this.file == null)
      },
      sponsorValid() {
        return (this.name === null || this.fileHash === null || this.url === null || this.email === null)
      },
      pageLoader() {
        if (this.$store.getters.web3 === null) {
          return true || this.txLoader;
        } else {
          this.init()
          return false || this.txLoader;
        }
      }
    },
    methods: {
      selected(pos) {
        if (pos.includes("b")) {
          this.type = 2;
        } else if (pos.includes("s")) {
          this.type = 1;
        } else {
          this.type = 0;
        }
        this.dialog = true;
      },
      requestSponsor() {

        let _base = this.$store.getters.currentAddress
        this.txLoader = true;
        const temp = this.contract.methods.requestBeingSponsor(
          this.name,
          this.url,
          this.fileHash,
          this.type,
          this.duration
        ).send(
          {value: this.$options.filters.toWei('1') * (3 - this.type) * this.duration, from: _base})

        let that = this;
        temp.then(function (value) {
          console.log(value)
          that.txLoader = false;
          that.$store.commit('success', 'Succefuly deployed request');
        }).catch((e) => {
          console.log(e)
          that.$store.commit('error', e);
          that.txLoader = false;
        });
      },
      onFileChanged(event) {
        this.file = event.target.files[0]
      },
      fileUplaod() {
        this.loading = true;
        api.readFile(this.file, this.fileReadDone)
      },
      fileReadDone(data) {
        this.fileBuffer = data;
        api.ipfsAdd(this.fileBuffer).then((response) => {
          this.loading = false
          this.fileHash = response[0].hash;
          api.ipfsPin(response[0].hash)
        }).catch((err) => {
          this.loading = false
        })
      },
      init: function () {
        let web3 = this.$store.getters.web3;
        web3 = web3()
        this.contract = new web3.eth.Contract(this.$store.getters.jsonSponsor.abi, this.$store.getters.addressSponsor)
        console.log(this.contract.options)
        this.$store.commit('SETCONTRACT', this.contract)
        this.getSponsors()
      },
      getSponsors: function () {
        this.contract.getPastEvents('beenSponsor', {fromBlock: 0, toBlock: 'latest'}, function (error, events) {
          events.forEach((element) => {
            var address = element.returnValues[0]
            var _sponsor = this.getSposnsor(address)
            _sponsor.methods.getSponsor().call().then(function (val) {
              console.log(val)
            })
          });
        }.bind(this))
      }
    }

  }
</script>

<style scoped>
</style>
