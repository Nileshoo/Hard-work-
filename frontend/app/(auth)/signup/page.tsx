import Link from "next/link";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-semibold text-slate-900">Create your account</h1>
        <p className="mt-2 text-sm text-slate-500">Launch your AI support assistant in minutes.</p>
        <form className="mt-6 space-y-4">
          <input
            className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm"
            placeholder="Business name"
            type="text"
          />
          <input
            className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm"
            placeholder="Work email"
            type="email"
          />
          <input
            className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm"
            placeholder="Password"
            type="password"
          />
          <button className="w-full rounded-lg bg-brand-500 px-4 py-3 text-sm font-semibold text-white">
            Sign up
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-slate-500">
          Already have an account? <Link href="/login" className="text-brand-700">Log in</Link>
        </p>
      </div>
    </main>
  );
}
