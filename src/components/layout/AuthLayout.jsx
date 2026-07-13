import { Outlet } from 'react-router-dom';

/**
 * AuthLayout — shell for public auth pages (login/register/forgot).
 * Renders the branded gradient panel + the page content (via <Outlet />).
 * PLACEHOLDER styling; refine to match the design.
 */
export default function AuthLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Left branded panel */}
      <aside className="hidden w-1/2 flex-col items-center justify-center bg-brand-gradient p-12 text-white lg:flex">
        <h2 className="text-5xl font-extrabold tracking-tight text-brand-accent">
          TGVAHAN
        </h2>
        <p className="mt-4 max-w-xs text-center text-lg text-white/90">
          Intelligent Reflective Tape Management &amp; Safety Compliance.
        </p>
      </aside>

      {/* Right content (auth card) */}
      <main className="flex flex-1 items-center justify-center bg-gray-50 p-6">
        <Outlet />
      </main>
    </div>
  );
}
