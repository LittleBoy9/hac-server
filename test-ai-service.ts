import 'dotenv/config';  // load OPENAI_API_KEY from .env
import OpenAI from 'openai';

class AiService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

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

async function main() {
  const aiService = new AiService();

  const query = 'How many refunds were issued in the last 2 days?';
  const data = [
    { refundId: 1, amount: 299, date: '2025-06-07' },
    { refundId: 2, amount: 799, date: '2025-06-07' },
  ];

  const prompt = aiService.buildPrompt(query, data);
  console.log('Prompt:\n', prompt);

  const response = await aiService.getGPTResponse('gpt-4', prompt);
  console.log('\nGPT Response:\n', response);
}

main().catch(console.error);
