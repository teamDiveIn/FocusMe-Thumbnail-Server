import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { UserService } from '../user/user.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userService: UserService, private readonly reflector: Reflector) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest()
    try {
      const userId = req.user.id
      const user = await this.userService.findOne(userId)
      if (!user) throw new ForbiddenException('권한이 없습니다.')

      return true
    } catch (e) {
      throw new ForbiddenException('권한이 없습니다.')
    }
  }
}
