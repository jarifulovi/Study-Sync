"use client";

import { useState } from "react";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export default function SearchBar({
  placeholder = "Search groups by name or topic...",
  onSearch,
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch?.(value);
  };

  return (
    <div className="relative flex-1">
      <svg
        className={`absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transition-colors duration-200 ${
          isFocused ? "text-slate-700" : "text-slate-400"
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      
      <input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full rounded-lg border bg-white py-3 pl-12 pr-4 text-sm outline-none transition-all duration-200 ${
          isFocused
            ? "border-slate-400 shadow-lg ring-2 ring-slate-200"
            : "border-slate-200 hover:border-slate-300"
        }`}
      />
    </div>
  );
}
