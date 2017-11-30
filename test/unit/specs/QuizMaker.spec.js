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
          questions: [
            {
              title: 'test1?',
              possibleAnswers: ['yes1', 'no1'],
              media: 'image1'
            },
            {
              title: 'test2?',
              possibleAnswers: ['yes2', 'no2'],
              media: 'image2'
            }
          ]
        }
      })
    }) 
    it('should have a function swapCard', () => {
      expect(typeof wrapper.vm.swapCard).to.equal('function')
    })
    it('has quiz data set correctly', () => {
      expect(wrapper.vm.quiz.questions[0].title).to.equal('test1?')
    })
    it('swapCard should swap 2 values in the questions array', () => {   
      wrapper.vm.swapCard(1,0) //index 1,0
      expect(wrapper.vm.quiz.questions[0].title).to.equal('test2?')
    })
    it('should not swap the first element below 0 index', () => {   
      wrapper.vm.swapCard(0,1) //index 0,1
      expect(wrapper.vm.quiz.questions[0].title).to.equal('test1?')
    })

    it('should have a function open Editor', () => {
      expect(typeof wrapper.vm.openEditor).to.equal('function')
    })
    it('open Editor should open the question creator modal', () => {
      wrapper.vm.openEditor(0)
      expect(wrapper.vm.questionCreatorActive).to.equal(true)
    })
    it('open Editor should set questionEditData to the question data with specified index', () => {
     
      wrapper.vm.openEditor(0)
      expect(wrapper.vm.questionEditData.question).to.equal('test1?')
      expect(wrapper.vm.questionEditData.answers).to.equal('yes1\nno1')
      expect(wrapper.vm.questionEditData.media).to.equal('image1')
      wrapper.vm.openEditor(1)
      expect(wrapper.vm.questionEditData.question).to.equal('test2?')
      expect(wrapper.vm.questionEditData.answers).to.equal('yes2\nno2')
      expect(wrapper.vm.questionEditData.media).to.equal('image2')
    })
   
  })
  
})
