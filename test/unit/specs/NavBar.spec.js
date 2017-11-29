import { mount } from 'vue-test-utils'
import NavBar from '@/components/NavBar'

let wrapper = mount(NavBar, {
  propsData: {
    loggedIn: false
  }
})

describe('Navbar Component', () => {
  it('should display login/signup only if logged out', () => {
    expect(wrapper.vm.$refs.logInButton).to.exist
    expect(wrapper.vm.$refs.signUpButton).to.exist
    // hidden
    expect(wrapper.vm.$refs.profileButton).to.not.exist
    expect(wrapper.vm.$refs.logOutButton).to.not.exist
  })
  it('should display profile/logout/createquiz button only if logged in', () => {
    wrapper.setProps({ loggedIn: true })
    expect(wrapper.vm.$refs.profileButton).to.exist
    expect(wrapper.vm.$refs.logOutButton).to.exist
    // hidden
    expect(wrapper.vm.$refs.logInButton).to.not.exist
    expect(wrapper.vm.$refs.signUpButton).to.not.exist
  })
  it('should display createquiz button only if logged in', () => {
    wrapper.setProps({ loggedIn: true })
    expect(wrapper.vm.$refs.createQuizButton).to.exist
    wrapper.setProps({ loggedIn: false })
    expect(wrapper.vm.$refs.createQuizButton).to.not.exist
  })
  
  describe('signOutButton', () => {
    it('should emit a logout event on mouseclick', () => {
      wrapper.setProps({ loggedIn: true })
      wrapper.update()
      const button = wrapper.find('#logout')
      button.trigger('click')
      assert.ok(wrapper.emitted().logout)
    })
  })
})
