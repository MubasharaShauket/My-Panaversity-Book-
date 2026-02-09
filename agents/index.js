// Main entry point for AI Agents
// Exports all agents for use in the textbook platform

import CurriculumAgent from './curriculum-agent/index.js';
import TutorAgent from './tutor-agent/index.js';
import PersonalizationAgent from './personalization-agent/index.js';
import TranslationAgent from './translation-agent/index.js';
import AssessmentAgent from './assessment-agent/index.js';
import StartupMentorAgent from './startup-mentor-agent/index.js';

export {
  CurriculumAgent,
  TutorAgent,
  PersonalizationAgent,
  TranslationAgent,
  AssessmentAgent,
  StartupMentorAgent
};

// Factory function to initialize all agents with API configuration
export function initializeAgents(apiConfig) {
  return {
    curriculumAgent: new CurriculumAgent(apiConfig.qwenApiKey),
    tutorAgent: new TutorAgent(apiConfig.qwenApiKey),
    personalizationAgent: new PersonalizationAgent(apiConfig.qwenApiKey),
    translationAgent: new TranslationAgent(apiConfig.qwenApiKey),
    assessmentAgent: new AssessmentAgent(apiConfig.qwenApiKey),
    startupMentorAgent: new StartupMentorAgent(apiConfig.qwenApiKey)
  };
}

// Default export for easy import
export default {
  CurriculumAgent,
  TutorAgent,
  PersonalizationAgent,
  TranslationAgent,
  AssessmentAgent,
  StartupMentorAgent,
  initializeAgents
};