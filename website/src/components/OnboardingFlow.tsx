// src/components/OnboardingFlow.tsx
import React, { useState } from 'react';
import { useAuth } from 'better-auth/react';

interface OnboardingData {
  educationLevel: string;
  roboticsExperience: string;
  learningGoals: string[];
  preferredLearningStyle: string;
  timeCommitment: string;
  hardwareInterest: boolean;
  softwareInterest: boolean;
  urduProficiency: string;
}

const OnboardingFlow = () => {
  const { getSession, updateUser } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>({
    educationLevel: '',
    roboticsExperience: '',
    learningGoals: [],
    preferredLearningStyle: '',
    timeCommitment: '',
    hardwareInterest: true,
    softwareInterest: true,
    urduProficiency: ''
  });

  const totalSteps = 5;

  const handleInputChange = (field: keyof OnboardingData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleLearningGoal = (goal: string) => {
    setFormData(prev => {
      const goals = [...prev.learningGoals];
      if (goals.includes(goal)) {
        return {
          ...prev,
          learningGoals: goals.filter(g => g !== goal)
        };
      } else {
        return {
          ...prev,
          learningGoals: [...goals, goal]
        };
      }
    });
  };

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const submitOnboarding = async () => {
    try {
      // Update user profile with onboarding data
      await updateUser({
        educationLevel: formData.educationLevel,
        roboticsExperience: formData.roboticsExperience,
        learningGoals: formData.learningGoals,
        preferredLearningStyle: formData.preferredLearningStyle,
        timeCommitment: formData.timeCommitment,
        hardwareInterest: formData.hardwareInterest,
        softwareInterest: formData.softwareInterest,
        urduProficiency: formData.urduProficiency,
        onboardingCompleted: true
      });

      // Redirect to dashboard or first chapter
      window.location.href = '/docs/intro';
    } catch (error) {
      console.error('Error submitting onboarding data:', error);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="onboarding-step">
            <h2>Educational Background</h2>
            <p>Tell us about your educational background to customize your learning experience.</p>
            
            <div className="option-grid">
              {['High School', 'Undergraduate', 'Graduate', 'Professional', 'Self-taught'].map(level => (
                <button
                  key={level}
                  className={`option-btn ${formData.educationLevel === level ? 'selected' : ''}`}
                  onClick={() => handleInputChange('educationLevel', level)}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="onboarding-step">
            <h2>Robotics Experience</h2>
            <p>How would you rate your current experience with robotics?</p>
            
            <div className="option-grid">
              {['Beginner', 'Intermediate', 'Advanced', 'Expert'].map(exp => (
                <button
                  key={exp}
                  className={`option-btn ${formData.roboticsExperience === exp ? 'selected' : ''}`}
                  onClick={() => handleInputChange('roboticsExperience', exp)}
                >
                  {exp}
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="onboarding-step">
            <h2>Learning Goals</h2>
            <p>Select your primary learning goals (choose all that apply).</p>
            
            <div className="checkbox-grid">
              {[
                { id: 'academic', label: 'Academic Credit' },
                { id: 'professional', label: 'Professional Development' },
                { id: 'hobby', label: 'Personal Interest' },
                { id: 'career-change', label: 'Career Change' },
                { id: 'research', label: 'Research Preparation' },
                { id: 'startup', label: 'Startup Preparation' }
              ].map(goal => (
                <label key={goal.id} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.learningGoals.includes(goal.id)}
                    onChange={() => toggleLearningGoal(goal.id)}
                  />
                  {goal.label}
                </label>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="onboarding-step">
            <h2>Learning Preferences</h2>
            <p>How do you prefer to learn?</p>
            
            <div className="preferences-section">
              <h3>Preferred Learning Style</h3>
              <div className="option-grid">
                {['Visual', 'Auditory', 'Reading/Writing', 'Kinesthetic'].map(style => (
                  <button
                    key={style}
                    className={`option-btn ${formData.preferredLearningStyle === style ? 'selected' : ''}`}
                    onClick={() => handleInputChange('preferredLearningStyle', style)}
                  >
                    {style}
                  </button>
                ))}
              </div>
              
              <h3>Time Commitment</h3>
              <div className="option-grid">
                {['Casual (1-2 hrs/week)', 'Dedicated (3-5 hrs/week)', 'Intensive (6+ hrs/week)'].map(commitment => (
                  <button
                    key={commitment}
                    className={`option-btn ${formData.timeCommitment === commitment ? 'selected' : ''}`}
                    onClick={() => handleInputChange('timeCommitment', commitment)}
                  >
                    {commitment}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="onboarding-step">
            <h2>Content Focus & Language</h2>
            <p>What aspects of robotics interest you most and what's your Urdu proficiency?</p>
            
            <div className="preferences-section">
              <h3>Content Focus</h3>
              <div className="toggle-group">
                <button
                  className={`toggle-btn ${formData.hardwareInterest ? 'active' : ''}`}
                  onClick={() => handleInputChange('hardwareInterest', !formData.hardwareInterest)}
                >
                  Hardware & Mechanics
                </button>
                <button
                  className={`toggle-btn ${formData.softwareInterest ? 'active' : ''}`}
                  onClick={() => handleInputChange('softwareInterest', !formData.softwareInterest)}
                >
                  Software & AI
                </button>
              </div>
              
              <h3>Urdu Proficiency</h3>
              <div className="option-grid">
                {['Native Speaker', 'Fluent', 'Basic Understanding', 'None'].map(level => (
                  <button
                    key={level}
                    className={`option-btn ${formData.urduProficiency === level ? 'selected' : ''}`}
                    onClick={() => handleInputChange('urduProficiency', level)}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="onboarding-container">
      <div className="onboarding-header">
        <h1>Welcome to Physical AI & Humanoid Robotics</h1>
        <p className="subtitle">Let's customize your learning experience</p>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${(step / totalSteps) * 100}%` }}
          ></div>
          <span className="progress-text">Step {step} of {totalSteps}</span>
        </div>
      </div>

      <div className="onboarding-content">
        {renderStep()}
      </div>

      <div className="navigation-buttons">
        {step > 1 && (
          <button className="btn-secondary" onClick={prevStep}>
            Previous
          </button>
        )}
        
        {step < totalSteps ? (
          <button 
            className="btn-primary" 
            onClick={nextStep}
            disabled={
              (step === 1 && !formData.educationLevel) ||
              (step === 2 && !formData.roboticsExperience) ||
              (step === 3 && formData.learningGoals.length === 0) ||
              (step === 4 && (!formData.preferredLearningStyle || !formData.timeCommitment)) ||
              (step === 5 && !formData.urduProficiency)
            }
          >
            Next
          </button>
        ) : (
          <button className="btn-primary" onClick={submitOnboarding}>
            Complete Setup
          </button>
        )}
      </div>
    </div>
  );
};

export default OnboardingFlow;