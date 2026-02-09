# API Contracts

## Overview

This document defines the API contracts for the Physical AI & Humanoid Robotics textbook platform. All APIs follow RESTful principles and return JSON responses.

## Authentication

All authenticated endpoints require a valid JWT token in the Authorization header:

```
Authorization: Bearer {token}
```

## Base URL

All API endpoints are prefixed with `/api/v1/`.

## Common Response Format

Successful responses follow this format:

```json
{
  "success": true,
  "data": { /* response data */ },
  "timestamp": "2023-10-01T12:00:00Z"
}
```

Error responses follow this format:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message",
    "details": { /* optional error details */ }
  },
  "timestamp": "2023-10-01T12:00:00Z"
}
```

## Endpoints

### Authentication

#### POST /auth/register
Register a new user

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user-uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "createdAt": "2023-10-01T12:00:00Z"
    },
    "token": "jwt-token"
  }
}
```

#### POST /auth/login
Authenticate a user

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user-uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe"
    },
    "token": "jwt-token"
  }
}
```

#### GET /auth/profile
Get authenticated user profile

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user-uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "educationLevel": "Undergraduate",
    "roboticsExperience": "Intermediate",
    "learningGoals": ["academic", "professional"],
    "preferredLearningStyle": "Visual",
    "timeCommitment": "Dedicated (3-5 hrs/week)",
    "hardwareInterest": true,
    "softwareInterest": true,
    "urduProficiency": "Basic Understanding",
    "onboardingCompleted": true
  }
}
```

#### PUT /auth/profile
Update user profile

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "educationLevel": "Graduate",
  "roboticsExperience": "Advanced",
  "learningGoals": ["academic", "research"],
  "preferredLearningStyle": "Hands-on"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "user-uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "educationLevel": "Graduate",
    "roboticsExperience": "Advanced",
    "learningGoals": ["academic", "research"],
    "preferredLearningStyle": "Hands-on"
  }
}
```

### Curriculum

#### POST /curriculum/generate
Generate a personalized learning path

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "currentKnowledge": "beginner",
  "learningGoals": ["academic", "professional"],
  "timeAvailability": "dedicated",
  "preferredLearningStyle": "visual"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "learningPath": [
      {
        "id": "module-1",
        "title": "Introduction to Physical AI",
        "description": "Fundamental concepts of Physical AI and its applications",
        "prerequisites": [],
        "estimatedTime": "2 hours",
        "difficulty": "beginner",
        "contentFocus": "theory"
      }
    ],
    "estimatedDuration": "4-6 weeks",
    "milestones": [
      {
        "id": "milestone-1",
        "title": "Complete Fundamentals",
        "description": "Finish introduction and basic robotics modules",
        "targetCompletion": "Week 2"
      }
    ]
  }
}
```

### Tutor

#### POST /tutor/ask
Ask a question to the tutor agent

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "question": "Explain the concept of forward kinematics",
  "context": "Chapter 2: Fundamentals of Robotics",
  "difficultyLevel": "intermediate",
  "preferredExplanation": "detailed"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "explanation": "Forward kinematics is the process of determining the position and orientation of the end-effector...",
    "relatedTopics": [
      "Inverse Kinematics",
      "Jacobian Matrix",
      "Denavit-Hartenberg Parameters"
    ],
    "examples": [
      {
        "title": "Simple 2-Link Manipulator",
        "description": "Example of forward kinematics for a 2-link planar manipulator",
        "code": "// JavaScript implementation of forward kinematics..."
      }
    ],
    "followUpQuestions": [
      "Can you explain the difference between forward and inverse kinematics?",
      "How would you apply this in practice?"
    ]
  }
}
```

### Assessment

#### POST /assessment/generate
Generate an assessment

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "topic": "Robot Kinematics",
  "difficultyLevel": "intermediate",
  "questionTypes": ["multiple-choice", "short-answer"],
  "numberOfQuestions": 5,
  "context": "Chapter 2: Fundamentals of Robotics"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "questions": [
      {
        "id": "q1",
        "type": "multiple-choice",
        "questionText": "What is forward kinematics?",
        "options": [
          "Determining joint angles from end-effector position",
          "Determining end-effector position from joint angles",
          "Calculating robot dynamics",
          "Planning robot motion"
        ],
        "correctAnswer": "Determining end-effector position from joint angles",
        "explanation": "Forward kinematics calculates the position and orientation of the end-effector given the joint angles.",
        "difficulty": "intermediate",
        "tags": ["kinematics", "forward-kinematics", "intermediate"]
      }
    ],
    "estimatedCompletionTime": "15 minutes",
    "learningObjectives": [
      "Understand fundamental concepts of robot kinematics",
      "Apply principles to practical scenarios"
    ]
  }
}
```

