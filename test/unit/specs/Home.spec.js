import Vue from 'vue'
import Home from '@/components/Home'

describe('Home.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Home)
    const vm = new Constructor().$mount()

    expect(vm.$el.textContent).to.include('Simple Quiz')
  })

  it('has correct name hook', () => {
    expect(Home.name).to.equal('Home')
  })
})
