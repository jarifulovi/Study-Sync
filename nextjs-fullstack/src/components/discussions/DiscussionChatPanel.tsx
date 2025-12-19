"use client";

import { useState } from "react";
import { Discussion } from "@/utils/data/discussion";
import { ChatMessage } from "@/utils/data/chat";
import ChatMessages from "@/components/chat/ChatMessages";
import ChatInput from "@/components/chat/ChatInput";

interface DiscussionChatPanelProps {
  discussion: Discussion;
  messages: ChatMessage[];
}

export default function DiscussionChatPanel({
  discussion,
  messages: initialMessages,
}: DiscussionChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // TODO: Implement actual message sending with API
    const newMessage: ChatMessage = {
      id: `temp-${Date.now()}`,
      groupId: discussion.groupId,
      sessionId: discussion.id,
      type: "message",
      senderId: "currentUser",
      senderName: "You",
      senderAvatar: null,
      content: inputMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, newMessage]);
    setInputMessage("");
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-white">
      {/* Description Banner (if exists) */}
      {discussion.description && (
        <div className="px-4 py-3 bg-purple-50 border-b border-purple-100">
          <p className="text-sm text-purple-900">{discussion.description}</p>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-hidden">
        <ChatMessages messages={messages} />
      </div>

      {/* Input */}
      <ChatInput
        isAdmin={true} // TODO: Get actual admin status
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}
