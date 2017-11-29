import { mount, shallow, createLocalVue } from 'vue-test-utils'
import QuestionModal from '@/components/QuestionModal'
import VeeValidate from 'vee-validate'
import sinon from 'sinon'
import storage from '@/helpers/firestoreHelper'

const localVue = createLocalVue()

const testUploadEvent = {
  target: {
    files: [
      'testFile'
    ]
  }
}

localVue.use(VeeValidate)

describe('Question Modal', () => {
  let spy
  let errors = new VeeValidate.ErrorBag()
  let wrapper = mount(QuestionModal, {
    propsData: {

    },
    mocks: {
      errors
    }
  })
  
  beforeEach( () => {
    errors = new VeeValidate.ErrorBag()
  })
  afterEach(() => {
 
  })

  describe('Close Button', () => {
    it('should exist', () => {
      expect(wrapper.contains('#close-button')).to.be.true
    })
    it('should emit close event on click', () => {
      var button = wrapper.find('#close-button')
      button.trigger('click')
      expect(wrapper.emitted('close').length).to.equal(1)
    })
  })

  describe('Close Icon', () => {
    it('should exist', () => {
      expect(wrapper.contains('#close-icon')).to.be.true
    })
    it('should emit close event on click', () => {
      var button = wrapper.find('#close-icon')
      button.trigger('click')
      expect(wrapper.emitted('close').length).to.equal(2)
    })
  })

  describe('Create Button', () => {
    it('should exist', () => {
      expect(wrapper.contains('#create-button')).to.be.true
    })
    it('should not emit createQuestion event on click if there are errors', () => {
      wrapper.vm.errors.add('question', 'error', 'input')
      var button = wrapper.find('#create-button')
      button.trigger('click')
      expect(wrapper.emitted('createQuestion')).to.equal(undefined)
    })
    it('should emit createQuestion event on click if there are no errors', () => {
      wrapper.vm.errors.clear()
      var button = wrapper.find('#create-button')
      button.trigger('click')
      expect(wrapper.emitted('createQuestion').length).to.equal(1)
    })
  })

  describe('File Input', () => {
    it('should exist', () => {
      expect(wrapper.contains('input[name="file"]')).to.be.true
    })
    it('addMedia function should update the questions file data', () => {
      wrapper.vm.addMedia(testUploadEvent)
      wrapper.update()
      expect(wrapper.vm.questionData.media).to.equal('testFile')
    })
  })
})
