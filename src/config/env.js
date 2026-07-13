/**
 * Centralized, validated access to environment variables.
 *
 * Import from here instead of reading `import.meta.env` all over the app.
 * This gives one place to document, default, and validate config.
 */

const env = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  APP_NAME: import.meta.env.VITE_APP_NAME ?? 'TGVAHAN',
  APP_ENV: import.meta.env.VITE_APP_ENV ?? 'development',
  IS_PROD: import.meta.env.PROD,
  IS_DEV: import.meta.env.DEV,
};

export default env;
