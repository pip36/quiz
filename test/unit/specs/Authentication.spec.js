import Auth from '@/authentication/auth'
import Store from '@/vuex/store'

var testUser = {
  uid: 'uid'
}

describe('Auth functions', () => {

  describe('logout', () => {
    it('should be a function', () => {
      expect(typeof Auth.logout).to.equal('function')
    })
    it('should sign out a user', () => {
      Auth.login('test@example.com', 'password')
      Auth.logout()
      expect(Auth.isLoggedIn()).to.equal(false)
    })
  })

  describe('currentUser', () => {
    it('should be a function', () => {
      expect(typeof Auth.currentUser).to.equal('function')
    })

    it('should return null if noone is logged in', () => {
      Store.commit('logout')
      expect(Auth.currentUser()).to.equal(null)
    })

    it('should return user uid if logged in', () => {
      Store.commit('login', testUser)
      expect(Auth.currentUser()).to.equal('uid')
    })
  })

})
