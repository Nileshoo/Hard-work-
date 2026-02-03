import { Sidebar } from "../../../components/Sidebar";

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 px-6 py-8">
        <h1 className="text-2xl font-semibold text-slate-900">Chatbot settings</h1>
        <p className="mt-2 text-sm text-slate-500">Tune the assistant tone and escalation rules.</p>
        <div className="mt-6 max-w-2xl space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <label className="text-sm font-medium text-slate-700">Tone of voice</label>
            <select className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
              <option>Friendly</option>
              <option>Professional</option>
              <option>Concise</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Greeting message</label>
            <input
              className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              defaultValue="Hi! I can help with orders, billing, and product questions."
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Escalation threshold</label>
            <input
              className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              defaultValue="0.45"
            />
            <p className="mt-1 text-xs text-slate-400">
              Lower values will route more chats to human agents.
            </p>
          </div>
          <button className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white">
            Save settings
          </button>
        </div>
      </main>
    </div>
  );
}
