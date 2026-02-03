import { Sidebar } from "../../../components/Sidebar";

const conversations = [
  { id: "C-1092", visitor: "sara@client.com", status: "Resolved", summary: "Shipping delays" },
  { id: "C-1093", visitor: "" , status: "Needs attention", summary: "Refund request" },
  { id: "C-1094", visitor: "lee@buyer.com", status: "Resolved", summary: "Plan upgrade" }
];

export default function ConversationsPage() {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 px-6 py-8">
        <h1 className="text-2xl font-semibold text-slate-900">Conversations</h1>
        <p className="mt-2 text-sm text-slate-500">Review AI chats and take over when needed.</p>
        <div className="mt-6 space-y-4">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-800">{conversation.summary}</p>
                  <p className="text-xs text-slate-400">{conversation.visitor || "Anonymous visitor"}</p>
                </div>
                <span
                  className={
                    conversation.status === "Resolved"
                      ? "rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700"
                      : "rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700"
                  }
                >
                  {conversation.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
