import store from '@/vuex/store'
import firebase from 'firebase'

export default {
  login (email, password, callback) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        store.commit('addNotification', { type: 'success', message: 'Login Success!' })
        callback()
      })
      .catch((error) => {
        store.commit('addNotification', { type: 'danger', message: 'Login Failed!' + error.message })
      })
  },

  logout () {
    firebase.auth().signOut()
      .then(() => {
        store.commit('addNotification', { type: 'success', message: 'Logged out successfully' })
      })
      .catch((error) => {
        store.commit('addNotification', { type: 'danger', message: 'Logout failed!' + error.message })
      })
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
        store.commit('addNotification', { type: 'success', message: 'Account created Successfully' })
        callback()
      })
      .catch((error) => {
        store.commit('addNotification', { type: 'danger', message: 'Account Creation failed!' + error.message })
      })
  }
}
