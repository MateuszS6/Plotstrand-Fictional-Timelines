# Plotstrand development plan

Updated 6 November 2026. Package metadata and README identify v0.6.0. Studio search, the clarity pass, touch editing and Universe/Location kinds are implemented and locally reviewed. The live universe_type column/default/check is verified. The latest hosted deployment has not been independently checked. A small shared close-button and button-styles cleanup is prepared in chat for user application.

## Active backlog — consolidated 6 November 2026

This section is the current work list. Dated sections below retain historical decisions and reviews; older references to the next pass or package version describe their dates, not the current state. Future items are not all commitments for the next pass.

- **Implemented and reviewed: Studio search.** Search characters by alias, full name and origin name/code within the current view; the existing Include other characters in this franchise checkbox expands that view. Search linked projects by title. Preserve real project order numbers and use the full list for placement when creating/editing. Include result counts, an empty-results message, clear control and narrow-screen layout. Filter loaded records locally; no new database field, service or search dependency. Searching the unlinked-project library picker is a separate follow-up.
- **Implemented and reviewed: mobile appearance editor.** Touch/pen taps open Studio editing without writes; swipes scroll; keyboard Enter/Space opens the menu. Mouse quick add/remove and right-click remain. Explicit add/remove controls, pointer outside dismissal and compact mobile chrome are applied. Browser-emulated touch passes; physical-phone feedback remains useful.
- **More recognisable appearance icons — requested 6 November.** Improve first-time comprehension at actual timeline size; footage could use a small television with two aerials rather than a plain box. Explore recognisable silhouettes without overloading tiny markers. Use the same symbols in cells and the guide, preserve appearance/event meanings and detached styling, and check contrast, touch-size display and zoom. Do not rely on added detail alone; labels/details/guide remain available.
- **Close controls and button consistency — prepared 6 November.** Add a shared SVG X and a small CloseButton for cell details, cell editor, guide and character panel, preserving accessible names, keyboard focus/ref and touch targets. Collect existing shared utility-button/icon styles into buttons.css; keep native buttons and semantic action text for Save/Delete/Cancel. No general button framework is needed. Application code remains user-applied.
- **Project ordering.** Drag-and-drop remains requested, with touch/keyboard alternatives and clear save/error behaviour when implemented. Keep the current Before [title]/At the end placement option. Direct placement while linking an existing project is still a follow-up; that action currently appends. Retain numeric timeline_position and atomic ordering rather than introducing a linked list.
- **Project exploration.** Consider clicking a timeline project heading to open useful read-only project details, analogous to character details. Start from available title, release date and primary origin, optionally timeline-local participation. Only add the panel if it improves exploration; do not introduce a largely empty metadata system merely for symmetry.
- **Project media types — requested 2 November.** Visually distinguish film/show/video/etc. Store one media-type field on the shared project record (provisional name media_type), editable in Studio and shown as a Type column in project management. Give timeline project headings a small consistent type label/icon; avoid relying on colour alone. Agree the exact choices, including whether shows represent series/seasons/episodes and how to handle existing uncategorised projects, before supplying the database/application pass. Do not infer a type from the title or automatically label all existing projects as films. This is backlog work, not implemented by the search review.
- **Sorting, grouping and views.** Character-row sorting/grouping/filtering and possible view presets remain requested for large timelines. Studio search is now implemented; Viewer search/filter controls can follow. Agree grouping rules and scope before adding storage. Project release-order browsing is a distinct decision because changing columns also changes chronology/continuity interpretation.
- **Implemented and reviewed: Universe / Location kinds.** Required universe_type defaults to universe and accepts universe/location. Named locations retain their own chronology and optional code, using the existing universe record and permissions. Location cards have a quiet subtitle and lavender edge; code formatting does not add Earth- to locations. Only private cards display an accessible lock in Studio. Origin remains distinct from residence.
- **Watcher origin and residence.** Record the user's distinction: Fifth Dimension as origin, Observational Plane as residence/setting, with visits/interference recorded on the affected timelines. The origin label should remain appropriate across those timelines. This is the user's intended model, not a newly verified canon claim. A named record with no code already supplies an origin label; later richer location metadata must not silently substitute residence for origin.
- **Status and continuity.** Character name-side deceased/unknown indicators, optional ongoing connectors and fictional universe active/destroyed/unknown status still need agreed chronological and cross-universe rules. Footage, visions, afterlife and missing appearances must not imply survival/death. Keep these separate from manual In progress/Up to date coverage and Public/Private access. Coverage cutoff/date clarification may be revisited if needed.
- **Timeline orientation and multiverse overview.** Toggleable faint row/column tracking guides remain planned, including pointer/keyboard/touch behaviour. A connected universe-card overview is requested; first define whether edges mean branch origins, travel or another deliberate story relationship. Shared projects/database links alone do not establish such relationships. Combined character journeys and entry/departure markers remain optional later work.
- **Viewer contributions.** Let viewers propose timeline corrections for owner approval/rejection. Pending proposals must not directly edit published data. Agree identity/friction, supporting context, abuse handling, stale/conflicting changes and review history before implementation.
- **Metadata, presentation and quality.** Richer character/project metadata, then people/cast/crew/credits; distinctive franchise themes/gradients and final custom icons; further management-layout polish; real-phone Viewer checks and explicit touch access to Studio's advanced editor. Continue measured code simplification, bundle/performance and database optimisation between features.
- **Parked decisions.** Force-deleting a universe is not currently needed and would require explicit scope, particularly for visiting characters. Keep character_events.id unless a concrete dependency-reviewed change is worthwhile. Do not reintroduce show/hide membership or a universe_characters table for these requests.

### Search pass preparation — 2 November 2026

- Reviewed the current CharactersPage, ProjectsPage, management styles and origin formatter. Search can be added to just those two pages and their stylesheet using existing loaded data.
- The proposed source passes both TypeScript configurations, lint and a focused browser fixture with sample services: alias/full-name/origin/title matching, case/outer-whitespace handling, empty results and clear, the existing character scope checkbox, real project positions, full placement choices while filtered and phone layout. Search performs no database mutations.
- Prepared changes stay outside application source and are supplied in chat. The user has not yet applied this search pass. No live database access or mutation was needed.
- The earlier ProjectForm helper typo is now fixed, and package/README version is now 0.6.0. Leave README release claims at the applied version until the next change is reviewed and shipped.



### Applied search review and mobile wrapping — 2 November 2026

- The user applied Studio search. Both TypeScript configurations, lint and the actual-source production build pass. The existing bundle-size advisory remains non-blocking (about 559 kB minified / 161 kB gzip).
- Actual components pass the focused sample-data browser checks: title, alias, full-name and origin searches; case/outer whitespace; empty results and clear; existing character-scope checkbox; original project order numbers; full placement choices while filtered; and narrow-screen layout. No live database access or writes were needed.
- Reproduced horizontal scrolling inside the Studio franchise browsing area: the management-summary paragraph retains roughly 382px of width because flex-shrink is 0. At a 390px viewport its available width is only 356px. flex-wrap moves flex items onto lines but does not cap an oversized item's width.
- Proposed correction: add max-width: 100% and overflow-wrap: anywhere to the existing management-summary rule. The width cap lets ordinary prose wrap, and overflow-wrap also handles long unbroken text. Keep the existing flex-shrink: 0 so summaries used directly in a column layout retain their height. Do not hide horizontal overflow globally; timelines and management tables still need deliberate horizontal scrolling.
- The CSS correction was checked locally at 320, 360, 390 and 430px across Studio/Viewer franchise and universe browsing, plus desktop. The exact universe-page overflow was not reproduced with the sample universe copy, but the shared rule provides the same width limit there. Browser-injected CSS was used; application source is unchanged and the user still needs to apply those two declarations.
- Added project media types to the active backlog and design notes. README release/version claims remain unchanged.


## Working agreement

- Keep implementation instructions, code and concise learning explanations in chat. The user applies application and database changes. Documentation may be updated directly.
- Ask clarification questions in the final chat response so the user can answer in a later message. Avoid disappearing question prompts.
- Finish required functionality before extras. Clarify new behaviour or scope when it is not already agreed.
- Supabase is the source of truth. Files under docs/supabase are reference snapshots, not automatically applied migrations or complete live exports.
- The current checkout is C:/Users/matbu/Documents/Projects/Fictional-Media-Timeline-Viewer.

