# Physical AI & Humanoid Robotics Textbook

Welcome to the Physical AI & Humanoid Robotics educational platform - an interactive learning environment designed to teach the fundamentals and advanced concepts of physical artificial intelligence and humanoid robotics.

## 🚀 Live Deployments

- **GitHub Pages**: https://mubasharashauket.github.io/My-Panaversity-Book-/
- **Vercel**: Coming Soon (requires Vercel project setup)

## Overview

This platform provides a comprehensive educational experience on Physical AI and Humanoid Robotics with:

- **Interactive Textbook**: Six comprehensive chapters covering everything from fundamentals to advanced topics
- **AI-Powered Learning**: Five specialized AI agents enhancing the learning experience
- **Personalization**: Adaptive content based on user preferences and skill level
- **Multilingual Support**: Full Urdu translation capabilities
- **Assessment Tools**: Automated quizzes and evaluations
- **Startup Mentorship**: Business guidance connecting robotics to entrepreneurship

## Chapters

1. **Introduction to Physical AI and Humanoid Robotics** - Foundation concepts and historical context
2. **Fundamentals of Robotics** - Core principles of robotic systems
3. **AI Foundations for Robotics** - Machine learning and AI techniques for robotics
4. **Sensors, Actuators, and Embodiment** - Physical components and embodied cognition
5. **Control Systems and Feedback Theory** - Control theory applied to robotics
6. **Advanced Topics in Humanoid Robotics** - Cutting-edge research and applications

## Features

- Authentication system with user onboarding
- Personalization engine for adaptive learning
- Urdu translation capabilities
- Five integrated AI agents
- Interactive textbook content
- GitHub Pages deployment ready

## Local Development

To run this project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/MubasharaShauket/My-Panaversity-Book-.git
   cd My-Panaversity-Book-
   ```

2. Navigate to the website directory:
   ```bash
   cd website
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

The site will be available at `http://localhost:3000`

## Environment Variables

Create a `.env` file in the `website` directory with the following variables:

```env
# Better Auth Configuration
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your-secret-key-here
DATABASE_URL=postgresql://username:password@localhost:5432/physical_ai_db

# OAuth Providers (for Better Auth)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# AI/LLM API Keys
OPENAI_API_KEY=your-openai-api-key
ANTHROPIC_API_KEY=your-anthropic-api-key

# Translation Service
TRANSLATION_API_KEY=your-translation-api-key
```

## Development Status

This project is complete and ready for deployment. All components have been implemented and tested.

## License

This project is licensed under the MIT License.
