import { Test } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppModule } from './app.module'

describe('AppModule', () => {
  it('should compile', async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    expect(module).toBeDefined()
    expect(module.get(AppController)).toBeInstanceOf(AppController)
    module.close()
  })
})
