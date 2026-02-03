import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-semibold text-slate-900">Welcome back</h1>
        <p className="mt-2 text-sm text-slate-500">Log in to manage your AI support team.</p>
        <form className="mt-6 space-y-4">
          <input
            className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm"
            placeholder="Email address"
            type="email"
          />
          <input
            className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm"
            placeholder="Password"
            type="password"
          />
          <button className="w-full rounded-lg bg-brand-500 px-4 py-3 text-sm font-semibold text-white">
            Log in
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-slate-500">
          New here? <Link href="/signup" className="text-brand-700">Create an account</Link>
        </p>
      </div>
    </main>
  );
}
