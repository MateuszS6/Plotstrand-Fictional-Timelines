# Plotstrand agent guide

Plotstrand is a React and TypeScript app built with Vite. Supabase stores timeline data and handles sign-in. The Viewer serves published timelines and the owner uses Studio to edit them.

## Choose how to collaborate

- Implement agreed work directly by default. For substantial changes, inspect the relevant code and explain the approach and affected areas. Surface a focused learning opportunity where useful and continue with the agreed work.
- Ask the maintainer when a consequential product, UX, architecture or data decision remains open. Ask in chat so they can answer in a later message, or select from an option if that's suitable. Proceed with agreed or independent work.
- **Guided learning mode.** Activate this mode when the maintainer explicitly says they want to implement or work through a particular part themselves. Leave that part for them until they ask you to edit it. Break it into small steps, explain the reasoning and where each change belongs, then offer hints or short snippets as needed. Review their implementation and give progressively more help if they get stuck.

## Implement, verify and explain

- Keep the diff focused, follow existing conventions and preserve unrelated work. Prefer direct edits within the delegated scope to large code dumps in chat.
- Prefer clear code. Use comments for non-obvious intent, domain rules, assumptions, workarounds or constraints. Omit comments that narrate obvious code.
- Use `npm run lint` and `npm run build` for application changes. Check the affected user flow and relevant failure paths when behaviour changes. Report what passed and anything material that remains unverified.
- After meaningful direct implementation, explain what changed and why. Trace the relevant data or control flow, call out unfamiliar APIs or patterns and significant trade-offs or alternatives considered, and point to the few changed areas the maintainer should read first. Scale the walkthrough to the complexity of the change.

## Find the relevant context

- Treat committed repository state as the durable handover across chats and devices. Assume prior chat context is unavailable. Inspect relevant current source and docs, and use Git status, diffs and history where useful. Record only durable unfinished decisions or state in the appropriate project docs. Skip routine handover files.

- Start with the task's entry point and follow its callers and dependencies. `src/main.tsx` and `src/AppRoutes.tsx` are the frontend entry points. UI lives in `src/pages` and `src/components`, shared state in `src/context`, and data access in `src/services`. Use targeted searches and skip generated output and unrelated history.
- Read the current priorities and backlog in [the development plan](docs/development-plan.md) first. Open only relevant dated sections of [development history](docs/development-history.md). Use [DESIGN.md](DESIGN.md) for relevant UX decisions and [the release runbook](docs/preview-deployment.md) for hosting work. Historical workflow notes describe past practice. Follow this guide for current work.
- Supabase is the source of truth. [Database references](docs/supabase/) are snapshots. Verify relevant live facts when needed, and distinguish preparing SQL in the repo from applying it to the live database. Get explicit authorization for live writes.
- Update the development plan when project status or priorities materially change. Update the [README](README.md) for user-facing or project-level changes. Keep durable workflow rules here and feature details in their relevant docs.
