import { Controller, Post, Body, Get } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller({
  path: 'ai',
  version: '1',  

})
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Get()
  getHello(): string {
    return 'Hello from AI Module!';
  }

  @Post()
  async testResponse(
    @Body() body: { query: string; data: any }
  ): Promise<{ response: string }> {
    const prompt = this.aiService.buildPrompt(body.query, body.data);
    const response = await this.aiService.getGPTResponse('gpt-4', prompt);
    return { response };
  }
}
