// agents/base-agent.ts
export interface AgentConfig {
  model: string;
  temperature: number;
  maxTokens: number;
  apiKey?: string;
}

export interface AgentResponse {
  content: string;
  metadata?: Record<string, any>;
  success: boolean;
  error?: string;
}

export abstract class BaseAgent {
  protected config: AgentConfig;
  
  constructor(config: AgentConfig) {
    this.config = config;
  }
  
  abstract process(input: any): Promise<AgentResponse>;
  
  protected async callLLM(prompt: string): Promise<string> {
    // This would be replaced with actual LLM call in a real implementation
    // For now, returning a mock response
    return `Mock response for: ${prompt.substring(0, 50)}...`;
  }
}