## Historical baseline: v0.5.0 routing and browsing applied

- The app opens in read-only Viewer mode on franchise cards. A franchise with one published universe opens directly; otherwise universe cards are shown. Only explicitly published timelines are selectable; new universes default to private. Participating visitors' origin names/codes may be readable even when those origins are private, but their private timeline entries remain hidden.
- The Studio requires the configured owner account. Public signup remains disabled. Anonymous and authenticated non-owner access is limited to published content; writes remain owner-only. The Studio button opens sign-in, and the owner can return to Viewer without signing out.
- Clicking an occupied viewer cell opens read-only appearance/event details, including event-only cells. Empty cells do not edit. Studio click/right-click editing remains.
- Franchise/universe and character/project create, edit and delete controls are implemented.
- Characters and projects require origin/primary universes; universes require a local name and can optionally have a code.
- Projects can be linked to multiple timelines, reordered independently, removed from one timeline, or deleted globally. Projects without a timeline link remain accessible through the existing-project picker within their primary universe's franchise.
- Each appearance and event belongs to one timeline universe. All entry-service reads, creates, updates, deletes and event upserts include that universe.
- Automatic participation, visitor-origin navigation, temporary editing rows, focus/highlighting and the pending-write guard remain implemented.
- Application types, services, TimelineGrid calls and participation queries reflect the new scope. Project-removal confirmation explains that the selected timeline's entries are deleted and relinking starts empty.
- Both TypeScript configurations and lint pass on the implemented source. Earlier tests of the proposed service changes covered universe/project isolation, event upsert identity, event-only participation, last-entry removal and error propagation.
- The initial live inspection on 15 October confirmed 7 public application tables, 26 named table constraints, 7 RLS policies and 2 application functions. The additional-type pass below subsequently added one appearance check. Both entry tables have required universe_id, the intended keys and validated composite foreign keys with ON DELETE CASCADE. No entries lack a matching universe-project link.
- docs/supabase/schema.sql and functions.sql now reflect the live metadata. They are documented reference snapshots, not full pg_dump backups or migrations. No database changes or destructive runtime tests were performed.

## Product rules

- Every character and project has an origin universe, including universes without an official designation or universes destroyed in the story.
- Keep a required local universe name and optional code. Main Continuity is acceptable for a franchise with one continuity; a code can be the local name if there is no official name.
- Compact visitor labels prefer a nonblank code, then name, then a readable fallback. Headings/selectors can retain the local name. Origin navigation currently stays within the selected franchise.
- Variants are versions from different universes. Keep distinct character IDs; do not introduce a same-origin variant system, numerical cap or new uniqueness constraint without a concrete requirement. The live characters table has no alias/origin unique constraint or standalone unique index beyond its id primary key.
- Franchise membership does not add projects to every universe chronology. MCU footage characters can appear in Loki on TVA without adding Loki to the MCU timeline.
- A shared project can depict different appearances/events on different timelines. Iron Man's Endgame death on MCU does not imply a death on the 2012 New York Time Heist timeline.
- Normal universe deletion remains blocked by originating characters, primary projects and timeline project links.
- Force deletion remains deferred. Agree on its scope before implementing it; visiting characters must not be deleted merely because a visited universe is removed.

## Completed pass: independent appearances and events

Implemented by the user for v0.3.2:

- Add required universe_id to appearances and character_events. Entry location and character origin are separate concepts.
- Appearance identity is (universe_id, character_id, project_id).
- Events retain their existing id primary key and use a unique (universe_id, character_id, project_id) constraint. There is still at most one event per cell.
- Each entry table references universe_projects through (universe_id, project_id) with ON DELETE CASCADE. Entries cannot exist without a matching project link; removing that link deletes only its timeline's entries.
- Global character/project deletion still removes related entries across timelines. Universe deletion restrictions remain.
- Existing entries were to be retained once on each project's primary universe: Endgame -> MCU, Loki S1 -> TVA. The migration checks for missing destination links instead of silently inventing chronology columns or discarding entries.
- Read-only inspection now confirms the applied keys, nullability and deletion rules. There are currently character/project appearance pairs recorded in multiple universes, and neither entry table has orphaned timeline links. Cascading deletions were verified from validated constraints, not by deleting test data.
- Retain shared character/project records and the existing project RPCs. No new entry tables or cleanup RPCs are required.

## Automatic participation and editing

- Ordinary timeline rows come from appearances OR events belonging to that universe and its projects. Include event-only characters, footage and detached appearances.
- Origin neither excludes a participating visitor nor adds a nonparticipating character automatically.
- Characters-page Edit on timeline opens a temporary row on the selected timeline, including for a character from another universe.
- Visitor-origin navigation opens the same character on their origin timeline. Both paths reuse the temporary target without creating entries or saving visibility.
- A first appearance/event establishes participation. Removing the last entry removes an ordinary row; an explicitly focused editing row remains for that visit. Changing tabs or workspace clears the temporary target.
- The Characters page shows originating characters and current participants, with the existing checkbox for other characters in the franchise.
- Participation updates from current entry state. Do not restore universe_characters, Show/Hide controls, default appearances or separate visibility writes.

Regression checks to retain:

1. A fresh character has no ordinary row; Edit on timeline opens a temporary blank row. Leaving without saving does not establish participation.
2. Saving a first appearance or event retains the row after navigation. Removing one kind of entry preserves the row if the other remains.
3. Removing the last entry removes an ordinary row, while a focused editing row lasts only for the current visit.
4. A shared project starts blank when linked to another universe. Creating, editing or deleting a cell there does not affect another universe.
5. Visitors remain valid. TVA footage does not require a Loki column on MCU.
6. Removing a project deletes only the selected timeline's entries. Relinking starts blank; other timelines and the project record remain intact.
7. Global character/project deletion removes its related entries. A universe with origin records or timeline project links remains protected.
8. Read/save failures show errors; overlapping cell mutations remain blocked.

## Feature roadmap retained alongside public-preview preparation

### 1. Additional appearance and event types — completed in v0.3.3

Reviewed the user's implementation on 15 October:

- The appearance union and editor now offer standard, flashback, footage, depiction, vision, afterlife and non_chronological. Depiction combines statue/image/photo. Keep one appearance category per cell.
- The user simplified the selection rule: switching to any non-standard type detaches it by default, including flashback, footage and vision. The existing toggle can reconnect it. Selecting the already active type preserves a manual override, and switching to Standard preserves the current attachment setting.
- This is an editor selection default. Existing rows are not rewritten and the database still defaults is_detached to false when creating a standard appearance.
- Non-chronological appearances do not add scene ordering. Detached depictions, visions and afterlife appearances do not start or extend a continuity segment, but still establish timeline participation.
- Unknown status is available as an explicit ? event. It ends known continuity at the selected at/after position without declaring death. A later connected appearance can resume continuity.
- No global status inference, name-side status badge or final-line extension has been added.
- The original first-connected-appearance arrow remains. Multiverse entry/departure events are deferred and optional; retain one event per cell.
- Live validated database checks match all seven appearance choices and all five event choices, including vision and unknown. Universe-specific keys and cascading project-link foreign keys remain in place.
- Both TypeScript configurations and lint pass on the user's current source. Focused checks cover detachment for all non-standard types, manual attachment, preservation when reselecting a type, unknown at/after, later resumption and existing event behaviour. No database rows were modified during review.
- Visual cleanup confirmed on 16 October: Vision uses a small eye marker, appearance tooltips replace underscores and separate the detached label, and the invalid radius declaration has been removed.
- Lifeline comments now describe displayed continuity without inferring survival or claiming that only the first appearance can start a segment.
- The schema reference records the observed checks. The user has applied the code and database changes; the assistant has updated documentation only.

### 2. Character status and continuing lifelines — deferred until agreed

