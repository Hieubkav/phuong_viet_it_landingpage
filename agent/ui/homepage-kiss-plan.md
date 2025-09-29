# Homepage KISS Editable Plan

## Context
- Request: make the site landing page editable with a CRUD workflow that stays simple.
- Reuse existing hero/benefit/etc components instead of rebuilding layouts.

## Scaffold Notes
- Static entry point: `apps/web/src/app/(site)/page.tsx` renders section components directly.
- Section implementations live in `apps/web/src/components/sections/*` with hardcoded copy and arrays.
- Convex backend only has `todos` data today (`packages/backend/convex/schema.ts`).
- Dashboard area ready for extension at `apps/web/src/app/(dashboard)`.

## Approach Reminders
- Add `pages` and `page_sections` tables (include `order` + `active`).
- Expose `listHomeSections`, `updateHomeSection`, `toggleHomeSection`, `reorderHomeSections` Convex functions.
- Map section `kind` -> component via a lightweight registry that also exposes default data shapes.
- Refactor each section to accept props derived from Convex data; keep SVG/visual bits inline.
- Build a simple dashboard screen to edit copy, reorder, and toggle visibility without fancy form builders.

## Pattern Cues
- Keep `data` column narrow: nested objects/arrays matching component needs.
- Use typed helpers (`zod` or TS interfaces) so both dashboard form and renderer share validation.
- Optimistic UI for toggles/reorder; full refetch after edits to stay safe.
- Seed initial records with a one-time Convex mutation invoked from dashboard dev tool.

## Follow-up Checks
- Run `bunx tsc --project apps/web/tsconfig.json --noEmit` and then `bun run --cwd apps/web build` after implementation.
