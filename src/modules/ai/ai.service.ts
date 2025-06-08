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
You are a concise and insightful business assistant. Your task is to help a merchant understand their business data using short and useful bullet points.

Rules:
- Start with a high-level summary (e.g., total sales/refunds/tickets).
- Then list each record in a bullet point which tells us about the data in a humanly way and dont add technical jargon like ids.
- The insights should be understood by a non-technical person.
- If there are numerous records, then just summarise them.
- Keep it structured and clean. Do not repeat the query or mention "the data shows" or "based on the data".
- Highlight trends, anomalies if possible.
- the currency is in INR.
- If no records are present, just respond: "No records found for this query."

Merchant's Question: "${query}"

Data:
${JSON.stringify(data, null, 2)}
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
