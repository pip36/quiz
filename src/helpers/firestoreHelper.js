import store from '@/vuex/store'

export default {
  upload (file, path) {
    var storageRef = store.state.storage.ref()
    var imagesRef = storageRef.child(path + file.name)
    imagesRef.put(file).then((snapshot) => {
      console.log('Upload success')
    })
  },

  download (path, callback) {
    var pathRef = store.state.storage.ref(path)
    pathRef.getDownloadURL().then((url) => {
      callback(url)
    }).catch(function (error) {
      this.$store.commit('addNotification', { type: 'error', message: 'Error loading image: ' + error.message })
    })
  },

  delete (path, callback) {
    var imageRef = store.state.storage.ref().child(path)

    imageRef.delete().then(function () {
      callback()
    }).catch(function (error) {
      this.$store.commit('addNotification', { type: 'danger', message: 'Error removing image file: ' + error.message })
    })
  }
}
