<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Sponsor Information</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Sponsor Name" required></v-text-field>
              </v-flex>

              <v-flex xs12>
                <v-text-field label="Email*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Url*" required></v-text-field>
              </v-flex>

              <v-flex xs12 sm6>
                <v-select
                  :items="['3', '6', '9', '12']"
                  label="Duration in month"
                  required
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6>

              <form @submit.prevent="uploadImage()">
                <div class="form-group">
                  <div class="form-group">
                    <label for="inputFile">Resim</label>
                    <input type="file" class="form-control" @change="onFileChanged" id="inputFile" aria-describedby="fileHelp" placeholder="Place File">
                    <small id="fileHelp" class="form-text text-muted">Resmi Yükle</small>
                  </div>
                </div>
                <button type="button" v-on:click="onUpload"  class="btn btn-outline-info btn-block" >Resmi Ipfs yükle </button>
              </form>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="Image hash" disabled required v-model="imageHash"></v-text-field>
              </v-flex>

            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="dialog = false">Save</v-btn>
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

                <v-btn fab dark small color="indigo" icon v-on:click="test">
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

                <v-btn fab dark small color="indigo" icon v-on:click="test">
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

                <v-btn fab dark small color="indigo" icon v-on:click="test">
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
  export default {
    name: "Demo-1",
    data: () => ({

      dialog: false,
      imageHash:'',
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
    methods: {
      test() {
        console.log("Clicked Item")
        this.dialog = true;
      },
      createSponsorship() {
        let _base = store.getters.currentAddress
        const temp = this.contract.methods.beSponsor(
          this.sponsorName,
          this.sponsorUrl,
          this.imageHash,
          this.duration
        ).send(
          {value: this.$options.filters.toWei('1') * this.duration, from: _base})
        this.pending = true
        temp.then(function (error, value) {
          if (!error) {
            alert(error)
          } else {
            alert("Your request of being sponsorships is received !")
            window.location.href = "/"
          }
          this.pending = false
        }.bind(this))
      },
    }

  }
</script>

<style scoped>

</style>
