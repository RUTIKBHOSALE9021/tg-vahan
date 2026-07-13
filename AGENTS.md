# Repository Guidelines

TGVAHAN frontend — a role-based (Admin / Dealer / User) React dashboard for
reflective-tape management and safety compliance, talking to an ASP.NET backend.
The repo is currently an **architecture scaffold**: structure and config are in
place; most feature pages are `TODO` stubs. `features/auth` is the reference
implementation to copy.

## Project Structure & Module Organization

Code is **feature-sliced** under `src/features/<domain>/` (auth, dashboard,
users, certificates, analytics, vehicles, access-management). Each feature owns
its `pages/`, `components/`, `<name>Api.js`, and slice. Truly shared code lives
at the top level: `components/{common,layout,ui}`, `hooks/`, `utils/`,
`services/api/baseApi.js`, `constants/roles.js`, `config/env.js`. The app shell
and Redux store are in `app/`; the route tree in `routes/`.

Two rules drive the data layer:
- **All server data goes through one RTK Query API.** Features call
  `baseApi.injectEndpoints(...)` (see `features/auth/authApi.js`); tag types are
  declared centrally in `services/api/baseApi.js`. Never store server data in a
  Redux slice.
- **Redux slices hold client/UI state only** (auth session, sidebar, theme).
  `features/auth/authSlice.js` is the model — expose state via selectors.

Routing is centralized: all URLs live in `routes/paths.js` (no hardcoded
strings). Public pages render under `AuthLayout`; private pages under
`ProtectedRoute` → `DashboardLayout`; restrict by role with
`<RoleGuard allow={[...]} />` fed from `constants/roles.js`.

## Build & Development Commands

- `npm install` — install dependencies.
- `npm run dev` — Vite dev server on http://localhost:3000 (auto-opens).
- `npm run build` — production build to `dist/`.
- `npm run preview` — serve the built bundle.
- `npm run lint` — ESLint (fails on any warning: `--max-warnings 0`).
- `npm run format` — Prettier over `src/**/*.{js,jsx,css}`.

Copy `.env.example` to `.env`; only `VITE_`-prefixed vars reach the bundle, so
put no secrets there. Access env vars through `config/env.js`, not
`import.meta.env` directly.

## Coding Style & Naming Conventions

Prettier (`.prettierrc`) is authoritative: single quotes, semicolons, 2-space
indent, 80-col width, `es5` trailing commas, always-parens arrows. ESLint uses
the flat config (`eslint.config.js`) with react, react-hooks, and react-refresh
plugins; `react/prop-types` is off. Import via path aliases (`@features/...`,
`@components/...`, etc.) rather than `../../` chains — keep `vite.config.js` and
`jsconfig.json` aliases in sync.
