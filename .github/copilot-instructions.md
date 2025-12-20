<!-- Copilot / AI Agent instructions for ProCollector -->
# ProCollector — Agent Guidance

Summary
- Small React + TypeScript app scaffolded with Vite. UI uses Tailwind and a small UI component library under `src/components/ui`.
- Major areas: public marketing (`src/pages/public`), dashboard (`src/pages/dashboard`), admin (`src/pages/admin`), auditor/collector portals (`src/pages/auditor`, `src/pages/collector`). Routing lives in `src/App.tsx`.

Quick commands
- Dev: `npm run dev` (runs `vite`).
- Build: `npm run build` (runs `tsc -b && vite build`).
- Preview: `npm run preview`.
- Lint: `npm run lint`.

Key architecture notes
- Routing: `src/App.tsx` defines all routes. Public pages are wrapped with `PublicLayout` (`src/components/layout/PublicLayout.tsx`). Dashboard routes render a `DashboardLayout` (Sidebar + Header) defined inline in `App.tsx`.
- Layouts & UI: shared layout components are in `src/components/layout`. Reusable controls are in `src/components/ui` (e.g., `Button.tsx`, `Card.tsx`). Use the `cn` helper from `src/lib/utils.ts` for class merging.
- Styling: Tailwind CSS is used with custom tokens (e.g. `bg-brand-dustGold`). See `tailwind.config.js` for theme tokens.
- Data/reporting: PDF/Excel exports use `jspdf`, `jspdf-autotable` and `xlsx` (check `src/lib/reports.ts`).

Project-specific conventions
- Explicit `.tsx` imports: many files import other components with the `.tsx` extension (e.g., `import { Overview } from './pages/dashboard/Overview.tsx'`). Keep this pattern when adding new pages to avoid inconsistent imports.
- Named exports for components: components are commonly defined as `export function X() {}`. Import them as named imports (`{ X }`) rather than default imports.
- Routes: add page components under the appropriate `src/pages/*` folder and register them in `src/App.tsx`. Public pages use the `PublicLayout` route element.
- No global auth guard: App routes do not include an auth wrapper. If adding protected routes, ensure you add authentication checks where needed (e.g., wrap `DashboardLayout` or route elements with an auth check).

Integration & dependencies to watch
- Router: `react-router-dom` (v7+); routing uses `<Routes>` / `element` props. Follow existing patterns in `src/App.tsx`.
- Charts: `recharts` is used in dashboard pages.
- Icons: `lucide-react` is used across layout components.
- Build: `tsc -b` is run before `vite build` — the repository uses TypeScript project references (see `tsconfig.*.json`). Keep `tsconfig` references consistent if you change project layout.

How to add a new dashboard page (example)
1. Create `src/pages/dashboard/MyPage.tsx` exporting `export function MyPage(){ return <div/> }
2. Add route in `src/App.tsx`: `<Route path="my-page" element={<MyPage/>} />` inside the `/dashboard` group.
3. Use named imports and add any new styles to Tailwind tokens if needed.

Files to inspect when unsure
- Routing & entry: `src/App.tsx`, `src/main.tsx`
- Layouts: `src/components/layout/PublicLayout.tsx`, `src/components/layout/Header.tsx`, `src/components/layout/Sidebar.tsx`
- UI primitives: `src/components/ui/*` (e.g., `Button.tsx`)
- Helpers: `src/lib/utils.ts`, `src/lib/reports.ts`
- Build config: `package.json`, `vite.config.ts`, `tsconfig.app.json`, `tailwind.config.js`

Notes for AI edits
- Preserve explicit `.tsx` extensions and named exports when modifying imports.
- Avoid changing Tailwind tokens (theme names) without updating `tailwind.config.js`.
- Keep the `tsc -b` step in CI/build flows; changing TS project references requires updating `tsconfig.*.json`.

If anything above is unclear or you'd like more examples (e.g., a template PR or sample page component), tell me which area to expand.
