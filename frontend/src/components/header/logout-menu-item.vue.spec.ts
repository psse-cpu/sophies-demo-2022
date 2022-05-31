import { flushPromises, shallowMount } from '@vue/test-utils'
import localforage from 'localforage'
import { backend } from 'src/axios'
import LogoutMenuItem from './logout-menu-item.vue'

const wrapperFactory = () => shallowMount(LogoutMenuItem)

const pushSpy = vi.fn()

vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: pushSpy,
  })),
}))

describe('LogoutMenuItem', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('removes user details from storage when logging out', async () => {
    vi.spyOn(backend, 'post').mockResolvedValue({ success: true })
    const spy = vi.spyOn(localforage, 'removeItem')
    const wrapper = wrapperFactory()

    await wrapper.trigger('click')
    await flushPromises()

    expect(spy).toHaveBeenCalledWith('currentUser')
  })

  it('requests the server endpoint to remove cookies', async () => {
    const spy = vi.spyOn(backend, 'post').mockResolvedValue({ success: true })
    const wrapper = wrapperFactory()

    await wrapper.trigger('click')
    await flushPromises()

    expect(spy).toHaveBeenCalledWith('/auth/logout')
  })

  it('redirects to the login page', async () => {
    vi.spyOn(backend, 'post').mockResolvedValue({ success: true })
    const wrapper = wrapperFactory()

    await wrapper.trigger('click')
    await flushPromises()

    expect(pushSpy).toHaveBeenCalledWith('/guest/login')
  })
})
