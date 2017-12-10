import {mutations} from '@/vuex/store'

describe('Vuex Store', () => {
  var state = {
    activeQuiz: null,
    currentUser: null,
    notifications: []
  }

  describe('mutations', () => {
    it('setQuiz mutation should set active user', () => {
      expect(state.activeQuiz).to.equal(null)
      mutations.setQuiz(state, 'quizId')
      expect(state.activeQuiz).to.equal('quizId')
    })
    it('login mutation should set active user', () => {
      expect(state.currentUser).to.equal(null)
      mutations.login(state, 'userId')
      expect(state.currentUser).to.equal('userId')
    })
    it('logout mutation should remove active user', () => {
      state.currentUser = 'userId'
      mutations.logout(state)
      expect(state.currentUser).to.equal(null)
    })
    it('add notification mutation should add a notification', () => {
      state.notifications = []
      mutations.addNotification(state, {name: 'test'})
      expect(state.notifications.length).to.equal(1)
      expect(state.notifications[0]).to.deep.equal({name: 'test'})
    })
    it('remove notification mutation should remove a notification', () => {
      state.notifications = [0,1,2,3]
      mutations.removeNotification(state, 0)
      expect(state.notifications.length).to.equal(3)
      expect(state.notifications[0]).to.equal(1)
      mutations.removeNotification(state, 2)
      expect(state.notifications.length).to.equal(2)
      expect(state.notifications).to.deep.equal([1,2])
    })
  })
})
