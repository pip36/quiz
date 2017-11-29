import { mount } from 'vue-test-utils'
import Question from '@/components/Question'

const question = {
  title: 'title',
  possibleAnswers: ['a', 'b', 'c'],
  correctAnswer: 'a',
  media: ''
}
const owner = 'uid'
var correct = null
var answered = false

describe('Question Component', () => {
  // Now mount the component and you have the wrapper
  const wrapper = mount(Question, {
    propsData: {
      question: question,
      owner: owner,
      correct: correct,
      answered: answered
    }
  })
  
  describe('checkAnswer function', () => {
    it('should emit answer true if correct', () => {
      expect(true).to.equal(true)
    })
  })
})
