import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

// Lightweight config used by middleware (Edge Runtime — no MongoDB allowed).
export const authConfig: NextAuthConfig = {
  providers: [Google],
  pages: {
    signIn: "/login",
    error: "/login",
  },
};
