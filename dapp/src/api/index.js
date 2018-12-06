import store from "../store/index";

export default {

  readFile: (file) => {
    let reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
  },
  ipfsAdd: (buffer) => {
    let ipfs = store.getters.getIpfs;
    return ipfs.add(buffer, {progress: (prog) => console.log(`received: ${prog}`)})

  },
  ipfsPin(hash) {
    return ipfs.pin.add(hash);//return new promise
  }

}
