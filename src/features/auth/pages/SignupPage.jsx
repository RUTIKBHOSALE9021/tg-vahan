import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { useRegisterMutation } from '@features/auth/authApi';
import { setCredentials } from '@features/auth/authSlice';
import { PATHS } from '@routes/paths';

const inputClass =
  'w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand-accent';
const labelClass = 'mb-1 block text-sm font-medium text-gray-700';

/**
 * SignupPage — create an account.
 *
 * POSTs { fullName, email, password } via useRegisterMutation. If the backend
 * returns tokens we log the user straight in; otherwise we send them to /login.
 */
export default function SignupPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const { fullName, email, password } = form;
      const data = await register({ fullName, email, password }).unwrap();

      // Auto-login if the backend returned a session; otherwise go to login.
      if (data?.accessToken) {
        dispatch(
          setCredentials({
            user: data.user ?? null,
            role: data.user?.userRoleId ?? null,
            token: data.accessToken,
            refreshToken: data.refreshToken ?? null,
          })
        );
        navigate(PATHS.DASHBOARD, { replace: true });
      } else {
        navigate(PATHS.LOGIN, {
          replace: true,
          state: { registered: true },
        });
      }
    } catch (err) {
      setError(
        err?.data?.details?.[0] ??
          err?.data?.message ??
          'Sign up failed. Please try again.'
      );
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
      <h1 className="text-3xl font-bold">Create account</h1>
      <p className="mt-1 text-gray-500">Get started with your dashboard.</p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="fullName" className={labelClass}>
            Full name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            value={form.fullName}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="password" className={labelClass}>
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            value={form.password}
            onChange={handleChange}
            required
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className={labelClass}>
            Confirm password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            className={inputClass}
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
          {isLoading ? 'Creating account…' : 'Sign Up'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Already have an account?{' '}
        <Link
          to={PATHS.LOGIN}
          className="font-semibold text-brand-accent hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
