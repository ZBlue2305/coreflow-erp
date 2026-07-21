import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authConfig = {
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },
    jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || "AGENT";
        token.email = user.email;
        token.name = user.name;
      }
      if (trigger === "update" && session?.role) {
        token.role = session.role;
      }
      return token;
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const emailStr = credentials.email as string;
        const passwordStr = credentials.password as string;

        // Development mock user bypass
        const mockUsers: Record<string, { id: string; name: string; email: string; role: string }> = {
          "manager@erp.com": { id: "mock-mgr", name: "Ahmed Manager", email: "manager@erp.com", role: "MANAGER" },
          "hr@erp.com": { id: "mock-hr", name: "Fatima HR", email: "hr@erp.com", role: "HR" },
          "sales@erp.com": { id: "mock-sales", name: "Zaid Sales", email: "sales@erp.com", role: "SALES" },
          "it@erp.com": { id: "mock-it", name: "Khalid IT", email: "it@erp.com", role: "IT" },
          "agent@erp.com": { id: "mock-agent", name: "Yasmin Agent", email: "agent@erp.com", role: "AGENT" },
        };

        if (mockUsers[emailStr.toLowerCase()] && passwordStr === "password") {
          return mockUsers[emailStr.toLowerCase()];
        }

        // Only attempt DB lookup if a real Neon URL is configured.
        // If still using the placeholder URL, skip the DB entirely to avoid
        // connection timeouts that cause the app to hang for 30-60 seconds.
        const dbUrl = process.env.DATABASE_URL || "";
        const isRealDb = dbUrl.length > 0 && !dbUrl.includes("ep-cool-breeze-123456");

        if (!isRealDb) {
          return null; // No real DB — only mock accounts work right now
        }

        try {
          const { prisma } = await import("./lib/prisma");
          const user = await prisma.user.findUnique({
            where: { email: emailStr },
          });

          if (!user || !user.password) return null;

          const bcrypt = await import("bcryptjs");
          const passwordsMatch = await bcrypt.compare(passwordStr, user.password);

          if (passwordsMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
          }
        } catch (error) {
          console.error("Database authorize lookup error:", error);
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
