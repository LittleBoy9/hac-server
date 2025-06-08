import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AskService } from './ask.service';

@Controller({
  path: 'ask',
  version: '1',
})
@ApiTags('Ask')
export class AskController {
  constructor(private askService: AskService) {}

  @Get()
  getAnalytics(@Query('query') query?: string) {
    return this.askService.getResponse(query || '');
  }
}
