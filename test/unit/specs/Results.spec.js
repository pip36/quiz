import { mount } from 'vue-test-utils'
import Results from '@/components/Results'

const questions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

describe('Quiz Results', () => {
  // Now mount the component and you have the wrapper
  let wrapper = mount(Results, {
    propsData: {
      questions: questions,
      numberCorrect: 10,
      totalPossible: 10
    }
  })

  describe('scorePercentage function', () => {
    it('should display the correct score percentage', () => {
      expect(wrapper.vm.scorePercentage).to.equal(100)

      wrapper.vm.numberCorrect = 5
      expect(wrapper.vm.scorePercentage).to.equal(50)

      wrapper.vm.numberCorrect = 0
      expect(wrapper.vm.scorePercentage).to.equal(0)
    })
  })
})
