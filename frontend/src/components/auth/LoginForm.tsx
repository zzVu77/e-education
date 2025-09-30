/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Link from "next/link";
import { useState } from "react";

type FieldErrors = Partial<{
  username: string;
  password: string;
  global: string;
}>;

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  const validate = () => {
    const e: FieldErrors = {};
    if (!username) e.username = "Username is required.";
    else if (username.length < 1)
      e.username = "Username must be at least 1 character";
    if (!password) e.password = "Password is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrors((prev) => ({ ...prev, global: undefined }));

    try {
      // replace w ur real auth endpoint
      // e.g:
      // const res = await fetch("/api/auth/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ username, password, remember }),
      //   credentials: "include",
      // });
      // if (!res.ok) throw new Error("Invalid username or password.");

      // Simulate latency
      await new Promise((r) => setTimeout(r, 800));

      // redirect to app logic
      window.location.href = "/"; // or use next/navigation's redirect()
    } catch (err) {
      // dont enumerate which part failed (prevents account enumeration)
      setErrors({
        global:
          "We couldn’t sign you in. Please check your credentials and try again.",
      });
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto w-full rounded-2xl border border-gray-200/70 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-neutral-900"
      noValidate
    >
      {/* Username */}
      <div className="mb-4">
        <label
          htmlFor="username"
          className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Username
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
            {/* user icon */}
            <svg
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </span>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            inputMode="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`block w-full rounded-xl border bg-white py-2.5 pl-11 pr-3 text-[15px] outline-none transition focus:ring-4 disabled:opacity-60 dark:bg-neutral-900 ${
              errors.username
                ? "border-red-500/70 focus:ring-red-100"
                : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-100"
            }`}
            placeholder="yourusername"
            aria-invalid={!!errors.username}
            aria-describedby={errors.username ? "email-error" : undefined}
          />
        </div>
        {errors.username && (
          <p
            id="username-error"
            className="mt-1 text-sm text-red-600"
            role="alert"
            aria-live="polite"
          >
            {errors.username}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Password
          </label>
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Forgot your password?
          </Link>
        </div>

        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
            {/* lock icon */}
            <svg
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </span>

          <input
            id="password"
            name="password"
            type={showPwd ? "text" : "password"}
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`block w-full rounded-xl border bg-white py-2.5 pl-11 pr-11 text-[15px] outline-none transition focus:ring-4 disabled:opacity-60 dark:bg-neutral-900 ${
              errors.password
                ? "border-red-500/70 focus:ring-red-100"
                : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-100"
            }`}
            placeholder="••••••••"
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? "password-error" : undefined}
          />

          {/* password reveal */}
          <button
            type="button"
            onClick={() => setShowPwd((s) => !s)}
            className="absolute inset-y-0 right-2.5 inline-flex items-center rounded-lg px-2.5 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label={showPwd ? "Hide password" : "Show password"}
          >
            {showPwd ? (
              // eye-off
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20C7 20 2.73 16.11 1 12c.58-1.36 1.46-2.66 2.6-3.82M9.9 4.24A10.94 10.94 0 0 1 12 4c5 0 9.27 3.89 11 8-1.02 2.38-2.78 4.45-4.95 5.86M1 1l22 22" />
              </svg>
            ) : (
              // eye
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>

        {errors.password && (
          <p
            id="password-error"
            className="mt-1 text-sm text-red-600"
            role="alert"
            aria-live="polite"
          >
            {errors.password}
          </p>
        )}
      </div>

      {/* Remember me */}
      <div className="mb-5 flex items-center gap-2">
        <input
          id="remember"
          name="remember"
          type="checkbox"
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <label
          htmlFor="remember"
          className="text-sm text-gray-700 dark:text-gray-200"
        >
          Remember me
        </label>
      </div>

      {/* Global error */}
      {errors.global && (
        <div
          className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
          role="alert"
          aria-live="polite"
        >
          {errors.global}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <svg
              className="mr-2 h-4 w-4 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            Signing in…
          </>
        ) : (
          "Sign in"
        )}
      </button>

      {/* Divider */}
      <div className="my-6 flex items-center">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="px-3 text-sm text-gray-500">Or continue with</span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      {/* Social sign-in */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => (window.location.href = "/api/auth/google")}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-indigo-100 dark:bg-neutral-900 dark:text-gray-200"
          aria-label="Continue with Google"
        >
          {/* Google 'G' */}
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <path
              d="M21.35 11.1H12v2.9h5.31A5.81 5.81 0 1112 6.19a5.64 5.64 0 013.98 1.55l2.05-2.05A8.93 8.93 0 0012 3a9 9 0 100 18c4.63 0 8.5-3.37 8.5-8.5 0-.57-.06-1.1-.15-1.6z"
              fill="currentColor"
            />
          </svg>
          Google
        </button>

        <button
          type="button"
          onClick={() => (window.location.href = "/api/auth/facebook")}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-indigo-100 dark:bg-neutral-900 dark:text-gray-200"
          aria-label="Continue with Facebook"
        >
          {/* Facebook 'f' */}
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <path
              d="M13 22v-8h3l.5-3H13V9.5c0-.87.28-1.5 1.7-1.5H17V5.1C16.3 5 15.2 5 14.4 5 12 5 10.4 6.4 10.4 9.1V11H8v3h2.4v8H13z"
              fill="currentColor"
            />
          </svg>
          Facebook
        </button>
      </div>
    </form>
  );
}
