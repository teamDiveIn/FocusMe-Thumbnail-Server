import { Controller, Get, UseGuards } from '@nestjs/common'
import { CurrentUser, ReqUser } from '../auth/auth.decorator'
import { AuthGuard } from '../auth/auth.guard'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard)
  public async getHello(
    @ReqUser() {} : CurrentUser
  ): Promise<string> {
    const result = await this.userService.findOne('a')

    return 'asd'
  }
}
