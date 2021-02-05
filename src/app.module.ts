import { MiddlewareConsumer, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthTokenMiddleware } from './modules/auth/auth.token.middleware'
import { CommonModule } from './modules/common/common.module'
import { UserModule } from './modules/user/user.module'
import { WebRTCModule } from './modules/webrtc/webrtc.module'

@Module({
  imports: [TypeOrmModule.forRoot({ timezone: '+09:00' }), UserModule, CommonModule, WebRTCModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthTokenMiddleware).forRoutes('*')
  }
}
