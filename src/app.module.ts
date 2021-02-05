import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CommonModule } from './modules/common/common.module'
import { UserModule } from './modules/user/user.module'
import { WebRTCModule } from './modules/webrtc/webrtc.module'

@Module({
  imports: [TypeOrmModule.forRoot({ timezone: '+09:00' }), UserModule, CommonModule, WebRTCModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
