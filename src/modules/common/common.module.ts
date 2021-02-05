import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CommonController } from './common.controller'
import { CommonService } from './common.service'

@Module({
  imports: [TypeOrmModule.forFeature([])],
  providers: [CommonService],
  controllers: [CommonController],
  exports: [CommonService],
})
export class CommonModule {}
