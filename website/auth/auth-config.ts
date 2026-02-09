// Better-Auth configuration
import { BetterAuthOptions } from "better-auth";

export const authConfig: BetterAuthOptions = {
  database: {
    provider: "postgresql", // or "sqlite", "mongodb"
    url: process.env.DATABASE_URL!,
  },
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  advanced: {
    callbacks: {
      session: (session) => {
        // Add custom data to session
        return session;
      },
    },
  },
  plugins: [
    // Add plugins for additional functionality
  ],
};

export default authConfig;