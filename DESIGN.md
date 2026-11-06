# Plotstrand — design direction

Agreed 23 October 2026; refined 30 October 2026. This is a working direction, not a final brand or a claim that every change below is already implemented.

## Purpose and character

A personal tool for building fictional timelines and a public viewer for exploring them. It should feel like an information tool made for fictional/cinematic worlds, with some character and theme. Prioritise readable timelines over decoration.

## Layout

- The timeline is the main surface and uses the available page width.
- Put branding and Studio access in the existing top bar. In the agreed browsing pass, use compact breadcrumbs below it inside a franchise.
- Studio page navigation is horizontal: Timeline, Characters and Projects within an opened universe. Franchise and universe management lives beside the corresponding cards.
- Current interim timeline styling uses a thin border, 8px corners and a 12px outer gutter to relate to the management surfaces. The user is not yet satisfied with the overall visual identity; broader redesign remains open.
- Keep navigation outside the grid. Put the timeline title, short description and Legend & help button in one compact header; put interaction instructions inside help.
- Keep the compact timeline header above the lightly framed grid. Preserve ordinary management-page padding and the small allowance after the final grid column for boundary events.
- Use thin, restrained scrollbars on scrolling surfaces while preserving direct horizontal navigation.
- Keep character labels and project headings sticky while the timeline scrolls.
- Use horizontal wrapped project names. Allow enough height for full titles; do not hide long names with ellipses.
- Target 44px minimum rows and 104px project columns. Names may wrap and increase a row's height.
- On narrow screens, controls wrap and the timeline scrolls horizontally. Preserve legibility rather than shrinking the whole timeline to fit.
- The agreed starting page uses franchise cards. Viewer opens a single published timeline directly; otherwise it shows universe cards. Studio always shows universe cards to expose management actions.
- Replace the franchise dropdown with All franchises and a franchise breadcrumb. Keep the universe dropdown only when multiple selectable timelines exist. Explicitly returning to universe cards must not redirect back to a single timeline.
- Initial cards use names, optional universe codes and existing restrained styles. Studio adds visibility and management actions.
- The implemented v0.5.0 pass features Marvel at the top of the Viewer entry with a larger card, a Featured label and a restrained red-to-dark CSS gradient; other franchises follow below. Studio retains uniform cards. Broader franchise/universe themes and artwork follow later.
- Browsing, routing and their review corrections are applied. Franchise/timeline destinations have real links, refresh restoration and Back/Forward support. Application code remains user-applied.

## Colour and typography

- Continue with dark neutral surfaces, strong primary text and readable secondary text.
- Use the existing restrained link/focus accent consistently for this pass.
- Franchise-specific accents are a later enhancement. Preserve symbol meanings across all franchises.
- Plotstrand is the provisional preview name. Use the generated blue-to-violet branching PNG beside real brand text in the top bar; add a small Studio label while editing. This replaces the red T placeholder. Assets are saved; integration code is user-applied from chat.
- The user has applied locally bundled Manrope Variable for UI/body text and Space Grotesk Variable for headings/the brand. Keep their choices in the typography variables in src/index.css. Preserve readable labels; no franchise-specific font system is needed.
- Avoid a dependency, theme framework or image pipeline just for this pass.

## Timeline symbols

- Share actual marker rendering between timeline cells and the legend.
- Use small local SVG event symbols with consistent geometry, avoiding font-baseline offsets or per-glyph CSS nudges.
- Standard appearances are simple filled circles. Keep distinguishable shapes for other categories.
- Show an at-event inside a connected standard appearance. Keep separate markers for detached or specially shaped appearances so neither meaning disappears.
- Show event-only and after-event badges with a small square outline and a symbol, distinct from appearance circles.
- Keep after-events at the project boundary, including after the final project.
- Retain the first-connected-appearance arrow.
- Use 2px lifelines, centred on markers. Visual thickness does not change continuity rules.
- Faded appearances are detached. They still establish participation but do not start or extend a lifeline.
- A line endpoint alone does not mean death. Global/current character status is not inferred by this visual pass.
- Final custom appearance, event and utility icons are still open design work.

