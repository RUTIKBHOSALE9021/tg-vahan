import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { baseApi } from '@services/api/baseApi';
import authReducer from '@features/auth/authSlice';

/**
 * Root Redux store.
 *
 * - `api`  : single RTK Query slice; all feature endpoints inject into it.
 * - slices : add feature UI/state slices here (auth is the first one).
 */
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
    // ui: uiReducer,          // e.g. sidebar collapsed, theme, toasts
    // <feature>: <feature>Reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

// Enables refetchOnFocus / refetchOnReconnect behaviors.
setupListeners(store.dispatch);
