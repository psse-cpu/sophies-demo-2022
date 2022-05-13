import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { AppModule } from '../src/app.module'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterAll(() => {
    app.close()
  })

  describe('/auth/login', () => {
    it('returns 401 with wrong credentials (bad username)', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'mike@foo.bar',
          password: 'like',
        })
        .expect(401)
    })
  })
})
