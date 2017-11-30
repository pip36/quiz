import { mount, shallow, createLocalVue } from 'vue-test-utils'
import QuizMaker from '@/components/QuizMaker'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import VeeValidate from 'vee-validate'

const localVue = createLocalVue()

localVue.use(VueRouter, Vuex, VeeValidate)

// quiz maker should be responsible for creating a quiz object which is passed to the display and the database on creation

describe('QuizMaker', () => {
  let store
  let errors
  let wrapper
  beforeEach(() => {
    store = new Vuex.Store({
      state: {}
    })
    errors = new VeeValidate.ErrorBag()
 
    wrapper = shallow(QuizMaker, { 
      store,  
      localVue,
      mocks: {
      errors  
      } 
    })
  })
  // Now mount the component and you have the wrapper
  describe('Visuals', () => {   
    it('form should have a title field', () => {
      expect(wrapper.contains('#title-field')).to.be.true
    })
    it('form should have a description field', () => {
      expect(wrapper.contains('#description-field')).to.be.true
    })
    it('form should have a category field', () => {
      expect(wrapper.contains('#category-field')).to.be.true
    })
    it('form should have an image field', () => {
      expect(wrapper.contains('#image-field')).to.be.true
    })
    it('form should have a questions field', () => {
      expect(wrapper.contains('#questions-field')).to.be.true
    })
    it('page should have a questions modal', () => {
        expect(wrapper.vm.$refs.questionModal).to.exist
    })
    it('should have a viewport to display quiz template', () => {
      expect(wrapper.contains('#viewport')).to.be.true
    }) 
  })

  describe('Functions', () => {  
    beforeEach(() => {
      wrapper.setData({
        quiz: {
          questions: [1,2]
        }
      })
    }) 
    it('should have a function swapCard', () => {
      expect(typeof wrapper.vm.swapCard).to.equal('function')
    })
    it('has quiz data set correctly', () => {
      expect(wrapper.vm.quiz.questions.join('')).to.equal('12')
    })
    it('swapCard should swap 2 values in the questions array', () => {   
      wrapper.vm.swapCard(1,0) //index 0,1
      expect(wrapper.vm.quiz.questions.join('')).to.equal('21')
    })
    it('should not swap the first element below 0 index', () => {   
      wrapper.vm.swapCard(0,1) //index 0,1
      expect(wrapper.vm.quiz.questions.join('')).to.equal('12')
    })
   
  })
  
})
