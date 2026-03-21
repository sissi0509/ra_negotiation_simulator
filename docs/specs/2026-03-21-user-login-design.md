# User Login & History — Design Spec
_Date: 2026-03-21_

## Overview

Add Google OAuth authentication (via NextAuth.js v5 / Auth.js) with an email allowlist, so recruited research participants can log in, and their negotiation sessions and debriefs are associated with their account. Users can view their session history, including negotiation transcripts, debrief conversations, and final assessment reports.

---

## Section 1: Auth Flow

**NextAuth version:** Use `next-auth@beta` (v5 / Auth.js). This is the correct pairing for Next.js 15+/16 and React 19. v4 has known compatibility issues with the App Router and React 19 concurrent features. Key API differences from v4: config lives in `auth.ts` at the project root (not a `[...nextauth]` route file); session is accessed via `auth()` (not `getServerSession()`); no `NEXTAUTH_URL` env var needed.

**Login page** (`/login`) — a clean card matching the existing simulator design (Geist font, gray-900 primary, minimal palette) with a single "Sign in with Google" button. No registration form.

- If the user's Google email is on the allowlist → sign in succeeds; NextAuth v5 automatically redirects to the original destination via the built-in `callbackUrl` parameter (no custom implementation needed)
- If the user's Google email is NOT on the allowlist → stay on `/login` with error: "You don't have access yet. Contact the researcher."

**Allowlist check** — implemented inside the NextAuth `signIn` callback in `auth.ts`. The callback queries the `users` MongoDB collection for the user's email. If not found, return `false` to reject the sign-in.

**Allowlist management** — participants are added manually to the `users` MongoDB collection (or via a small admin script). The `users` collection must have a **unique index on `email`** — see Section 7 for setup.

**Session handling** — NextAuth v5 issues a JWT cookie on successful login. All routes except `/login` and `/api/auth/*` are protected via `middleware.ts` at the project root.

**Sign out** — small "Sign out" link in the app header using NextAuth's `signOut()`. On sign-out, namespaced localStorage keys for that user remain in the browser; they are restored on next login (resume semantics — intentional).

**Env vars to add to `.env.local`:**
```
AUTH_SECRET=<random string>
GOOGLE_CLIENT_ID=<from Google Cloud Console>
GOOGLE_CLIENT_SECRET=<from Google Cloud Console>
```
Note: `NEXTAUTH_URL` and `NEXTAUTH_SECRET` are v4 conventions and are NOT used in v5.

---

## Section 2: Data Model

### `users` collection (new)
One doc per allowed participant. Added manually before the participant accesses the app.

```json
{
  "email": "participant@gmail.com",
  "group": "debrief",
  "created_at": "2026-03-21T00:00:00.000Z"
}
```

- `group` is optional now; supports future experiment design (e.g. debrief vs. control).
- **Unique index on `email`** — see Section 7.

### `transcripts` collection (add field)
```json
{
  "run_id": "uuid-...",
  "user_id": "participant@gmail.com",
  "scenario_id": "salary_negotiation",
  "messages": []
}
```

### `debriefs` collection (add field)
```json
{
  "debrief_id": "uuid-...",
  "run_id": "uuid-...",
  "user_id": "participant@gmail.com",
  "messages": [],
  "assessment": {}
}
```

**`user_id` injection — server-side only.** The client never sends `user_id`. The `Transcript` TypeScript interface in `lib/transcript.ts` is NOT modified — `user_id` is injected directly into the MongoDB document by the API route before the `replaceOne`/`updateOne` call. This preserves the clean client-side interface and prevents any risk of client spoofing.

Routes that must inject `user_id` from the NextAuth session via `auth()`:

- `POST /api/transcripts` — `saveTranscript()` in `lib/transcriptStore.ts` currently calls `replaceOne` with the `Transcript` object directly. Since `Transcript` has no `user_id` field, passing it as-is would erase any injected value. Update `saveTranscript()` to accept an optional `userId?: string` second parameter and write `{ ...transcript, user_id: userId }` as the replacement document when provided.

- `POST /api/debrief/plan` — add `user_id` to the `$set` block in the initial `debriefs` upsert (lines 74–88 of `app/api/debrief/plan/route.ts`), alongside `debrief_id`, `run_id`, etc.

- `POST /api/debrief/save` — add `user_id` to the `$set` block in the final debrief write (read `user_id` from session via `auth()` and include it explicitly in the `$set` object).

Existing docs without `user_id` are left as-is and will not appear in any user's history.

---

## Section 3: Route Protection