## Interaction and accessibility

- Viewer entries open details on click/tap or Enter/Space; empty cells do not edit.
- Preserve the Studio's existing editing behaviour. Provide touch access to its appearance/event editor: the user suggested holding a cell on 2 November. Evaluate that gesture alongside a discoverable Edit action, preserving swipe/zoom and cancelling a hold on movement. Agree the interaction before implementation; Viewer stays read-only.
- Verify grid swiping, comfortable tap targets, sticky labels, popups, portrait/landscape and pinch zoom on real phones before broad outreach.
- Provide clear focus outlines and descriptive names for controls.
- Legend & help is available on demand. Explain every appearance/event type, attachment, arrow, chronology, visitor origins and interaction.
- Reuse the current popup's viewport positioning, outside-click dismissal, Escape and focus return. Give the legend a separate fixed heading and scrolling body so samples cannot overlap the heading.
- Handle long names, dense timelines, empty results, loading and failures.
- Use text/shape alongside colour for meaning.
- A small lock beside Private identifies an unpublished timeline in Studio. Keep the card icon decorative for assistive technology, with the visible word providing its meaning. Ordinary native select options use plain text only; do not put spans or SVGs inside them. Final icon styling can be unified later.

## Character exploration

- Open details from a character name in an on-demand right-side panel; use a full-width modal overlay on narrow screens. Keep this shared between Viewer and Studio.
- Show the current timeline's recorded history and counts only, together with identity and origin information. Browsing must not reset the grid or edit participation.
- Cross-universe travel, combined journeys and global status require their own agreed rules; they are deferred beyond this panel pass.

## References

