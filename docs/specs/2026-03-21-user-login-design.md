# User Login & History — Design Spec
_Date: 2026-03-21_

## Overview

Add Google OAuth authentication (via NextAuth.js) with an email allowlist, so recruited research participants can log in, and their negotiation sessions and debriefs are associated with their account. Users can view their session history, including negotiation transcripts, debrief conversations, and final assessment reports.

---

## Section 1: Auth Flow

**Login page** (`/login`) — a clean card matching the existing simulator design (Geist font, gray-900 primary, minimal palette) with a single "Sign in with Google" button. No registration form.

- If the user's Google email is on the allowlist → sign in succeeds, redirect to intended page (or `/` by default)
- If the user's Google email is NOT on the allowlist → stay on `/login` with error: "You don't have access yet. Contact the researcher."

**Allowlist management** — participants are added manually to the `users` MongoDB collection (or via a small admin script). No admin UI needed at this stage.

**Session handling** — NextAuth.js issues a JWT cookie on successful login. All pages except `/login` are protected. Unauthenticated users are redirected to `/login`.

**Sign out** — small "Sign out" link in the app header.

**Env vars to add to `.env.local`:**
```
NEXTAUTH_SECRET=<random string>
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=<from Google Cloud Console>
GOOGLE_CLIENT_SECRET=<from Google Cloud Console>
```

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

`user_id` = the user's Google email, taken from the NextAuth session at the time the session/debrief is created. Existing docs without `user_id` are left as-is and will not appear in any user's history.

---

## Section 3: History Page

### `/history` — Session cards list
- Fetches all transcripts where `user_id` = current user's email, sorted by date descending.
- Each card shows:
  - Scenario name + personality (e.g. "Salary Negotiation · Aggressive")
  - Date
  - Badge: "Debriefed" or "No debrief"
- "Start new negotiation" button at the top → navigates to `/`

### `/history/[run_id]` — Session detail
Two tabs:

**Negotiation tab**
- Full transcript replay in chat bubble style (same as the simulator ChatWindow)

**Debrief tab**
- Final assessment report shown first (default view) — the 4-section structured report
- "Show debrief conversation" accordion below it, collapsed by default
- If no debrief exists: "No debrief recorded for this session."

---

## Section 4: Navigation & Protected Routes

### Header additions
- "History" link (left side, alongside scenario info)
- User email + "Sign out" link (right side)

Same minimal header style as existing pages.

### Route protection
| Route | Access |
|---|---|
| `/login` | Public. Redirects to `/` if already signed in. |
| `/`, `/debrief`, `/history`, `/history/[run_id]` | Require login. Redirect to `/login` if not authenticated. |
| `/api/*` | Server-side session check. Return `401` if no valid session. |

### Login redirect flow
1. Unauthenticated user hits any protected page → redirect to `/login`
2. Signs in with Google → allowlist check in NextAuth `signIn` callback
3. If approved → redirect to original destination (or `/`)
4. If not on allowlist → error message on `/login`, no session created

---

## Out of Scope (this spec)

- Admin UI for managing the allowlist (manual MongoDB edits for now)
- Password reset or email/password fallback
- Framework introduction screen (separate item #2 from prof feedback)
- Participant ID anonymization (can be added at export time via script if needed for publication)
