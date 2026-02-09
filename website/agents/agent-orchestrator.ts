// agents/agent-orchestrator.ts
import { CurriculumAgent } from './curriculum-agent';
import { TutorAgent } from './tutor-agent';
import { AssessmentAgent } from './assessment-agent';
import { TranslationAgent } from './translation-agent';
import { StartupMentorAgent } from './startup-mentor-agent';
import { AgentConfig } from './base-agent';

export interface AgentOrchestratorConfig {
  curriculumAgent: AgentConfig;
  tutorAgent: AgentConfig;
  assessmentAgent: AgentConfig;
  translationAgent: AgentConfig;
  startupMentorAgent: AgentConfig;
}

export class AgentOrchestrator {
  private curriculumAgent: CurriculumAgent;
  private tutorAgent: TutorAgent;
  private assessmentAgent: AssessmentAgent;
  private translationAgent: TranslationAgent;
  private startupMentorAgent: StartupMentorAgent;

  constructor(config: AgentOrchestratorConfig) {
    this.curriculumAgent = new CurriculumAgent(config.curriculumAgent);
    this.tutorAgent = new TutorAgent(config.tutorAgent);
    this.assessmentAgent = new AssessmentAgent(config.assessmentAgent);
    this.translationAgent = new TranslationAgent(config.translationAgent);
    this.startupMentorAgent = new StartupMentorAgent(config.startupMentorAgent);
  }

  async getCurriculum(userId: string, profile: any) {
    const request = {
      userId,
      currentKnowledge: profile.roboticsExperience || 'beginner',
      learningGoals: profile.learningGoals || [],
      timeAvailability: profile.timeCommitment || 'casual',
      preferredLearningStyle: profile.preferredLearningStyle || 'visual'
    };
    
    return await this.curriculumAgent.process(request);
  }

  async getTutorHelp(userId: string, question: string, context: string, difficulty: string) {
    const request = {
      userId,
      question,
      context,
      difficultyLevel: difficulty as 'beginner' | 'intermediate' | 'advanced',
      preferredExplanation: 'detailed' as 'concise' | 'detailed' | 'comprehensive',
      userKnowledgeLevel: 'intermediate'
    };
    
    return await this.tutorAgent.process(request);
  }

  async getAssessment(topic: string, difficulty: string, numQuestions: number, context?: string) {
    const request = {
      userId: 'temp-user', // Would come from session
      topic,
      difficultyLevel: difficulty as any,
      questionTypes: ['multiple-choice', 'short-answer'],
      numberOfQuestions: numQuestions,
      context
    };
    
    return await this.assessmentAgent.process(request);
  }

  async translateContent(content: string, targetLanguage: string = 'ur') {
    const request = {
      content,
      sourceLanguage: 'en',
      targetLanguage,
      domain: 'robotics',
      preserveFormat: true
    };
    
    return await this.translationAgent.process(request);
  }

  async getStartupAdvice(businessIdea: string, domain: string, resources: any) {
    const request = {
      userId: 'temp-user',
      businessIdea,
      technicalDomain: domain,
      resourcesAvailable: resources,
      marketConditions: {
        competitionLevel: 'medium' as 'low' | 'medium' | 'high',
        marketSize: 'large',
        growthRate: 15,
        regulatoryEnvironment: 'neutral' as 'favorable' | 'neutral' | 'challenging'
      },
      riskTolerance: 'medium' as 'low' | 'medium' | 'high',
      timeline: '1 year'
    };
    
    return await this.startupMentorAgent.process(request);
  }
}

// Default configuration
export const defaultAgentConfig: AgentOrchestratorConfig = {
  curriculumAgent: {
    model: "gpt-4",
    temperature: 0.7,
    maxTokens: 1000
  },
  tutorAgent: {
    model: "gpt-4",
    temperature: 0.5,
    maxTokens: 800
  },
  assessmentAgent: {
    model: "gpt-4",
    temperature: 0.3,
    maxTokens: 1200
  },
  translationAgent: {
    model: "gpt-4",
    temperature: 0.2,
    maxTokens: 1500
  },
  startupMentorAgent: {
    model: "gpt-4",
    temperature: 0.6,
    maxTokens: 1000
  }
};

// Singleton instance
let agentOrchestrator: AgentOrchestrator | null = null;

export const getAgentOrchestrator = (config: AgentOrchestratorConfig = defaultAgentConfig): AgentOrchestrator => {
  if (!agentOrchestrator) {
    agentOrchestrator = new AgentOrchestrator(config);
  }
  return agentOrchestrator;
};