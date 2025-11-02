"use client";

import { useState } from "react";

export default function ChatInput() {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      // TODO: Implement send message logic
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white px-6 py-4">
      <div className="flex items-center gap-3">
        {/* Attachment Button */}
        <button className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-blue-600">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
          </svg>
        </button>

        {/* Message Input */}
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
        />

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={!message.trim()}
          className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-2.5 font-medium text-white shadow-lg shadow-blue-600/30 transition-all hover:shadow-xl hover:shadow-blue-600/40 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          Send
        </button>
      </div>
    </div>
  );
}
