import { useDispatch, useSelector } from 'react-redux';

import { logout, selectCurrentUser } from '@features/auth/authSlice';

/**
 * Topbar — PLACEHOLDER.
 * Shows the logged-in user and a logout action. Add a hamburger to toggle the
 * sidebar on mobile, breadcrumbs, notifications, etc.
 */
export default function Topbar() {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <button className="text-gray-500" aria-label="Toggle sidebar">
        ☰
      </button>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          {user?.name ?? 'Guest'}
        </span>
        <button
          onClick={() => dispatch(logout())}
          className="text-sm font-medium text-brand-danger hover:underline"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
