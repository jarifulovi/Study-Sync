"use client";

import Link from "next/link";
import { getInitials } from "@/utils/formatter";
import ScrollableContainer from "./ScrollableContainer";

interface GroupsBarProps {
  groups: Array<{
    id: string;
    name: string;
    image: string | null;
    role: "admin" | "member" | "moderator";
    lastMessage?: string;
  }>;
  currentGroupId: string;
}

export default function GroupsBar({
  groups,
  currentGroupId,
}: GroupsBarProps) {

  return (
    <div className="hidden lg:flex w-64 flex-col bg-slate-700 h-full">
      {/* Header */}
      <div className="bg-slate-800 px-5 py-4">
        <h2 className="text-sm font-bold text-white uppercase tracking-wide">Groups</h2>
      </div>

      {/* Group List - Scrollable */}
      <ScrollableContainer className="flex-1 overflow-y-auto overflow-x-hidden">
        {groups.map((group) => (
          <Link
            key={group.id}
            href={`/groups/${group.id}/chat`}
            className={`group relative flex w-full items-center gap-3 px-4 py-3 text-left transition-all duration-200 hover:bg-slate-600 ${
              currentGroupId === group.id
                ? "bg-slate-600 border-l-4 border-l-emerald-500"
                : "border-l-4 border-l-transparent"
            }`}
          >
            {/* Group Image/Avatar */}
            <div className="flex-shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-slate-500 to-slate-600 text-white font-semibold text-xs shadow-md">
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

            {/* Group Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-white truncate mb-0.5">
                {group.name}
              </h3>
              {group.lastMessage && (
                <p className="text-xs text-slate-300 truncate mb-0.5">{group.lastMessage}</p>
              )}
              {/* Role Badge */}
              <span
                className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                  group.role === "admin"
                    ? "bg-purple-500/20 text-purple-300"
                    : group.role === "moderator"
                    ? "bg-emerald-500/20 text-emerald-300"
                    : "bg-slate-500/30 text-slate-300"
                }`}
              >
                {group.role}
              </span>
            </div>
          </Link>
        ))}
      </ScrollableContainer>
    </div>
  );
}
