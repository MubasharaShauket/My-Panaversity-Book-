// auth/better-auth.config.ts
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  database: {
    provider: "sqlite", // Using SQLite for simplicity in Docusaurus
    url: process.env.DATABASE_URL || "./db.sqlite",
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Disabled for simplicity in demo
    sendEmailVerificationOnSignUp: false,
  },
  user: {
    additionalFields: {
      // Fields for user profiling collected during onboarding
      educationLevel: {
        type: "string",
        required: false,
      },
      roboticsExperience: {
        type: "string", // "beginner", "intermediate", "advanced"
        required: false,
      },
      learningGoals: {
        type: "string", // storing as JSON string
        required: false,
      },
      preferredLearningStyle: {
        type: "string", // "visual", "auditory", "hands-on"
        required: false,
      },
      timeCommitment: {
        type: "string", // "casual", "dedicated", "intensive"
        required: false,
      },
      hardwareInterest: {
        type: "boolean", // true if interested in hardware aspects
        required: false,
      },
      softwareInterest: {
        type: "boolean", // true if interested in software aspects
        required: false,
      },
      urduProficiency: {
        type: "string", // "native", "fluent", "basic", "none"
        required: false,
      },
      onboardingCompleted: {
        type: "boolean",
        defaultValue: false,
      }
    }
  },
  account: {
    accountLinking: {
      enabled: true,
    }
  },
  advanced: {
    rateLimit: {
      window: 60000, // 1 minute
      max: 10, // 10 requests per minute
    }
  }
});