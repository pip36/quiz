import Vue from 'vue'
import NavBar from '@/components/NavBar'

describe('NavBar.vue', () => {
  it('should render correct contents when not logged in', () => {
    const Constructor = Vue.extend(NavBar)
    const vm = new Constructor().$mount()

    expect(vm.$el.textContent).to.include('Login')
  })

  it('has correct name hook', () => {
    expect(NavBar.name).to.equal('Navbar')
  })
})
