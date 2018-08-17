<template>
  <div class="container" >
    <div class="progress" v-if="pending">
      <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 100%"></div>
    </div>
    <hr/>
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-outline-info btn-block " data-toggle="modal" data-target="#createSponsorshipForm">
      SPONSOR OL
    </button>

    <!-- Modal -->
    <div class="modal fade  pt-4 m-5" id="createSponsorshipForm" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Sponsorluk  Başvuru Formu</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="createSponsorship()">
              <div class="form-group">
                <label for="inputName">Sponsor İsmi</label>
                <input type="text" class="form-control" v-model="sponsorName" id="inputName" aria-describedby="nameHelp" placeholder="Unichain">
                <small id="nameHelp" class="form-text text-muted"></small>
              </div>
              <div class="form-group">
                <label for="inputUrl">Url</label>
                <input type="url" class="form-control" v-model="sponsorUrl" id="inputUrl" aria-describedby="urlHelp" placeholder="url.com">
                <small id="urlHelp" class="form-text text-muted">Herhangi bir url kabul edilir.</small>
              </div>
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
              <div class="form-group">
                <label for="inputHash">Resim Hash</label>
                <input type="text" class="form-control" v-model="imageHash" id="inputHash" aria-describedby="hashHelp" placeholder="0x00000000000000000000000000000000">
                <small id="hashHelp" class="form-text text-muted">Yüklenen Resmin Hashi</small>
              </div>
              <div class="form-group">
                <label for="inputDuration">Duration</label>
                <input type="number" class="form-control" v-model="duration" id="inputDuration" aria-describedby="durationHelp" placeholder="... Month">
                <small id="durationHelp" class="form-text text-muted">Kaç ay sponsor olmak istersiniz?</small>
              </div>
              <button type="submit" class="btn btn-primary">Gönder</button>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Kapat</button>
          </div>
        </div>
      </div>
    </div>
  </div>



</template>

<script>
import store from "@/store";

export default {
  name: "BeingSponsor",
  data () {
    return {
      sponsorName: '',
      sponsorUrl: '',
      imageHash: '',
      duration: null,
      contract: this.$store.getters.contractInstance(),
      pending: false,
      image: null
    }
  },
  methods: {
    createSponsorship () {
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

        if(!error){
          alert(error)
        }else{
          alert("Your request of being sponsorships is received !")
          window.location.href = "/"
        }
        this.pending = false
      }.bind(this))
    },
    onFileChanged (event) {
      this.image = event.target.files[0]
    },
    onUpload () {
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
    uploadImage () {
      if (this.imageHash != null) {
        console.log('Hash of image', this.imageHash)
      } else {
        alert('Please fill the all fields')
      }
    },
    ipfsPin(){
      console.log(this.image)
      let ipfs = this.$store.getters.getIpfs
      ipfs.pin.add(this.imageHash, function (err)  {
        err==null ? console.log("Succesfully pinned the image on ipfs"):console.log("Failed pinnig image to repo")

      })
    }
  }
}
</script>

<style scoped>

</style>
