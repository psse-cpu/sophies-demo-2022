import { mount } from '@vue/test-utils'
import { Project } from 'app/../backend/src/projects/project.entity'
import { Quasar } from 'quasar'
import ProjectView from './project-view.vue'

const project = Object.assign(new Project(), {
  name: 'anti-brownout system',
  description: 'power interruptions are a thing of the past',
  sprintLength: 2,
})

const wrapperFactory = () =>
  mount(ProjectView, {
    global: { plugins: [Quasar] },
    props: {
      project,
    },
  })

const projectNameSelector = '[data-testid="project-name"]'
const projectDescriptionSelector = '[data-testid="project-description"]'
const sprintLengthSelector = '[data-testid="sprint-length"]'

describe('ProjectView', () => {
  it('displays the project name', () => {
    const wrapper = wrapperFactory()
    expect(wrapper.find(projectNameSelector).text()).toBe(
      'anti-brownout system'
    )
  })

  it('displays the project description', () => {
    const wrapper = wrapperFactory()
    expect(wrapper.find(projectDescriptionSelector).text()).toBe(
      'power interruptions are a thing of the past'
    )
  })

  it('displays the sprint length', () => {
    const wrapper = wrapperFactory()
    expect(wrapper.find(sprintLengthSelector).text()).toBe('2 weeks')
  })
})
