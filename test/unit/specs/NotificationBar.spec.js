import { mount } from 'vue-test-utils'
import NotificationBar from '@/components/NotificationBar'

let wrapper = mount(NotificationBar, {
  propsData: {
    notifications: [
      {
        type: 'danger',
        message: 'A danger message'
      },
      {
        type: 'success',
        message: 'A success message'
      }
    ]
  }
})

describe('Notfication Bar', () => {
  it('should display success message with prop', () => {
    expect(wrapper.html()).to.include('is-success')
    expect(wrapper.html()).to.include('A success message')
  })
  it('should display danger message with prop', () => {
    expect(wrapper.html()).to.include('is-danger')
    expect(wrapper.html()).to.include('A danger message')
  })
})
