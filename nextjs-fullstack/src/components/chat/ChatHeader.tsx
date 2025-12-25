

import Link from "next/link";
import { getInitials } from "@/utils/formatter";
import ChatOptionsMenu from "./ChatOptionsMenu";

interface ChatHeaderProps {
  groupId: string;
  groupName: string;
  groupImage: string | null;
  userRole: "admin" | "member" | "moderator";
}

export default function ChatHeader({ groupId, groupName, groupImage, userRole }: ChatHeaderProps) {
  return (
    <div className="bg-slate-800 px-4 sm:px-6 py-4">
      <div className="flex items-center gap-3 lg:gap-4">
        {/* Back Button - Mobile Only */}
        <Link
          href="/groups"
          className="lg:hidden rounded-lg p-2 text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        
        {/* Group Avatar */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-slate-600 to-slate-700 text-white font-semibold text-sm shadow-md">
          {groupImage ? (
            <img
              src={groupImage}
              alt={groupName}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            getInitials(groupName)
          )}
        </div>

        {/* Group Info */}
        <div className="flex-1">
          <h3 className="text-base sm:text-lg font-semibold text-white">
            {groupName}
          </h3>
          <p className="text-xs text-slate-300">
            {userRole === "admin" ? "Admin" : userRole === "moderator" ? "Moderator" : "Member"}
          </p>
        </div>

        {/* Options Menu */}
        <ChatOptionsMenu groupId={groupId} />
      </div>
    </div>
  );
}
