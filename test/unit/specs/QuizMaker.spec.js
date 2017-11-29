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
  beforeEach(() => {
    store = new Vuex.Store({
      state: {}
    })
    errors = new VeeValidate.ErrorBag()
  })
  // Now mount the component and you have the wrapper
  describe('Visuals', () => {
    let wrapper
    beforeEach(() => { 
       wrapper = shallow(QuizMaker, { 
            store,  
            localVue,
            mocks: {
            errors  
            } 
        })
    })
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
  
})
