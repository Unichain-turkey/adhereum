<template>
  <div>
    <div class="container">
      <form @submit.prevent="uploadImage()">
        <div class="form-group col-md-8">
          <input type="file" class="form-control" @change="onFileChanged" />
          <br>
          <button type="button" v-on:click="onUpload"  class="btn btn-success" >Load image to Ipfs </button>

        </div>
        <button type="submit" class="btn btn-primary ">Submit</button>
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