- The user wants a visible status indication beside the name and/or a continuing lifeline for characters who have not died by the relevant point in chronology.
- Earlier requested symbols: a cross for deceased, a question mark for unknown, and no mark otherwise. Final visual treatment remains open.
- Agree how death, revival, blip, return, unknown, afterlife, depictions, non-chronological appearances, footage and flashbacks influence derived status. Missing appearances are not proof of death, and footage is not proof of current survival.
- Settle how status follows chronological order and how it behaves across universe timelines. A timeline-local event must not accidentally change every timeline's status.
- Revisit extending the final connector towards the latest project only after those rules are clear.
- This work may be deferred while appearance/event types are implemented; it is not a prerequisite for discussing that list.

### 3. Functional and visual refinement

- Refine icons, shapes, colours, spacing, focus/hover feedback, editor positioning and narrow-screen behaviour.
- Check keyboard access and loading/empty/error states.
- Revisit grouping, sorting and filtering for hundreds of characters when the user defines the controls. These are presentation choices, separate from participation data.
- Validate representative timelines before bulk population.

### 4. People, crew and credits

- Keep the previously requested contributor/role/project work after timeline functionality and refinements. Use the smallest useful model when that pass begins.

## Live database access and reference maintenance

- Supabase MCP is connected. The inspected project was matched to the application's configured Supabase URL.
- Inspection used read-only SELECT queries. The connected plugin also exposes write-capable tools; do not confuse our read-only workflow with verified server-enforced read-only permissions. Database modifications remain in the established user-applied workflow.
- schema.sql records the 7 public application tables, columns, defaults, identity modes, 27 named constraints, 14 RLS policies, table/sequence privileges and the private helper schema's usage grants. functions.sql records the three public functions plus private.can_read_timeline(bigint), with their execution grants.
- The references were refreshed from catalog metadata on 20 October, not inferred from the frontend. They omit data, sequence state, default/role ACLs, schema ACLs other than the helper schema, extensions, managed schemas and operational settings; they are not complete restore scripts.
- Keep these references versioned and refresh them after relevant database changes. Prefer a schema-only pg_dump/Supabase CLI export when a full reproducible export is needed. No CLI/Docker setup or migration-framework conversion is needed for this documentation update.
- All three public application functions use SECURITY INVOKER and an empty search_path. PUBLIC and anon have no EXECUTE grant; postgres, authenticated and service_role have explicit execution grants. The two project-mutating functions still obey the caller's row-level permissions. The private read-permission helper uses SECURITY DEFINER with an empty search_path and returns only a boolean; anon and authenticated may execute it.
- All 7 tables have RLS enabled with an authenticated Studio owner policy and a publication-limited SELECT policy each. Authenticated has SELECT/INSERT/UPDATE/DELETE; anon has SELECT only, and PUBLIC has no table grants. Authenticated has only USAGE on the five identity sequences; privileged postgres/service_role access remains.
- cross-universe-pass-guide.md is historical. Current source, this plan and the latest chat decisions take precedence.

## Verification after the default correction

- Rechecked the live database on 15 October: appearances.appearance_type now defaults to lowercase 'standard'. The user has applied the correction, and schema.sql has been reconciled with it.
- Existing appearance values remain supported lowercase values. Both entry tables still have their validated universe-specific keys and cascading link constraints, with no orphaned timeline links.
- Both TypeScript configurations and lint pass for the current application. The review did not write to the database.

## Public-preview proposal reviewed on 16 October

Source reviewed in full: C:/Users/matbu/Documents/Projects/PUBLIC_PREVIEW_AND_VIEWER_PLAN.md. Treat it as a product proposal, not authorization to implement or publish everything it lists. The user's additional priorities were clarified on 17 October: a distinctive, polished and responsive UI, custom appearance and utility icons, reorganisation of management areas outside the timeline, character status, and user-defined sorting/grouping/views.

### What the review established

- The Studio/viewer split fits the existing goal. Keep one React/Vite application and shared timeline data/rendering; no second database, custom backend or wiki system is needed for the first preview.
- At the 16 October review, App.tsx switched views using React state, with no router, owner sign-in or viewer permission mode. Owner access and the public viewer have since been implemented. A full routing rewrite is not a prerequisite; decide URL sharing and Studio entry deliberately when needed.
- At that review, timeline cells created, edited and deleted entries. The implemented Viewer now removes those interactions, management navigation, temporary editing prompts and empty-cell editing cues.
- Origin links and row focus already exist. Public character exploration should use a separate selection from the existing editing target, whose behaviour includes opening temporary blank rows and remounting the timeline.
- A compact character panel can derive a journey from the selected timeline's existing projects, appearances and events. Label counts and first/latest appearances as timeline-local; do not imply global character status or a complete cross-universe history.
- The proposal calls the ordering field timeline_order; the actual field is universe_projects.timeline_position. Release-order browsing remains deferred because sorting columns also affects the current continuity calculation.
- At that review, all seven application tables had RLS enabled but permissive FOR ALL prototype policies and broad anon/authenticated grants. Both project-mutating functions were executable by anon and authenticated. The completed owner-access pass below replaces that prototype access.
- Security Advisor returned no notices during that review despite the prototype public writes. Advisor results alone do not establish the intended access; inspect effective privileges and policies and test role-specific reads.
- Existing narrow-screen layout rules, page title and favicon provide a starting point. Public copy, legend, keyboard/touch explanations, a deliberate initial timeline and browser checks still need attention.
- The current TypeScript/lint checks, continuity fixtures and Vite production bundle passed. The bundle was emitted to a temporary directory; no deployment or browser-based production smoke test was performed. Git deployment connectivity was not verified.

### Approved direction; work remains one focused pass at a time

1. Preserve the user's design and workflow priorities alongside preview preparation. Establish a coherent visual direction before final icon work or a broad management-layout redesign. Clarify the intended sorting/grouping/views and character-status rules when those passes begin; do not invent them now.
2. Owner access and database permissions — implemented in v0.4.0 and reviewed on 18 October. One confirmed Supabase Auth account, public signup disabled, owner-only row policies, narrowed grants and no anonymous function execution. Read-only database role checks and mocked frontend auth-flow checks pass. The two CSS corrections below have now been applied; real browser sign-in/sign-out and owner create/edit/reorder checks remain a manual smoke test.
3. Universe publication and Viewer/Studio presentation — implemented in v0.4.1 and reviewed on 20 October. Per-universe publication defaults to private; public reads are enforced by the database. Visitors keep origin labels with disabled links to unpublished timelines. Read-only cell details reuse the shared timeline. Finish this preview stage with a compact introduction and complete legend for the arrow, connected/detached appearances, seven appearance types and five event types; include keyboard/touch guidance and narrow-screen checks. Keep final icon design and broader management redesign in the agreed visual work.
4. Character exploration. Select/highlight a row and show alias, name, origin, timeline-local appearances and events in a small panel. Retain origin navigation with an honest empty state when no origin-timeline entries exist. Project focus is a later enhancement unless the user prioritises it.
5. Preview readiness and deployment. Curate a coherent sample chronology and useful visitor-universe examples, verify loading/errors/universe switching and keyboard/touch access, finish preview/fan-project wording and metadata, test anonymous/owner access and any routed-page refresh, then deploy. Vercel is the default recommendation for the current static Vite setup; confirm repository access and deployment settings at that stage.

Keep passes independently reviewable and continue the established chat/code/user-applies workflow. The user approved starting this sequence, not implementing every viewer idea at once. Ordinary visitors do not need accounts. The public viewer is now the default entry, with a Studio button leading to owner sign-in.

### Content and release decisions still needed

- Confirmed priorities: aesthetic/responsive UI and consistent custom icons; reorganisation of management pages; character status; sorting/grouping/views designed with the user. These remain real work, not discarded extras.
- Confirmed: incomplete/test universes must remain private. Publication is an explicit per-universe decision and defaults to private; hiding an option in a dropdown does not enforce privacy.
- Choose a manageable preview dataset and the franchises/universes to publish. The agreed browsing entry starts with franchise cards rather than an arbitrary first timeline.
- A preview frontend using the live Supabase project still changes live data through owner edits. Branch/hosting preview deployments do not create isolated database data. Use disposable or separate test data when future changes require it; do not build a large release pipeline now.

