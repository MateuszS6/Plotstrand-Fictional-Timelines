# Plotstrand deployment and release runbook

Vercel builds and serves the Vite frontend. Supabase provides the database and authentication. For the first preview's decisions and verification records, see the [development history](development-history.md#release-preparation-and-first-hosting-setup--30-october).

## Build and environment

- In Vercel, use the repository root, the Vite preset, `npm run build`, and the `dist` output directory. Install from the committed npm lockfile. The reviewed local runtime is Node.js 24. Check the project's configured version if builds differ between local and hosted environments. The SPA rewrite in [vercel.json](../vercel.json) handles deep links. [Vercel Vite setup](https://vercel.com/docs/frameworks/frontend/vite)
- Use [the environment template](../.env.example) for local setup and set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` for each intended Vercel environment. Match the URL and key to the intended Supabase project. Use an anon or publishable key because Vite exposes these values in the browser. Keep local environment files out of Git and service-role keys, secret keys and database passwords out of frontend configuration. Redeploy after changing Vercel environment values. [Vercel environment variables](https://vercel.com/docs/environment-variables) · [Vite environment variables](https://vite.dev/guide/env-and-mode)
- A Preview pointed at the production Supabase project uses live data and permissions. Use read-only checks or an authorised, reversible edit on a private test timeline. Use a separate test database for destructive or incompatible schema changes.
- When maintaining email or redirect-based auth flows, set the Supabase Auth Site URL to the public production address and allow the intended local and preview redirects. Check the allowlist when domains or auth flows change. [Supabase redirect URLs](https://supabase.com/docs/guides/auth/redirect-urls)

## Release

1. Run `npm run lint` and `npm run build`. Review the diff and check the affected user flows. When changing the release version, keep the README, package and lockfile versions in sync.
2. If the release needs database changes, keep the SQL in version control and test it separately. Verify a restorable backup before significant changes. Plan the release so the current frontend and the rollback target can run against the updated schema. Apply compatible additions before deploying code that depends on them, and defer removal of old fields until compatibility is no longer needed. The [schema and function references](supabase/) document the database. Use a database backup or export for recovery.
3. Push the feature branch, review the Vercel Preview for that commit, and run the relevant smoke checks. Merge into the configured production branch, normally `main`, when ready. Confirm that the expected commit is serving at the production address and repeat the smoke checks there. [Vercel Git deployments](https://vercel.com/docs/git)

Studio content edits take effect on the next data load. Check the intended publication settings before sharing a public timeline.

## Hosted smoke checks

- Signed out, open a published timeline, inspect character or cell details, and use Back and Forward. Refresh a copied deep link. Confirm a private chronology is unavailable and the production address opens without Vercel-account authentication.
- As the owner, sign into Studio and verify the affected editing flow with approved test data. Check return-to-Viewer navigation and sign-out. If publication changed, verify both states from a signed-out window.
- On a phone, check timeline scrolling in both directions, tap targets, popups and the affected Studio controls. Verify loading and error feedback where the release changes it.

## Rollback

Use Vercel Instant Rollback to restore the previous production frontend when it is compatible with the current database. On Hobby, Instant Rollback targets the immediately preceding deployment. Verify the production address after rollback and follow Vercel's instructions to resume production promotion. [Vercel Instant Rollback](https://vercel.com/docs/instant-rollback)

If the failure involves Supabase schema or data, handle recovery separately using a compatible SQL fix or the database restore plan. Check the restored application against the database before resuming releases.
