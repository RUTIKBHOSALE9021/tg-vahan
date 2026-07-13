import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { useLoginMutation } from '@features/auth/authApi';
import { setCredentials } from '@features/auth/authSlice';
import { ROLE_OPTIONS, ROLES } from '@constants/roles';
import { PATHS } from '@routes/paths';

/**
 * LoginPage — role + username + password sign-in.
 *
 * The user picks a role, then we POST { role, username, password } via
 * useLoginMutation. On success we store the session (preferring the role the
 * backend echoes back, falling back to the selected one) and redirect to the
 * page they originally tried to reach, or the dashboard.
 */
export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [login, { isLoading }] = useLoginMutation();

  const [form, setForm] = useState({
    role: ROLES.USER,
    username: '',
    password: '',
  });
  const [error, setError] = useState(null);

  // Where to send the user after login (set by ProtectedRoute), else dashboard.
  const redirectTo = location.state?.from?.pathname ?? PATHS.DASHBOARD;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const data = await login(form).unwrap();
      dispatch(
        setCredentials({
          user: data.user ?? null,
          role: data.role ?? form.role,
          token: data.token ?? null,
        })
      );
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(
        err?.data?.message ?? 'Sign in failed. Check your details and try again.'
      );
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
      <h1 className="text-3xl font-bold">Sign In</h1>
      <p className="mt-1 text-gray-500">Access your secure dashboard.</p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
        <div>
          <label
            htmlFor="role"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Role
          </label>
          <select
            id="role"
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand-accent"
          >
            {ROLE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="username"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Username / Mobile
          </label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand-accent"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand-accent"
          />
        </div>

        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-brand-accent py-2.5 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}
