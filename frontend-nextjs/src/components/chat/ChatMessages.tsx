

"use client";

import { useEffect, useRef } from "react";
import { chatMessages } from "@/utils/data/chat";
import {
  MessageBubble,
  NotificationMessage,
  FileMessage,
  DiscussionMessage,
} from "./ChatMessageItem";

interface ChatMessagesProps {
  groupId: string;
}

function EmptyState() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
          <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <h3 className="mb-2 text-lg font-semibold text-gray-900">No messages yet</h3>
        <p className="text-sm text-gray-600">Start a conversation with your group members</p>
      </div>
    </div>
  );
}

export default function ChatMessages({ groupId }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUserId = "user1"; // Current logged-in user

  // Filter messages for the current group
  const groupMessages = chatMessages.filter((msg) => msg.groupId === groupId);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [groupMessages.length]);

  if (groupMessages.length === 0) {
    return (
      <div className="flex flex-1 flex-col overflow-y-auto bg-gray-50 p-4">
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col overflow-y-auto bg-gray-50 p-4">
      <div className="flex flex-col gap-4">
        {groupMessages.map((message) => {
          const isOwnMessage = message.senderId === currentUserId;

          // Type-safe handling with discriminated union
          switch (message.type) {
            case "notification":
              return (
                <NotificationMessage
                  key={message.id}
                  content={message.content}
                  timestamp={message.timestamp}
                />
              );

            case "file":
              return (
                <FileMessage
                  key={message.id}
                  senderName={message.senderName}
                  senderAvatar={message.senderAvatar}
                  fileName={message.fileName}
                  fileSize={message.fileSize}
                  fileUrl={message.fileUrl}
                  timestamp={message.timestamp}
                  isOwnMessage={isOwnMessage}
                />
              );

            case "discussion":
              return (
                <DiscussionMessage
                  key={message.id}
                  senderName={message.senderName}
                  senderAvatar={message.senderAvatar}
                  discussionTitle={message.discussionTitle}
                  discussionId={message.sessionId || ""}
                  groupId={message.groupId}
                  timestamp={message.timestamp}
                  isOwnMessage={isOwnMessage}
                />
              );

            case "message":
              return (
                <MessageBubble
                  key={message.id}
                  senderName={message.senderName}
                  senderAvatar={message.senderAvatar}
                  content={message.content}
                  timestamp={message.timestamp}
                  isOwnMessage={isOwnMessage}
                />
              );
          }
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
