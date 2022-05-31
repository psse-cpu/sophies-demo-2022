import { flushPromises, mount } from '@vue/test-utils'
import localforage from 'localforage'
import { Quasar } from 'quasar'
import { defineComponent } from 'vue'
import UserMenu from './user-menu.vue'

const myNameSelector = '[data-testid="my-name"]'

describe('UserMenu', () => {
  it('displays the first name of the current user', async () => {
    vi.spyOn(localforage, 'getItem').mockResolvedValue({
      givenName: 'Mykeesama ',
    })

    const TestComponent = defineComponent({
      components: { UserMenu },
      template: '<suspense><user-menu /></suspense>',
    })

    const wrapper = mount(TestComponent, {
      global: {
        plugins: [Quasar],
      },
    })
    await flushPromises()

    expect(wrapper.find(myNameSelector).text()).toBe('Mykeesama')
  })
})
