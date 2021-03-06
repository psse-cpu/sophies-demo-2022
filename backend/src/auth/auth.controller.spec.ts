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

      expect(spy).toHaveBeenCalledWith('jwt', 'token', { httpOnly: true })
    })
  })

  describe('#googleLogin', () => {
    it('sends an HTTP-only cookie of the access token', async () => {
      const spy = jest.fn()
      await authController.googleLogin(
        {} as Express.Request,
        {
          cookie: spy,
        } as unknown as Express.Response
      )

      expect(spy).toHaveBeenCalledWith('jwt', 'token', { httpOnly: true })
    })
  })

  describe('#logout()', () => {
    it('clears the JWT cookie', async () => {
      const mockResponse = { clearCookie: jest.fn() }
      await authController.logout(mockResponse as unknown as Express.Response)
      expect(mockResponse.clearCookie).toHaveBeenCalledWith('jwt', {
        httpOnly: true,
      })
    })

    it('responds with a simple success object', async () => {
      const mockResponse = { clearCookie: jest.fn() }

      return expect(
        authController.logout(mockResponse as unknown as Express.Response)
      ).resolves.toStrictEqual({ success: true })
    })
  })
})
