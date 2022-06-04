import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import { fromValue, never } from 'wonka'
import { Quasar } from 'quasar'
import AddMemberView from './add-member.vue'

// TODO: refactor into urql-mocks

const querySpy = vi.fn(() => fromValue({}))
const mutationSpy = vi.fn(() => never)

const wrapperFactory = () =>
  mount(AddMemberView, {
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

describe('AddMember', () => {
  it('renders', () => {
    const wrapper = wrapperFactory()
    expect(wrapper).toBeDefined()
  })
})
