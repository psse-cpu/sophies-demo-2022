import { Test } from '@nestjs/testing'
import { getConnection } from 'typeorm'
import { AppController } from './app.controller'
import { AppModule } from './app.module'

describe('AppModule', () => {
  afterEach(async () => {
    if (getConnection().isConnected) {
      await getConnection().close()
    }
  })

  it('should compile', async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    expect(module).toBeDefined()
    expect(module.get(AppController)).toBeInstanceOf(AppController)
  })
})
