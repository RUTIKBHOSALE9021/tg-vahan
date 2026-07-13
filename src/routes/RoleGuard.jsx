import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectCurrentRole } from '@features/auth/authSlice';
import { PATHS } from '@routes/paths';

/**
 * Role-based route guard. Use inside a ProtectedRoute subtree to restrict
 * pages to specific access levels (e.g. only Admin can create users).
 *
 * Usage:
 *   <Route element={<RoleGuard allow={[ROLES.ADMIN]} />}>
 *     <Route path="/users/create" element={<CreateUserPage />} />
 *   </Route>
 */
export default function RoleGuard({ allow = [] }) {
  const role = useSelector(selectCurrentRole);

  if (!allow.includes(role)) {
    // Not authorized — send back to the dashboard (or a 403 page).
    return <Navigate to={PATHS.DASHBOARD} replace />;
  }

  return <Outlet />;
}
