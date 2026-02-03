import { Sidebar } from "../../../components/Sidebar";

export default function BillingPage() {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 px-6 py-8">
        <h1 className="text-2xl font-semibold text-slate-900">Billing & plans</h1>
        <p className="mt-2 text-sm text-slate-500">Manage your subscription and usage limits.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            { name: "Starter", price: "$49/mo", features: "500 conversations" },
            { name: "Growth", price: "$149/mo", features: "3k conversations" },
            { name: "Scale", price: "$399/mo", features: "10k conversations" }
          ].map((plan) => (
            <div key={plan.name} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">{plan.name}</h3>
              <p className="mt-2 text-3xl font-bold text-slate-900">{plan.price}</p>
              <p className="mt-2 text-sm text-slate-500">{plan.features}</p>
              <button className="mt-4 w-full rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white">
                Choose plan
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
