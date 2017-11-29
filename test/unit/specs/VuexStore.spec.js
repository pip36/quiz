/*
import store from '@/vuex/store'

describe('Store', () => {
  it('should be an object', () => {
    expect(typeof store).to.equal('object')
  })
  it('should contain a state object', () => {
    expect(typeof store.state).to.equal('object')
  })
})

describe('Store state object', () => {
  it('should contain a firestore database reference', () => {
    expect(typeof store.state.db).to.equal('object')
  })
  it('should contain a firebase storage reference', () => {
    expect(typeof store.state.storage).to.equal('object')
  })
})

describe('Store mutations', () => {
  describe('setQuiz', () => {
    it('should set the given quiz', () => {
      store.commit('setQuiz', 'testQuiz')
      expect(store.state.activeQuiz).to.equal('testQuiz')
    })
  })

  describe('login', () => {
    it('should set the current user to logged in user', () => {
      store.commit('login', 'testUser')
      expect(store.state.currentUser).to.equal('testUser')
    })
  })

  describe('logout', () => {
    it('should set current user to empty object', () => {
      store.commit('logout')
      expect(store.state.currentUser).to.deep.equal({})
    })
  })
})
*/
