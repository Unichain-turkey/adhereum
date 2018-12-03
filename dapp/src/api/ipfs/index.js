import store from "../../store/index";

export default {

  readFile: (file, callback) => {
    let reader = new window.FileReader()
    reader.onload = function (e) {
      let buffer = Buffer.from(reader.result)
      callback(buffer)
    }
    reader.readAsArrayBuffer(file)

  },
  ipfsAdd: (buffer) => {
    let ipfs = store.getters.getIpfs;
    return ipfs.add(buffer, {progress: (prog) => console.log(`received: ${prog}`)})
  },
  ipfsPin(hash) {
    let ipfs = store.getters.getIpfs;
    return ipfs.pin.add(hash, function (err) {
      err == null ? console.log("Successfully pinned the file on ipfs") : console.log("Failed pinnig file to ipfs")
    });
  }

}
