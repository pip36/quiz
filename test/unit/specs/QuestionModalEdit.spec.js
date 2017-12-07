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

describe('Question Modal Edit', () => {
  let spy
  let errors = new VeeValidate.ErrorBag()
  let wrapper = mount(QuestionModal, {
    propsData: {
      editData: {
        question: 'a test?',
        answers: 'true\nfalse',
        media: 'test.jpg',
        type: 'Multiple Choice'
      }
    },
    mocks: {
      errors
    }
  })
  
  beforeEach( () => {
    errors = new VeeValidate.ErrorBag()
  })

  describe('on load with editData prop', () => {
    it('should be in editing mode', () => {
      expect(wrapper.vm.isEditing).to.be.true
    })
    it('should load in question title', () => {
      expect(wrapper.vm.questionData.question).to.equal('a test?')
    })
    it('should load in question answers', () => {
      expect(wrapper.vm.questionData.answers).to.equal('true\nfalse')
    })
    it('should load in question media', () => {
      expect(wrapper.vm.questionData.media).to.equal('test.jpg')
    })
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
