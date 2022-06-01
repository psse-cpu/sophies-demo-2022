import { Quasar } from 'quasar'
import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import { fromValue, never } from 'wonka'
import { createRouter, createWebHistory } from 'vue-router'
import MyProjectsContainer from './my-projects-container.vue'

const querySpy = vi.fn(() =>
  fromValue({
    data: {
      myProjects: [
        {
          id: 2,
          name: "Marks - O'Reilly array",
          description:
            'The HTTP bus is down, override the optical application so we can generate the USB pixel!',
          createdAt: new Date(),
        },
        {
          id: 3,
          name: 'Marquardt Group protocol',
          description: 'We need to synthesize the mobile PNG program!',
          createdAt: new Date(),
        },
        {
          id: 4,
          name: 'Nuff minerals',
          description: 'Some catchy phrase',
          createdAt: new Date(),
        },
        {
          id: 7,
          name: 'House of Dragons',
          description: 'Coming this August',
          createdAt: new Date(),
        },
      ],
    },
  })
)
const mutationSpy = vi.fn(() => never)

const minimalRoutes = [
  {
    name: 'project',
    path: '/project/:projectId',
    component: {
      template: 'Dummy project page',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: minimalRoutes,
})

const wrapperFactory = () =>
  mount(MyProjectsContainer, {
    global: {
      plugins: [Quasar, router],
      provide: {
        $urql: ref({
          executeQuery: querySpy,
          executeMutation: mutationSpy,
          executeSubscription: vi.fn(() => never),
        }),
      },
    },
  })
describe('MyProjectsPage', () => {
  it('renders', () => {
    const wrapper = wrapperFactory()
    expect(wrapper).toBeDefined()
  })

  it('gives the correct props to <my-projects />', () => {
    const wrapper = wrapperFactory()
    expect(wrapper.findAll('.card-container')).toHaveLength(4)
  })
})
