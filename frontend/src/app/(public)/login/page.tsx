import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";
import { Suspense } from "react";

export default async function LoginPage() {
  return (
    <main className="h-screen w-full flex items-start justify-center px-4 py-2">
      <div className="w-full max-w-xl">
        <div className="flex flex-col items-center text-center mb-6">
          {/* App glyph */}
          <div className="h-12 w-12 rounded-xl bg-green-600 flex items-center justify-center shadow-md">
            {/* login arrow icon */}
            <svg
              className="h-6 w-6 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <path d="M10 17l5-5-5-5" />
              <path d="M15 12H3" />
            </svg>
          </div>

          <h1 className="mt-5 text-3xl font-semibold tracking-tight">
            Sign in to your account
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            or{" "}
            <Link
              href="/signup"
              className="font-medium text-green-600 hover:text-green-500"
            >
              Create an account
            </Link>
          </p>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
