import Auth from '@/authentication/auth'
import { shallow, createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'
import sinon from 'sinon'
import firebase from 'firebase'
import Home from '@/components/Home'

const localVue = createLocalVue()
localVue.use(Vuex)

let loginStub = sinon.stub(firebase.auth(), 'signInWithEmailAndPassword')

loginStub.callsFake(function fake(email, password) {
  if(email && password){
    return new firebase.Promise.resolve('success')
  }else{
    return new firebase.Promise.reject('error')
  }
})

describe('Auth functions', () => {

  describe('login', () => {
    it('should be a function', () => {
      expect(typeof Auth.login).to.equal('function')
    })

    describe('invalid', () => {
      let spycallback = sinon.spy()
      Auth.login(undefined, undefined, spycallback)
      it('should not run callback on failed login', () => {    
        expect(spycallback.called).to.be.false   
      })
    })

    describe('valid', () => {
      let spycallback = sinon.spy()
      Auth.login('user', 'password', spycallback)
      it('should run callback on successfull login', () => {    
        expect(spycallback.called).to.be.true    
      })
    })
  })

  describe('logout', () => {
    it('should be a function', () => {
      expect(typeof Auth.logout).to.equal('function')
    })
    it('should call firebases signOut function', () => {
      let logoutStub= sinon.stub(firebase.auth(), 'signOut')
      logoutStub.callsFake(() => {
        return new Promise((resolve, reject) => {
          resolve('success')
        })
      })
      Auth.logout()
      expect(logoutStub.called).to.be.true
    })
  })
})

