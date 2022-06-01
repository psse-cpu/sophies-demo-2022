import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    console.log('uuuuuuuuuuuu', data, context)
    const context_ = GqlExecutionContext.create(context)
    return context_.getContext().req.user
  }
)
