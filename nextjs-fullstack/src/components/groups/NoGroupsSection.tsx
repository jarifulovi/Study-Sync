


export default function NoGroupsSection() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-6 rounded-full bg-slate-100 p-6">
        <svg
          className="h-16 w-16 text-slate-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <h3 className="mb-2 text-xl font-semibold text-slate-900">No Groups Yet</h3>
      <p className="text-slate-600">
        You haven't joined any study groups yet. Create one or discover groups to join!
      </p>
    </div>
  )
}