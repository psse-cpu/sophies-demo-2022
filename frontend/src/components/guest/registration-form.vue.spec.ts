import { ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { Quasar } from 'quasar'
import RegistrationForm from 'src/components/guest/registration-form.vue'
import * as urql from '@urql/vue'
import { SpyInstance } from 'vitest'
import { RegistrationSource } from 'src/generated/graphql'
import {
  EmailExistsQuery,
  EmailExistsQueryVariables,
} from './email-exists.generated'

const queryMock = vi.fn()
const mutationMock = vi.fn()

const mockClient = {
  useQuery: queryMock,
  useMutation: mutationMock,
}

const saveRedirectSpy = vi.fn()
vi.mock('src/composables/use-save-and-redirect', () => ({
  useSaveAndRedirect: () => ({
    saveUserAndRedirect: saveRedirectSpy,
  }),
}))

// @urql/vue doesn't use the inject('$urql') result
vi.mock('@urql/vue', () => ({
  useQuery: vi.fn().mockReturnValue({
    data: ref({ emailExists: false }),
    executeQuery: vi.fn(),
  }),
  useMutation: vi.fn(),
}))

const wrapperFactory = () =>
  mount(RegistrationForm, {
    global: {
      plugins: [Quasar],
      provide: {
        $urql: mockClient, // doesn't work but makes urql happy
      },
    },
  })

const emailSelector = '[data-testid="email-input"]'
const passwordSelector = '[data-testid="password-input"]'
const familyNameSelector = '[data-testid="family-name-input"]'
const givenNameSelector = '[data-testid="given-name-input"]'

describe('RegistrationForm', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  beforeEach(() => {
    vi.spyOn(urql, 'useQuery').mockReturnValue({
      data: ref({ emailExists: false }),
      executeQuery: vi.fn(),
    } as unknown as urql.UseQueryResponse<EmailExistsQuery, EmailExistsQueryVariables>)
  })

  it('shows no errors when all inputs are valid', async () => {
    const mutationSpy = urql.useMutation as unknown as SpyInstance
    mutationSpy.mockReturnValue({
      executeMutation: () => ({
        data: {
          newUser: {
            id: 1,
            email: 'mike@cpu.edu.ph',
            familyName: 'Coo',
            givenName: 'Mike',
          },
        },
      }),
    })

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
    const mutationSpy = urql.useMutation as unknown as SpyInstance
    const executeMutationSpy = vi.fn()

    mutationSpy.mockReturnValue({
      executeMutation: executeMutationSpy,
    })

    executeMutationSpy.mockResolvedValue({
      data: {
        newUser: {
          id: 1,
          email: 'mike@cpu.edu.ph',
          familyName: 'Coo',
          givenName: 'Mike',
        },
      },
    })

    const wrapper = wrapperFactory()
    await wrapper.find(emailSelector).setValue('mike@cpu.edu.ph')
    await wrapper.find(passwordSelector).setValue('m')
    await wrapper.find(familyNameSelector).setValue('Coo')
    await wrapper.find(givenNameSelector).setValue('Mike')
    await wrapper.find('form').trigger('submit')
    await flushPromises()

    expect(executeMutationSpy).toHaveBeenCalledWith({
      registrant: {
        email: 'mike@cpu.edu.ph',
        password: 'm',
        familyName: 'Coo',
        givenName: 'Mike',
        registrationSource: RegistrationSource.LOCAL,
      },
    })
  })

  it('shows an error when all inputs are valid but email is taken', async () => {
    vi.spyOn(urql, 'useQuery').mockReturnValue({
      data: ref({ emailExists: true }),
      executeQuery: vi.fn(),
    } as unknown as urql.UseQueryResponse<EmailExistsQuery, EmailExistsQueryVariables>)

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

  // TODO: this seems hard to test, due to urql mocks breaking reactivity, but E2E should cover this
  it.todo('shows email is taken even when just typing after submit')

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
