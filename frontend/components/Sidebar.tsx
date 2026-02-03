import Link from "next/link";

const navItems = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/knowledge", label: "Knowledge" },
  { href: "/dashboard/conversations", label: "Conversations" },
  { href: "/dashboard/settings", label: "Settings" },
  { href: "/dashboard/billing", label: "Billing" }
];

export function Sidebar() {
  return (
    <aside className="flex w-full flex-col gap-6 border-r border-slate-200 bg-white px-4 py-6 md:w-64">
      <div className="text-xl font-semibold text-brand-700">SupportAI</div>
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
