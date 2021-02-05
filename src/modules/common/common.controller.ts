import { Controller, Get, Post, Query } from '@nestjs/common'
import { CommonService } from './common.service'

@Controller('common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @Get()
  public async getUploadUrl(@Query('ext') ext: string) {
    return this.commonService.getUploadUrl(ext)
  }
}
