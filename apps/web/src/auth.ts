import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

// No database adapter needed — we use JWT session strategy.
// The PrismaAdapter is only required for OAuth providers or database sessions.
// Mock users are handled in auth.config.ts; real DB users can be added later.
export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  ...authConfig,
});
