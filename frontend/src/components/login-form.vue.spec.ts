import { flushPromises, mount } from '@vue/test-utils'
import { Quasar } from 'quasar'
import localforage from 'localforage'
import { backend } from 'src/axios'
import LoginForm from 'src/components/login-form.vue'

const wrapperFactory = () =>
  mount(LoginForm, {
    global: {
      plugins: [Quasar],
    },
  })

const pushSpy = vi.fn()
vi.mock('vue-router', () => ({
  useRoute: () => ({
    redirectedFrom: {
      fullPath: '/somewhere',
    },
  }),
  useRouter: vi.fn(() => ({
    push: pushSpy,
  })),
}))

vi.mock('src/auth-strategies/google-auth')

const emailSelector = '[data-testid="email-input"]'
const passwordSelector = '[data-testid="password-input"]'
const formSelector = '[data-testid="login-form"]'
const errorBoxSelector = '[data-testid="auth-errors"]'

describe('LoginPage', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('updates the model correctly', () => {
    vi.spyOn(backend, 'post')

    const wrapper = wrapperFactory()
    wrapper.find(emailSelector).setValue('mike@cpu.edu.ph')
    wrapper.find(passwordSelector).setValue('lol')

    expect(wrapper.vm.credentials).toStrictEqual({
      email: 'mike@cpu.edu.ph',
      password: 'lol',
    })
  })

  it('sends the correct args to Axios', async () => {
    const spy = vi.spyOn(backend, 'post')

    const wrapper = wrapperFactory()
    wrapper.find(emailSelector).setValue('mike@cpu.edu.ph')
    wrapper.find(passwordSelector).setValue('lol')

    await wrapper.find(formSelector).trigger('submit')

    expect(spy).toHaveBeenCalledWith('/auth/login', {
      email: 'mike@cpu.edu.ph',
      password: 'lol',
    })
  })

  it('persists the current user to localStorage as a side-effect', async () => {
    vi.spyOn(backend, 'post').mockResolvedValue({
      data: {
        id: 1,
        email: 'mike@yahoo.com',
      },
    })
    const spy = vi.spyOn(localforage, 'setItem')

    const wrapper = wrapperFactory()
    wrapper.find(emailSelector).setValue('mike@cpu.edu.ph')
    wrapper.find(passwordSelector).setValue('lol')

    await wrapper.find(formSelector).trigger('submit')

    expect(spy).toHaveBeenCalledWith('currentUser', {
      id: 1,
      email: 'mike@yahoo.com',
    })
  })

  it('redirects on successful sign-in as a side-effect', async () => {
    vi.spyOn(backend, 'post').mockResolvedValue({
      data: {
        id: 1,
        email: 'mike@yahoo.com',
      },
    })

    const wrapper = wrapperFactory()
    wrapper.find(emailSelector).setValue('mike@cpu.edu.ph')
    wrapper.find(passwordSelector).setValue('lol')
    await wrapper.find(formSelector).trigger('submit')

    await flushPromises()
    expect(pushSpy).toHaveBeenCalledWith('/somewhere')
  })

  it('does not show any auth error messages', async () => {
    vi.spyOn(backend, 'post').mockResolvedValue({
      data: {
        id: 1,
        email: 'mike@yahoo.com',
      },
    })

    const wrapper = wrapperFactory()
    wrapper.find(emailSelector).setValue('mike@cpu.edu.ph')
    wrapper.find(passwordSelector).setValue('lol')
    await wrapper.find(formSelector).trigger('submit')

    await flushPromises()
    expect(wrapper.find(errorBoxSelector).exists()).toBe(false)
  })

  it('shows an error message on invalid credentials', async () => {
    vi.spyOn(backend, 'post').mockRejectedValue({
      response: { status: 401 },
    })

    const wrapper = wrapperFactory()
    wrapper.find(emailSelector).setValue('mike@cpu.edu.ph')
    wrapper.find(passwordSelector).setValue('lol')
    await wrapper.find(formSelector).trigger('submit')
    await flushPromises()

    expect(wrapper.find(errorBoxSelector).text()).toBe(
      'Invalid username or password.'
    )
  })

  it('shows an error message on some other unexpected error', async () => {
    vi.spyOn(backend, 'post').mockRejectedValue({
      response: { status: 500 },
    })

    const wrapper = wrapperFactory()
    wrapper.find(emailSelector).setValue('mike@cpu.edu.ph')
    wrapper.find(passwordSelector).setValue('lol')
    await wrapper.find(formSelector).trigger('submit')
    await flushPromises()

    expect(wrapper.find(errorBoxSelector).text()).toContain('Unexpected error')
  })
})
