import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "@/auth.config";
import { getDb } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

// Full config used in API routes (Node.js runtime — MongoDB allowed).
export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    ...authConfig.providers,
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const db = await getDb();
        const user = await db.collection("users").findOne({ email: credentials.email });
        if (!user || !user.password_hash) return null;
        const valid = await bcrypt.compare(credentials.password as string, user.password_hash);
        if (!valid) return null;
        return { id: user._id.toString(), email: user.email, name: user.name || user.email };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email) return false;
      // Credentials provider already verified the user exists — skip allowlist check.
      if (account?.provider === "credentials") return true;
      const db = await getDb();
      const allowed = await db.collection("users").findOne({ email: user.email });
      return allowed !== null;
    },
    // No session callback needed — NextAuth v5 copies token.email to session.user.email by default.
  },
});
