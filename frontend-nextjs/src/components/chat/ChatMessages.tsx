"use client";

import { useEffect, useRef } from "react";
import { ChatMessage } from "@/utils/data/chat";
import {
  MessageBubble,
  NotificationMessage,
  FileMessage,
  DiscussionMessage,
} from "./ChatMessageItem";
import EmptyMessagePanel from "./EmptyMessagePanel";


interface ChatMessagesProps {
  messages: ChatMessage[];
}



export default function ChatMessages({ messages }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUserId = "user1";

  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 flex-col overflow-y-auto bg-gray-50 p-4">
        <EmptyMessagePanel />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col overflow-y-auto bg-gray-50 p-4">
      <div className="flex flex-col gap-4">
        {messages.map((message) => {
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
