import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common'
import { WebRTCDeleteTokenRequest, WebRTCTokenRequest } from './webrtc.dto'
import { WebRTCService } from './webrtc.service'

@Controller('webrtc')
export class WebRTCController {
  constructor(private readonly webRTCService: WebRTCService) {}

  @Post('token')
  public async getToken(@Body() data: WebRTCTokenRequest) {
    return this.webRTCService.getToken(data)
  }
  @Delete('token')
  public async deleteToken(@Body() data: WebRTCDeleteTokenRequest) {
    return this.webRTCService.deleteToken(data)
  }
}
