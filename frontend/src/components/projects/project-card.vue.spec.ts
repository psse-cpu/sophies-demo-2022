import { mount } from '@vue/test-utils'
import { Quasar } from 'quasar'
import ProjectCard from './project-card.vue'

const wrapperFactory = () =>
  mount(ProjectCard, {
    props: {
      project: {
        id: 3,
        name: 'Awesome Project',
        description: 'cool cool cool',
      },
    },
    global: { plugins: [Quasar] },
  })

const cardTitleSelector = '[data-testid="project-card-name"]'
const cardBodySelector = '[data-testid="project-card-description"]'

describe('ProjectCard', () => {
  it('displays the project name', () => {
    const wrapper = wrapperFactory()
    expect(wrapper.get(cardTitleSelector).text()).toBe('Awesome Project')
  })

  it('displays the project body', () => {
    const wrapper = wrapperFactory()
    expect(wrapper.get(cardBodySelector).text()).toBe('cool cool cool')
  })
})
