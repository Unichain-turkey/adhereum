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
              :src="getImageUrl(item['img'])"
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
              :src="getImageUrl(item['img'])"
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
              :src="getImageUrl(item['img'])"
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
              :src="getImageUrl(item['img'])"
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
              :src="getImageUrl(item['img'])"
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
              :src="getImageUrl(item['img'])"
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
  import apiContract from "../../api/contract/index"
  import store from '../../store/index'
  import ValidationUtil from "../../common/util";
  import {mapState} from 'vuex'



  var Types = {
    0: "gold",
    1: "silver",
    2: "bronze"
  };

  export default {
    name: "Demo-1",
    data: () => ({
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
          flag: 0,
          position: "g-1",
          title: 'Finartz',
          link: "https://finartz.com/",
          img: "http://via.placeholder.com/110x110"
        },
        {
          flag: 0,
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
          flag: 0,
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
      ...mapState({
        contract: state => state.main.contractOne,
      }),
      fileUploadValid() {
        return (this.fileHash === null && this.file === null && this.file == null)
      },
      sponsorValid() {
        return (this.name === null || this.fileHash === null || this.url === null || this.email === null)
      },
      pageLoader() {
        if (store.getters.web3 === null) {
          return true || this.txLoader;
        } else {
          this.initilaze()
          return false || this.txLoader;
        }
      },
    },
    watch: {
      contract(val, oldVal) {
        if (val && !oldVal)
          this.getSponsors()
      }
    },
    methods: {
      selected(pos) {
        if (pos.includes("b")) {
          this.type = 2
        } else if (pos.includes("s")) {
          this.type = 1
        } else {
          this.type = 0
        }
        this.dialog = true
      },
      requestSponsor() {
        this.txLoader = true

        apiContract.requestSponsor(this.name, this.url, this.fileHash, this.type, this.duration, (e) => {
          console.log(e)
          this.txLoader = false
          this.dialog = false
        });
      },
      getImageUrl: function (link) {
        if (link.includes('via')) {
          return link
        } else {
          return 'http://46.101.182.159:8080/ipfs/' + link + '/'
        }
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
      initilaze: function () {
        /*
        let web3 = store.getters.web3;
        web3 = web3()
        this.contract = new web3.eth.Contract(store.getters.jsonDemoTwo.abi, store.getters.addressDemoOne)
        store.commit('SETCONTRACTONE', this.contract)
        */
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
                title: newItem[0],
                link: ValidationUtil.validateLink(newItem[1]),
                img: newItem[2]
              })
            newItem = null;
          } else {
            newArray.push(item)
          }
        })
        return newArray;
      },
      addItem: function (item) {
        switch (item[3]) {
          case '0':
            this.goldSponsors = this.findItem(this.goldSponsors, item)
            break;
          case '1':
            this.silverSponsors = this.findItem(this.silverSponsors, item)
            break;
          default:
            this.bronzeSponsors = this.findItem(this.bronzeSponsors, item)
        }
      },
      getSponsors: function () {

        let contract = store.getters.contractOne
        apiContract.readEvents(contract,'beenSponsor', (events) => {
          apiContract.getSponsorList(events, (item) => {
            this.addItem(item)
          })
        })
      }
    },
  }
</script>

<style scoped>
</style>
