import { Injectable } from '@nestjs/common';

@Injectable()
export class AskService {
  constructor() {}

  getResponse(query: string): string {
    // Placeholder for actual logic to process the query
    return `Response for query: ${query}`;
  }
}
