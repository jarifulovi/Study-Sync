import Link from "next/link";

interface QuickActionsProps {
  actions: Array<{
    id: string;
    label: string;
    description: string;
    icon: string;
    color: string;
    href: string;
  }>;
}

export default function QuickActions({ actions }: QuickActionsProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "plus":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        );
      case "search":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        );
      case "upload":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        );
      case "bell":
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="px-6 py-4">
        <h3 className="text-lg font-semibold text-slate-900">Quick Actions</h3>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => (
            <Link
              key={action.id}
              href={action.href}
              className="group flex flex-col items-center gap-2 p-4 rounded-lg bg-slate-700 hover:bg-slate-600 transition-all hover:scale-105 active:scale-95"
              title={action.description}
            >
              <div className="text-white">
                {getIcon(action.icon)}
              </div>
              <span className="text-xs font-medium text-white text-center">
                {action.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}