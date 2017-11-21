import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import firebase from 'firebase'
import Config from '@/config/config'
require('firebase/firestore')

Vue.use(Vuex)

firebase.initializeApp(Config.firebase)

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      // persist these states
      paths: ['activeQuiz', 'test']
    })
  ],
  state: {
    activeQuiz: null,
    db: firebase.firestore()
  },
  mutations: {
    setQuiz (state, quizId) {
      state.activeQuiz = quizId
    }
  }
})
