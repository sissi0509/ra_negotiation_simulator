import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import { getDb } from "@/lib/mongodb";

// Full config used in API routes (Node.js runtime — MongoDB allowed).
export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;
      const db = await getDb();
      const allowed = await db.collection("users").findOne({ email: user.email });
      return allowed !== null;
    },
    // No session callback needed — NextAuth v5 copies token.email to session.user.email by default.
  },
});
