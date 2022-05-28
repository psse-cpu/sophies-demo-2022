import { INestApplication, ValidationPipe } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import request from 'supertest'

import { AppModule } from '../src/app.module'
import { UserWithoutHash } from '../src/users/user-without-hash.dto'
import { RegistrationSource } from '../src/users/registration-source'

import { User } from '../src/users/user.entity'
import { UsersService } from '../src/users/users.service'
import { typeOrmInMemoryModules } from './helpers/typeorm-in-memory-modules'
import { GraphqlResponse } from './types/graphql-response'

const seedDatabase = async (usersService: UsersService) => {
  return Promise.all([
    usersService.register({
      email: 'mike@foo.bar',
      password: 'like',
      familyName: 'Foo',
      givenName: 'Mike',
      registrationSource: RegistrationSource.LOCAL,
    }),
    usersService.register({
      email: 'quux@bar.baz',
      password: 'baz',
      familyName: 'X',
      givenName: 'Quu',
      registrationSource: RegistrationSource.LOCAL,
    }),
  ])
}

const gql = String.raw

describe('GraphQL Smoke Test (integration)', () => {
  let app: INestApplication
  let usersService: UsersService

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        ...typeOrmInMemoryModules([User]),
        AppModule,
      ],
    }).compile()

    app = moduleFixture.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))
    await app.init()

    usersService = moduleFixture.get(UsersService)

    await seedDatabase(usersService)
  })

  afterAll(async () => {
    await app.close()
  })

  describe('auto-validation', () => {
    it('passes the smoke test when the global validation pipe is setup correctly', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: gql`
            mutation Foo($registrant: Registrant!) {
              register(registrant: $registrant) {
                email
              }
            }
          `,
          variables: {
            registrant: {
              email: 'test',
              familyName: 'CPU',
              givenName: 'Edu',
              registrationSource: 'LOCAL',
              password: 'huya',
            },
          },
        })
        .expect(200)
        .then((response) => {
          const body = response.body as GraphqlResponse<UserWithoutHash>
          expect(body.data).toBeFalsy()
          expect(body.errors?.[0].extensions.response.statusCode).toBe(400)
          expect(body.errors?.[0].extensions.response.message).toContain(
            'email must be an email'
          )
        })
    })
  })
})
