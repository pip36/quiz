import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import firebase from 'firebase'
import Config from '@/config/config'
require('firebase/firestore')

Vue.use(Vuex)

firebase.initializeApp(Config.firebase)

const store = new Vuex.Store({
  plugins: [
    createPersistedState({
      // persist these states
      paths: ['activeQuiz', 'currentUser']
    })
  ],
  state: {
    activeQuiz: null,
    db: firebase.firestore(),
    currentUser: null
  },
  mutations: {
    setQuiz (state, quizId) {
      state.activeQuiz = quizId
    },

    login (state, user) {
      state.currentUser = user
    },

    logout (state, user) {
      state.currentUser = user
    }
  }
})

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    // var displayName = user.displayName;
    // var email = user.email;
    // var emailVerified = user.emailVerified;
    // var photoURL = user.photoURL;
    // var isAnonymous = user.isAnonymous;
    // var uid = user.uid;
    // var providerData = user.providerData;
    // ...
    store.commit('login', user)
    console.log(user.email + ' is signed in')
  } else {
    // User is signed out.
    // ...
    store.commit('logout', null)
    console.log('signedOut')
  }
})

export default store
