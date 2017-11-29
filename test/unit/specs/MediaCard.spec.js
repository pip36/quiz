import { mount } from 'vue-test-utils'
import MediaCard from '@/components/MediaCard'
import sinon from 'sinon'
import storage from '@/helpers/firestoreHelper'

let downloadStub= sinon.stub(storage, 'download')
downloadStub.callsFake(function fake(path, callback) {
  return callback('image.jpg')
})

describe('Media Card', () => {
  let quiz = {
    data: {
      owner: 'user',
      image: 'image.jpg',
      title: 'title',
      description: 'test description',
      category: 'category'
    },
    id: '1234'
  }

  let wrapper = mount(MediaCard, {
    propsData: {
      quiz: quiz
    }
  })
  
  beforeEach(() => {
    wrapper.setComputed({currentUser: 'user'})
  })

  afterEach(() => {
    downloadStub.restore()
  })

  it('should display the quizzes title', () => {
    expect(wrapper.contains('#title')).to.be.true
    let titlewrapper = wrapper.find('#title')
    expect(titlewrapper.text()).to.equal(quiz.data.title)
  })
  it('should display the quizzes description', () => {
    expect(wrapper.contains('#description')).to.be.true
    let descwrapper = wrapper.find('#description')
    expect(descwrapper.text()).to.equal(quiz.data.description)
  })
  it('should display the quizzes category', () => {
    expect(wrapper.contains('#category')).to.be.true
    let catwrapper = wrapper.find('#category')
    expect(catwrapper.text()).to.equal(quiz.data.category)
  })
  it('should display the quizzes thumbnail image', () => {
    expect(wrapper.contains('#image')).to.be.true
  })

  it('should display delete/edit button if authorised user is the owner', () => {
    var deleteButton = wrapper.find('#delete-button')
    expect(wrapper.contains('#delete-button')).to.be.true
    expect(wrapper.contains('#edit-button')).to.be.true
  })
  it('should hide delete/edit button if not the owner', () => {
    wrapper.setComputed({currentUser: 'invalid'})
    wrapper.update()
    expect(wrapper.contains('#delete-button')).to.equal(false)
    expect(wrapper.contains('#edit-button')).to.equal(false)
  })
  it('clicking remove button should emit delete event', () => {
    const button = wrapper.find('#delete-button')
    button.trigger('click')
    assert.ok(wrapper.emitted().delete)
  })
  it('clicking remove button should emit delete event', () => {
    const button = wrapper.find('#delete-button')
    button.trigger('click')
    assert.ok(wrapper.emitted().delete)
  })

  it('getImagePath should return the correct image path', () => {
    expect(wrapper.vm.getImagePath()).to.equal('user/image.jpg')
  })

  it('should load image from quiz data', () => {
    var imagewrapper = wrapper.find('#image')
    wrapper.update()
    expect(imagewrapper.element.src).to.equal('http://localhost:9876/image.jpg')
  })
  it('should display alternate src if one is provided', () => {
    wrapper.setProps({'altSrc': 'alternateImage.jpg'})
    var imagewrapper = wrapper.find('#image')
    wrapper.update()
    expect(imagewrapper.element.src).to.equal('http://localhost:9876/alternateImage.jpg')
  })
})

describe('Media Card - default image', () => {
  let quiz = {
    data: {
      owner: 'user',
      image: '/static/question.png',
      title: 'title',
      description: 'test description',
      category: 'category'
    },
    id: '1234'
  }

  let wrapper = mount(MediaCard, {
    propsData: {
      quiz: quiz
    }
  })

  beforeEach(() => {
    wrapper.setComputed({currentUser: 'user'})
  })

  afterEach(() => {
    downloadStub.restore()
  })

  it('should display placeholder image as default', () => {
    var imagewrapper = wrapper.find('#image')
    expect(imagewrapper.element.src).to.equal('http://localhost:9876/static/question.png')
  })
})


