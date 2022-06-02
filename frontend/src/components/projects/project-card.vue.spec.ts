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
        createdAt: new Date(),
      },
    },
    global: { plugins: [Quasar] },
  })

const cardTitleSelector = '[data-testid="project-card-name"]'
const cardBodySelector = '[data-testid="project-card-description"]'
const cardDateSelector = '[data-testid="project-card-date"]'

describe('ProjectCard', () => {
  it('displays the project name', () => {
    const wrapper = wrapperFactory()
    expect(wrapper.get(cardTitleSelector).text()).toBe('Awesome Project')
  })

  it('displays the project body', () => {
    const wrapper = wrapperFactory()
    expect(wrapper.get(cardBodySelector).text()).toBe('cool cool cool')
  })

  it('displays the project creation date', () => {
    const wrapper = wrapperFactory()
    expect(wrapper.get(cardDateSelector).text()).toMatch(
      /^Created \d\d?\/\d\d?/
    )
  })
})
