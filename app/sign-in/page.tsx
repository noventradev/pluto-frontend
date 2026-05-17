'use client';

import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { useAuth } from '@/providers/auth-provider';
import {
  validateLoginForm,
  AuthFieldErrors,
} from '@/app/lib/validators/auth.validators';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Link from 'next/link';

export default function SignIn() {
  const router = useRouter();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<AuthFieldErrors>({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setServerError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');

    const fieldErrors = validateLoginForm(form);
    if (fieldErrors) {
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      await login(form);
      router.push('/dashboard');
    } catch (err: unknown) {
      const error = err as { message?: string };
      setServerError(error.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left — Branding */}
      <div className="bg-surface flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
        <Logo />
        <h1 className="mt-6 text-3xl font-bold">Welcome Back</h1>
        <p className="text-muted mt-2 max-w-sm">
          Sign in to access your cashflow dashboard and manage your income
          streams effortlessly.
        </p>
      </div>

      {/* Right — Form */}
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
          <div>
            <h2 className="text-2xl font-semibold">Sign In</h2>
            <p className="text-muted text-sm">
              Enter your credentials to continue
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-muted text-sm font-medium">Email</label>
              <input
                id="login-email"
                name="email"
                type="email"
                placeholder="Enter Email"
                value={form.email}
                onChange={handleChange}
                className={`border-border rounded-xl border px-3 py-2 text-sm outline-none transition focus:ring-2 ${
                  errors.email ? 'border-red-500' : ''
                }`}
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-muted text-sm font-medium">
                Password
              </label>
              <input
                id="login-password"
                name="password"
                type="password"
                placeholder="Enter Password"
                value={form.password}
                onChange={handleChange}
                className={`border-border rounded-xl border px-3 py-2 text-sm outline-none transition focus:ring-2 ${
                  errors.password ? 'border-red-500' : ''
                }`}
              />
              {errors.password && (
                <p className="text-xs text-red-500">{errors.password}</p>
              )}
            </div>
          </div>

          {/* Server error */}
          {serverError && (
            <p className="rounded-lg bg-red-50 p-2 text-center text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400">
              {serverError}
            </p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>

          <p className="text-muted text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link
              href="/signup"
              className="text-foreground font-medium underline underline-offset-4 hover:opacity-80"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
