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
      // Login: send role + username + password.
      // The backend echoes the role back in the response, e.g.
      //   { token, user: { id, name, ... }, role: 'admin' | 'dealer' | 'user' }
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials, // { role, username, password }
      }),
      invalidatesTags: ['Auth'],
    }),

    register: builder.mutation({
      query: (payload) => ({
        url: '/auth/register',
        method: 'POST',
        body: payload,
      }),
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
