import { Navigate, Route, Routes } from 'react-router-dom';

import ProtectedRoute from '@routes/ProtectedRoute';
import PublicRoute from '@routes/PublicRoute';
import { PATHS } from '@routes/paths';

import AuthLayout from '@components/layout/AuthLayout';
import DashboardLayout from '@components/layout/DashboardLayout';

// Feature pages (placeholders for now — implement inside each feature module).
import LoginPage from '@features/auth/pages/LoginPage';
import SignupPage from '@features/auth/pages/SignupPage';
import DashboardPage from '@features/dashboard/pages/DashboardPage';
import NotFoundPage from '@components/common/NotFoundPage';

/**
 * Application route tree.
 *
 * Structure:
 *   /login, /register ...   -> AuthLayout (public)
 *   /dashboard, ...         -> ProtectedRoute -> DashboardLayout (private)
 *
 * Add role-restricted branches with <RoleGuard allow={[...]} /> as needed.
 * As the app grows, consider React.lazy + <Suspense> for code-splitting.
 */
export default function AppRoutes() {
  return (
    <Routes>
      {/* Public / auth routes (redirect away if already authenticated) */}
      <Route element={<PublicRoute />}>
        <Route element={<AuthLayout />}>
          <Route path={PATHS.LOGIN} element={<LoginPage />} />
          <Route path={PATHS.REGISTER} element={<SignupPage />} />
          {/* <Route path={PATHS.FORGOT_PASSWORD} element={<ForgotPasswordPage />} /> */}
        </Route>
      </Route>

      {/* Protected routes (require authentication) */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path={PATHS.DASHBOARD} element={<DashboardPage />} />
          {/* Add feature pages here, e.g.:
          <Route path={PATHS.CERT_SEARCH} element={<SearchCertificatePage />} />
          <Route element={<RoleGuard allow={[ROLES.ADMIN]} />}>
            <Route path={PATHS.USERS_CREATE} element={<CreateUserPage />} />
          </Route> */}
        </Route>
      </Route>

      {/* Default + 404 */}
      <Route path="/" element={<Navigate to={PATHS.DASHBOARD} replace />} />
      <Route path={PATHS.NOT_FOUND} element={<NotFoundPage />} />
    </Routes>
  );
}
