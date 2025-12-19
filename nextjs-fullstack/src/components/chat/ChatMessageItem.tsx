import { getInitials, formatTime } from "@/utils/formatter";
import Link from "next/link";

interface MessageBubbleProps {
  senderName: string;
  senderAvatar: string | null;
  content: string;
  timestamp: string;
  isOwnMessage?: boolean;
}

export function MessageBubble({
  senderName,
  senderAvatar,
  content,
  timestamp,
  isOwnMessage = false,
}: MessageBubbleProps) {


  return (
    <div className={`flex gap-3 ${isOwnMessage ? "flex-row-reverse" : ""}`}>
      {/* Avatar */}
      <div className="flex-shrink-0">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white text-xs font-semibold">
          {senderAvatar ? (
            <img
              src={senderAvatar}
              alt={senderName}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            getInitials(senderName)
          )}
        </div>
      </div>

      {/* Message Content */}
      <div className={`flex flex-col max-w-[85%] sm:max-w-[70%] ${isOwnMessage ? "items-end" : ""}`}>
        <span className="text-xs font-medium text-gray-700 mb-1">
          {senderName}
        </span>
        <div
          className={`rounded-2xl px-4 py-2 ${
            isOwnMessage
              ? "bg-blue-600 text-white rounded-tr-sm"
              : "bg-white text-gray-900 rounded-tl-sm"
          }`}
        >
          <p className="text-sm whitespace-pre-wrap break-words">{content}</p>
        </div>
        <span className="text-xs text-gray-500 mt-1">{formatTime(timestamp)}</span>
      </div>
    </div>
  );
}

interface NotificationMessageProps {
  content: string;
  timestamp: string;
}

export function NotificationMessage({ content, timestamp }: NotificationMessageProps) {


  return (
    <div className="flex items-center justify-center my-4">
      <div className="bg-gray-100 rounded-full px-4 py-2 flex items-center gap-2">
        <svg className="h-4 w-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-xs text-gray-600">{content}</span>
        <span className="text-xs text-gray-400">•</span>
        <span className="text-xs text-gray-400">{formatTime(timestamp)}</span>
      </div>
    </div>
  );
}

interface FileMessageProps {
  senderName: string;
  senderAvatar: string | null;
  fileName: string;
  fileSize: string;
  fileUrl: string;
  timestamp: string;
  isOwnMessage?: boolean;
}

export function FileMessage({
  senderName,
  senderAvatar,
  fileName,
  fileSize,
  fileUrl,
  timestamp,
  isOwnMessage = false,
}: FileMessageProps) {


  return (
    <div className={`flex gap-3 ${isOwnMessage ? "flex-row-reverse" : ""}`}>
      {/* Avatar */}
      <div className="flex-shrink-0">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white text-xs font-semibold">
          {senderAvatar ? (
            <img
              src={senderAvatar}
              alt={senderName}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            getInitials(senderName)
          )}
        </div>
      </div>

      {/* File Content */}
      <div className={`flex flex-col max-w-[85%] sm:max-w-[70%] ${isOwnMessage ? "items-end" : ""}`}>
        <span className="text-xs font-medium text-gray-700 mb-1">
          {senderName}
        </span>
        <a
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-3 rounded-2xl px-4 py-3 transition-colors ${
            isOwnMessage
              ? "bg-blue-600 hover:bg-blue-700 rounded-tr-sm"
              : "bg-white hover:bg-gray-50 rounded-tl-sm border border-gray-200"
          }`}
        >
          <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
            isOwnMessage ? "bg-blue-500" : "bg-blue-100"
          }`}>
            <svg className={`h-5 w-5 ${isOwnMessage ? "text-white" : "text-blue-600"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-medium truncate ${isOwnMessage ? "text-white" : "text-gray-900"}`}>
              {fileName}
            </p>
            <p className={`text-xs ${isOwnMessage ? "text-blue-100" : "text-gray-500"}`}>
              {fileSize}
            </p>
          </div>
          <svg className={`h-5 w-5 flex-shrink-0 ${isOwnMessage ? "text-white" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </a>
        <span className="text-xs text-gray-500 mt-1">{formatTime(timestamp)}</span>
      </div>
    </div>
  );
}

interface DiscussionStartNotificationProps {
  senderName: string;
  senderAvatar: string | null;
  discussionTitle: string;
  discussionId: string;
  groupId: string;
  timestamp: string;
}

export function DiscussionStartNotification({
  senderName,
  senderAvatar,
  discussionTitle,
  discussionId,
  groupId,
  timestamp,
}: DiscussionStartNotificationProps) {
  return (
    <div className="flex gap-3">
      {/* Avatar */}
      <div className="flex-shrink-0">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-600 text-white text-xs font-semibold">
          {senderAvatar ? (
            <img
              src={senderAvatar}
              alt={senderName}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            getInitials(senderName)
          )}
        </div>
      </div>

      {/* Discussion Content */}
      <div className="flex flex-col flex-1 max-w-[85%]">
        <span className="text-xs font-medium text-gray-700 mb-1">
          {senderName}
        </span>
        <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 p-4">
          <div className="flex items-start gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
              <svg className="h-5 w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-xs text-purple-600 font-medium mb-1">Discussion Started</p>
              <p className="text-sm font-semibold text-gray-900">{discussionTitle}</p>
            </div>
          </div>
          <Link
            href={`/groups/${groupId}/disc/${discussionId}`}
            className="flex items-center justify-center gap-2 w-full bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
          >
            <span>Join Discussion</span>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <span className="text-xs text-gray-500 mt-1">{formatTime(timestamp)}</span>
      </div>
    </div>
  );
}
