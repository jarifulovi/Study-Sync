"use client";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}


export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="mb-6 text-center sm:text-left">
      <h1 className="mb-2 text-3xl font-bold text-slate-900">{title}</h1>
      {subtitle && <p className="text-sm text-slate-600">{subtitle}</p>}
    </div>
  );
}

export function PageHeaderWithBackButton({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <button
        onClick={() => window.history.back()}
        className="rounded-lg bg-slate-200 p-2 hover:bg-slate-300 transition"
      >
        <svg className="h-5 w-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <div>
        <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
        {subtitle && <p className="text-sm text-slate-600">{subtitle}</p>}
      </div>
    </div>
  );
}