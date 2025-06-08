import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('test-response')
  async testResponse(
    @Body() body: { query: string; data: any }
  ): Promise<{ response: string }> {
    const prompt = this.aiService.buildPrompt(body.query, body.data);
    const response = await this.aiService.getGPTResponse('gpt-4', prompt);
    return { response };
  }
}
