import { flushPromises, mount } from '@vue/test-utils'
import { Quasar } from 'quasar'
import { backend } from 'src/axios'
import LoginForm from 'src/components/guest/login-form.vue'

const wrapperFactory = () =>
  mount(LoginForm, {
    global: {
      plugins: [Quasar],
    },
  })

vi.mock('src/auth-strategies/google-auth')

const saveRedirectSpy = vi.fn()
vi.mock('src/composables/use-save-and-redirect', () => ({
  useSaveAndRedirect: () => ({
    saveUserAndRedirect: saveRedirectSpy,
  }),
}))

const emailSelector = '[data-testid="email-input"]'
const passwordSelector = '[data-testid="password-input"]'
const formSelector = '[data-testid="login-form"]'
const errorBoxSelector = '[data-testid="auth-errors"]'
const eyeIconSelector = '[data-testid="eye-icon"]'

describe('LoginPage', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('updates the model correctly', async () => {
    vi.spyOn(backend, 'post')

    const wrapper = wrapperFactory()
    await wrapper.find(emailSelector).setValue('mike@cpu.edu.ph')
    await wrapper.find(passwordSelector).setValue('lol')

    expect(wrapper.vm.credentials).toStrictEqual({
      email: 'mike@cpu.edu.ph',
      password: 'lol',
    })
  })

  it('toggles the password from invisible to visible', async () => {
    const wrapper = wrapperFactory()

    await wrapper.find(passwordSelector).setValue('some')
    await wrapper.find(eyeIconSelector).trigger('click')

    expect(wrapper.find(passwordSelector).attributes('type')).toBe('text')
  })

  it('toggles the password from visible to invisible', async () => {
    const wrapper = wrapperFactory()
    await wrapper.find(eyeIconSelector).trigger('click')

    await wrapper.find(passwordSelector).setValue('some')
    await wrapper.find(eyeIconSelector).trigger('click')

    expect(wrapper.find(passwordSelector).attributes('type')).toBe('password')
  })

  it('sends the correct args to Axios', async () => {
    const spy = vi.spyOn(backend, 'post')

    const wrapper = wrapperFactory()
    await wrapper.find(emailSelector).setValue('mike@cpu.edu.ph')
    await wrapper.find(passwordSelector).setValue('lol')

    await wrapper.find(formSelector).trigger('submit')

    expect(spy).toHaveBeenCalledWith('/auth/login', {
      email: 'mike@cpu.edu.ph',
      password: 'lol',
    })
  })

  it('persists the current user and redirects as a side-effect', async () => {
    vi.spyOn(backend, 'post').mockResolvedValue({
      data: {
        id: 1,
        email: 'mike@yahoo.com',
      },
    })

    const wrapper = wrapperFactory()
    await wrapper.find(emailSelector).setValue('mike@cpu.edu.ph')
    await wrapper.find(passwordSelector).setValue('lol')

    await wrapper.find(formSelector).trigger('submit')

    expect(saveRedirectSpy).toHaveBeenCalledWith({
      id: 1,
      email: 'mike@yahoo.com',
    })
  })

  it('does not show any auth error messages', async () => {
    vi.spyOn(backend, 'post').mockResolvedValue({
      data: {
        id: 1,
        email: 'mike@yahoo.com',
      },
    })

    const wrapper = wrapperFactory()
    await wrapper.find(emailSelector).setValue('mike@cpu.edu.ph')
    await wrapper.find(passwordSelector).setValue('lol')
    await wrapper.find(formSelector).trigger('submit')

    await flushPromises()
    expect(wrapper.find(errorBoxSelector).exists()).toBe(false)
  })

  it('shows an error message on invalid credentials', async () => {
    vi.spyOn(backend, 'post').mockRejectedValue({
      response: { status: 401 },
    })

    const wrapper = wrapperFactory()
    await wrapper.find(emailSelector).setValue('mike@cpu.edu.ph')
    await wrapper.find(passwordSelector).setValue('lol')
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
    await wrapper.find(emailSelector).setValue('mike@cpu.edu.ph')
    await wrapper.find(passwordSelector).setValue('lol')
    await wrapper.find(formSelector).trigger('submit')
    await flushPromises()

    expect(wrapper.find(errorBoxSelector).text()).toContain('Unexpected error')
  })
})
