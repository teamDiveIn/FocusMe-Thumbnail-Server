import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { WebRTCController } from './webrtc.controller'
import { WebRTCService } from './webrtc.service'

@Module({
  imports: [TypeOrmModule.forFeature([])],
  providers: [WebRTCService],
  controllers: [WebRTCController],
  exports: [],
})
export class WebRTCModule {}
