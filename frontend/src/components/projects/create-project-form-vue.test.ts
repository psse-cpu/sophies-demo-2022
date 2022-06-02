import { ref } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { Quasar } from 'quasar'

import { fromValue, never } from 'wonka'
import CreateProjectForm from './create-project-form.vue'

const pushSpy = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: pushSpy,
  })),
}))

const querySpy = vi.fn(() =>
  fromValue({
    data: {
      emailExists: false,
    },
  })
)

const mutationSpy = vi.fn(() => never)

// TODO: refactor into a helper
const wrapperFactory = () =>
  mount(CreateProjectForm, {
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

const projectNameSelector = '[data-testid="project-name-input"]'
const projectDescriptionSelector = '[data-testid="project-description-input"]'
const sprintLengthSelector = '[data-testid="sprint-length-input"]'

describe('CreateProjectForm', () => {
  it('calls the mutation', async () => {
    const wrapper = wrapperFactory()
    await wrapper.find(projectNameSelector).setValue('wicked project')
    await wrapper
      .find(projectDescriptionSelector)
      .setValue('more wicked than Grindelwald')
    await wrapper.find(sprintLengthSelector).trigger('click')
    await wrapper.find('form').trigger('submit')
    await flushPromises()

    expect(mutationSpy).toHaveBeenCalled()
  })

  it('redirects to the project page', async () => {
    mutationSpy.mockReturnValue(fromValue({} as any))
    const wrapper = wrapperFactory()
    await wrapper.find(projectNameSelector).setValue('wicked project')
    await wrapper
      .find(projectDescriptionSelector)
      .setValue('more wicked than Grindelwald')
    await wrapper.find(sprintLengthSelector).trigger('click')
    await wrapper.find('form').trigger('submit')
    await flushPromises()

    expect(pushSpy).toHaveBeenCalledWith('/my-projects')
  })
})
