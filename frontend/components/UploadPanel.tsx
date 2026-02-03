export function UploadPanel({ title, description, action }: { title: string; description: string; action: string }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-200 bg-white p-5">
      <h3 className="text-base font-semibold text-slate-800">{title}</h3>
      <p className="mt-2 text-sm text-slate-500">{description}</p>
      <button className="mt-4 rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white">
        {action}
      </button>
    </div>
  );
}
