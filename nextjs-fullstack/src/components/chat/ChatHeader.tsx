

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
    <div className="border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
      <div className="flex items-center gap-3">
        {/* Empty spacer for sidebar button on mobile */}
        <div className="w-9 h-9 lg:hidden"></div>
        
        {/* Back Button - Mobile Only */}
        <Link
          href="/groups"
          className="lg:hidden rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-blue-600"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        
        {/* Group Avatar hidden in mobile */}
        <div className="hidden md:flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold text-sm shadow-md">
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
          <h3 className="text-lg font-semibold text-gray-900">
            {groupName}
          </h3>
          <p className="text-xs text-gray-500">
            You are {userRole === "admin" ? "an admin" : "a member"}
          </p>
        </div>

        {/* Options Menu */}
        <ChatOptionsMenu groupId={groupId} />
      </div>
    </div>
  );
}
