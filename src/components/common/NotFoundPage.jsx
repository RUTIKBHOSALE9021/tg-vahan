import { Link } from 'react-router-dom';

import { PATHS } from '@routes/paths';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50 text-center">
      <h1 className="text-6xl font-extrabold text-brand-primary">404</h1>
      <p className="text-gray-600">This page could not be found.</p>
      <Link to={PATHS.DASHBOARD} className="btn-primary">
        Back to Dashboard
      </Link>
    </div>
  );
}
