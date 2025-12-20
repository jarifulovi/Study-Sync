import Link from "next/link";



export default function NoGroupDetails() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="mb-4 h-16 w-16 rounded-full bg-slate-200 flex items-center justify-center">
        <svg
          className="h-8 w-8 text-slate-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 7v4a1 1 0 001 1h3m10-5h3a1 1 0 011 1v4m-5 5l-4 4m0 0l-4-4m4 4V3"
          />
        </svg>
      </div>
      <h2 className="mb-2 text-xl font-semibold text-slate-900">No Group Selected</h2>
      <p className="text-center text-slate-600 max-w-md">
        Please select a study group to view its details. You can join or create a group to get started!
      </p>
      <Link href="/main" className="inline-flex items-center mt-4 gap-2 rounded-lg bg-slate-800 px-6 py-3 font-medium text-white hover:bg-slate-700 transition-colors">
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Groups
      </Link>
    </div>
  );
}