import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  /**
   * Builds a GPT-friendly prompt using the user query and SQL result JSON.
   * 
   * @param query - The original query asked by the merchant.
   * @param data - The parsed JSON result from the SQL query.
   * @returns A prompt string formatted for GPT.
   */
  buildPrompt(query: string, data: any): string {
    return `
You are a helpful business assistant who helps merchants understand their business insights.

The merchant asked: "${query}"

Here is the relevant data from the SQL database:
${JSON.stringify(data, null, 2)}

Write a short, clear, and friendly summary for the merchant.
If there is no data, say "No records found for this query."
    `;
  }

  /**
   * Sends a prompt to a specified OpenAI model and returns the model's response.
   * 
   * @param model - The OpenAI model name (e.g., 'gpt-4' or 'gpt-3.5-turbo').
   * @param prompt - The prompt string generated from user query and data.
   * @returns A Promise that resolves to the model's response as a string.
   */
  async getGPTResponse(model: string, prompt: string): Promise<string> {
    const completion = await this.openai.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: 'You are a helpful business assistant.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
    });

    return completion.choices[0].message.content?.trim() || 'No response';
  }
}
