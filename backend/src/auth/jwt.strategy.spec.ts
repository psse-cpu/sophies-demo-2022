import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { JwtStrategy } from './jwt.strategy'

describe('JwtStrategy', () => {
  let strategy: JwtStrategy

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        JwtModule.register({
          secret: 'haha',
          signOptions: { expiresIn: '1w' },
        }),
      ],
      providers: [JwtStrategy],
    }).compile()

    strategy = module.get(JwtStrategy)
  })

  it('should be defined', async () => {
    expect(strategy).toBeDefined()
  })

  describe('#validate()', () => {
    it('extracts user details from the payload', () => {
      return expect(
        strategy.validate({ sub: 1, email: 'ban.harry@gmail.com' })
      ).resolves.toStrictEqual({
        id: 1,
        email: 'ban.harry@gmail.com',
      })
    })
  })
})
