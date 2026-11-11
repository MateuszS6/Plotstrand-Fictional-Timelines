# Plotstrand — Fictional Timelines

_A personal tool for creating and exploring fictional timelines,
starting with the Marvel Cinematic Universe._

Inspired by an Excel workflow, Plotstrand uses character rows,
chronological project columns and visual lifelines to track appearances
and events within each universe.

## Current version — `0.8.0`

Studio projects support drag-and-drop and placement by project title. Project forms keep the release date picker within the form on narrow screens.

**Previous:** touch-friendly timeline editing, support for locations and realms, searchable compact management pages, and clearer cell details and controls.

See the [development plan](docs/development-plan.md).

> ![Franchises](docs/images/v0.5.0-marvel-featured.png)

> ![Locations](docs/images/v0.7.0-multiverse-locations.png)

> ![Viewing](docs/images/v0.7.0-viewer-popup.png)

> ![Editing](docs/images/v0.7.0-studio-popup.png)

> ![Ordering](docs/images/v0.8.0-project-drag-n-drop.png)

## Aim

Make fictional universes easier to explore through timelines, character histories, project details and statistics.

## Screenshots

See the [progress screenshots](docs/images).

## Stack

![Vite](https://img.shields.io/badge/Vite-9135FF?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=1f212d)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-1d232a?style=for-the-badge&logo=supabase&logoColor=3FCF8E)

## Database

Supabase is the source of truth. Files in [docs/supabase](docs/supabase) are
database references, not files the app runs to create its database. They were
refreshed from read-only live metadata on 20 October 2026 and include the
universe-specific entry constraints, publication policies and application functions.
The coverage-status column and constraint were additionally verified on 1 November 2026.
They are reference snapshots rather than complete database backups.

