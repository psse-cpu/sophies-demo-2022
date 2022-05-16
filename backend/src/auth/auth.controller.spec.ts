import { Test, TestingModule } from '@nestjs/testing'
import Express from 'express'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

describe('AuthController', () => {
  let authController: AuthController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signJwt: jest.fn().mockResolvedValue({ accessToken: 'token' }),
          },
        },
      ],
    }).compile()

    authController = app.get<AuthController>(AuthController)
  })

  it('should be defined', () => {
    expect(authController).toBeDefined()
  })

  describe('#login', () => {
    it('sends an HTTP-only cookie of the access token', async () => {
      const spy = jest.fn()
      await authController.login(
        {} as Express.Request,
        {
          cookie: spy,
        } as unknown as Express.Response
      )

      expect(spy).toBeCalledWith('jwt', 'token', { httpOnly: true })
    })
  })

  describe('#googleLoginRedirect', () => {
    it('sends an HTTP-only cookie of the access token', async () => {
      const spy = jest.fn()
      await authController.googleLoginRedirect(
        {} as Express.Request,
        {
          cookie: spy,
        } as unknown as Express.Response
      )

      expect(spy).toBeCalledWith('jwt', 'token', { httpOnly: true })
    })
  })
})
