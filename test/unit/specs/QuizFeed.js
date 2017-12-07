import { mount } from 'vue-test-utils'
import QuizFeed from '@/components/QuizFeed'
import sinon from 'sinon'

describe('Quiz Feed no input', () => {
  let wrapper = mount(MediaCard, {
    propsData: {
      category: undefined
    }
  })

})
