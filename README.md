# Freq

Marketing site and Google sign-in for Freq, a hands-free AI radio for drone pilots. Call before takeoff. An AI radio tells you how high you can fly — and when to come down — so your eyes never leave the sky.

This repository is the website only. The voice line lives in a separate project. Freq is an advisory. It does not replace keeping your drone in visual line of sight or LAANC authorization.

Live site: [https://freq-ai.pages.dev](https://freq-ai.pages.dev)

## Scripts

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # output: dist
npm run preview
```

Build at the repository root. There is no app subfolder.

## Environment

Copy `.env.example` to `.env` for local sign-in. Leave the example file empty. Never commit real values. Do not put the Supabase service-role key in this repo.

| Name | Purpose |
| --- | --- |
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon (public) key |
| `VITE_FREQ_PHONE` | E.164 number for the Call Freq `tel:` button |

Vite inlines `VITE_*` at build time. These three are already set on the Cloudflare Pages project. Changing them means a new Pages build.

## Supabase Google sign-in

Production Supabase project: `https://qruplsewiuefxqimmwpg.supabase.co`. The Google provider is enabled.

1. In Google Cloud Console, create an OAuth client of type **Web application**.
2. Authorized redirect URI (Google → Supabase, not the website):

   `https://qruplsewiuefxqimmwpg.supabase.co/auth/v1/callback`

3. In Supabase: Authentication → Providers → Google. Paste the Google client ID and client secret.
4. Authentication → URL configuration:
   - **Site URL:** `https://freq-ai.pages.dev`
   - **Redirect URLs:** `https://freq-ai.pages.dev/**` and `http://localhost:5173/**`

The site calls:

```ts
supabase.auth.signInWithOAuth({
  provider: "google",
  options: { redirectTo: window.location.origin + "/dashboard" },
});
```

That `redirectTo` must match the allow list. `/dashboard` without a session sends the browser back to `/`. The session is read with `getSession()` and `onAuthStateChange`.

If the Google consent screen is in testing, add the pilot’s Google account as a test user. The consent screen privacy and terms links are:

- `https://freq-ai.pages.dev/privacy`
- `https://freq-ai.pages.dev/terms`

## Cloudflare Pages

Project: `freq-ai`. Production branch: `main`. Every push to `main` deploys to [https://freq-ai.pages.dev](https://freq-ai.pages.dev).

| Setting | Value |
| --- | --- |
| Root directory | `/` (repository root) |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node | 22 (`.node-version`) |

Environment variables, Production and Preview:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_FREQ_PHONE`

`public/_redirects` contains `/* /index.html 200` so `/dashboard`, `/privacy`, and `/terms` load the SPA.
