"use client";
import { useEffect, useRef, useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { ChatMessage } from "@/utils/data/chat";

interface ChatPanelProps {
  selectedGroup: {
    id: string;
    name: string;
    image: string | null;
    role: "admin" | "member" | "moderator";
    lastMessage?: string;
    unreadCount?: number;
  } | null;
  messages: ChatMessage[];
}

export default function ChatPanel({ selectedGroup, messages: initialMessages }: ChatPanelProps) {
  
  // Messages state management
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState("");

  // Update messages when initialMessages change
  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        type: "message",
        content: inputMessage,
        senderName: "Current User",
        senderAvatar: null,
        sessionId: null,
        senderId: "user1",
        timestamp: new Date().toISOString(),
        groupId: selectedGroup?.id || "",
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputMessage("");
    }
  };

  
  
  
  if (!selectedGroup) {
    return (
      <div className="flex flex-1 flex-col bg-slate-800">
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-600">
              <svg className="h-10 w-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-slate-200">Select a Group</h3>
            <p className="text-sm text-slate-400">Choose a group from the left to start chatting</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col bg-slate-800">
      <ChatHeader
        groupId={selectedGroup.id}
        groupName={selectedGroup.name}
        groupImage={selectedGroup.image}
        userRole={selectedGroup.role}
      />
      <ChatMessages 
        messages={messages} 
      />
      <ChatInput 
        isAdmin={selectedGroup.role === "admin"}
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}
