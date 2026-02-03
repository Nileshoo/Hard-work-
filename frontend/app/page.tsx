import Link from "next/link";

export default function HomePage() {
  return (
    <main className="px-6 py-12">
      <section className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-6">
          <span className="text-sm font-semibold uppercase tracking-wide text-brand-700">
            SupportAI Platform
          </span>
          <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">
            AI customer support built for growing businesses
          </h1>
          <p className="text-lg text-slate-600">
            Launch a branded AI assistant trained on your knowledge base, track conversations, and
            scale support with confidence.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/signup"
              className="rounded-lg bg-brand-500 px-6 py-3 text-white shadow hover:bg-brand-700"
            >
              Get started
            </Link>
            <Link
              href="/dashboard"
              className="rounded-lg border border-slate-200 px-6 py-3 text-slate-700"
            >
              View dashboard
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