#### POST /assessment/submit
Submit assessment answers

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "assessmentId": "assessment-uuid",
  "answers": [
    {
      "questionId": "q1",
      "answer": "Determining end-effector position from joint angles",
      "timeTaken": 30
    }
  ],
  "timeTaken": 900
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "score": 1,
    "maxScore": 1,
    "percentage": 100,
    "feedback": "Excellent work! You have a strong understanding of the material.",
    "strengths": ["Conceptual understanding"],
    "areasForImprovement": [],
    "recommendedNextSteps": [
      "Move to next chapter",
      "Try advanced problems"
    ]
  }
}
```

### Translation

#### POST /translate
Translate content to Urdu

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "content": "Physical AI represents a revolutionary convergence of artificial intelligence and robotics...",
  "sourceLanguage": "en",
  "targetLanguage": "ur",
  "domain": "robotics",
  "preserveFormat": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "translatedContent": "فزیکل ای آئی مصنوعی ذہانت اور روبوٹس کے انقلابی اتحاد کی نمائندگی کرتا ہے...",
    "confidence": 0.95,
    "detectedLanguage": "en",
    "terminologyUsed": [
      {
        "sourceTerm": "Physical AI",
        "targetTerm": "فزیکل ای آئی",
        "definition": "A form of artificial intelligence that is embodied in physical systems",
        "context": "Robotics and AI integration"
      }
    ]
  }
}
```

### Personalization

#### POST /personalization/preferences
Save user preferences for content personalization

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "chapterId": "chapter-2-fundamentals-robotics",
  "preferences": {
    "difficultyLevel": "intermediate",
    "contentFocus": "balanced",
    "explanationDepth": "detailed",
    "examplePreference": "mixed"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Preferences saved successfully",
    "preferences": {
      "difficultyLevel": "intermediate",
      "contentFocus": "balanced",
      "explanationDepth": "detailed",
      "examplePreference": "mixed"
    }
  }
}
```

#### GET /personalization/recommendations
Get personalized content recommendations

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "recommendations": [
      {
        "id": "content-1",
        "title": "Recommended reading: Advanced Control Systems",
        "type": "chapter",
        "relevanceScore": 0.92,
        "reason": "Based on your interest in control systems"
      }
    ],
    "learningPath": [
      {
        "id": "module-3",
        "title": "Sensors and Actuators",
        "estimatedTime": "5 hours",
        "difficulty": "intermediate"
      }
    ]
  }
}
```

### Startup Mentor

#### POST /mentor/advice
Get startup advice based on textbook content

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "businessIdea": "Autonomous warehouse robots",
  "technicalDomain": "robotics",
  "resourcesAvailable": {
    "funding": 50000,
    "teamSize": 3,
    "technicalSkills": ["AI", "Robotics", "Software"],
    "industryConnections": false
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "businessStrategy": {
      "businessModel": "B2B SaaS with hardware component",
      "valueProposition": "Autonomous solutions for warehouse automation",
      "targetMarket": "E-commerce and logistics companies",
      "revenueStreams": ["Hardware sales", "Software licensing", "Maintenance"],
      "competitiveAdvantage": "Advanced navigation algorithms"
    },
    "marketAnalysis": {
      "opportunitySize": "$8B market growing at 20% annually",
      "keyTrends": [
        "Increased automation demand",
        "Supply chain optimization"
      ],
      "competitorAnalysis": [
        {
          "name": "Competitor A",
          "strengths": ["Established market presence"],
          "weaknesses": ["Limited AI capabilities"],
          "marketShare": "25%"
        }
      ],
      "customerSegments": [
        "Large e-commerce companies",
        "Third-party logistics providers"
      ]
    },
    "technicalRoadmap": {
      "phases": [
        {
          "name": "Phase 1: MVP Development",
          "duration": "6 months",
          "keyMilestones": ["Core navigation", "Basic manipulation", "Testing"]
        }
      ],
      "technologyStack": [
        "ROS for robotics",
        "Python for AI",
        "React for interface"
      ]
    },
    "riskAssessment": {
      "technicalRisks": [
        {
          "category": "Technology",
          "description": "Navigation in dynamic environments",
          "likelihood": "medium",
          "impact": "high",
          "mitigation": "Extensive simulation and testing"
        }
      ],
      "mitigationStrategies": [
        "Focus on specific use cases",
        "Partner with established players"
      ]
    },
    "recommendations": [
      {
        "category": "strategic",
        "description": "Validate with potential customers before full development",
        "priority": "high",
        "timeline": "Month 1-2"
      }
    ]
  }
}
```

## Error Codes

| Code | Description |
|------|-------------|
| AUTH_001 | Invalid credentials |
| AUTH_002 | User not found |
| AUTH_003 | Token expired |
| AUTH_004 | Insufficient permissions |
| CURRICULUM_001 | Unable to generate curriculum |
| TUTOR_001 | Unable to process question |
| ASSESSMENT_001 | Unable to generate assessment |
| ASSESSMENT_002 | Invalid assessment submission |
| TRANSLATION_001 | Translation failed |
| PERSONALIZATION_001 | Unable to save preferences |
| MENTOR_001 | Unable to generate advice |
| VALIDATION_001 | Invalid input parameters |
| SERVER_001 | Internal server error |

## Rate Limiting

All API endpoints are subject to rate limiting:
- Authenticated users: 1000 requests/hour
- Unauthenticated users: 100 requests/hour
- Assessment generation: 10 requests/hour per user
- Translation: 50 requests/hour per user

Rate limit information is returned in response headers:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1678886400
```