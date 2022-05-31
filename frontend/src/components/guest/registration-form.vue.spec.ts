import { ref } from 'vue'

import { flushPromises, mount } from '@vue/test-utils'
import { Quasar } from 'quasar'
import RegistrationForm from 'src/components/guest/registration-form.vue'
import { fromValue, never } from 'wonka'

const saveRedirectSpy = vi.fn()
vi.mock('src/composables/use-save-and-redirect', () => ({
  useSaveAndRedirect: () => ({
    saveUserAndRedirect: saveRedirectSpy,
  }),
}))

const querySpy = vi.fn(() =>
  fromValue({
    data: {
      emailExists: false,
    },
  })
)

const mutationSpy = vi.fn(() => never)

const wrapperFactory = () =>
  mount(RegistrationForm, {
    global: {
      plugins: [Quasar],
      provide: {
        $urql: ref({
          executeQuery: querySpy,
          executeMutation: mutationSpy,
          executeSubscription: vi.fn(() => never),
        }),
      },
    },
  })

const emailSelector = '[data-testid="email-input"]'
const passwordSelector = '[data-testid="password-input"]'
const familyNameSelector = '[data-testid="family-name-input"]'
const givenNameSelector = '[data-testid="given-name-input"]'

describe('RegistrationForm', () => {
  beforeEach(() => {
    querySpy.mockReturnValue(
      fromValue({
        data: {
          emailExists: false,
        },
      })
    )
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('shows no errors when all inputs are valid', async () => {
    const wrapper = wrapperFactory()
    // TODO: refactor into a fillOutForm() helper
    // labels: tech-debt
    await wrapper.find(emailSelector).setValue('mike@cpu.edu.ph')
    await wrapper.find(passwordSelector).setValue('m')
    await wrapper.find(familyNameSelector).setValue('Coo')
    await wrapper.find(givenNameSelector).setValue('Mike')
    await wrapper.find('form').trigger('submit')
    await flushPromises()

    expect(wrapper.findAll('.q-field--error')).toHaveLength(0)
  })

  it('submits the correct mutation variables when all inputs are valid', async () => {
    const wrapper = wrapperFactory()
    await wrapper.find(emailSelector).setValue('mike@cpu.edu.ph')
    await wrapper.find(passwordSelector).setValue('m')
    await wrapper.find(familyNameSelector).setValue('Coo')
    await wrapper.find(givenNameSelector).setValue('Mike')
    await wrapper.find('form').trigger('submit')
    await flushPromises()

    expect(mutationSpy).toHaveBeenCalled()
  })

  it('shows an error when all inputs are valid but email is taken', async () => {
    querySpy.mockReturnValue(
      fromValue({
        data: { emailExists: true },
      })
    )

    const wrapper = wrapperFactory()
    // TODO: refactor into a fillOutForm() helper
    // labels: tech-debt
    await wrapper.find(emailSelector).setValue('mike@cpu.edu.ph')
    await wrapper.find(passwordSelector).setValue('m')
    await wrapper.find(familyNameSelector).setValue('Coo')
    await wrapper.find(givenNameSelector).setValue('Mike')
    await wrapper.find('form').trigger('submit')
    await flushPromises()

    expect(wrapper.findAll('.q-field--error')).toHaveLength(1)
    expect(wrapper.find('.q-field--error .q-field__messages').html()).toContain(
      'Email already taken'
    )
  })

  it('shows an error when email is invalid', async () => {
    const wrapper = wrapperFactory()
    await wrapper.find(emailSelector).setValue('mike')
    await wrapper.find(passwordSelector).setValue('m')
    await wrapper.find(familyNameSelector).setValue('Coo')
    await wrapper.find(givenNameSelector).setValue('Mike')
    await wrapper.find('form').trigger('submit')
    await flushPromises()

    expect(wrapper.findAll('.q-field--error')).toHaveLength(1)
    expect(wrapper.find('.q-field--error .q-field__messages').html()).toContain(
      'must be an email'
    )
  })

  it('does not mutate when email is invalid', async () => {
    const wrapper = wrapperFactory()
    await wrapper.find(emailSelector).setValue('mike')
    await wrapper.find(passwordSelector).setValue('m')
    await wrapper.find(familyNameSelector).setValue('Coo')
    await wrapper.find(givenNameSelector).setValue('Mike')
    await wrapper.find('form').trigger('submit')
    await flushPromises()

    expect(wrapper.findAll('.q-field--error')).toHaveLength(1)
    expect(wrapper.find('.q-field--error .q-field__messages').html()).toContain(
      'must be an email'
    )
    expect(mutationSpy).not.toHaveBeenCalled()
  })

  it('shows an error when password is blank', async () => {
    const wrapper = wrapperFactory()
    await wrapper.find(emailSelector).setValue('mike@cpu.edu.ph')
    await wrapper.find(passwordSelector).setValue('')
    await wrapper.find(familyNameSelector).setValue('Coo')
    await wrapper.find(givenNameSelector).setValue('Mike')
    await wrapper.find('form').trigger('submit')
    await flushPromises()

    expect(wrapper.findAll('.q-field--error')).toHaveLength(1)
    expect(wrapper.find('.q-field--error .q-field__messages').html()).toContain(
      'cannot be blank'
    )
  })

  it('shows an error when family name is blank', async () => {
    const wrapper = wrapperFactory()
    await wrapper.find(emailSelector).setValue('mike@cpu.edu.ph')
    await wrapper.find(passwordSelector).setValue('asdf')
    await wrapper.find(familyNameSelector).setValue('')
    await wrapper.find(givenNameSelector).setValue('Mike')
    await wrapper.find('form').trigger('submit')
    await flushPromises()

    expect(wrapper.findAll('.q-field--error')).toHaveLength(1)
    expect(wrapper.find('.q-field--error .q-field__messages').html()).toContain(
      'familyName should not be empty'
    )
  })

  it('shows an error when given name is blank', async () => {
    const wrapper = wrapperFactory()
    await wrapper.find(emailSelector).setValue('mike@cpu.edu.ph')
    await wrapper.find(passwordSelector).setValue('asdf')
    await wrapper.find(familyNameSelector).setValue('Coo')
    await wrapper.find(givenNameSelector).setValue('')
    await wrapper.find('form').trigger('submit')
    await flushPromises()

    expect(wrapper.findAll('.q-field--error')).toHaveLength(1)
    expect(wrapper.find('.q-field--error .q-field__messages').html()).toContain(
      'givenName should not be empty'
    )
  })
})
