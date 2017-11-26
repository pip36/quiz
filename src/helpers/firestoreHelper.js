import store from '@/vuex/store'

export default {
  upload (file, path) {
    var storageRef = store.state.storage.ref()
    var imagesRef = storageRef.child(path + file.name)
    imagesRef.put(file).then((snapshot) => {
      console.log('Uploaded a file to: ' + path + file.name)
    })
  },

  download (path, callback) {
    var pathRef = store.state.storage.ref(path)
    pathRef.getDownloadURL().then((url) => {
      callback(url)
    }).catch(function (error) {
      // TODO Error Handling
      console.log(error.message)
    })
  }
}
