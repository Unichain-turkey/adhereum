<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-btn slot="activator" color="primary" dark>Open Dialog</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Legal first name*" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field label="Legal middle name" hint="example of helper text only on focus"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  label="Legal last name*"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Email*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Password*" type="password" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  label="Age*"
                  required
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6>
                <v-autocomplete
                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                  label="Interests"
                  multiple
                ></v-autocomplete>
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
  </v-layout>
</template>


<script>
  import store from "../../store/main/index";

  export default {
    name: "BeingSponsor",
    data: () => ({
      dialog: false,
      sponsorName: '',
      sponsorUrl: '',
      imageHash: '',
      duration: null,
      contract: null,
      pending: false,
      image: null,
    }),
    methods: {
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
      onFileChanged(event) {
        this.image = event.target.files[0]
      },
      onUpload() {

        let ipfs = this.$store.getters.getIpfs
        let reader = new window.FileReader()
        reader.onload = function (e) {
          let buffer = Buffer.from(reader.result)
          ipfs.add(buffer, {progress: (prog) => console.log(`received: ${prog}`)})
            .then((response) => {
              this.ipfsPin()
              this.imageHash = response[0].hash
            }).catch((err) => {
            console.error(err)
          })
        }.bind(this)
        reader.readAsArrayBuffer(this.image)
      },
      uploadImage() {
        if (this.imageHash != null) {
          console.log('Hash of image', this.imageHash)
        } else {
          alert('Please fill the all fields')
        }
      },
      ipfsPin() {
        console.log(this.image)
        let ipfs = this.$store.getters.getIpfs
        ipfs.pin.add(this.imageHash, function (err) {
          err == null ? console.log("Succesfully pinned the image on ipfs") : console.log("Failed pinnig image to repo")

        })
      }
    }
  }
</script>

<style scoped>

</style>
