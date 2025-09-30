"use client"; // This is a client component
import Link from "next/link";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="min-h-[calc(100vh-64px)] w-full flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl">
        <div className="flex flex-col items-center text-center mb-6">
          {/* header icon */}
          <div className="h-12 w-12 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md">
            {/* user-plus icon */}
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
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
              <path d="M19 8v6M22 11h-6" />
            </svg>
          </div>

          <h1 className="mt-5 text-3xl font-semibold tracking-tight">
            Create a new account
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Or{" "}
            <Link
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              sign in to your existing account
            </Link>
          </p>
        </div>

        <RegisterForm />
      </div>
    </main>
  );
}
