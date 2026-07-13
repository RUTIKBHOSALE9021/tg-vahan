import { NavLink } from 'react-router-dom';

import { PATHS } from '@routes/paths';

/**
 * Sidebar navigation — PLACEHOLDER.
 *
 * Drive items from a config array so you can filter by role (see roles.js).
 * Only the Dashboard link is wired up; add the rest as pages are built.
 */
const NAV_ITEMS = [
  { to: PATHS.DASHBOARD, label: 'Dashboard' },
  // { to: PATHS.USERS_CREATE, label: 'Create Users', roles: [ROLES.ADMIN] },
  // { to: PATHS.USERS_MANAGE, label: 'Display/Edit Users' },
  // { to: PATHS.CERT_SEARCH, label: 'Search Certificate' },
  // { to: PATHS.CERT_REGENERATE_QR, label: 'Regenerate QR' },
  // { to: PATHS.ANALYTICS, label: 'Strategic Analytics' },
  // { to: PATHS.VEHICLE_SEARCH, label: 'Vehicle Search' },
  // { to: PATHS.ACCESS_MANAGEMENT, label: 'Access Management' },
  // { to: PATHS.PROFILE, label: 'My Profile' },
];

export default function Sidebar() {
  return (
    <aside className="flex w-64 flex-col bg-sidebar text-gray-200">
      <div className="p-5 text-xl font-bold text-brand-accent">TGVAHAN</div>
      <nav className="flex-1 space-y-1 px-3">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `block rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                isActive
                  ? 'bg-sidebar-active text-white'
                  : 'hover:bg-sidebar-hover'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
