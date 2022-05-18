import { ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  /* override */ getRequest(context: ExecutionContext): Express.Request {
    const gqlContext = GqlExecutionContext.create(context)
    return gqlContext.getContext().req
  }
}
