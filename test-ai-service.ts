import 'dotenv/config';  // load OPENAI_API_KEY from .env
import OpenAI from 'openai';

class AiService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

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
- If no records are present, just respond: "No records found for this query."

Merchant's Question: "${query}"

Data:
${JSON.stringify(data, null, 2)}
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
    { refundId: 3, amount: 499, date: '2025-06-08' },
    { refundId: 4, amount: 199, date: '2025-06-08' },
    { refundId: 5, amount: 399, date: '2025-06-08' },
    { refundId: 6, amount: 599, date: '2025-06-08' },
    { refundId: 7, amount: 899, date: '2025-06-08' },
    { refundId: 8, amount: 999, date: '2025-06-08' },
    { refundId: 9, amount: 100000, date: '2025-06-08' },
    { refundId: 10, amount: 1199, date: '2025-06-08' },
    { refundId: 11, amount: 1299, date: '2025-06-08' },
    { refundId: 12, amount: 1399, date: '2025-06-08' },
    { refundId: 13, amount: 1499, date: '2025-06-08' },
    { refundId: 14, amount: 1599, date: '2025-06-08' }
  ];

  const prompt = aiService.buildPrompt(query, data);
  console.log('Prompt:\n', prompt);

  const response = await aiService.getGPTResponse('gpt-4', prompt);
  console.log('\nGPT Response:\n', response);
}

main().catch(console.error);
