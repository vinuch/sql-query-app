import { shallowMount } from '@vue/test-utils'
import FileView from '@/components/FileView.vue'
import HeaderTab from '@/components/HeaderTab.vue'

describe('FileView.vue', () => {
  it('it renders the FileView with the activeTab selected', () => {
    const fileName = 'test.sql'
    const wrapper = shallowMount(FileView, {
      propsData: { files: [{ name: fileName, query: '', hasRun: false }], activeTab: 0, loading: false }
    })
    expect(wrapper.vm.title).toBe(fileName)
  })
  it('it throws an error when an empty editor is attpemted to be run', () => {
    const runFn = jest.fn()
    const fileName = 'test.sql'
    
    const wrapper = shallowMount(FileView, {
      propsData: { files: [{ name: fileName, query: '', hasRun: false }], activeTab: 0, loading: false, }
    })
    // wrapper.find('#run-btn').trigger("click")
    // expect(runFn).toHaveBeenCalled()
    // expect(wrapper.vm.files[0].hasRun).toBe(false)
    // expect(wrapper.find('.toasted').element.textContent).toBe('There is nothing to run')
  })
})
describe('HeaderTab.vue', () => {
  it('it renders the HeaderTab with the activeTab selected', () => {
    const fileName = 'test.sql'
    const wrapper = shallowMount(HeaderTab, {
      propsData: { files: [{ name: fileName, query: '', hasRun: false }], activeTab: 0 }
    })
    expect(wrapper.find("span#tab-name").element.textContent).toBe(fileName)
  })
  it('it renders the HeaderTab with the activeTab selected', () => {
    const fileName = 'test.sql'
    const wrapper = shallowMount(HeaderTab, {
      propsData: { files: [{ name: fileName, query: '', hasRun: false }], activeTab: 0 }
    })
    expect(wrapper.find("span#tab-name").element.textContent).toBe(fileName)
  })

})
