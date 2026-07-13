import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectIsAuthenticated } from '@features/auth/authSlice';
import { PATHS } from '@routes/paths';

/**
 * Gate for authenticated areas. Renders child routes if the user is logged in,
 * otherwise redirects to /login (preserving the attempted location so we can
 * send them back after sign-in).
 *
 * Usage (in AppRoutes):
 *   <Route element={<ProtectedRoute />}>
 *     <Route element={<DashboardLayout />}> ...protected pages... </Route>
 *   </Route>
 */
export default function ProtectedRoute() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={PATHS.LOGIN} state={{ from: location }} replace />;
  }

  return <Outlet />;
}
