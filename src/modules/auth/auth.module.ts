import { Module, Global } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthService } from './auth.service'

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([])],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
