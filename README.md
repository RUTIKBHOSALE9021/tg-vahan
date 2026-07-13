# TGVAHAN — Frontend

Frontend for **TGVAHAN** — Intelligent Reflective Tape Management & Safety
Compliance. Role-based dashboard (Admin / Dealer / User) talking to an ASP.NET
backend.

## Tech stack

| Concern        | Choice                                  |
| -------------- | --------------------------------------- |
| Framework      | React 18                                |
| Language       | JavaScript (JSX)                        |
| Build tool     | Vite                                    |
| Styling        | Tailwind CSS                            |
| Routing        | React Router v6                         |
| State          | Redux Toolkit                           |
| Server data    | RTK Query (single injected `baseApi`)   |
| Lint / Format  | ESLint + Prettier                       |

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env      # then edit VITE_API_BASE_URL to point at the backend

# 3. Run the dev server (http://localhost:3000)
npm run dev
```

Other scripts: `npm run build`, `npm run preview`, `npm run lint`,
`npm run format`.

> This repo is currently an **architecture scaffold**: folder structure,
> config, and documented placeholders. Feature pages are stubs marked `TODO`.

## Architecture

**Feature-based (feature-sliced) structure.** Code is grouped by business
domain, not by file type. Everything a feature needs (pages, components, API
endpoints, state) lives in its own folder under `src/features/`. Truly shared
things live at the top level (`components/`, `hooks/`, `utils/`, `services/`).

```
src/
├── app/                 # App shell + Redux store
│   ├── App.jsx
│   └── store.js
├── assets/              # Static images, fonts, icons
├── components/
│   ├── common/          # Shared non-UI-kit components (NotFoundPage, ...)
│   ├── layout/          # AuthLayout, DashboardLayout, Sidebar, Topbar
│   └── ui/              # Reusable presentational primitives (Button, Input...)
├── config/
│   └── env.js           # Validated env-var access (import.meta.env wrapper)
├── constants/
│   └── roles.js         # Roles / access levels for RBAC
├── features/            # ← the heart of the app, one folder per domain
│   ├── auth/            # ✅ reference implementation (slice + api + page)
│   │   ├── pages/
│   │   ├── authApi.js   #   RTK Query endpoints (injected into baseApi)
│   │   └── authSlice.js #   Redux slice (user, role, token) + selectors
│   ├── dashboard/
│   ├── users/
│   ├── certificates/
│   ├── analytics/
│   ├── vehicles/
│   └── access-management/
├── hooks/               # Shared hooks (useAuth, ...)
├── routes/
│   ├── AppRoutes.jsx    # Route tree (public vs protected)
│   ├── ProtectedRoute.jsx  # Auth gate
│   ├── RoleGuard.jsx    # Role-based gate
│   └── paths.js         # Central path registry (no hardcoded URLs)
├── services/
│   └── api/baseApi.js   # Single RTK Query API; features inject endpoints
├── styles/
│   └── index.css        # Tailwind entry + global base/component layers
├── utils/               # Pure helpers (formatters, ...)
└── main.jsx             # Entry: Provider + BrowserRouter + <App />
```

### Key conventions

1. **Data layer = RTK Query, one `baseApi`.** Every feature adds endpoints via
   `baseApi.injectEndpoints(...)` (see `features/auth/authApi.js`). This keeps a
   single cache, single middleware, and shared cache tags. Server data lives in
   the query cache — **not** in Redux slices.

2. **Redux slices are for client/UI state only** (auth session, sidebar state,
   theme). `features/auth/authSlice.js` is the reference example.

3. **Path aliases.** Import with `@features/...`, `@components/...`, etc.
   (configured in `vite.config.js` + `jsconfig.json`) — no `../../../` chains.

4. **Routing is centralized.** All paths live in `routes/paths.js`. Auth pages
   render under `AuthLayout`; protected pages under `ProtectedRoute` →
   `DashboardLayout`. Restrict by role with `<RoleGuard allow={[...]} />`.

5. **RBAC** flows from `constants/roles.js` → auth slice `role` →
   `RoleGuard` + conditional nav/UI.

### Adding a new feature (checklist)

1. Create `src/features/<name>/` with `pages/`, `components/`, `<name>Api.js`.
2. Inject endpoints into `baseApi` in `<name>Api.js`; export the hooks.
3. (If needed) add a slice and register it in `app/store.js`.
4. Add paths to `routes/paths.js` and routes to `routes/AppRoutes.jsx`.
5. Add a nav entry (with role filter) in `components/layout/Sidebar.jsx`.

## Next steps

- [ ] Install deps and verify `npm run dev` boots.
- [ ] Build `components/ui` primitives (Button, Input, Select, Card, Table…).
- [ ] Implement the Login form and wire `useLoginMutation` + `setCredentials`.
- [ ] Build the Dashboard stat cards + charts (pick a chart lib, e.g. recharts).
- [ ] Flesh out remaining features (see each `features/*/README.md`).
```
