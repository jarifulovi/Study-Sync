import { getInitials } from "@/utils/formatter";

export interface GroupCardProps {
  id: string;
  name: string;
  description: string;
  image?: string | null;
  members: number;
  status: string;
}


export default function GroupCard({
  id,
  name,
  description,
  image,
  members,
  status,
}: GroupCardProps) {
  return (
    <div
      className="group relative block overflow-hidden rounded-xl bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-slate-200 hover:border-slate-300"
    >
      {/* Group Image/Placeholder */}
      <div className="relative h-32 bg-gradient-to-br from-slate-700 to-slate-900">
        {image ? (
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-white">
            {getInitials(name)}
          </div>
        )}
      </div>

      {/* Group Info */}
      <div className="p-4">
        <h3 className="mb-2 text-base font-semibold text-slate-900 line-clamp-1">
          {name}
        </h3>
        <p className="mb-4 text-sm text-slate-600 line-clamp-2">
          {description}
        </p>

        {/* Members Count and Status */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-3">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <span className="font-medium">{members}</span>
          </div>

          {/* Status Badge */}
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              status === "public"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-slate-200 text-slate-700"
            }`}
          >
            {status === "public" ? "Public" : "Private"}
          </span>
        </div>
      </div>
    </div>
  );
}