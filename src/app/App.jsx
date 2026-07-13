import AppRoutes from '@routes/AppRoutes';

/**
 * App shell. Keep this thin — providers live in main.jsx, routing lives
 * in @routes/AppRoutes. Global concerns like an ErrorBoundary or a toast
 * container can wrap <AppRoutes /> here.
 */
export default function App() {
  return <AppRoutes />;
}
