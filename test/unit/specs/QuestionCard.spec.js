import { mount } from 'vue-test-utils'
import QuestionCard from '@/components/QuestionCard'

describe('QuestionCard', () => {
  let wrapper
  beforeEach(() => { 
     wrapper = mount(QuestionCard)
  })
  // Now mount the component and you have the wrapper
  describe('Swap Button', () => {   
    it('should exists in template', () => {
      expect(wrapper.contains('#swap-button')).to.be.true
    })
    it('should emit swap event on click', () => {
      var swapWrapper = wrapper.find('#swap-button')
      swapWrapper.trigger('click')
      assert.ok(wrapper.emitted().swap)
    })
  })
  
})