- [VoltAgent DESIGN.md collection](https://github.com/VoltAgent/awesome-design-md): inspiration for recording a coherent visual language.
- [Vercel Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines): interaction, accessibility and responsive-quality reference.

Apply relevant principles to this app. No specific third-party brand style has been selected.








## Preview follow-up decisions — 30 October

- The featured Marvel gradient and outer-card hover/focus treatment are implemented in v0.5.0. Keep Studio cards compact and uniform.
- Retain an optional, faint, toggleable row/column tracking aid for a later usability pass; it must not imply a character status or event.
- Viewer correction proposals are planned after the preview. Distinguish pending suggestions from accepted timeline data, and preserve owner approval/rejection. The detailed interaction is still to be agreed.
- First deployment needs clear fan-made-preview copy; final branding, broader themes, search/grouping, richer metadata and crew/cast remain separate passes.

## Next pass after deployment: timeline content status

- Show a clear text badge on universe cards to explain completeness/current coverage. Proposed labels are In progress and Up to date; agree their exact meanings before adding a field. Up to date should eventually make its coverage cutoff/date understandable.
- Keep status independent from Public/Private. An incomplete timeline can be publicly readable; private/test timelines still need access protection. A status badge must never replace publication filtering or database permissions.
- Do not infer completion from record counts or character life status. Keep the first implementation small and owner-controlled; consider franchise summaries only after universe-card status works.

## Management usability and coverage — 1 November proposal

- Use text badges In progress and Up to date on universe cards and timeline headers; these are manually curated coverage labels, independent of publication and fictional life/death. Keep private/test access controls.
- Add Earth- to Marvel/DC card codes at display time without doubling an existing prefix or inventing a missing code.
- Keep management Add toolbars sticky with opaque backgrounds and bring an opened inline editor into view. Use a project-title placement selector before considering drag-and-drop.
- Small local SVG icons accompany readable labels; character Details and Timeline actions must be visually distinct. Preserve accessible names and touch targets.
- Retain optional precision tracking guides, a connected-universe overview and fictional-universe status for later focused passes. Define story relationship semantics before drawing automatic connections.
- Application/SQL edits remain user-applied from chat; these notes describe the reviewed proposal, not a deployed update.


## Studio search and non-universe locations — 2 November 2026

- Coverage badges and the previous management-usability proposal have been applied and reviewed as v0.6.0. Studio search is now applied and reviewed in the existing sticky Characters/Projects toolbars, with a visible label, clear action, counts and useful empty results. Keep full timeline positions in a filtered project list. Wrap the controls on phones; preserve the existing character scope checkbox.
- A timeline may describe a universe or a named multiversal location such as TVA, the Void or the Citadel. Optional future category/badge wording should make that distinction without requiring a designation or a second location system. Blank codes remain blank. An origin label is not a character's current residence; preserve the Watcher origin/residence distinction recorded in the development plan.
- Clicking a project heading for details is a requested optional exploration improvement. Design it around useful existing data and the current detail-panel conventions when that focused pass begins.


## Project media types and mobile wrapping — 2 November 2026

- Backlog: distinguish films, shows, videos and other agreed project types with a shared project field, an editable Studio choice/Type column and a restrained label/icon on timeline headings. Settle categories and existing-record handling in the implementation pass; do not use colour as the only distinction.
- Browsing-toolbar summaries must fit their container before text wrapping can work. The reviewed correction adds max-width: 100% and overflow-wrap: anywhere to management-summary, preserving vertical height in column layouts and intentional horizontal scrolling for timeline/table content. This CSS correction remains user-applied from chat.

## Clarity pass proposal — 3 November 2026

- Remove repeated browsing-toolbar prose while retaining search counts and warnings that explain write scope. Use Origin as the character label so named multiversal locations fit naturally.
- A more prominent Timeline guide button opens a compact guide with three native collapsible sections, all initially closed. Keep real timeline symbols, concise explanations, a fixed heading and scrolling body. Observe popup size changes so expanding sections preserves viewport positioning.
- Recommend touch tap to open Studio's cell editor; retain mouse shortcuts. Agree this change with the user before implementation. Press-and-hold is an alternative to evaluate, not a requirement. Preserve swiping and Viewer read-only behaviour.
- A Universe versus Location/realm badge/category is a pending product choice. No new category field is part of the prepared copy/help cleanup.

## Approved touch and location treatment — 3 November 2026

- Preserve the non-wrapping timeline header. Compact mobile chrome should recover timeline space: icon-only accessible guide, reduced repetition, a shorter Viewer action and breadcrumb/selector sharing a row where possible. Keep touch targets usable and navigation available.
- Touch/pen taps open Studio cell editing; mouse shortcuts remain. Opening a menu or swiping does not write data. Include explicit removal and close controls and keyboard access. Outside dismissal should work with pointer events.
- Location / realm uses a quiet subtitle above the card name and a lavender leading edge, visually separate from the amber/green coverage pill. Private-only lock is decorative within an explicitly labelled Private timeline indicator; omit Public text on cards. No location code is automatically prefixed Earth-.
- This proposal is locally verified and supplied in chat for user application; it is not claimed deployed.

## Applied mobile/location review and icon follow-up — 6 November 2026

- Touch editing and location cards are applied and locally verified. Retain the user's compact mobile bars and non-wrapping timeline controls. Only private Studio cards show a labelled lock.
- New backlog: more recognisable appearance icons, including the suggested television/aerial silhouette for footage. Judge at actual marker size; adding details can reduce legibility. Keep cells and guide on the same symbol renderer and retain text descriptions.
- Prepared shared CloseButton using the existing SVG utility icon system: visible X, accessible Close name, native button, 32px desktop/44px touch target, preserved character-panel ref/focus. Keep Cancel and destructive action labels explicit.
- Consolidate utility button and icon CSS in buttons.css. Keep specialised menu-option styling in timeline.css. This is a small styling/component reuse, not a new button framework. Source is supplied in chat and remains user-applied.