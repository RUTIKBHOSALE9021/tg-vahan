import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectIsAuthenticated } from '@features/auth/authSlice';
import { PATHS } from '@routes/paths';

/**
 * Guest-only gate for public auth pages (login/register/forgot).
 *
 * If the user is already authenticated, redirect them away from these pages —
 * back to wherever they were headed (set by ProtectedRoute), else the dashboard.
 * Otherwise render the child routes.
 */
export default function PublicRoute() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();

  if (isAuthenticated) {
    const redirectTo = location.state?.from?.pathname ?? PATHS.DASHBOARD;
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}
