# Plotstrand development plan

Updated 12 November 2026. Studio search, compact management, touch editing, Universe/Location kinds, shared popup controls and project ordering are implemented. The ordering fixes passed local TypeScript, lint, build and browser checks with sample data on 9 November.

[AGENTS.md](../AGENTS.md) is the repository workflow guide. Start with the current priorities below. Use the [development history](development-history.md) only for relevant earlier decisions or verification.

## Current priorities and backlog

Project metadata is implemented in the app and the Supabase change is live. The [11 November scope and rollout](#project-metadata--11-november-2026) tracks frontend deployment. The backlog below includes later work.

- **Implemented and reviewed: Studio search.** Search characters by alias, full name and origin name/code within the current view; the existing Include other characters in this franchise checkbox expands that view. Search linked projects by title. Preserve real project order numbers and use the full list for placement when creating/editing. Include result counts, an empty-results message, clear control and narrow-screen layout. Filter loaded records locally; no new database field, service or search dependency. Searching the unlinked-project library picker is a separate follow-up.
- **Implemented and reviewed: mobile appearance editor.** Touch/pen taps open Studio editing without writes; swipes scroll; keyboard Enter/Space opens the menu. Mouse quick add/remove and right-click remain. Explicit add/remove controls, pointer outside dismissal and compact mobile chrome are applied. Browser-emulated touch passes; physical-phone feedback remains useful.
- **More recognisable appearance icons — requested 6 November.** Improve first-time comprehension at actual timeline size; footage could use a small television with two aerials rather than a plain box. Explore recognisable silhouettes without overloading tiny markers. Use the same symbols in cells and the guide, preserve appearance/event meanings and detached styling, and check contrast, touch-size display and zoom. Do not rely on added detail alone; labels/details/guide remain available.
- **Implemented: shared close controls and button styles.** The guide, cell popups and character panel share a close control. Utility styles live in `src/styles/buttons.css`.
- **Implemented and reviewed: project ordering (v0.8.0).** Studio supports drag ordering with a mouse, keyboard or touch, plus precise placement when adding existing projects. The placement RPC saves positions for the selected universe and detects a stale list. Recovery reloads the saved order. See the [ordering review](development-history.md#project-ordering-implementation-review--9-november-2026) for verification details.
- **Project exploration — deferred until after metadata.** Consider clicking a timeline project heading to open useful read-only project details, analogous to character details. Start from available title, release date and primary origin, optionally timeline-local participation. Only add the panel if it improves exploration; do not introduce a largely empty metadata system merely for symmetry.
- **Project metadata and emphasis — implemented 11 November.** Type and major status are shared project metadata. Both timelines show the release year and project management shows the full first-release date. The Supabase change is live and frontend deployment is pending. Clickable details and a show/hide-year control are follow-ups.
- **Sorting, grouping and views.** Character-row sorting/grouping/filtering and possible view presets remain requested for large timelines. Studio search is now implemented; Viewer search/filter controls can follow. Agree grouping rules and scope before adding storage. Project release-order browsing is a distinct decision because changing columns also changes chronology/continuity interpretation.
- **Implemented and reviewed: Universe / Location kinds.** Required universe_type defaults to universe and accepts universe/location. Named locations retain their own chronology and optional code, using the existing universe record and permissions. Location cards have a quiet subtitle and lavender edge; code formatting does not add Earth- to locations. Only private cards display an accessible lock in Studio. Origin remains distinct from residence.
- **Watcher origin and residence.** Record the user's distinction: Fifth Dimension as origin, Observational Plane as residence/setting, with visits/interference recorded on the affected timelines. The origin label should remain appropriate across those timelines. This is the user's intended model, not a newly verified canon claim. A named record with no code already supplies an origin label; later richer location metadata must not silently substitute residence for origin.
- **Status and continuity.** Character name-side deceased/unknown indicators, optional ongoing connectors and fictional universe active/destroyed/unknown status still need agreed chronological and cross-universe rules. Footage, visions, afterlife and missing appearances must not imply survival/death. Keep these separate from manual In progress/Up to date coverage and Public/Private access. Coverage cutoff/date clarification may be revisited if needed.
- **Timeline orientation and multiverse overview.** Toggleable faint row/column tracking guides remain planned, including pointer/keyboard/touch behaviour. A connected universe-card overview is requested; first define whether edges mean branch origins, travel or another deliberate story relationship. Shared projects/database links alone do not establish such relationships. Combined character journeys and entry/departure markers remain optional later work.
- **Viewer contributions.** Let viewers propose timeline corrections for owner approval/rejection. Pending proposals must not directly edit published data. Agree identity/friction, supporting context, abuse handling, stale/conflicting changes and review history before implementation.
- **Metadata, presentation and quality.** Richer character/project metadata, then people/cast/crew/credits; distinctive franchise themes/gradients and final custom icons; further management-layout polish; real-phone Viewer checks and explicit touch access to Studio's advanced editor. Continue measured code simplification, bundle/performance and database optimisation between features.
- **Parked decisions.** Force-deleting a universe is not currently needed and would require explicit scope, particularly for visiting characters. Keep character_events.id unless a concrete dependency-reviewed change is worthwhile. Do not reintroduce show/hide membership or a universe_characters table for these requests.

## Project metadata — 11 November 2026

Application changes are available locally. The [project metadata change](supabase/changes/project-metadata.sql) was applied to the live Supabase project on 11 November. The database reference snapshots document the verified columns, constraint and save function.

### Agreed direction

- Include project types, release-date presentation and major-project highlighting, provided the implementation remains focused. Defer clickable project details to a following pass.
- Keep storage and management simple. Avoid introducing a series/season hierarchy or extra tables merely for categorisation.
- Categories: Film, Series, Short, Special, Video and Game. Comics, books and Other are out of scope for now. Treat Special as a useful editorial category even when a release could also be described as a TV film. Categories are manually chosen; no runtime/length rules or automatic classification.
- Allow flexible column coverage: The Clone Wars can represent seasons 1–7 in one project, while The Mandalorian can use separate projects for seasons 1, 2 and 3. All use Series, with coverage expressed in their existing titles; no structured hierarchy, automatic splitting or title rewrites.
- Keep the type on the shared project, editable in Studio, with a Type column in project management. Existing records begin unset; never infer types from titles or default the existing library to Film.
- Omit unset types from timeline headings. Use a small icon plus text label below the project title for set types, consistently in Viewer and Studio; revisit visual prominence after review.
- Preserve quick creation and editing: type remains optional, initially Not set, with Film first among actual choices. Type filtering is not included in this pass.
- Major project is a manual shared checkbox, initially off. A change applies wherever that project is linked. The 12 November refinement uses a bold title, with the major status available to screen readers. Projects management uses a heavier title and a Major project label beneath it.
- Reuse one optional release date: the first release of the material represented by the column. For a whole series or seasons 1–7 this is the first included episode's release; for a single season it is that season's premiere. Preserve existing stored dates; no automatic correction, lookup, release-region system or date range.
- Show only the release year on both Viewer and Studio timelines, in a quiet metadata line beneath the title alongside the type. Independently omit missing type/date values without leaving empty separators or placeholder badges. These values never change chronology.
- Show the full release date in Projects management, using an unambiguous readable format such as 6 Apr 2022; use Not set when absent. Retain the optional native full-date input in the form. Year-only entry/partial-date storage is not added in this pass; an unknown exact date may remain unset.
- A show/hide-release-year control is a later enhancement. Display the year by default for this pass; do not add preference storage yet. Clickable project details remain deferred.

### Implementation and rollout

- The project form passes the selected type and major flag through `src/services/projects.ts` to the existing atomic save function. The SQL adds a nullable type with a check constraint and a boolean flag defaulting to false to `projects`. The function still uses the caller's permissions and writes project details and placement together. A call from the older Studio omits the new arguments and preserves stored metadata when editing.
- Projects management and the shared timeline header render the saved fields from the project record. The project read, link and placement functions already return these records. The date formatter uses UTC to display the stored calendar day in management.
- The live database migration precedes frontend deployment. Follow the [preview deployment runbook](preview-deployment.md) for the frontend release and hosted checks.

### Acceptance and verification

Local verification passed on 11 November. Lint and build passed. A disposable Postgres database loaded the reference schema and tested migration defaults, all six types, invalid-type rollback, older saves, shared metadata, linking/reordering and role access. An isolated browser test covered Studio create/edit, input retention after a failed save, release dates around 1 January and the shared timeline headings at phone and desktop widths.

Live verification confirmed that all 173 existing projects retained their rows and received the unset type and false major defaults. The replacement save function retains its caller permissions and the live Data API returns the fields on public project records to signed-out readers. Owner-signed-in saves on the hosted frontend and physical-device checks remain for rollout review.

- Create/edit/clear every type; old uncategorised records remain editable and show Not set only in management. Invalid types are rejected by the database. Film is never silently selected.
- Toggle major status on/off and confirm the same shared metadata after reloading two linked timelines. Unlink/relink and reorder preserve metadata and existing chronology rules; no appearances/events are changed by a metadata-only edit.
- Check all combinations of absent/present type, date and major status, including long titles and multi-season names. Both timelines show only the year; management shows the full date. Include a date near 1 January to catch timezone-induced year shifts. Unknown dates stay blank on timelines.
- Failed saves retain form inputs and do not leave partially saved metadata/order. Old-client saves during rollout preserve newly set metadata. Check Viewer read-only access and existing owner-only writes.
- Check desktop and narrow/touch layouts, sticky header alignment, accessible type/major labels and contrast. The weight difference and text alternatives convey major status without relying on shading or hover.
- Run npm run lint and npm run build for application changes, plus focused flow/database checks in an authorised test environment. Record any production/physical-device verification that remains outstanding.

## Product rules

- Every character and project has an origin universe, including universes without an official designation or universes destroyed in the story.
- Keep a required local universe name and optional code. Main Continuity is acceptable for a franchise with one continuity; a code can be the local name if there is no official name.
- Compact visitor labels prefer a nonblank code, then name, then a readable fallback. Headings/selectors can retain the local name. Origin navigation currently stays within the selected franchise.
- Variants are versions from different universes. Keep distinct character IDs; do not introduce a same-origin variant system, numerical cap or new uniqueness constraint without a concrete requirement. The live characters table has no alias/origin unique constraint or standalone unique index beyond its id primary key.
- Franchise membership does not add projects to every universe chronology. MCU footage characters can appear in Loki on TVA without adding Loki to the MCU timeline.
- A shared project can depict different appearances/events on different timelines. Iron Man's Endgame death on MCU does not imply a death on the 2012 New York Time Heist timeline.
- Normal universe deletion remains blocked by originating characters, primary projects and timeline project links.
- Force deletion remains deferred. Agree on its scope before implementing it; visiting characters must not be deleted merely because a visited universe is removed.

- Viewer access follows explicit universe publication. Studio writes require the owner. Coverage status and fictional continuity status are separate from access.
- Timeline participation comes from appearances or events in that universe's projects. Origin alone does not establish participation. A temporary editing row can be opened without writing entries or changing visibility.
- Project order is specific to a timeline. A shared project starts with empty cells when linked to another timeline. Removing the link deletes its entries on that timeline. Global project or character deletion affects related entries across timelines.

## Historical notes

The [development history](development-history.md) holds the dated implementation and verification records, including [timeline participation regression checks](development-history.md#automatic-participation-and-editing). The [cross-universe guide](cross-universe-pass-guide.md) documents a retired approach.
