import { Sidebar } from "../../components/Sidebar";
import { StatCard } from "../../components/StatCard";
import { WidgetPreview } from "../../components/WidgetPreview";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 px-6 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Business dashboard</h1>
            <p className="text-sm text-slate-500">Track AI performance and manage your knowledge.</p>
          </div>
          <button className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white">
            Add teammate
          </button>
        </div>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          <StatCard label="Total chats" value="1,284" helper="+12% from last month" />
          <StatCard label="Resolved by AI" value="76%" helper="Above target" />
          <StatCard label="Escalated" value="98" helper="Auto-assigning to agents" />
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">AI activity</h2>
            <p className="mt-2 text-sm text-slate-500">
              The assistant handled 320 conversations this week. 24 needed follow-up.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-xs uppercase text-slate-400">Top topic</p>
                <p className="mt-2 text-sm font-semibold text-slate-700">Shipping & delivery</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-xs uppercase text-slate-400">Best channel</p>
                <p className="mt-2 text-sm font-semibold text-slate-700">Website widget</p>
              </div>
            </div>
          </div>
          <WidgetPreview />
        </section>
      </main>
    </div>
  );
}
