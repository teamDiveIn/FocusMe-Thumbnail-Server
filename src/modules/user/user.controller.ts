import { Controller, Get } from '@nestjs/common'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public async getHello(): Promise<string> {
    const result = await this.userService.findOne()

    console.log(result)
    return 'asd'
  }
}
