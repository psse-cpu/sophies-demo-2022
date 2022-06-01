import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants'
import { GqlExecutionContext } from '@nestjs/graphql'
import { CurrentUser } from './current-user.decorator'
import { UserWithoutHash } from './user-without-hash.dto'

// eslint-disable-next-line @typescript-eslint/ban-types -- just a test
function getParameterDecoratorFactory(ParameterDecorator_: Function) {
  class Test {
    public test(@ParameterDecorator_() _value: UserWithoutHash) {
      /* empty, just a test */
    }
  }

  const arguments_ = Reflect.getMetadata(ROUTE_ARGS_METADATA, Test, 'test')
  return arguments_[Object.keys(arguments_)[0]].factory
}

describe('@CurrentUser', () => {
  it('gives the current user to the decorated parameter', () => {
    jest.spyOn(GqlExecutionContext, 'create').mockReturnValue({
      getContext(): any {
        return {
          req: {
            user: { id: 1, email: 'mike@gov.ph' },
            otherStuff: 333,
          },
        }
      },
    } as GqlExecutionContext)

    const factory = getParameterDecoratorFactory(CurrentUser)
    expect(factory()).toStrictEqual({
      id: 1,
      email: 'mike@gov.ph',
    })
  })
})
