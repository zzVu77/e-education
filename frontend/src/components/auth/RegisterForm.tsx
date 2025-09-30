/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Link from "next/link";
import { useState } from "react";

type FieldErrors = Partial<{
  name: string;
  username: string;
  password: string;
  confirm: string;
  terms: string;
  global: string;
}>;

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  const validate = () => {
    const e: FieldErrors = {};
    if (!name.trim()) e.name = "Full name is required.";

    if (!username.trim()) e.username = "Username is required.";
    else if (username.length < 1)
      e.username = "Username must be at least 1 character";
    if (!password) e.password = "Password is required.";
    else if (password.length < 8) e.password = "Use at least 8 characters.";

    if (!confirm) e.confirm = "Please confirm your password.";
    else if (confirm !== password) e.confirm = "Passwords don’t match.";

    if (!agree) e.terms = "You must agree to continue.";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrors((p) => ({ ...p, global: undefined }));

    try {
      // Wire this to your backend
      // const res = await fetch("/api/auth/register", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ name, username, password, agree }),
      //   credentials: "include",
      // });
      // if (!res.ok) throw new Error("Registration failed.");

      await new Promise((r) => setTimeout(r, 800));
      window.location.href = "/login?new=1";
    } catch (err) {
      setErrors({
        global: "Something went wrong creating your account. Please try again.",
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
      {/* Full Name */}
      <div className="mb-4">
        <label
          htmlFor="name"
          className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Full Name
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
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
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`block w-full rounded-xl border bg-white py-2.5 pl-11 pr-3 text-[15px] outline-none transition focus:ring-4 disabled:opacity-60 dark:bg-neutral-900 ${
              errors.name
                ? "border-red-500/70 focus:ring-red-100"
                : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-100"
            }`}
            placeholder="John Doe"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
        </div>
        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.name}
          </p>
        )}
      </div>

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
            aria-describedby={errors.username ? "username-error" : undefined}
          />
        </div>
        {errors.username && (
          <p
            id="username-error"
            className="mt-1 text-sm text-red-600"
            role="alert"
          >
            {errors.username}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="mb-4">
        <label
          htmlFor="password"
          className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Password
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
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
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`block w-full rounded-xl border bg-white py-2.5 pl-11 pr-3 text-[15px] outline-none transition focus:ring-4 disabled:opacity-60 dark:bg-neutral-900 ${
              errors.password
                ? "border-red-500/70 focus:ring-red-100"
                : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-100"
            }`}
            placeholder="••••••••"
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? "password-error" : undefined}
          />
        </div>
        {errors.password && (
          <p
            id="password-error"
            className="mt-1 text-sm text-red-600"
            role="alert"
          >
            {errors.password}
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="mb-4">
        <label
          htmlFor="confirm"
          className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Confirm Password
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
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
            id="confirm"
            name="confirm"
            type="password"
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className={`block w-full rounded-xl border bg-white py-2.5 pl-11 pr-3 text-[15px] outline-none transition focus:ring-4 disabled:opacity-60 dark:bg-neutral-900 ${
              errors.confirm
                ? "border-red-500/70 focus:ring-red-100"
                : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-100"
            }`}
            placeholder="••••••••"
            aria-invalid={!!errors.confirm}
            aria-describedby={errors.confirm ? "confirm-error" : undefined}
          />
        </div>
        {errors.confirm && (
          <p
            id="confirm-error"
            className="mt-1 text-sm text-red-600"
            role="alert"
          >
            {errors.confirm}
          </p>
        )}
      </div>

      {/* Terms */}
      <div className="mb-5 flex items-start gap-2">
        <input
          id="terms"
          name="terms"
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        <label
          htmlFor="terms"
          className="text-sm text-gray-700 dark:text-gray-200"
        >
          I agree to the{" "}
          <Link href="/terms" className="text-indigo-600 hover:text-indigo-500">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="text-indigo-600 hover:text-indigo-500"
          >
            Privacy Policy
          </Link>
          .
        </label>
      </div>
      {errors.terms && (
        <p className="mb-4 text-sm text-red-600" role="alert">
          {errors.terms}
        </p>
      )}

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
            Creating account…
          </>
        ) : (
          "Create Account"
        )}
      </button>
    </form>
  );
}
