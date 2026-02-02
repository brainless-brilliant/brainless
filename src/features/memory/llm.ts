
export class MemoryLLM {
  private apiKey: string;
  private model: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.ANTHROPIC_API_KEY || '';
    this.model = 'claude-3-haiku-20240307';
    
    if (!this.apiKey) {
      console.warn('MemoryLLM: No API key found. Compression will be disabled.');
    }
  }

  async complete(system: string, user: string): Promise<string> {
    if (!this.apiKey) return '';

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: this.model,
          max_tokens: 1024,
          system,
          messages: [{ role: 'user', content: user }]
        })
      });

      if (!response.ok) {
        throw new Error(`Anthropic API error: ${response.status}`);
      }

      const data = await response.json() as any;
      return data.content?.[0]?.text || '';
    } catch (error) {
      console.error('MemoryLLM Error:', error);
      return '';
    }
  }
}
