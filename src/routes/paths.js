/**
 * Central route path registry. Reference these constants instead of
 * hardcoding URL strings across the app (links, redirects, guards).
 */
export const PATHS = Object.freeze({
  // Public / auth
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',

  // Protected (dashboard shell)
  DASHBOARD: '/dashboard',

  USERS_CREATE: '/users/create',
  USERS_MANAGE: '/users',

  CERT_SEARCH: '/certificates/search',
  CERT_REGENERATE_QR: '/certificates/regenerate-qr',
  CERT_BY_BRAND: '/certificates/by-brand',
  CERT_BY_USER: '/certificates/by-user',

  ANALYTICS: '/analytics',
  API_LOGS: '/api-logs',
  VEHICLE_SEARCH: '/vehicles/search',
  ACCESS_MANAGEMENT: '/access-management',
  PROFILE: '/profile',

  // Fallback
  NOT_FOUND: '*',
});
