import { mount } from '@vue/test-utils'
import { Quasar } from 'quasar'
import MyProjects from './my-projects.vue'

const cardTitleSelector = '[data-testid="project-card-name"]'

describe('ProjectCard', () => {
  it('displays the projects if there are any', () => {
    const wrapper = mount(MyProjects, {
      props: {
        projects: [
          {
            id: 3,
            name: 'Awesome Project',
            description: 'cool cool cool',
          },
          {
            id: 4,
            name: 'Red Flag Project',
            description: 'bad bad bad',
          },
          {
            id: 5,
            name: 'Big Budget Project',
            description: 'money money money $$$',
          },
        ],
      },
      global: {
        plugins: [Quasar],
      },
    })

    expect(wrapper.findAll(cardTitleSelector)).toHaveLength(3)
  })

  it('displays an empty state page if there are no projects', () => {
    const wrapper = mount(MyProjects, {
      props: {
        projects: [],
      },
      global: {
        plugins: [Quasar],
      },
    })

    expect(wrapper.findAll(cardTitleSelector)).toHaveLength(0)
    expect(wrapper.text()).toContain('such empty')
  })
})
