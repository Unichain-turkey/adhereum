<template>
  <div>
    <div class="progress" v-if="pending">
      <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 100%"></div>
    </div>
    <hr/>
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-outline-info btn-block" data-toggle="modal" data-target="#createSponsorshipForm">
      Create Sponsorship
    </button>

    <!-- Modal -->
    <div class="modal fade" id="createSponsorshipForm" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Sponsorship Form</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="createSponsorship()">
              <div class="form-group">
                <label for="inputName">Sponsor Name</label>
                <input type="text" class="form-control" v-model="sponsorName" id="inputName" aria-describedby="nameHelp" placeholder="Enter name">
                <small id="nameHelp" class="form-text text-muted">Put what do you wish.</small>
              </div>
              <div class="form-group">
                <label for="inputUrl">Url</label>
                <input type="url" class="form-control" v-model="sponsorUrl" id="inputUrl" aria-describedby="urlHelp" placeholder="url.com">
                <small id="urlHelp" class="form-text text-muted">Any url will be accepted</small>
              </div>
              <form @submit.prevent="uploadImage()">
                <div class="form-group">
                  <div class="form-group">
                    <label for="inputFile">İmage</label>
                    <input type="file" class="form-control" @change="onFileChanged" id="inputFile" aria-describedby="fileHelp" placeholder="Place File">
                    <small id="fileHelp" class="form-text text-muted">Load your image</small>
                  </div>
                </div>
                <button type="button" v-on:click="onUpload"  class="btn btn-outline-info btn-block" >Load image to Ipfs </button>
              </form>
              <div class="form-group">
                <label for="inputHash">İmage Hash</label>
                <input type="text" class="form-control" v-model="imageHash" id="inputHash" aria-describedby="hashHelp" placeholder="0x00000000000000000000000000000000">
                <small id="hashHelp" class="form-text text-muted">Your image hash</small>
              </div>
              <!--<div class="input-group">
                <div class="custom-file">
                  <input type="file" class="custom-file-input" id="inputGroupFile04">
                  <label class="custom-file-label" for="inputGroupFile04">Choose file</label>
                </div>
              </div>-->
              <div class="form-group">
                <label for="inputDuration">Duration</label>
                <input type="number" class="form-control" v-model="duration" id="inputDuration" aria-describedby="durationHelp" placeholder="... Month">
                <small id="durationHelp" class="form-text text-muted">How many month do you want to sponsor?</small>
              </div>
              <button type="submit" class="btn btn-primary">Send</button>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store";

export default {
  name: "CreateSponsorship",
  data () {
    return {
      sponsorName: '',
      sponsorUrl: '',
      imageHash: '',
      duration: null,
      deployedContract: this.$store.getters.contractInstance(),
      pending: false,
      image: null
    }
  },
  methods: {
    createSponsorship () {
      let _base = store.getters.currentAddress
      const temp = this.deployedContract.methods.beSponsor(
        this.sponsorName,
        this.sponsorUrl,
        this.imageHash,
        this.duration
      ).send(
        {value: this.$options.filters.toWei('1'), from: _base, gas: 4700000})
      this.pending = true
      temp.then(function (error, value) {
        if(error){
          alert(error)
        }else{
        }
        this.pending = false
      })
    },
    onFileChanged (event) {
      this.image = event.target.files[0]
    },
    onUpload () {
      let ipfs = this.$store.getters.getIpfs
      console.log(ipfs)
      let reader = new window.FileReader()
      reader.onload = function (e) {
        let buffer = Buffer.from(reader.result)
        ipfs.add(buffer, {progress: (prog) => console.log(`received: ${prog}`)})
          .then((response) => {
            this.imageHash = response[0].hash
            console.log(response[0].hash)
          }).catch((err) => {
          console.error(err)
        })
      }.bind(this)
      reader.readAsArrayBuffer(this.image)
    },
    uploadImage () {
      console.log('Hash of image', this.imageHash)
      if (this.imageHash != null) {
        console.log("Okey")

      } else {
        alert('Please fill the all fields')
      }
    }
  }
}
</script>

<style scoped>

</style>
