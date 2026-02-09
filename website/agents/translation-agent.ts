// agents/translation-agent.ts
import { BaseAgent, AgentConfig, AgentResponse } from './base-agent';

export interface TranslationRequest {
  content: string;
  sourceLanguage: string;
  targetLanguage: string;
  domain: string; // e.g., 'robotics', 'ai', 'engineering'
  preserveFormat: boolean;
  userId?: string;
}

export interface TranslationResponse extends AgentResponse {
  translatedContent: string;
  confidence: number;
  detectedLanguage?: string;
  terminologyUsed: TerminologyEntry[];
}

export interface TerminologyEntry {
  sourceTerm: string;
  targetTerm: string;
  definition: string;
  context: string;
}

export class TranslationAgent extends BaseAgent {
  constructor(config: AgentConfig) {
    super(config);
  }
  
  async process(request: TranslationRequest): Promise<TranslationResponse> {
    try {
      // Extract technical terms and preserve formatting elements
      const { contentWithoutPreserved, preservedElements } = this.preserveFormatting(request.content);
      
      // Translate the main content
      const prompt = this.buildTranslationPrompt(contentWithoutPreserved, request);
      const llmResponse = await this.callLLM(prompt);
      
      // Restore preserved elements
      const translatedContent = this.restoreFormatting(llmResponse, preservedElements);
      
      // Identify and map technical terminology
      const terminology = this.extractTerminology(contentWithoutPreserved, translatedContent);
      
      return {
        content: translatedContent,
        success: true,
        metadata: {
          confidence: 0.95, // Mock confidence score
          sourceLanguage: request.sourceLanguage,
          targetLanguage: request.targetLanguage
        },
        translatedContent,
        confidence: 0.95,
        detectedLanguage: request.sourceLanguage,
        terminologyUsed: terminology
      };
    } catch (error) {
      return {
        content: '',
        success: false,
        error: `Failed to translate content: ${(error as Error).message}`,
        translatedContent: '',
        confidence: 0,
        terminologyUsed: []
      };
    }
  }
  
  private preserveFormatting(content: string): { contentWithoutPreserved: string; preservedElements: Array<{ id: string; element: string }> } {
    const preservedElements: Array<{ id: string; element: string }> = [];
    let contentWithoutPreserved = content;
    
    // Preserve code blocks
    const codeBlockRegex = /(<pre>[\s\S]*?<\/pre>|<code>[\s\S]*?<\/code>)/g;
    contentWithoutPreserved = contentWithoutPreserved.replace(codeBlockRegex, (match) => {
      const id = `CODE_BLOCK_${preservedElements.length}`;
      preservedElements.push({ id, element: match });
      return `{{${id}}}`;
    });
    
    // Preserve equations
    const equationRegex = /\$\$[\s\S]*?\$\$|\$[\s\S]*?\$/g;
    contentWithoutPreserved = contentWithoutPreserved.replace(equationRegex, (match) => {
      const id = `EQUATION_${preservedElements.length}`;
      preservedElements.push({ id, element: match });
      return `{{${id}}}`;
    });
    
    // Preserve image tags
    const imgRegex = /<img[^>]*>/g;
    contentWithoutPreserved = contentWithoutPreserved.replace(imgRegex, (match) => {
      const id = `IMAGE_${preservedElements.length}`;
      preservedElements.push({ id, element: match });
      return `{{${id}}}`;
    });
    
    // Preserve diagrams (assuming they're marked with a specific class)
    const diagramRegex = /<div class="[^"]*diagram[^"]*">[\s\S]*?<\/div>/g;
    contentWithoutPreserved = contentWithoutPreserved.replace(diagramRegex, (match) => {
      const id = `DIAGRAM_${preservedElements.length}`;
      preservedElements.push({ id, element: match });
      return `{{${id}}}`;
    });
    
    return { contentWithoutPreserved, preservedElements };
  }
  
  private restoreFormatting(translatedContent: string, preservedElements: Array<{ id: string; element: string }>): string {
    let restoredContent = translatedContent;
    
    for (const { id, element } of preservedElements) {
      restoredContent = restoredContent.replace(new RegExp(`\\{\\{${id}\\}\\}`, 'g'), element);
    }
    
    return restoredContent;
  }
  
  private buildTranslationPrompt(content: string, request: TranslationRequest): string {
    return `
      Translate the following content from ${request.sourceLanguage} to ${request.targetLanguage}.
      
      Content to translate:
      ${content}
      
      Translation requirements:
      1. Maintain technical accuracy, especially for ${request.domain}-specific terminology
      2. Preserve the meaning and context of the original content
      3. Use appropriate formal/informal register for educational content
      4. Ensure cultural appropriateness for the target audience
      5. Maintain readability and flow in the target language
      
      Domain: ${request.domain}
      Special considerations: This is educational content for ${request.domain}, so technical terms should be translated consistently.
    `;
  }
  
  private extractTerminology(sourceContent: string, targetContent: string): TerminologyEntry[] {
    // In a real implementation, this would identify and map technical terms
    // For now, we'll return a mock terminology list
    
    return [
      {
        sourceTerm: "Physical AI",
        targetTerm: "فزیکل ای آئی",
        definition: "A form of artificial intelligence that is embodied in physical systems",
        context: "Robotics and AI integration"
      },
      {
        sourceTerm: "Humanoid Robotics",
        targetTerm: "ہیومنوائڈ روبوٹس",
        definition: "The branch of robotics focused on creating robots with human-like form and capabilities",
        context: "Robotics engineering"
      },
      {
        sourceTerm: "Embodiment",
        targetTerm: "ایمبوڈیمنٹ",
        definition: "The concept that intelligence emerges from the interaction between an agent and its physical environment",
        context: "Cognitive robotics"
      }
    ];
  }
}