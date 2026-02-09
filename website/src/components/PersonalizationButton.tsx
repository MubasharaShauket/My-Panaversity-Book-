// src/components/PersonalizationButton.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from 'better-auth/react';

interface PersonalizationOptions {
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  contentFocus: 'hardware' | 'software' | 'balanced';
  explanationDepth: 'concise' | 'detailed' | 'comprehensive';
  examplePreference: 'theoretical' | 'practical' | 'mixed';
}

const PersonalizationButton = ({ chapterId }: { chapterId: string }) => {
  const { session } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<PersonalizationOptions>({
    difficultyLevel: 'intermediate',
    contentFocus: 'balanced',
    explanationDepth: 'detailed',
    examplePreference: 'mixed'
  });
  const [savedPreferences, setSavedPreferences] = useState(false);

  // Load user preferences if available
  useEffect(() => {
    if (session?.user) {
      loadUserPreferences();
    }
  }, [session]);

  const loadUserPreferences = async () => {
    // In a real implementation, this would fetch from the backend
    // For now, we'll use localStorage as a placeholder
    const saved = localStorage.getItem(`preferences-${session.user.id}-${chapterId}`);
    if (saved) {
      setOptions(JSON.parse(saved));
    } else if (session?.user) {
      // Set defaults based on user profile
      setOptions({
        difficultyLevel: session.user.roboticsExperience?.toLowerCase() as any || 'intermediate',
        contentFocus: (session.user.hardwareInterest && !session.user.softwareInterest) ? 'hardware' :
                     (!session.user.hardwareInterest && session.user.softwareInterest) ? 'software' : 'balanced',
        explanationDepth: 'detailed',
        examplePreference: 'mixed'
      });
    }
  };

  const savePreferences = async () => {
    // Save to localStorage as a placeholder
    localStorage.setItem(`preferences-${session?.user.id}-${chapterId}`, JSON.stringify(options));
    
    // In a real implementation, this would call an API endpoint
    try {
      // await fetch('/api/personalization', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     userId: session.user.id,
      //     chapterId,
      //     preferences: options
      //   })
      // });
      
      setSavedPreferences(true);
      setTimeout(() => setSavedPreferences(false), 2000);
      
      // Trigger a page refresh or content update to reflect changes
      window.dispatchEvent(new CustomEvent('personalizationChanged', { detail: options }));
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  };

  const handleOptionChange = (option: keyof PersonalizationOptions, value: any) => {
    setOptions(prev => ({
      ...prev,
      [option]: value
    }));
  };

  const applyPersonalization = () => {
    savePreferences();
    setIsOpen(false);
  };

  return (
    <div className="personalization-container">
      <button 
        className="personalize-btn"
        onClick={() => setIsOpen(!isOpen)}
        title="Personalize this content for your learning style"
      >
        🎯 Personalize Content
      </button>
      
      {isOpen && (
        <div className="personalization-panel">
          <div className="panel-header">
            <h3>Personalize Learning Experience</h3>
            <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>
          </div>
          
          <div className="personalization-options">
            <div className="option-group">
              <label>Difficulty Level:</label>
              <div className="radio-group">
                {(['beginner', 'intermediate', 'advanced'] as const).map(level => (
                  <label key={level} className="radio-option">
                    <input
                      type="radio"
                      name="difficulty"
                      checked={options.difficultyLevel === level}
                      onChange={() => handleOptionChange('difficultyLevel', level)}
                    />
                    <span>{level.charAt(0).toUpperCase() + level.slice(1)}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="option-group">
              <label>Content Focus:</label>
              <div className="radio-group">
                {(['hardware', 'software', 'balanced'] as const).map(focus => (
                  <label key={focus} className="radio-option">
                    <input
                      type="radio"
                      name="focus"
                      checked={options.contentFocus === focus}
                      onChange={() => handleOptionChange('contentFocus', focus)}
                    />
                    <span>
                      {focus === 'hardware' && 'Hardware & Mechanics'}
                      {focus === 'software' && 'Software & AI'}
                      {focus === 'balanced' && 'Balanced Coverage'}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="option-group">
              <label>Explanation Depth:</label>
              <div className="radio-group">
                {(['concise', 'detailed', 'comprehensive'] as const).map(depth => (
                  <label key={depth} className="radio-option">
                    <input
                      type="radio"
                      name="depth"
                      checked={options.explanationDepth === depth}
                      onChange={() => handleOptionChange('explanationDepth', depth)}
                    />
                    <span>
                      {depth === 'concise' && 'Concise (Key Points)'}
                      {depth === 'detailed' && 'Detailed (Thorough)'}
                      {depth === 'comprehensive' && 'Comprehensive (In-depth)'}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="option-group">
              <label>Example Preference:</label>
              <div className="radio-group">
                {(['theoretical', 'practical', 'mixed'] as const).map(pref => (
                  <label key={pref} className="radio-option">
                    <input
                      type="radio"
                      name="examples"
                      checked={options.examplePreference === pref}
                      onChange={() => handleOptionChange('examplePreference', pref)}
                    />
                    <span>
                      {pref === 'theoretical' && 'Theoretical Concepts'}
                      {pref === 'practical' && 'Practical Applications'}
                      {pref === 'mixed' && 'Mixed Approach'}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          <div className="panel-actions">
            <button className="btn-secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </button>
            <button className="btn-primary" onClick={applyPersonalization}>
              Apply Personalization
            </button>
          </div>
          
          {savedPreferences && (
            <div className="success-message">
              Preferences saved successfully!
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PersonalizationButton;