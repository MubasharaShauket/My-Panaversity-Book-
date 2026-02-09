// TranslationAgent - Produces high-quality academic Urdu translations
// This agent translates technical content while preserving accuracy

import { QwenAPI } from 'qwen-api'; // Placeholder for Qwen integration

class TranslationAgent {
  constructor(apiKey) {
    this.qwenClient = new QwenAPI({ apiKey });
    this.termDictionary = this.loadTermDictionary();
  }

  /**
   * Loads the technical term dictionary for robotics concepts
   * @returns {Object} Term mapping dictionary
   */
  loadTermDictionary() {
    // In a real implementation, this would load from a database or file
    return {
      "physical ai": "فزکل ای آئی",
      "humanoid robot": "ہیومنوائڈ روبوٹ",
      "reinforcement learning": "رینفورسمنٹ لرننگ",
      "sensor": "سینسر",
      "actuator": "ایکچوایٹر",
      "embodiment": "ایمبوڈیمنٹ",
      "control system": "کنٹرول سسٹم",
      "feedback theory": "فیڈ بیک تھیوری",
      "sim-to-real transfer": "سیم ٹو ریل ٹرانسفر",
      "multimodal perception": "ملٹی موڈل پرچیپشن",
      "world model": "ورلڈ ماڈل",
      "cognitive robotics": "کاگنیٹو روبوٹکس",
      "ros2": "آر او ایس 2",
      "real-time control": "ریل ٹائم کنٹرول",
      "bipedal locomotion": "بائی پیڈل لوکوموشن",
      "dexterous manipulation": "ڈیکسٹیرس مینیپولیشن",
      "human-robot interaction": "ہیومن روبوٹ انٹرایکشن",
      "ethical robotics": "اثیکل روبوٹکس",
      "agentic robotics": "ایجنٹک روبوٹکس",
      "tool-using robots": "ٹول یوزنگ روبوٹس",
      "multi-agent coordination": "ملٹی ایجنٹ کوآرڈینیشن",
      "reasoning engine": "ریزننگ انجن"
    };
  }

  /**
   * Translates chapter content to Urdu while preserving technical accuracy
   * @param {string} sourceLanguage - Source language code (e.g., 'en')
   * @param {string} targetLanguage - Target language code (e.g., 'ur')
   * @param {string} content - Content to translate
   * @param {string} contentType - Type of content (text, code, equation, etc.)
   * @param {boolean} preserveTechnicalTerms - Whether to preserve technical terminology
   * @returns {Object} Translated content with quality metrics
   */
  async translateContent(sourceLanguage, targetLanguage, content, contentType, preserveTechnicalTerms = true) {
    // Apply term dictionary for technical terms
    let processedContent = content;
    if (preserveTechnicalTerms) {
      for (const [englishTerm, urduTerm] of Object.entries(this.termDictionary)) {
        // Replace terms while preserving context
        const regex = new RegExp(`\\b${englishTerm}\\b`, 'gi');
        processedContent = processedContent.replace(regex, urduTerm);
      }
    }

    const prompt = `
      Translate the following content from ${sourceLanguage} to ${targetLanguage} (Urdu):
      
      Content Type: ${contentType}
      Content to Translate: ${processedContent}
      
      Requirements:
      1. Maintain academic tone appropriate for university-level textbook
      2. Preserve technical accuracy of robotics and AI concepts
      3. Use appropriate Urdu terminology for technical concepts
      4. Maintain mathematical equations and code syntax
      5. Ensure cultural appropriateness for Urdu-speaking audience
      6. Preserve the meaning and nuance of the original content
      
      For technical terms that don't have direct Urdu equivalents, use transliteration
      in parentheses after the English term (e.g., "Sensor (سینسر)").
      
      Format your response as:
      {
        "translatedContent": "the translated content",
        "technicalTermsMap": {"original": "translation"},
        "qualityScore": "0-1 score indicating translation quality",
        "notes": "any important notes about the translation"
      }
    `;

    try {
      const response = await this.qwenClient.generate({
        prompt: prompt,
        maxTokens: 2000,
        temperature: 0.3
      });

      return JSON.parse(response);
    } catch (error) {
      console.error('Error translating content:', error);
      throw error;
    }
  }

  /**
   * Translates a complete chapter while maintaining structure
   * @param {Object} chapterData - Chapter content and metadata
   * @returns {Object} Translated chapter with preserved structure
   */
  async translateChapter(chapterData) {
    const { title, content, learningObjectives, diagrams, codeExamples } = chapterData;

    // Translate title
    const translatedTitle = await this.translateContent('en', 'ur', title, 'title');

    // Translate learning objectives
    const translatedObjectives = [];
    for (const objective of learningObjectives) {
      const translatedObj = await this.translateContent('en', 'ur', objective, 'text');
      translatedObjectives.push(translatedObj.translatedContent);
    }

    // Translate main content
    const translatedContent = await this.translateContent('en', 'ur', content, 'text');

    // Translate diagrams descriptions
    const translatedDiagrams = [];
    for (const diagram of diagrams) {
      if (diagram.description) {
        const translatedDesc = await this.translateContent('en', 'ur', diagram.description, 'text');
        translatedDiagrams.push({
          ...diagram,
          description: translatedDesc.translatedContent
        });
      } else {
        translatedDiagrams.push(diagram);
      }
    }

    // Translate code examples (comments only, preserve syntax)
    const translatedCodeExamples = [];
    for (const codeExample of codeExamples) {
      // Extract and translate comments while preserving code
      const commentRegex = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g;
      let translatedCode = codeExample.code;
      
      let match;
      while ((match = commentRegex.exec(codeExample.code)) !== null) {
        const comment = match[0];
        const translatedComment = await this.translateContent('en', 'ur', comment, 'comment');
        translatedCode = translatedCode.replace(comment, translatedComment.translatedContent);
      }
      
      translatedCodeExamples.push({
        ...codeExample,
        code: translatedCode
      });
    }

    return {
      title: translatedTitle.translatedContent,
      content: translatedContent.translatedContent,
      learningObjectives: translatedObjectives,
      diagrams: translatedDiagrams,
      codeExamples: translatedCodeExamples,
      originalLanguage: chapterData.originalLanguage,
      targetLanguage: 'ur',
      qualityMetrics: {
        contentQuality: translatedContent.qualityScore,
        titleQuality: translatedTitle.qualityScore
      }
    };
  }

  /**
   * Validates translation quality
   * @param {string} originalContent - Original content
   * @param {string} translatedContent - Translated content
   * @returns {Object} Quality assessment
   */
  async validateTranslation(originalContent, translatedContent) {
    const prompt = `
      Evaluate the quality of the following translation from English to Urdu:
      
      Original: ${originalContent}
      Translation: ${translatedContent}
      
      Assess on the following criteria:
      1. Accuracy: Does the translation accurately convey the original meaning?
      2. Fluency: Is the Urdu translation grammatically correct and fluent?
      3. Technical Precision: Are technical terms correctly translated or appropriately handled?
      4. Cultural Appropriateness: Is the content culturally appropriate for Urdu speakers?
      
      Provide a score from 0 to 1 and specific feedback.
      
      Format your response as:
      {
        "accuracyScore": "0-1",
        "fluencyScore": "0-1", 
        "technicalPrecisionScore": "0-1",
        "culturalAppropriatenessScore": "0-1",
        "overallScore": "0-1",
        "feedback": "specific feedback points",
        "suggestedImprovements": ["improvement1", "improvement2"]
      }
    `;

    try {
      const response = await this.qwenClient.generate({
        prompt: prompt,
        maxTokens: 800,
        temperature: 0.2
      });

      return JSON.parse(response);
    } catch (error) {
      console.error('Error validating translation:', error);
      throw error;
    }
  }
}

export default TranslationAgent;