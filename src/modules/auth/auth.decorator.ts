import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export interface CurrentUser {
  id: number
}

export const ReqUser = createParamDecorator<unknown, ExecutionContext, CurrentUser>(
  (data: unknown, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest()
    return { id: req?.user?.id } as CurrentUser
  },
)
