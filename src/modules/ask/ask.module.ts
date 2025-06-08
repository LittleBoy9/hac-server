import { Global, Module } from '@nestjs/common';
import { AskService } from './ask.service';
import { AskController } from './ask.controller';

@Global()
@Module({
  imports: [],
  controllers: [AskController],
  providers: [AskService],
  exports: [AskService],
})
export class AskModule {}
