// src/components/UrduTranslationButton.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from 'better-auth/react';

const UrduTranslationButton = ({ contentId }: { contentId: string }) => {
  const { session } = useAuth();
  const [isTranslating, setIsTranslating] = useState(false);
  const [isTranslated, setIsTranslated] = useState(false);
  const [translationCache, setTranslationCache] = useState<Record<string, string>>({});

  // Check if user prefers Urdu based on profile
  const userPrefersUrdu = session?.user?.urduProficiency && 
                         ['Native Speaker', 'Fluent', 'Basic Understanding'].includes(session.user.urduProficiency);

  // Auto-translate if user prefers Urdu
  useEffect(() => {
    if (userPrefersUrdu && !isTranslated) {
      handleTranslate();
    }
  }, [userPrefersUrdu]);

  const handleTranslate = async () => {
    setIsTranslating(true);
    
    // Check if translation is already cached
    if (translationCache[contentId]) {
      applyTranslation(translationCache[contentId]);
      setIsTranslating(false);
      setIsTranslated(true);
      return;
    }

    try {
      // In a real implementation, this would call the TranslationAgent API
      // For now, we'll simulate the translation process
      const originalContent = document.getElementById(contentId)?.innerHTML || '';
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // This is a placeholder - in reality, this would call the TranslationAgent
      const translatedContent = await simulateTranslation(originalContent);
      
      // Cache the translation
      setTranslationCache(prev => ({
        ...prev,
        [contentId]: translatedContent
      }));
      
      applyTranslation(translatedContent);
      setIsTranslated(true);
    } catch (error) {
      console.error('Translation failed:', error);
      alert('Translation failed. Please try again.');
    } finally {
      setIsTranslating(false);
    }
  };

  const simulateTranslation = async (content: string): Promise<string> => {
    // This is a simulation - in a real app, this would call the TranslationAgent API
    // For now, we'll return the same content but mark it as translated
    // In a real implementation, this would call an actual translation service
    
    // Preserve code blocks, equations, and diagrams by wrapping them in special markers
    let processedContent = content.replace(/(<pre>[\s\S]*?<\/pre>|<code>[\s\S]*?<\/code>|\$.*?\$|<img[^>]*>)/g, 
      '<!--PRESERVE_START-->$1<!--PRESERVE_END-->'
    );
    
    // Simulate translation of text content (in a real app, this would be actual translation)
    // For this example, we'll just return the original content with a note
    processedContent = processedContent.replace(/<!--PRESERVE_START-->/g, '')
                                      .replace(/<!--PRESERVE_END-->/g, '');
    
    // In a real implementation, this would call the TranslationAgent
    return `
      <div class="urdu-translation-notice">
        <p><strong>یہ مواد اردو میں ترجمہ شدہ ہے</strong> - This content has been translated to Urdu</p>
      </div>
      <div class="original-content">${processedContent}</div>
      <div class="translation-note">
        <small>Note: Code blocks, equations, and diagrams remain in English as they are technical elements.</small>
      </div>
    `;
  };

  const applyTranslation = (translatedHtml: string) => {
    const contentElement = document.getElementById(contentId);
    if (contentElement) {
      contentElement.innerHTML = translatedHtml;
      contentElement.setAttribute('lang', 'ur');
      contentElement.classList.add('urdu-content');
    }
  };

  const handleToggleOriginal = () => {
    const contentElement = document.getElementById(contentId);
    if (contentElement) {
      // Reload the original content
      // In a real implementation, this would restore from a stored original version
      window.location.reload();
    }
  };

  return (
    <div className="urdu-translation-container">
      {!isTranslated ? (
        <button 
          className={`translate-btn ${isTranslating ? 'loading' : ''}`}
          onClick={handleTranslate}
          disabled={isTranslating}
          title="Read this content in Urdu"
        >
          {isTranslating ? 'ترجمہ کر رہا ہے...' : 'اردو میں پڑھیں'}
        </button>
      ) : (
        <button 
          className="original-btn"
          onClick={handleToggleOriginal}
          title="Switch back to original language"
        >
          اصل زبان میں دیکھیں
        </button>
      )}
      
      {isTranslating && (
        <div className="translation-loading">
          <div className="spinner"></div>
          <span>Content is being translated...</span>
        </div>
      )}
    </div>
  );
};

export default UrduTranslationButton;