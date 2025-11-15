

// All normal buttons will resides here
export function AuthSubmitButton({
  type,
  isLoading,
  label,
  onClick,
}: {
  type?: "button" | "submit" | "reset";
  isLoading: boolean;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      type={type || "button"}
      disabled={isLoading}
      onClick={onClick}
      className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 font-semibold text-white shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-600/40 active:scale-[0.98]"
    >
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </div>
      ) : (
        label
      )}
    </button>
  );
}