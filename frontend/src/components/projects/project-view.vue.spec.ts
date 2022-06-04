import { mount } from '@vue/test-utils'
import { Project } from 'app/../backend/src/projects/project.entity'
import { Quasar } from 'quasar'
import { ScrumRole } from 'src/generated/graphql'
import { ref } from 'vue'
import { fromValue, never } from 'wonka'
import ProjectView from './project-view.vue'

const project = Object.assign(new Project(), {
  id: 1,
  name: 'anti-brownout system',
  description: 'power interruptions are a thing of the past',
  sprintLength: 2,
  memberships: [
    {
      user: {
        id: 1,
        givenName: 'Mike',
        familyName: 'Coo',
        email: 'coo@gov.ph',
      },
      scrumRole: ScrumRole.PRODUCT_OWNER,
    },
    {
      user: {
        id: 2,
        givenName: 'Lol',
        familyName: 'Dota',
        email: 'lol@valve.com',
      },
      scrumRole: ScrumRole.SCRUM_MASTER,
    },
    {
      user: {
        id: 3,
        givenName: 'Brr',
        familyName: 'Grr',
        email: 'cold@valve.com',
      },
      scrumRole: ScrumRole.MEMBER,
    },
  ],
})

const querySpy = vi.fn(() => fromValue({}))
const mutationSpy = vi.fn(() => never)

const wrapperFactory = () =>
  mount(ProjectView, {
    global: { plugins: [Quasar] },
    props: {
      project,
    },
    provide: {
      // TODO: refactor - component is not supposed to need urql mocks, but since it's
      // a full mount, it has to provide $urql for the <add-member /> child 😢
      $urql: ref({
        executeQuery: querySpy,
        executeMutation: mutationSpy,
        executeSubscription: vi.fn(() => never),
      }),
    },
  })

const projectNameSelector = '[data-testid="project-name"]'
const projectDescriptionSelector = '[data-testid="project-description"]'
const sprintLengthSelector = '[data-testid="sprint-length"]'
const membersSelector = '[data-testid="members-table"]'

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

  it('displays the sprint length with proper pluralization', () => {
    const wrapper = wrapperFactory()
    expect(wrapper.find(sprintLengthSelector).text()).toMatch(/2\s*weeks$/)
  })

  it('displays a 1-week sprint length with proper pluralization', () => {
    const oneWeekSprintsProject = { ...project, sprintLength: 1 }
    const wrapper = mount(ProjectView, {
      global: { plugins: [Quasar] },
      props: {
        project: oneWeekSprintsProject,
      },
      provide: {
        // TODO: refactor --yeah test code like this hurts
        $urql: ref({
          executeQuery: querySpy,
          executeMutation: mutationSpy,
          executeSubscription: vi.fn(() => never),
        }),
      },
    })

    expect(wrapper.find(sprintLengthSelector).text()).toMatch(/1\s*week$/)
  })

  it('displays the members', () => {
    const wrapper = wrapperFactory()
    // 4: tr for header is 1, then 3 <tr> for 3 members
    expect(wrapper.findAll(`${membersSelector} tr`)).toHaveLength(4)
    expect(
      wrapper.find(`${membersSelector} tbody tr:nth-child(1)`).text()
    ).toContain('Coo, Mike')
    expect(
      wrapper.find(`${membersSelector} tbody tr:nth-child(1)`).text()
    ).toContain('PRODUCT_OWNER')
    expect(
      wrapper.find(`${membersSelector} tbody tr:nth-child(2)`).text()
    ).toContain('Dota, Lol')
    expect(
      wrapper.find(`${membersSelector} tbody tr:nth-child(2)`).text()
    ).toContain('SCRUM_MASTER')
    expect(
      wrapper.find(`${membersSelector} tbody tr:nth-child(3)`).text()
    ).toContain('Grr, Brr')
    expect(
      wrapper.find(`${membersSelector} tbody tr:nth-child(3)`).text()
    ).toContain('MEMBER')
  })
})
