import { Project } from 'src/projects/project.entity'
import { faker } from '@faker-js/faker'

export const customFunction = (): Project[] =>
  Array.from({ length: 10 })
    .fill('')
    .map(
      (_) =>
        ({
          name: `${faker.company.companyName()} ${faker.hacker.noun()}`,
          description: faker.hacker.phrase(),
        } as Project)
    )
