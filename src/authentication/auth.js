import store from '@/vuex/store'
import firebase from 'firebase'

export default {
  login (email, password, callback) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        callback()
      })
      .catch((error) => {
        // Handle Errors here.
        // var errorCode = error.code
        var errorMessage = error.message
        console.log(errorMessage)
      })
  },
  logout () {
    firebase.auth().signOut()
  },
  currentUser () {
    var user = store.state.currentUser
    return (user && user.uid) ? user.uid : null
  },
  isLoggedIn () {
    var user = store.state.currentUser
    if (user && user.uid) {
      return true
    } else {
      return false
    }
  },
  createAccount (email, password, callback) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        callback()
      })
      .catch(function (error) {
        // Handle Errors here.
        // var errorCode = error.code
        var errorMessage = error.message
        console.log(errorMessage)
      })
  }
}
