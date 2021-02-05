import { Body, Controller, Delete, Get, Post, Query, UseGuards } from '@nestjs/common'
import { CurrentUser, ReqUser } from '../auth/auth.decorator'
import { AuthGuard } from '../auth/auth.guard'
import { WebRTCDeleteTokenRequest, WebRTCTokenRequest } from './webrtc.dto'
import { WebRTCService } from './webrtc.service'

@Controller('webrtc')
export class WebRTCController {
  constructor(private readonly webRTCService: WebRTCService) {}

  @Post('token')
  @UseGuards(AuthGuard)
  public async getToken(@ReqUser() { id: userId }: CurrentUser, @Body() data: WebRTCTokenRequest) {
    return this.webRTCService.getToken(data, userId)
  }

  @Delete('token')
  @UseGuards(AuthGuard)
  public async deleteToken(@Body() data: WebRTCDeleteTokenRequest) {
    return this.webRTCService.deleteToken(data)
  }
}
