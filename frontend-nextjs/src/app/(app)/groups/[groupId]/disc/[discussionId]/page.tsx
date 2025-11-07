
import { discussions } from "@/utils/data/discussion";
import { chatMessages } from "@/utils/data/chat";
import DiscussionChatPanel from "@/components/discussions/DiscussionChatPanel";
import Link from "next/link";
import { notFound } from "next/navigation";

interface DiscussionPageProps {
  params: Promise<{ groupId: string; discussionId: string }>;
}

export default async function DiscussionPage({ params }: DiscussionPageProps) {
  const { groupId, discussionId } = await params;

  // Find the discussion
  const discussion = discussions.find((disc) => disc.id === discussionId);

  if (!discussion) {
    notFound();
  }

  // Filter messages for this specific discussion
  const discussionMessages = chatMessages.filter(
    (msg) => msg.sessionId === discussionId
  );

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Header with back button and discussion title */}
      <div className="border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          {/* Empty spacer for sidebar button on mobile */}
          <div className="w-9 h-9 lg:hidden"></div>
          
          {/* Back Button */}
          <Link
            href={`/groups/${groupId}/disc`}
            className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-blue-600"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          
          {/* Discussion Icon */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-600 text-white font-semibold text-sm shadow-md">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>

          {/* Discussion Info */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">
              {discussion.title}
            </h3>
            <p className="text-xs text-gray-500">
              Discussion • by {discussion.creatorName}
            </p>
          </div>
        </div>
      </div>

      {/* Discussion Chat Panel */}
      <DiscussionChatPanel 
        discussion={discussion} 
        messages={discussionMessages}
      />
    </div>
  );
}