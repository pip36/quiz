import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import firebase from 'firebase'
import Config from '@/config/config'
require('firebase/firestore')

Vue.use(Vuex)

firebase.initializeApp(Config.firebase)

export const mutations = {
  setQuiz (state, quizId) {
    state.activeQuiz = quizId
  },

  login (state, user) {
    state.currentUser = user
  },

  logout (state) {
    state.currentUser = null
  },

  removeNotification (state, index) {
    state.notifications.splice(index, 1)
  },

  addNotification (state, object) {
    state.notifications.push(object)
  }
}

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
    storage: firebase.storage(),
    currentUser: null,
    notifications: []
  },
  mutations
})

export default store

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    store.commit('login', user)
  } else {
    store.commit('logout')
  }
})
