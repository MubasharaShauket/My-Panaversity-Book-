// Example agent configuration
export interface AgentConfig {
  name: string;
  description: string;
  enabled: boolean;
  config: Record<string, any>;
}

// Configuration for all AI agents
export const agentConfigs: Record<string, AgentConfig> = {
  curriculumAgent: {
    name: "Curriculum Agent",
    description: "Designs and adapts curriculum based on user needs",
    enabled: true,
    config: {
      model: "gpt-4",
      temperature: 0.7,
      maxTokens: 1000
    }
  },
  tutorAgent: {
    name: "Tutor Agent",
    description: "Provides personalized tutoring and explanations",
    enabled: true,
    config: {
      model: "gpt-4",
      temperature: 0.5,
      maxTokens: 500
    }
  },
  assessmentAgent: {
    name: "Assessment Agent",
    description: "Evaluates user understanding through quizzes and exercises",
    enabled: true,
    config: {
      model: "gpt-4",
      temperature: 0.3,
      maxTokens: 800
    }
  },
  personalizationAgent: {
    name: "Personalization Agent",
    description: "Customizes learning experience based on user preferences",
    enabled: true,
    config: {
      model: "gpt-4",
      temperature: 0.4,
      maxTokens: 600
    }
  },
  translationAgent: {
    name: "Translation Agent",
    description: "Provides real-time translation with focus on Urdu localization",
    enabled: true,
    config: {
      model: "gpt-4",
      temperature: 0.2,
      maxTokens: 1000
    }
  },
  startupMentorAgent: {
    name: "Startup Mentor Agent",
    description: "Provides entrepreneurship guidance for robotics startups",
    enabled: true,
    config: {
      model: "gpt-4",
      temperature: 0.6,
      maxTokens: 900
    }
  }
};