### `middleware.ts` (new, at project root)
A single `middleware.ts` handles protection for all routes using NextAuth v5's `auth()`:
- **Page routes** (`/`, `/debrief`, `/history`, `/history/[run_id]`): redirect to `/login` if not authenticated.
- **API routes** (`/api/*`): return `401` if no valid session.
- **Excluded from protection:** `/login` (public) and `/api/auth/*` (NextAuth's own OAuth callback routes — excluding these prevents an infinite redirect loop during the OAuth flow).

Matcher pattern for the middleware:
```ts
export const config = {
  matcher: ["/((?!login|api/auth|_next/static|_next/image|favicon.ico).*)"],
};
```

### Per-route ownership verification
`GET /api/history/[run_id]` fetches the transcript and associated debrief only if `transcript.user_id === session.user.email`. Returns `403` if the requesting user does not own the record. This prevents IDOR (a user guessing another participant's `run_id`).

### Existing route updates
- `GET /api/transcripts` — currently calls `getAllTranscripts()` which returns all documents. Update `getAllTranscripts()` in `lib/transcriptStore.ts` to accept an optional `userId` parameter and filter the query when provided. The route handler passes `session.user.email` as the filter.

---

## Section 4: localStorage Namespacing

The simulator and debrief pages use these localStorage keys (defined in `app/page.tsx` and `app/debrief/page.tsx`):
- `negotiation_session_id` — `SESSION_KEY` in `app/page.tsx`
- `debrief_pending` — `DEBRIEF_PENDING_KEY` in `app/debrief/page.tsx`
- `debrief_session_id` — `DEBRIEF_SESSION_KEY` in `app/debrief/page.tsx`
- `debrief_state` — `DEBRIEF_STATE_KEY` in `app/debrief/page.tsx`

On shared devices, a second participant would inherit the first participant's in-progress session without namespacing.

Fix: namespace all four keys by user email, e.g. `negotiation_session_id:participant@gmail.com`. The email is available client-side via NextAuth's `useSession()` hook.

**Important:** `app/debrief/page.tsx` line 415 contains a hardcoded `localStorage.removeItem("negotiation_session_id")` string that bypasses the constant. This line must be updated to use the namespaced key, otherwise the cleanup call will silently fail to clear the correct key after namespacing is added.

**Also note:** `DEBRIEF_STATE_KEY` at line 16 of `app/debrief/page.tsx` is declared with `const` (not `export const`) — it is module-private, unlike the other three keys. The namespacing change for this key must be made in-place within `app/debrief/page.tsx`; it cannot be imported from elsewhere. If a shared `lib/storageKeys.ts` module is created to centralize all key names, `DEBRIEF_STATE_KEY` must be exported from there and the existing declaration in `app/debrief/page.tsx` replaced with an import.

**Session resolution gate:** localStorage key reads must be gated on session resolution (i.e., after `useSession()` returns the email). The existing `isInitializing` guard already handles this for the simulator page; the debrief page's equivalent init guard must similarly ensure no key reads happen before the email is available.

---

## Section 5: History Page

### `/history` — Session cards list
- API: `GET /api/history` (new route) — returns all transcripts for the current user (filtered by `user_id` from session), sorted by `started_at` descending. For each transcript, also checks whether a debrief exists in the `debriefs` collection by `run_id`, and includes `has_debrief: boolean` in the response. Join is done in application code server-side.
- Empty state: if no sessions exist yet, show a message: "No sessions yet. Start your first negotiation." with a link to `/`.
- Loading state: skeleton cards while the fetch resolves.
- Each card shows:
  - Scenario name + personality (e.g. "Salary Negotiation · Aggressive")
  - Date
  - Badge: "Debriefed" or "No debrief"
- "Start new negotiation" button → navigates to `/`

### `/history/[run_id]` — Session detail
- API: `GET /api/history/[run_id]` (new route) — returns transcript + debrief for the given `run_id`, only if `transcript.user_id === session.user.email`. Returns `403` otherwise.
- Two tabs:

**Negotiation tab**
- Full transcript replay in chat bubble style (same as the simulator ChatWindow)

**Debrief tab**
- Final assessment report shown first (default view) — the 4-section structured report
- "Show debrief conversation" accordion below it, collapsed by default
- If no debrief exists: "No debrief recorded for this session."

---

## Section 6: Navigation

### Header additions
- "History" link (left/center area)
- User display name + "Sign out" link (right side)

Same minimal header style as existing pages.

---

## Section 7: Setup Checklist

Before the first participant logs in:
1. Create Google OAuth credentials in Google Cloud Console → add `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` to `.env.local`
2. Generate `AUTH_SECRET` (e.g. `openssl rand -base64 32`) → add to `.env.local`
3. Run the index setup script (or apply manually in MongoDB shell):
   ```js
   db.users.createIndex({ email: 1 }, { unique: true })
   ```
4. Add each participant's email to the `users` collection before they attempt to log in.

---

## Out of Scope (this spec)

- Admin UI for managing the allowlist (manual MongoDB edits for now)
- Password reset or email/password fallback
- Framework introduction screen (separate item #2 from prof feedback)
- Participant ID anonymization (can be added at export time via script if needed for publication)
