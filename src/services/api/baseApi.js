import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import env from '@config/env';

/**
 * Single RTK Query "base API" for the whole app.
 *
 * Each feature injects its own endpoints via `baseApi.injectEndpoints(...)`
 * (see src/features/auth/authApi.js for the pattern). This keeps one shared
 * cache, one middleware, and avoids a giant central api file.
 *
 * `tagTypes` are declared here and used by feature endpoints for cache
 * invalidation (e.g. creating a user invalidates the ['User'] list).
 */
const baseQuery = fetchBaseQuery({
  baseUrl: env.API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    // Attach the auth token from the auth slice, if present.
    const token = getState()?.auth?.token;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

// Wrapper to centralize cross-cutting concerns (401 handling, refresh, etc.).
const baseQueryWithReauth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    // TODO: dispatch(logout()) or trigger a token refresh flow here.
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'Auth',
    'User',
    'Certificate',
    'Dealer',
    'Vehicle',
    'Dashboard',
    'Analytics',
    'AccessLog',
  ],
  // Endpoints are injected per-feature; keep this empty here.
  endpoints: () => ({}),
});
