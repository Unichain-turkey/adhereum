<template>
  <div>
    <div class="alert alert-success row">
      <div class="col">Image Hash: {{ imageHash }} (copy this for further use)</div>
    </div>
    <div class="ipfs container">
      <form @submit.prevent="uploadImage()">
        <div class="form-group">
          <div class="form-group">
            <label for="inputFile">İmage</label>
            <input type="file" class="form-control" @change="onFileChanged" id="inputFile" aria-describedby="fileHelp" placeholder="Place File">
            <small id="fileHelp" class="form-text text-muted">Load your image</small>
          </div>
          <!--
          <input type="file" class="form-control" @change="onFileChanged" />
          <br>
          -->
        </div>
        <button type="button" v-on:click="onUpload"  class="btn btn-outline-info btn-block" >Load image to Ipfs </button>
        <button type="submit" class="btn btn-outline-info btn-block">Submit</button>
      </form>
    </div>

  </div>

</template>

<script>

export default {
  name: 'IpfsUpload',
  data: function () {
    return {
      image: null,
      imageHash: null,
    }
  }
  ,
  methods: {
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
            this.ipfsPin()
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
    },
    ipfsPin(){
      console.log("I AM HERE BEBEK")
      console.log(this.imageHash)
      let ipfs = this.$store.getters.getIpfs
      ipfs.pin.add(this.imageHash, function (err, res)  {
        console.log("Error is", err)
        console.log("Response is", res)

      })
    }
  }
}
</script>

<style scoped>

</style>
