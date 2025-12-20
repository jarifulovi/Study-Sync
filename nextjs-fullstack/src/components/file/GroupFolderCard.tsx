import { getInitials } from "@/utils/formatter";

interface GroupFolderCardProps {
  group: {
    id: string;
    name: string;
    image: string | null;
    lastMessage?: string;
    unreadCount?: number;
  };
}

export default function GroupFolderCard({ group }: GroupFolderCardProps) {

  return (
    <div className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:scale-105 cursor-pointer">
      {/* Folder Icon */}
      <div className="mb-4 flex items-center justify-center">
        <div className="relative">
          <svg className="h-16 w-16 text-slate-700" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2h-8l-2-2z" />
          </svg>
          
          {/* Group Avatar Overlay */}
          <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white font-semibold text-xs border-2 border-white">
            {group.image ? (
              <img
                src={group.image}
                alt={group.name}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              getInitials(group.name)
            )}
          </div>
        </div>
      </div>

      {/* Group Info */}
      <div className="text-center">
        <h3 className="mb-2 font-semibold text-slate-900 line-clamp-2">
          {group.name}
        </h3>
        
        {/* File count placeholder */}
        <div className="flex items-center justify-center gap-1 text-xs text-slate-600">
          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          <span>Files</span>
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 rounded-xl bg-slate-100/50 opacity-0 transition-opacity group-hover:opacity-100" />
    </div>
  );
}