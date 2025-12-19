"use client";

import { useState } from "react";
import Link from "next/link";
import { Discussion } from "@/utils/data/discussion";

interface DiscussionsPanelProps {
  selectedGroup: {
    id: string;
    name: string;
    image: string | null;
    role: "admin" | "member";
    lastMessage?: string;
    unreadCount?: number;
  };
  discussions: Discussion[];
  groupId: string;
}

export default function DiscussionsPanel({
  selectedGroup,
  discussions,
  groupId,
}: DiscussionsPanelProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter discussions based on search query
  const filteredDiscussions = discussions.filter(
    (disc) =>
      disc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      disc.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Header - matches ChatHeader style exactly */}
      <div className="border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          {/* Empty spacer for sidebar button on mobile */}
          <div className="w-9 h-9 lg:hidden"></div>
          
          {/* Back Button - Mobile Only */}
          <Link
            href={`/groups/${groupId}/chat`}
            className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-blue-600"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          
          {/* Group Avatar */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold text-sm shadow-md">
            {selectedGroup.image ? (
              <img
                src={selectedGroup.image}
                alt={selectedGroup.name}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              getInitials(selectedGroup.name)
            )}
          </div>

          {/* Group Info */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">
              {selectedGroup.name}
            </h3>
            <p className="text-xs text-gray-500">
              Discussions
            </p>
          </div>

          {/* Create Discussion Button */}
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span className="hidden sm:inline">New Discussion</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-3 bg-gray-50 border-b">
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
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
          <input
            type="text"
            placeholder="Search discussions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          />
        </div>
      </div>

      {/* Discussions List */}
      <div className="flex-1 overflow-y-auto">
        {filteredDiscussions.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <svg
              className="w-16 h-16 mb-4 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <p className="text-lg font-medium mb-2">
              {searchQuery ? "No discussions found" : "No discussions yet"}
            </p>
            <p className="text-sm">
              {searchQuery
                ? "Try adjusting your search terms"
                : "Start the first discussion in this group"}
            </p>
          </div>
        ) : (
          <div className="pb-3">
            {filteredDiscussions.map((discussion) => (
              <DiscussionCard
                key={discussion.id}
                discussion={discussion}
                groupId={groupId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Discussion Card Component
function DiscussionCard({
  discussion,
  groupId,
}: {
  discussion: Discussion;
  groupId: string;
}) {
  const timeAgo = getTimeAgo(discussion.updatedAt);

  return (
    <Link
      href={`/groups/${groupId}/disc/${discussion.id}`}
      className="block border border-gray-200 rounded-lg m-3 p-4 hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm transition-all duration-200"
    >
      <div className="space-y-3">
        {/* Header with title and time */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-gray-900 text-base leading-tight">
            {discussion.title}
          </h3>
          <span className="text-xs text-gray-500 flex-shrink-0 mt-1">
            {timeAgo}
          </span>
        </div>

        {/* Description with ellipsis */}
        {discussion.description && (
          <p className="text-sm text-gray-600 leading-relaxed">
            {discussion.description.length > 120 
              ? `${discussion.description.substring(0, 120)}...` 
              : discussion.description}
          </p>
        )}

        {/* Creator info with avatar */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">by</span>
          <span className="text-xs font-medium text-gray-700">
            {discussion.creatorName}
          </span>
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-medium text-xs">
            {discussion.creatorAvatar ? (
              <img
                src={discussion.creatorAvatar}
                alt={discussion.creatorName}
                className="w-5 h-5 rounded-full object-cover"
              />
            ) : (
              getInitials(discussion.creatorName)
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

// Utility functions
function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getTimeAgo(timestamp: string): string {
  const now = new Date();
  const past = new Date(timestamp);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return new Date(timestamp).toLocaleDateString();
}