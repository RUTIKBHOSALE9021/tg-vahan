import { useSelector } from 'react-redux';

import {
  selectCurrentUser,
  selectCurrentRole,
  selectIsAuthenticated,
} from '@features/auth/authSlice';

/**
 * Convenience hook to read auth state anywhere.
 * Usage: const { user, role, isAuthenticated } = useAuth();
 */
export function useAuth() {
  const user = useSelector(selectCurrentUser);
  const role = useSelector(selectCurrentRole);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return { user, role, isAuthenticated };
}
