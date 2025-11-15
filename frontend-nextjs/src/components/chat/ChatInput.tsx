
interface ChatInputProps {
  isAdmin: boolean;
  inputMessage: string;
  setInputMessage: (msg: string) => void;
  onSendMessage: () => void;
}

export default function ChatInput({
  isAdmin,
  inputMessage,
  setInputMessage,
  onSendMessage,
}: ChatInputProps) {


  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };


  return (
    <div className="border-t border-gray-200 bg-white px-3 sm:px-6 py-4">
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Attachment Button */}
        <button className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-blue-600">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
          </svg>
        </button>

        {/* Message Input */}
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type a message..."
          className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20"
        />

        {/* Send Button */}
        <button
          onClick={onSendMessage}
          disabled={!inputMessage.trim()}
          className="hidden md:block rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-3 sm:px-5 py-2.5 font-medium text-white shadow-lg shadow-blue-600/30 transition-all hover:shadow-xl hover:shadow-blue-600/40 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm whitespace-nowrap"
          title="Send message"
        >
          <svg className="h-5 w-5 rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>

        {/* Discussion Button */}
        {isAdmin && (
          <button
            onClick={() => alert("Start Discussion - Feature Coming Soon!")}
            disabled={!isAdmin}
            className="rounded-xl bg-gradient-to-r from-purple-700 to-indigo-800 px-3 sm:px-5 py-2.5 font-medium text-white shadow-lg shadow-purple-700/30 transition-all hover:shadow-xl hover:shadow-purple-700/40 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm whitespace-nowrap"
            title="Start a discussion"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
        )}
        
      </div>
    </div>
  );
}
