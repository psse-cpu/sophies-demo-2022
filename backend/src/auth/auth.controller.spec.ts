import { Test, TestingModule } from '@nestjs/testing'
import { AuthController } from './auth.controller'

describe('AuthController', () => {
  let authController: AuthController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
    }).compile()

    authController = app.get<AuthController>(AuthController)
  })

  it('should be defined', () => {
    expect(authController).toBeDefined()
  })
})
