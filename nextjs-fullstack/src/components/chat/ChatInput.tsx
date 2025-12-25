
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
    <div className="bg-slate-800 px-3 sm:px-6 py-4">
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Attachment Button */}
        <button className="hidden sm:block rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-700 hover:text-slate-200">
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
          className="flex-1 rounded-2xl bg-slate-700 px-4 py-3 text-sm text-slate-100 placeholder-slate-400 outline-none transition-all focus:ring-2 focus:ring-slate-500/50 [&:-webkit-autofill]:bg-slate-700 [&:-webkit-autofill]:text-slate-100"
        />

        {/* Send Button - Hidden on mobile */}
        <button
          onClick={onSendMessage}
          disabled={!inputMessage.trim()}
          className="hidden sm:block rounded-full bg-slate-600 p-3 text-white transition-all hover:bg-slate-500 active:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
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
            className="rounded-full bg-purple-600 p-3 text-white transition-all hover:bg-purple-700 active:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
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
