// src/openai/openai.provider.ts
import { OpenAI } from 'openai';

const client = new OpenAI({
  apiKey: process.env.PUBLIC_OPENAI_API_KEY,
});

export default client;
