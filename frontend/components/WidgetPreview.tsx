export function WidgetPreview() {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-800">Chat widget preview</h3>
        <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
          Online
        </span>
      </div>
      <div className="mt-4 space-y-3 rounded-lg bg-white p-4 shadow-sm">
        <div className="rounded-lg bg-slate-100 p-3 text-sm text-slate-600">
          Hi! I can help with product questions or order status.
        </div>
        <div className="ml-auto w-fit rounded-lg bg-brand-500 p-3 text-sm text-white">
          What are your support hours?
        </div>
        <div className="rounded-lg bg-slate-100 p-3 text-sm text-slate-600">
          Our team is available Monday–Friday, 9am–5pm EST. I can also create a ticket for you.
        </div>
      </div>
    </div>
  );
}