### Work that remains on the broader roadmap

- Character name-side status indicators and continuing lifelines, once their chronology/universe semantics are agreed.
- Further functional and visual refinement; grouping, sorting, search and filters as data volume makes them useful.
- People, crew and credits after the timeline work.
- Optional multiverse entry/departure events and any force-deletion flow only when a concrete requirement is agreed.
- Project exploration, release-order browsing and analytics remain candidates, not automatic preview prerequisites.
- A public preview can precede these features and v1. Prototype public write access has been removed; selective public reads and focused viewer interaction checks now pass; real-browser and deployment smoke tests still remain. Keep bulk population, feedback and outreach aligned with the preview's actual readiness.

References checked for this review:

- [Supabase row-level security and grants](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Supabase password authentication](https://supabase.com/docs/guides/auth/passwords)
- [Supabase signup configuration](https://supabase.com/docs/guides/auth/general-configuration)
- [Vite static deployment guidance](https://vite.dev/guide/static-deploy.html)
## Owner-access pass implemented and reviewed on 18 October

- One confirmed Supabase Auth account exists and matches the UUID configured in is_studio_owner(). Public Auth settings confirm email sign-in is enabled, public signup is disabled and anonymous sign-in is disabled.
- is_studio_owner() uses SECURITY INVOKER, STABLE and an empty search_path. It compares auth.uid() with the configured owner UUID. No account/role table or SECURITY DEFINER helper was added.
- All seven prototype policies are gone. Each application table has an authenticated-only Studio owner access policy with the owner check in both USING and WITH CHECK. Anonymous table access and execution of all three application functions are revoked. Authenticated table grants are limited to SELECT, INSERT, UPDATE and DELETE; sequence grants are limited to USAGE.
- Read-only transactions with transaction-local authenticated claims verified that the owner sees the same row counts as the administrative baseline and a different user sees zero rows in all seven tables. The helper returned true only for the owner. Anonymous restrictions were verified from effective grants. No live mutation tests or browser sign-in were performed.
- StudioAccess wraps WorkspaceProvider, so private data loaders mount only after the database confirms owner access. Signing out removes that workspace state. Token refreshes do not unnecessarily reset the workspace, and late ownership responses cannot unlock another account's UI.
- Both TypeScript configurations, lint and the production bundle pass on the actual implementation. Mocked auth-flow checks covered initial/signed-out state, failed sign-in, owner/non-owner access, token refresh, local sign-out success/failure, stale responses, verification errors/retry and subscription cleanup.
- Styling corrections are now present: src/main.tsx imports ./styles/auth.css, the session-bar span uses min-width: 0, and the bar uses --surface-alt.
- The only Security Advisor notice was disabled leaked-password protection. This feature requires Supabase Pro or above; it is not a failure of the owner-only policies. Reference: [password security](https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection).
- Live schema/function references were refreshed. The assistant changed documentation only; application corrections remain for the user to apply and no live data, accounts or permissions were changed during review.

At the end of the 18 October owner-access pass all timeline content remained private. The subsequent v0.4.1 pass below adds publication and the public viewer. Preserve the user's choice of visible origin labels with disabled links for unpublished timelines.


## Selective publication and viewer pass — v0.4.1 implemented and reviewed on 20 October

- Confirmed option 1: public timelines retain a participating visitor's origin name/code even if that origin timeline is private. Only the required character/origin metadata becomes readable; unrelated test universes and private chronology memberships, appearances and events remain hidden.
- Reuse the existing timeline interface. The viewer shows published franchise/universe choices and has a Studio entry leading to the existing owner sign-in. Owners can return to the viewer without signing out. Mode/account changes remount workspace state.
- Add universes.is_published, required and false by default, plus a Publish this timeline checkbox in the existing universe form and a visibility column in Workspaces. Publication applies to the current saved timeline; this is not a separate draft/release system.
- Add SELECT policies alongside the existing owner-only write policies. A small private.can_read_timeline(bigint) SECURITY DEFINER helper checks owner identity or the publication flag without re-entering universe row policies. It returns only a boolean, uses an empty search_path and lives outside the exposed public schema. Keep private out of the Data API's exposed schemas.
- Universe metadata can be visible for published participants' origins; every timeline-entry/membership policy independently checks timeline read permission. Do not treat readable origin metadata as permission to read its timeline.
- Reuse WorkspaceContext.canEdit for presentation and write guards. Viewer franchise queries explicitly require published universes even while the owner is signed in, and universe selection excludes unpublished metadata-only rows.
- Reuse the existing popup for read-only cell details: character, project, appearance category, attachment and event type/position. Include event-only cells, click/touch and Enter/Space activation, Close and Escape. Empty viewer cells have no editor or add-marker hover cue.
- Existing Studio click/right-click editing remains. Origin navigation is disabled for unpublished timelines in viewer mode; the existing within-franchise navigation boundary remains.
- Prepared code passed both TypeScript configurations, lint, a production build and focused mocked UI/state checks. The SQL passed local PGlite/Postgres fixtures covering all-private defaults, published reads, private origin labels, event-only characters, shared-project isolation, anonymous/non-owner write denial, owner operations and unpublishing. These checks did not alter the live database.
- The user applied the SQL and application code. On 20 October, both TypeScript configurations, lint, the production bundle and focused mocked UI/state checks passed against the actual source. Read-only live role checks matched the expected published data for both anon and a non-owner; owner reads matched the administrative baseline. Of 17 universes, 3 were published and 2 additional private origins were readable as required metadata, with no private chronology entries exposed.
- The 14 live policies, publication default, helper definition, function grants, table grants, identity-sequence grants and all 27 validated constraints were inspected. Schema/function references are refreshed. No live rows, accounts, functions or permissions were changed by the review. The Security Advisor still reports only the previously documented disabled leaked-password protection notice.
- Follow-up source review on 23 October confirms session-bar branding and the film emoji are present. The viewer focus rule was added with an unintended :not() selector; the next pass corrects it.
- Browser sign-in/sign-out, mobile layout and publish/unpublish smoke tests remain manual checks. The active Data API exposed-schema list was not available through the inspected SQL settings; keep the private helper schema unexposed.
- The complete legend, introductory copy, broader responsive/visual refinement, character exploration and deployment remain in subsequent preview work. Character status, custom icons and user-defined grouping/sorting retain their existing roadmap positions.


## Viewer experience agreed on 23 October — implemented and reviewed on 25 October

The user wants an information tool with cinematic character, rather than a generic corporate dashboard. Refinement can continue later; the timeline must remain the focus. No concrete external visual references have been selected yet. DESIGN.md records this direction and links the reference resources discussed.

### Included now

- Replace the left sidebar in Viewer and Studio with a compact franchise/universe bar. Keep Studio navigation as horizontal buttons. Preserve publication filtering and all current permission boundaries.
- Rename the visible Workspaces navigation label to Franchises & universes. Hide the universe selector on that management page because its scope is the selected franchise and all of its universes. Internal workspace/view identifiers can remain unchanged.
- Give the timeline the available page width, separated by a thin top rule instead of a rounded card frame. Keep heading, controls, instructions and help outside the scrolling grid. Future detail panels do not require a permanent empty sidebar.
- Reduce ordinary rows from 58px to a 44px minimum; allow longer names to wrap and grow. Keep sticky character names and project headers.
- Use horizontal, naturally wrapped project headings with 104px columns. Remove the vertical text's 90px clipping limit. Extra horizontal scrolling is an accepted tradeoff for readable titles; do not silently shorten stored project names.
- Simplify standard appearances to filled dots, retain the first-connected-appearance arrow, and use 2px centred lifelines without changing continuity calculations.
- Put an at-event symbol inside a connected standard appearance. Detached and other appearance categories retain both markers, so neither category nor attachment is hidden. Event-only markers remain valid. After-events stay at the project boundary and use a small square badge, distinct from appearance dots. Reserve space after the final column so the last badge is not clipped.
- Share one small TimelineMarkers component between cells and the legend. The popup still describes both appearance and event separately; this is a display change, not a merged data model.
- Add short mode-appropriate instructions and a Legend & help button. Its scrollable popup lists all seven appearance types and five event types, plus attachment, arrow, event position, visitor origin and keyboard/touch explanations. Reuse the existing positioning, outside-click, Escape and focus-return behaviour.
- Correct the viewer-cell focus selector. Preserve ordinary Viewer click/keyboard details and existing Studio editing behaviour.

### Validation and scope

- Proposed source passed both TypeScript configurations, lint and a production build in temporary files.
- An isolated browser fixture using the actual proposed components and sample data verified full project-title wrapping, 44px rows, merged symbols, Viewer keyboard details and focus restoration, all 16 legend entries/examples, bounded desktop/phone/landscape popups and Studio franchise-page selector scope.
- No application source or live database data was changed by the assistant. The user applies the code from chat. Confirm real-data layout, editing and publication behaviour after application before marking the pass complete.
- No changes to table structure, permissions, appearance/event values, continuity semantics or character status are included.

### Retained design and navigation requests

- Franchise cards are the agreed browsing entry: choose a franchise, explore its universes, then open a timeline. Replace the franchise dropdown with All franchises and a franchise breadcrumb; retain the universe switcher only when multiple selectable timelines exist. See the 27 October pass below.
- Studio franchise and universe editing still needs a clearer hierarchy. The navigation rename and selector scope above are the first improvement; the deeper management layout should be designed with the franchise/universe browsing pass.
- Franchise-specific accents are desired later. Keep appearance/event meanings and shapes consistent across franchises. A theme must not change what a symbol means.
- The red T logo is a placeholder. Final naming/identity, logo, custom utility icons and refined appearance/event artwork remain open; avoid treating the placeholder as a final brand specification.
- Keep the compact information-first direction. Use deliberate typography, spacing, contrast and restrained cinematic accents rather than large decorative sections competing with the timeline.

### Remaining path to the public preview

1. Viewer layout and visual cleanup are implemented in v0.4.2, including the corrected heading rules and screenshot-safe Studio label. The subsequent light frame and thin scrollbars are also present.
2. Character exploration and the side-by-side facts/label-colour correction are applied and reviewed on 27 October; browsing selection remains separate from the editing/origin-focus target.
3. Franchise/universe cards and Studio organisation are applied and reviewed on 28 October. Apply the review corrections below (now present); keep the user's screenshots and README release notes current.
4. Timeline-only URLs, refresh restoration and browser Back/Forward are implemented in v0.5.0. Finish public-preview copy and metadata, confirm the published sample timelines, then check the hosted app and real-phone interactions.
5. Verify guest/owner behaviour and publication/unpublication with the applied code, confirm repository/hosting configuration, and deploy a preview. Deployment is a separate step; nothing is published by this design pass.

Character status and continuing lifelines, user-defined sorting/grouping/views, final custom icons/theming and management refinements remain on the roadmap. Their rules/design need agreement at their respective passes; they are not silently added as requirements for this pass. People, crew and credits remain after the timeline work. Optional multiverse entry/departure and force-deletion flows remain deferred.



## Visual cleanup reviewed on 25 October — implemented in v0.4.2

- The user's source contains the compact top navigation, horizontal wrapped project titles, shared marker renderer, merged at-events and legend. Both TypeScript configurations and lint pass.
- Keep the user's 44px minimum row variable, 100px minimum project-header height, detached-marker opacity and current appearance shapes.
- Remaining outer timeline space comes from main-content padding. Scope zero padding/gap to the Timeline view, keep padding on its header and status messages, and preserve the final 12px grid allowance for after-events.
- Move Legend & help alongside the timeline title/description. Move mode-specific interaction instructions into the help popup, removing the extra toolbar row.
- Put the legend heading outside a separately scrolling body. Remove its sticky positioning rather than adding stacking-order overrides.
- Replace font-based event glyphs and the shared vertical nudge with one small local SVG component. Retain the cross, clockwise/counterclockwise arrows, sparkle and question-mark meanings. This alignment fix is not a final icon/branding redesign.
- The proposed cleanup passed both TypeScript configurations, lint and a production build in temporary files. An isolated browser fixture verified desktop/phone/landscape layout, grid edges, long titles, final after-event visibility, centred SVGs, legend clipping/header stability, contents, keyboard details and focus return.
- Application code remains user-applied from chat. Only documentation was changed by the assistant; no database changes or live edits were made. Real-data review remains after application.
- Character exploration remains the next planned feature pass; status rules, sorting/grouping, franchise browsing, management layout and preview readiness retain their existing positions.



## Character exploration agreed on 25 October — implemented and reviewed on 27 October

- The user chose an on-demand side panel. It is available in Viewer and Studio, opened from a character-name button, with selected-row highlighting. Desktop keeps the timeline usable alongside it; narrow screens use a native modal dialog.
- Scope is the currently selected universe timeline only. Show alias, optional full name, origin metadata, local appearance/event counts and project-ordered entries, including detached appearances and event-only entries. At/after labels remain explicit.
- Reuse the loaded projects, characters, appearances and events. Filter by universe and character identity; do not combine same-name variants or invent a global event order.
- Browse selection is local to TimelineGrid and separate from the existing focusedCharacterId. Opening/switching/closing the panel does not remount or reload the grid or create temporary rows. Workspace changes clear selection through the existing keyed grid lifecycle.
- Reuse origin navigation and its publication/saving restrictions. Unpublished origin metadata may remain visible, but Viewer cannot open the private chronology. Counts and history update from Studio edits; deleting the last entry leaves an honest empty panel until closed, without retaining the row artificially.
- Close and Escape restore focus to the selecting name button, or the timeline if that row was removed. The native mobile dialog blocks background interactions and manages keyboard containment.
- Prepared source passed both TypeScript configurations, lint and a production build. Isolated browser checks with mocked service data covered timeline-specific counts/order, same-name variants, detached/event-only entries, private/public origins, no additional reads/writes from browsing, preserved grid identity/scroll, desktop switching, mobile focus/Escape, responsive transitions, Studio edits, last-entry/temporary-row empty states and universe reset.
- The user has applied the character-panel code. Actual source passes both TypeScript configurations, lint, a production build and the isolated sample-data browser checks described above. No live database access or mutations were needed. The assistant has changed documentation only; no new release version is assigned by this review.
- The 27 October screenshot/source review found two styling issues: undefined --border-text prevented label/helper colours, and grid-template-columns alone did not establish a grid. Prepared correction groups each label/value pair, lays the two facts side by side with wrapping on narrow widths, and uses smaller muted labels with stronger values. The user has now applied this correction; the follow-up source review confirms the grouped facts, responsive grid and valid colour variables.

### Multiversal journeys — deferred, not a preview blocker

- The user raised a future combined journey with explicit travel between universes, such as Iron Man leaving his origin timeline and returning.
- Independent per-universe project positions cannot establish that character's overall travel order. Do not infer entry/departure from visitor labels or place a timeline-local death on every universe.
- Keep origin navigation now. A combined ordered journey and any entry/departure markers need an agreed model in a later focused pass. No travel tables, markers or chronology rules are introduced by character exploration.
- After reviewing this panel, continue franchise/universe browsing and Studio organisation, followed by preview content/access checks and deployment as already planned.


## Franchise/universe browsing agreed on 27 October — implemented and reviewed on 28 October

- The user accepted the recommended franchise-card starting page, direct opening of a single published universe in Viewer, and the same franchise-to-universe hierarchy for Studio management.
- Remove the franchise dropdown. Inside a franchise, All franchises returns to the cards; the franchise name returns to its universe cards. Keep a compact universe switcher inside a timeline/management page only when more than one selectable universe exists.
- An explicit return to universe cards must stay on that screen, even for a one-universe franchise. Studio always shows universe cards after opening a franchise so its management actions remain accessible.
- Use names, optional universe codes and restrained existing styles. Show Public/Private and existing Edit/Delete actions in Studio only. Put Add franchise on the franchise screen and Add universe on the universe screen. Preserve existing forms, confirmations, reference errors and default-private publication.
- Replace the old Workspaces tab with this hierarchy; Timeline, Characters and Projects remain the Studio tabs within an opened universe.
- Keep the existing published-only franchise query and filter selectable universes independently, including for signed-in owners using Viewer. Readable private-origin metadata is not a public timeline choice.
- Start with franchise data only. Load universes when a franchise is chosen, cancel stale loads when navigating away, retry without changing the selected franchise, and block workspace navigation during saves. New franchises remain on the cards until opened.
- Reuse the existing context, services and database. No new table, auth policy, route library, artwork system, global chronology or status rule is required.
- The prepared source passes both TypeScript configurations, lint and a production build. Isolated browser checks using the real proposed App/provider/components and sample service data pass for entry/shortcut/back navigation, public filtering, stale loads, retries, desktop/phone layouts, keyboard focus, universe switching and panel reset, Studio CRUD, publication/default-private settings, reference rejection, retained failed forms and saving guards.
- The user applied the browsing pass. On 28 October, the actual source passes both TypeScript configurations, lint and a production build. Browser checks reproduced the overview-heading and universe-deletion navigation defects below. The corrected proposal passes the complete sample-data browser checks. Only documentation was edited by the assistant; application corrections remain user-applied and no live database access or mutations were performed.
- Navigation remains in-app state for now: a reload starts at franchise cards. Browser history and shareable timeline URLs remain an explicit preview-readiness decision. Artwork, final branding, global character status, sorting/grouping, people/credits and multiversal journeys retain their existing roadmap positions.


### Small corrections from the 28 October review

- App's universe-card page title currently reads selectedUniverse.name; use selectedFranchise.name so the overview is headed by its franchise.
- The reset change was applied to removeUniverse instead of removeFranchise. After deleting the selected franchise, activateFranchise(null). After deleting the selected universe, retain the franchise and select the first remaining universe ID (or null). The current version unexpectedly returns to all franchise cards when that selected universe is deleted.
- A lock plus the word Private is appropriate. In the ordinary native universe selector, replace the nested span with text only, including the word Private. On cards, keep the lock in an aria-hidden span beside the readable status text. Final SVG branding/icon work remains deferred.
- Add the missing space to the Edit button's accessible label: "Edit " + record.name.
- The proposal preserves the user's visual tweaks. Browser verification covers single-published-universe opening, explicit return to cards, Viewer publication filtering, late-load cancellation and retry, universe switching/panel reset, Studio creation/editing/deletion, publication default/toggle, linked-record rejection, retained failed forms, saving guards and desktop/phone layouts. No claims are made about live role testing in this review.
- README remains v0.4.3 with existing images. After the corrections are applied and reviewed, v0.4.4 is a suitable browsing-release number; the user will provide new screenshots.

### Next pass: shareable links and browser navigation

- Give a franchise/universe a stable address, preserve the selected destination on refresh, and make browser Back/Forward follow navigation.
- Keep links subject to the existing published/private permissions; a missing, removed or unpublished destination needs an honest unavailable state.
- Confirmed universe-level sharing first; no character IDs in shared URLs. Hosting is not yet set up. Vercel is the provisional recommendation, with account setup and deployment following the applied-code review.
- This pass does not imply global character chronology, new appearance types, a visual redesign, or deployment. Preview content/copy/metadata and final access/deployment checks follow in the existing plan.


## Routing and featured Marvel pass — implemented and reviewed on 30 October (v0.5.0)

- The four previous review corrections are present: franchise overview heading, deletion-selection handling, text-only private dropdown labels, and spaced Edit accessibility labels.
- Use React Router 8.5.1 with createBrowserRouter/RouterProvider. Addresses identify a franchise and timeline by stable numeric database IDs; names may change without changing an address.
- Viewer routes: /, /franchises/:franchiseId and /franchises/:franchiseId/timelines/:universeId. Studio uses the same structure prefixed with /studio, plus /characters and /projects within a selected timeline.
- The URL supplies selected IDs and page view. Remove duplicate selected-ID state and setters from WorkspaceProvider/Context. Keep loading, save guards, errors and database services. Key the provider by mode and franchise so late loads cannot populate another franchise.
- Turn browsing and navigation controls into real links. A normal Viewer franchise-card click may replace its intermediate address with its single published timeline; explicitly returning to the franchise overview stays there.
- Keep StudioAccess's existing session/owner checks. Its requested mode comes from /studio, so direct Studio links preserve their destination through sign-in. Viewer links remain read-only even for a signed-in owner. Missing/private/invalid or mismatched franchise/universe addresses get a generic unavailable page, not a fallback timeline.
- Keep character edit/origin focus in temporary navigation state, outside the shared URL. Ordinary character-panel browsing never changes the URL. Block in-app navigation during workspace saves; this is not a general unsaved-form or hard-reload guard.
- Add the Vercel SPA rewrite in vercel.json so a direct request/refresh serves index.html. Vercel deployment is not performed by this pass. Supabase remains the backend; existing environment variable names remain VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.
- Feature the published Marvel franchise at the top of the Viewer entry, with a larger card, Featured label and restrained red-to-dark CSS gradient. Put the other franchises below without duplicating Marvel. Match the franchise name case-insensitively for now; no database feature flag or artwork system is added. Studio keeps compact, uniform management cards.
- Prepared source passes both TypeScript configurations, lint and a production build. Vite reports a bundle-size advisory after adding the router (about 557 kB minified / 160 kB gzip); this does not fail the build. Consider route/code splitting during preview performance checks, without hiding the warning threshold.
- Browser fixtures use the proposed App, provider, router and StudioAccess with sample services and simulated authentication. Checks pass for direct/refresh/back/forward navigation, featured ordering, single-universe opening, explicit overview, private/invalid/cross-franchise destinations, signed-in Viewer, Studio tabs/sign-in/sign-out/non-owner behaviour, CRUD/publication, navigation during a workspace save and phone/keyboard/tap interaction.
- The user applied this pass and the 30 October corrections: Back to viewer removes management-tab suffixes, card hover/focus highlights the outer border, and the featured arrow uses a matching accent. vercel.json contains the SPA fallback and is currently untracked; include it in the next commit.
- Final applied-source checks pass: both TypeScript configurations, lint, production build and the expanded sample-data browser suite, including return to Viewer from both management tabs. The production bundle is about 555 kB minified / 160 kB gzip; the size advisory remains non-blocking.
- Read-only live inspection confirms all seven public tables have RLS, publication-aware SELECT policies and owner-only write policies. Anonymous and simulated authenticated non-owner reads see no private appearances, events or timeline-project links. The three public functions deny anonymous EXECUTE. No live writes or configuration changes were performed; real hosted sign-in and owner editing still require a smoke test.

### Touch and later design commitments

- Touch compatibility is required. The current grid uses native scrolling, Viewer cells open on tap and character details already use a narrow-screen modal. One emulated touch tap was verified in this routing pass; actual-device usability remains to be checked.
- Schedule a focused phone pass before broad outreach: comfortable tap targets, horizontal/vertical grid panning, sticky labels, popup placement, portrait/landscape and pinch zoom.
- Studio's advanced cell editor currently relies on right-click; provide a deliberate touch-accessible edit control in that phone pass instead of assuming long-press will behave consistently.
- Broader franchise/universe theming, gradients and final icons/branding remain welcome later. This pass's gradient is confined to the featured card and does not change timeline symbol meanings.



## Release preparation and first hosting setup — 30 October

- Use v0.5.0 for the completed routing/featured pass. A later patch release can be v0.5.1; a new feature milestone can be v0.6.0. The app is still pre-1.0. README is updated; the user should synchronise package.json and package-lock.json with npm version 0.5.0 --no-git-tag-version.
- Vercel Hobby is the recommended starting point for this personal non-commercial preview. Cloudflare Pages is a viable alternative if its different allowances are preferred; hosting is not tied into the timeline data model. Account/import/deploy steps are in [preview-deployment.md](preview-deployment.md).
- The repository is MateuszS6/Fictional-Media-Timeline-Viewer and the current branch is main. .env is not tracked; .env.example and package-lock.json are tracked. No Git configuration was changed.
- Keep this pass small: public-facing browser title/description, a short fan-made-preview introduction, release version, commit the Vercel file, configure hosting, and verify the hosted app. Existing placeholder branding may be refined later.
- Five universes are currently published: MCU, X-Men (Revised), DCEU, Harry Potter Main films and Star Wars Galaxy Far, Far Away. Sixteen are private. X-Men (Revised) currently has one project and one appearance; ask whether it belongs in the initial public sample. Do not change publication without the user's decision.
- Test the first hosted URL while signed out, refresh a direct timeline URL, use Back/Forward, verify private destinations are unavailable, sign into Studio and return to Viewer from both management tabs. Do a real-phone Viewer check before broad outreach. The initial hosting URL can be used before buying a domain.
- The deployment guide distinguishes the public product preview from Vercel's branch Preview deployments. Sharing Supabase credentials across deployments shares live data; a frontend preview is not a database sandbox.
- Keep ordinary refactors and features on a separate branch until reviewed. Future database changes need saved migration SQL, a restorable backup and an isolated test database for risky structural changes. Prefer compatible additions first, deploy the adapted app, and remove old fields only after old clients and rollback compatibility have been considered. Reference snapshots are not backups.
- Do not remove character_events.id in this release. Current app updates/deletes address (universe_id, character_id, project_id), but the live table's primary key is id and the TypeScript interface includes it. A composite primary key is possible after dependency review; there is no demonstrated optimisation need. Stable event identity may help later moderation references, though no contribution design is imposed now.

## After-preview roadmap additions — requested 30 October

- Optional faint row/column tracking guides to help viewers follow a cell. Make the aid toggleable and preserve appearance/event meanings. Agree pointer, keyboard and touch behaviour when implementing it.
- Search, sorting, grouping and saved/view presets, designed around the user's preferred browsing workflow. Reordering project columns affects chronology/continuity and needs separate decisions from character-row sorting.
- Richer project and character metadata; character status remains a separate agreed-semantic pass. Crew/cast/people and credits remain later work.
- Viewer contributions are a significant planned feature: propose a correction from a timeline cell, then let the owner approve or reject it. Pending proposals must not directly modify published timeline entries. Decide submission identity/login friction, evidence/context, abuse controls, conflicting/stale proposals and approval history in a focused design pass. Do not restore public write access to core timeline tables or add contribution tables in the deployment pass.
- Continue code simplification and measured database/performance optimisation between feature passes; a live preview does not freeze development. Avoid speculative schema changes immediately before release.
- These additions are retained work after the initial preview, not prerequisites for its first deployment. The exact order of the post-preview features remains the user's choice.

## Preview branding — prepared 30 October 2026

- Use Plotstrand as the provisional display name. The user has applied the Fontsource Manrope/Space Grotesk imports, typography variables, static browser title and initial app-bar text.
- Generated a blue-to-violet branching PNG with the built-in image tool, saved the original under docs/branding, and prepared small app-bar/favicon/Apple-touch exports in public. Font licence texts are included in public/licenses.
- Chat supplies the remaining source edits: image-based app-bar mark, small Studio label, branded sign-in page, icon metadata, contextual browser titles and removal of unused starter icons/logo colours. The assistant has edited assets and documentation only. Do not mark the source proposal applied until reviewed after the user implements it.
- The proposed changes pass both TypeScript configurations, lint, production build and isolated real-component browser checks, including titles across Viewer/Studio/unavailable/sign-in paths, loaded image/font assets and phone layout. The existing bundle-size advisory remains non-blocking.
- Keep this within v0.5.0 before the first preview release. Package metadata is still 0.0.0 at review; set its npm name to plotstrand and synchronise version/lockfile before committing. The GitHub repository does not need renaming.
- Finish local checks, then follow preview-deployment.md. No deployment or live database changes are part of this branding pass.

## First pass immediately after deployment: content-status badges

- The user wants clear universe-card labels such as In progress and Up to date so readers can understand coverage without every unfinished universe being made private. Confirm wording and what Up to date covers when implementing the pass.
- Recommend an owner-controlled content status independent of is_published. Publication continues to control access; a public timeline may be incomplete, while test timelines can stay private. Do not remove publication controls or relax permissions.
- Keep the initial work to universe-card status and its Studio editing control. A visible coverage/check date may clarify Up to date; choose the simplest useful design with the user. Do not infer completeness from appearance counts or add contribution/moderation features to this pass.
- This is the next feature pass after the hosted smoke test. Existing character-status, search/sort/grouping, tracking guides, contributions, metadata and crew/cast work remains in the roadmap.

## Post-preview coverage and management usability — prepared 1 November 2026

- The user reports the first Vercel public preview is published. The assistant has not independently checked a hosted URL. Continue the established workflow: application code and SQL are supplied in chat for the user to apply; the assistant can edit documentation.
- Prepare one additive universes.content_status text column, constrained to in_progress or up_to_date, defaulting to in_progress for existing/new records. It describes editorial timeline coverage, independently of is_published and independently of a fictional universe's survival/destruction. Both labels are manual; no counts, release-date inference, automatic completion or permissions changes.
- Add the coverage selector to the existing universe form; show its text badge on universe cards and the opened timeline so direct links and single-timeline franchise shortcuts also expose coverage. Do not add an aggregate franchise status in this pass.
- Format nonempty Marvel/DC card codes with Earth-, avoiding duplicate prefixes where the stored code already includes it. Missing codes remain absent. Live read-only inspection found that TVA currently has no code and the two DC Earth codes already include Earth-. Stored codes and compact visitor labels are not rewritten.
- Keep Add controls visible in a sticky, opaque management toolbar. On opening an inline character/project/workspace editor, scroll its management page to the top so the form is visible below that toolbar.
- Replace the numeric position input in ProjectForm with Before [project title] and At the end (First project for an empty timeline). Remove the edited project from the choices; initialise an edit from the following project to preserve its order. Convert the selected target to the numeric position expected by the existing atomic save_project_in_universe function. No linked-list model or ordering RPC change is needed.
- New projects can be placed directly when created; existing linked projects can move through Edit. Linking a project from the franchise library still appends it, after which Edit provides the new placement selector. Drag-and-drop and direct placement during that library-link action are possible follow-ups, not claimed as implemented here.
- Add small reusable local SVG utility icons beside short readable action labels. Distinguish character Details (pencil) from Timeline (timeline icon). Add/delete retain explicit labels, disabled/busy states and confirmations. No new icon library or icon-only accessibility dependency.
- Two earlier branding typos were found during browser inspection: apple-touch-icon href lacks .png, and the app-bar img uses session-brand instead of session-logo. Supply the two corrections in chat.
- The proposed source passes both TypeScript configurations, lint and production build (the existing bundle-size advisory remains). Sample-data browser checks pass routing/public filtering, status save/read round-trip, unchanged publication, status on the timeline, Earth card labels, sticky Add after scrolling, form visibility, first/end/middle placement, ordinary edits preserving order, retained input on failed save, icons and phone width. Mock saves do not verify a live migration or production mutations.
- Live database access in this pass was SELECT-only. The status column is absent at review; no SQL migration was applied. Keep schema.sql as the verified live snapshot until the user applies and confirms the change. README stays at published v0.5.0 until the new pass is implemented/reviewed; v0.6.0 is a suitable next feature release.
- Apply the additive SQL before the new frontend. Existing published code can keep working with the new defaulted column. Test the application on a feature branch/Preview deployment before merging to production; using the same Supabase credentials still shares the real database.

### Retained requests and later decisions

- Toggleable faint row/column tracking guides remain planned. Agree keyboard-focus, pointer and touch behaviour together and do not rely solely on colour or hover.
- Add a universe-connection visualisation resembling connected cards/nodes, as an optional overview of the fictional multiverse. Define what a connection means first (branch origin, travel, or another editorial relationship). Shared projects and database foreign keys must not be silently treated as story relationships. Decide whether explicit relationship metadata is needed at that stage.
- Fictional universe status (such as active/destroyed/unknown) is deferred with character status, separately from editorial completeness. Agree chronology and ambiguous/resurrected states before deriving status.
- Sorting/search/grouping, viewer correction proposals with moderation, richer metadata, phone refinements and later people/credits remain in the plan. This pass does not introduce those systems.

## Applied implementation review — 1 November 2026

- The coverage and management-usability pass is applied. Both actual-source TypeScript configurations, lint and production build pass; the existing 558 kB / 161 kB gzip bundle advisory remains non-blocking.
- Actual components pass the isolated sample-data browser suite: coverage save/read round-trip without changing publication, timeline header status, Earth labels, sticky Add buttons, form visibility, new/moved projects at first/middle/end positions, ordinary edits retaining order, error-state input retention, utility icons, phone width and existing routing/access checks. Test mutations were simulated, not sent to the live database.
- Read-only live catalog checks confirm universes.content_status exists as non-null text, defaults to in_progress and is constrained to in_progress/up_to_date. The reference schema now includes that verified addition; other objects were not freshly re-exported.
- The user's reuse of formatUniverseCode in the timeline description is appropriate. The prior Apple icon path and session-logo class corrections are present. Character buttons retain Edit and Edit on timeline with distinct icons; shorter Details and Timeline labels remain optional.
- One visible spelling correction remains user-applied: ProjectForm's helper text says automically; change it to automatically. No blocking functional issue was found in this pass.
- README retains the published v0.5.0 label and notes the locally reviewed next update. Package version is still 0.5.0; use npm version 0.6.0 --no-git-tag-version when preparing this feature release, then update the README's current-version text when shipping it. Hosted deployment of this update has not been verified.

## Clarity pass prepared — 3 November 2026

- The user wants less repeated management copy, a clearer and more prominent legend/help control, and near-term support for named multiversal locations and mobile Studio editing. Continue supplying code in chat; source and SQL remain user-applied.
- Prepared UI cleanup: remove the repeated franchise/universe management-summary paragraph; keep search-result counts and useful scope/publication warnings; trim the repeated chronological-order suffix, automatic-position helper, coverage explanation and character-panel note.
- Change visible character labels from Origin universe to Origin, including the character form's validation text. This accommodates existing named locations without a schema change. Do not claim that a Universe/Location category has been implemented.
- Rename Legend & help to Timeline guide, give its button an accent outline and 44px minimum height, and allow the timeline heading controls to wrap. Use three native, initially collapsed details sections: Appearance symbols; Event symbols; Lines, positions and origins. Retain all seven appearance samples, five event samples, arrow/faded/at/after examples and meaningful continuity/origin explanations; shorten repeated introductory/control prose.
- Add a ResizeObserver to AppearanceEditor's existing positioning effect so native section expansion repositions the popup immediately; disconnect it in cleanup. Native details expansion does not cause a React render by itself. Keep the fixed heading and scrolling body.
- Proposed source passes both TypeScript configurations and lint. The sample-data fixture builds and browser checks pass at desktop, 390px and 320px: all samples retained, expansion, popup bounds, fixed heading during scroll, Escape/focus return, summary removal and Origin label. This is not a hosted or live-database test. No source or database changes were applied by the assistant.
- Mobile behaviour remains a question for the user: recommend touch/pen tap opens the appearance/event editor, while desktop mouse click keeps its quick add/remove action and right-click opens the editor. A touch tap must not immediately write/delete an appearance. The user's suggested hold gesture remains an alternative pending discussion, not an implemented commitment. Include an explicit Remove appearance action and close control in the touch-accessible editor when that pass is agreed.
- The other pending choice is a small category distinction, provisionally Universe versus Location/realm, for named settings such as TVA, Void, Citadel and the Watcher's origin. Confirm the wording/categories before adding a database field. Existing name + optional code already supports these records; origin and residence remain different concepts.
- After those decisions, prioritise practical management improvements such as project reordering/library placement; media types and project exploration remain recorded, along with the rest of the consolidated backlog. Do not bundle every requested feature into this UI cleanup.

## Touch editing and location kinds — approved and prepared 3 November 2026

- The user accepted touch-tap opening the cell editor, retaining mouse quick add/remove and right-click editing. Universe versus Location/realm is sufficient for now. Locations should be subtly distinct from universe cards and from coverage/privacy indicators. Show only private status in Studio, preferably a minimal lock. The user deliberately kept the timeline header from wrapping to preserve phone screen space.
- Prepared an additive universes.universe_type text field with default universe, NOT NULL and a universe/location check. Existing records initially remain universe; the owner marks TVA, Void, Citadel, dimensions or other named settings through the existing editor. No new table, relationship system, automatic canon classification, deletion change or permission change is needed. UniverseType flows through Universe, UniverseInput, WorkspaceFormValues, form state/save and editor initial values. Existing services/provider forward the field already.
- Show a Location / realm subtitle above a location card's name and a subtle lavender leading border. Keep editorial coverage as its existing badge. Private cards alone show a local SVG lock with an accessible Private timeline label and tooltip; public cards show no visibility marker. Native selector private text remains readable.
- Extend the shared code formatter with the universe type and pass it from cards, the workspace selector and timeline description. Only literal universes in Marvel/DC receive the automatic Earth- prefix; a location's nonblank code is displayed verbatim. Missing codes stay absent.
- Touch/pen taps and non-pointer activation open the cell menu without writes. Track the last pointer type on pointer-down, without preventing browser pan/zoom. Add keyboard Enter/Space access, focus styling, explicit Close/context and Remove appearance controls. Native disabled/busy states and the existing write guard remain. Outside dismissal uses pointerdown for mouse and touch. No long-press timer or touch-action restriction.
- Compact phone chrome: guide becomes an accessible question-mark button; keep the timeline header non-wrapping; omit only the generic timeline description on phones, preserving an actual code description; use a smaller title. Shorten Back to viewer to Viewer, hide redundant Signed in/Studio text on small screens, and tighten session spacing. Place breadcrumb and selector together when space allows, keeping Studio tabs beneath. The selector is labelled Timeline and retains an explicit accessible name when its visible label is hidden.
- Proposed source passes both TypeScript configurations, lint and the production build (existing bundle-size advisory remains). Sample-data browser checks exercise touch opening with no mutation, native swiping with no mutation, explicit add/remove/type/event, keyboard opening, mouse use after touch, right-click, Viewer read-only details, location create/reopen, publication unchanged, private-only lock, literal location codes and phone overflow. At 390x844 the timeline container measures about 579px high; 320px width also fits. These are browser-emulated touch checks, not physical-device verification.
- Supabase read-only inspection confirmed the current universe columns and that universe_type is absent. The SQL is supplied in chat for the user to apply before the frontend; the assistant made no database/source edits. Do not update the schema reference as applied until the live change is confirmed. Documentation records a prepared pass, not a deployed release.
- Current docs and PostgreSQL column/default guidance were checked; the Supabase changelog Markdown endpoint was unavailable through the web reader, so the HTML changelog was used. No relevant change to this additive column approach was identified.

## Applied touch/location review and close controls — 6 November 2026

- Reviewed actual source: both TypeScript configurations, lint and production build pass. The existing approximately 561 kB / 161 kB gzip chunk advisory remains. Isolated browser checks pass touch opening without writes, swiping, explicit add/remove/type/event edits, keyboard opening, hybrid mouse use, Viewer read-only details, location save/reopen, unchanged publication, literal location codes, private-only locks and 320/390px layouts. Sample-data mutations never reached the live database; physical-device/hosted behaviour is not independently verified.
- Read-only live catalog inspection confirms universes.universe_type is non-null text, defaults to universe and has the universe/location check. Updated only this verified addition in docs/supabase/schema.sql, retaining historical snapshot dates for other objects.
- The user's required third formatter argument is appropriate: all callers explicitly pass universe_type. Wider 220px cell popup, shorter Help label and non-wrapping timeline header are intentional local refinements and do not require reversing.
- Minor correction supplied: the final mobile auth.css gap rule targets hidden studio-session-status instead of studio-session-actions. Preserve the user's compact header sizing.
- Prepared CloseButton and shared styles in a temporary source overlay, not app files. Both TypeScript configurations, lint and a fixture build pass; browser checks cover the four close controls, character-panel initial focus, guide focus return and 44px touch targets, plus the existing touch/location suite.
- Next recommendation is project-management ordering and placement, including direct placement for library links. Ask the user whether this or project media types should take priority and request real-phone feedback. Do not start either feature during this review.