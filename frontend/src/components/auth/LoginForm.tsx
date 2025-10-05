"use client";
import axiosInstance from "@/config/axiosConfig";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import * as z from "zod";

type FieldErrors = Partial<{
  username: string;
  password: string;
  global: string;
}>;

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo");
  const validateSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters long"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  });

  const validate = () => {
    const result = validateSchema.safeParse({ username, password });
    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      result.error.issues.forEach((err) => {
        if (err.path[0] && !fieldErrors[err.path[0] as keyof FieldErrors]) {
          fieldErrors[err.path[0] as keyof FieldErrors] = err.message;
        }
      });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };
  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrors((prev) => ({ ...prev, global: undefined }));

    try {
      const response = await axiosInstance.post("/auth/login", {
        username,
        password,
      });
      toast.success(response.message, { duration: 2000 });
      window.location.href = returnTo || "/";
    } catch {
      setErrors({
        global:
          "Something went wrong ! Please check your credentials and try again.",
      });
      setLoading(false);
    }
  };
  const handleOnclickGoogle = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/google`;
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
                : "border-gray-300 focus:border-green-500 focus:ring-green-100"
            }`}
            placeholder="alice123"
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
            href="#"
            className="text-sm font-medium text-green-600 hover:text-green-500"
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
                : "border-gray-300 focus:border-green-500 focus:ring-green-100"
            }`}
            placeholder="••••••••"
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? "password-error" : undefined}
          />

          {/* password reveal */}
          <button
            type="button"
            onClick={() => setShowPwd((s) => !s)}
            className="absolute inset-y-0 right-2.5 inline-flex items-center rounded-lg px-2.5 text-gray-500 hover:text-gray-700 cursor-pointer "
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
        className="inline-flex w-full items-center justify-center rounded-xl bg-green-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-100 disabled:cursor-not-allowed cursor-pointer"
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
      <div className="grid grid-cols-1 gap-3">
        <button
          type="button"
          onClick={() => handleOnclickGoogle()}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-green-100 dark:bg-neutral-900 dark:text-gray-200 cursor-pointer"
          aria-label="Continue with Google"
        >
          <svg
            width="20px"
            height="20px"
            viewBox="-0.5 0 48 48"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            fill="#000000"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <title>Google-color</title> <desc>Created with Sketch.</desc>{" "}
              <defs> </defs>{" "}
              <g
                id="Icons"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
              >
                {" "}
                <g id="Color-" transform="translate(-401.000000, -860.000000)">
                  {" "}
                  <g id="Google" transform="translate(401.000000, 860.000000)">
                    {" "}
                    <path
                      d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                      id="Fill-1"
                      fill="#FBBC05"
                    >
                      {" "}
                    </path>{" "}
                    <path
                      d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                      id="Fill-2"
                      fill="#EB4335"
                    >
                      {" "}
                    </path>{" "}
                    <path
                      d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                      id="Fill-3"
                      fill="#34A853"
                    >
                      {" "}
                    </path>{" "}
                    <path
                      d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                      id="Fill-4"
                      fill="#4285F4"
                    >
                      {" "}
                    </path>{" "}
                  </g>{" "}
                </g>{" "}
              </g>{" "}
            </g>
          </svg>
          Google
        </button>
      </div>
    </form>
  );
}
