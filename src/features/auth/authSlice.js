import { createSlice } from '@reduxjs/toolkit';

/**
 * Auth state slice.
 *
 * Holds the current user, role, and token. This is the ONE reference example
 * of a UI/state slice — model other stateful features the same way.
 * (Server data like user lists / certificates should live in RTK Query cache,
 *  not here.)
 *
 * NOTE: token is hydrated from localStorage for a simple persistence example.
 * For production, prefer httpOnly cookies to avoid XSS token theft.
 */
const TOKEN_KEY = 'tgvahan.token';

const initialState = {
  user: null,
  role: null,
  token: localStorage.getItem(TOKEN_KEY) || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, role, token } = action.payload;
      state.user = user ?? null;
      state.role = role ?? null;
      state.token = token ?? null;
      if (token) localStorage.setItem(TOKEN_KEY, token);
    },
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.token = null;
      localStorage.removeItem(TOKEN_KEY);
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

// Selectors — components read auth via these, not by reaching into state shape.
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentRole = (state) => state.auth.role;
export const selectIsAuthenticated = (state) => Boolean(state.auth.token);

export default authSlice.reducer;
