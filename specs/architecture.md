# Architecture Documentation

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    TEXTBOOK PLATFORM                            │
├─────────────────────────────────────────────────────────────────┤
│  Frontend Layer          │ Backend Services        │ AI Layer   │
│  ┌─────────────────────┐  │ ┌─────────────────────┐ │ ┌─────────┐│
│  │ Docusaurus Frontend │  │ │ Node.js Server      │ │ │Qwen     ││
│  │ • React Components  │  │ │ • Authentication    │ │ │Agents   ││
│  │ • Responsive UI     │  │ │ • API Gateway       │ │ │         ││
│  │ • Dark/Light Mode   │  │ │ • Content Service   │ │ │         ││
│  │ • Interactive       │  │ │ • Personalization   │ │ │         ││
│  │   Elements          │  │ │ • Translation       │ │ │         ││
│  └─────────────────────┘  │ └─────────────────────┘ │ └─────────┘│
└─────────────────────────────────────────────────────────────────┘
                              │
                   ┌───────────────────────────────────────────────┐
                   │              Data Layer                       │
                   │ ┌─────────────────┐  ┌─────────────────────┐ │
                   │ │ Authentication  │  │ Content Database    │ │
                   │ │ • User Profiles │  │ • Textbook Content  │ │
                   │ │ • Sessions      │  │ • Exercises         │ │
                   │ │ • Permissions   │  │ • Assessments       │ │
                   │ └─────────────────┘  └─────────────────────┘ │
                   └───────────────────────────────────────────────┘
```

## Component Details

### Frontend Layer
- **Framework**: Docusaurus v3.x with React
- **UI Components**: Navigation, content renderer, personalization controls, language toggle
- **Features**: Search, TOC, bookmarking, responsive design

### Backend Services
- **Authentication**: Better-Auth integration
- **Content Service**: Dynamic content delivery
- **Personalization Engine**: Content adaptation algorithms
- **Translation Service**: Urdu translation pipeline

### AI Layer
- **CurriculumAgent**: Course structure maintenance
- **TutorAgent**: Multi-level content explanation
- **PersonalizationAgent**: Content customization
- **TranslationAgent**: Academic Urdu translation
- **AssessmentAgent**: Quiz/exercise generation
- **StartupMentorAgent**: Career guidance

### Data Layer
- **Authentication DB**: User profiles and sessions
- **Content DB**: Textbook content and exercises

## Deployment Architecture
- **Hosting**: GitHub Pages (frontend)
- **Backend**: Node.js server (separate deployment)
- **Database**: PostgreSQL/MongoDB
- **CDN**: GitHub CDN