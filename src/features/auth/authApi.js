import { baseApi } from '@services/api/baseApi';

/**
 * Auth endpoints, injected into the shared baseApi.
 *
 * This is the REFERENCE PATTERN for every feature's data layer:
 *   1. import { baseApi }
 *   2. baseApi.injectEndpoints({ endpoints: (builder) => ({ ... }) })
 *   3. export the auto-generated hooks (useXxxQuery / useXxxMutation)
 *
 * Adjust `url`/`method`/`body` shapes to the real ASP.NET backend contract.
 */
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      // Login: POST { mobile, password, role_id }.
      // Backend responds with an envelope:
      //   { success, message, data: { user, accessToken, refreshToken } }
      // transformResponse unwraps `data` so the hook returns the useful part.
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials, // { mobile, password, role_id }
      }),
      transformResponse: (response) => response?.data ?? response,
      invalidatesTags: ['Auth'],
    }),

    register: builder.mutation({
      // Signup: POST { fullName, email, password }.
      // Response uses the same envelope; unwrap `data` (may include tokens for
      // auto-login, otherwise the user proceeds to /login).
      query: (payload) => ({
        url: '/auth/register',
        method: 'POST',
        body: payload, // { fullName, email, password }
      }),
      transformResponse: (response) => response?.data ?? response,
    }),

    forgotPassword: builder.mutation({
      query: (payload) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: payload,
      }),
    }),

    me: builder.query({
      query: () => '/auth/me',
      providesTags: ['Auth'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useMeQuery,
} = authApi;
