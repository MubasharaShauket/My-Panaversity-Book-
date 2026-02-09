// agents/tutor-agent.ts
import { BaseAgent, AgentConfig, AgentResponse } from './base-agent';

export interface TutorRequest {
  userId: string;
  question: string;
  context: string; // Chapter/module context
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  preferredExplanation: 'concise' | 'detailed' | 'comprehensive';
  userKnowledgeLevel: string;
}

export interface TutorResponse extends AgentResponse {
  explanation: string;
  relatedTopics: string[];
  examples: Example[];
  followUpQuestions: string[];
}

export interface Example {
  title: string;
  description: string;
  code?: string;
  diagram?: string;
}

export class TutorAgent extends BaseAgent {
  constructor(config: AgentConfig) {
    super(config);
  }
  
  async process(request: TutorRequest): Promise<TutorResponse> {
    try {
      const prompt = this.buildTutorPrompt(request);
      const llmResponse = await this.callLLM(prompt);
      
      // Parse the LLM response into structured tutor response
      const tutorResponse = this.parseTutorResponse(llmResponse, request);
      
      return {
        content: tutorResponse.explanation,
        success: true,
        metadata: {
          relatedTopicsCount: tutorResponse.relatedTopics.length,
          examplesCount: tutorResponse.examples.length
        },
        ...tutorResponse
      };
    } catch (error) {
      return {
        content: '',
        success: false,
        error: `Failed to process tutoring request: ${(error as Error).message}`,
        explanation: '',
        relatedTopics: [],
        examples: [],
        followUpQuestions: []
      };
    }
  }
  
  private buildTutorPrompt(request: TutorRequest): string {
    return `
      As an expert tutor in Physical AI and Humanoid Robotics, please explain the following concept:
      
      Question: ${request.question}
      Context: ${request.context}
      User Knowledge Level: ${request.userKnowledgeLevel}
      
      Requirements:
      - Adjust explanation difficulty to: ${request.difficultyLevel}
      - Provide explanation style: ${request.preferredExplanation}
      - Include relevant examples and analogies
      - Suggest related topics for deeper understanding
      - Provide follow-up questions to reinforce learning
      
      Format your response with:
      1. Clear explanation of the concept
      2. Related topics for further study
      3. Practical examples with code/diagrams if applicable
      4. Follow-up questions to test understanding
    `;
  }
  
  private parseTutorResponse(response: string, request: TutorRequest): Omit<TutorResponse, keyof AgentResponse> {
    // In a real implementation, this would parse the LLM response
    // For now, we'll return a mock response based on the request
    
    return {
      explanation: `This is a detailed explanation for: "${request.question}". Based on your ${request.difficultyLevel} level and preference for ${request.preferredExplanation} explanations, here's what you need to know...`,
      relatedTopics: [
        'Related Topic 1',
        'Related Topic 2', 
        'Related Topic 3'
      ],
      examples: [
        {
          title: 'Simple Example',
          description: 'A basic example to illustrate the concept',
          code: 'console.log("Hello, Robot!");'
        },
        {
          title: 'Advanced Example',
          description: 'A more complex example showing practical application',
          code: '// Complex robotics algorithm implementation'
        }
      ],
      followUpQuestions: [
        'Can you explain the key components?',
        'How would you apply this in practice?',
        'What are the limitations of this approach?'
      ]
    };
  }
}