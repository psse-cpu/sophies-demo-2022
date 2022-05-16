import { INestApplication } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import request from 'supertest'
import { AuthModule } from '../src/auth/auth.module'
import { User } from '../src/users/user.entity'
import { UsersService } from '../src/users/users.service'
import { typeOrmInMemoryModules } from './helpers/typeOrmInMemoryModules'

const seedDatabase = async (usersService: UsersService) => {
  return Promise.all([
    usersService.register('mike@foo.bar', 'like'),
    usersService.register('fifi@foo.bar', 'dog'),
  ])
}

describe('AuthController (integration)', () => {
  let app: INestApplication
  let usersService: UsersService

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ...typeOrmInMemoryModules([User]),
        AuthModule,
        ConfigModule.forRoot(),
      ],
      providers: [UsersService, ConfigService],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()

    usersService = moduleFixture.get(UsersService)

    await seedDatabase(usersService)
  })

  afterAll(() => {
    return app.close()
  })

  describe('/auth/login', () => {
    it('returns 401 with wrong credentials (bad username)', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'bbm@gov.ph',
          password: 'like',
        })
        .expect(401)
    })

    it('returns 401 with wrong credentials (bad username)', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'bbm@gov.ph',
          password: 'like',
        })
        .expect(401)
    })

    it('returns 401 with wrong credentials (bad password)', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'mike@gov.ph',
          password: 'wrong',
        })
        .expect(401)
    })

    it('returns 201 for correct credentials', async () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'mike@foo.bar',
          password: 'like',
        })
        .expect(201)
        .then((response) => {
          expect((response.body as User).email).toBe('mike@foo.bar')
        })
    })
  })
})
