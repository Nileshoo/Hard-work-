import { Sidebar } from "../../../components/Sidebar";
import { UploadPanel } from "../../../components/UploadPanel";

export default function KnowledgePage() {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 px-6 py-8">
        <h1 className="text-2xl font-semibold text-slate-900">Knowledge sources</h1>
        <p className="mt-2 text-sm text-slate-500">
          Upload data to train your assistant. New content is embedded into the vector database.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <UploadPanel
            title="Website URL"
            description="Crawl your help center or marketing site to capture FAQs and product details."
            action="Add website"
          />
          <UploadPanel
            title="PDF documents"
            description="Upload policy docs, onboarding guides, or manuals."
            action="Upload PDF"
          />
          <UploadPanel
            title="Manual FAQ"
            description="Add high-priority questions and answers in seconds."
            action="Create FAQ"
          />
        </div>
        <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Recent uploads</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
              <span>help-center.acme.com</span>
              <span className="text-emerald-600">Ready</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
              <span>ShippingPolicy.pdf</span>
              <span className="text-amber-600">Processing</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
