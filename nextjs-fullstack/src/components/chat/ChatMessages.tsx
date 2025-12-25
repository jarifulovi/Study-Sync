"use client";

import { useEffect, useRef } from "react";
import { ChatMessage } from "@/utils/data/chat";
import {
  MessageBubble,
  NotificationMessage,
  FileMessage,
  DiscussionStartMessage,
} from "./ChatMessageItem";
import EmptyMessagePanel from "./EmptyMessagePanel";
import ScrollableContainer from "./ScrollableContainer";

interface ChatMessagesProps {
  messages: ChatMessage[];
}

export default function ChatMessages({ messages }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUserId = "user1";

  // Filter out messages with sessionId (discussion chats) - only show group chat messages
  const groupChatMessages = messages.filter((msg) => msg.type === "discussion" || msg.type === "notification" || msg.sessionId === null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [groupChatMessages.length]);

  if (groupChatMessages.length === 0) {
    return (
      <ScrollableContainer className="flex flex-1 flex-col overflow-y-auto bg-slate-800 p-3 sm:p-4">
        <EmptyMessagePanel />
      </ScrollableContainer>
    );
  }

  return (
    <ScrollableContainer className="flex flex-1 flex-col overflow-y-auto bg-slate-800 p-3 sm:p-4">
      <div className="flex flex-col gap-4 text-slate-200">
        {groupChatMessages.map((message) => {
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

            case "discussion":
              return (
                <DiscussionStartMessage
                  key={message.id}
                  senderName={message.senderName}
                  senderAvatar={message.senderAvatar}
                  discussionTitle={message.discussionTitle}
                  discussionId={message.discussionId}
                  groupId={message.groupId}
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
    </ScrollableContainer>
  );
}
