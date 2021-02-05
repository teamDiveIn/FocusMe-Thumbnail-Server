// import { createParamDecorator, ExecutionContext } from '@nestjs/common'

// export interface CurrentUser {
//   id: number
//   currentUniversityId: number
// }

// export const ReqUser = createParamDecorator<unknown, ExecutionContext, CurrentUser>(
//   (data: unknown, context: ExecutionContext) => {
//     const ctx = GqlExecutionContext.create(context)
//     const { req } = ctx.getContext()
//     return { id: req.user.id, currentUniversityId: req.universityId } as CurrentUser
//   },
// )
