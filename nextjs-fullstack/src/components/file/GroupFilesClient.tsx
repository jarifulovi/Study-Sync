"use client";

import { useState } from "react";
import FileTableRow from "@/components/file/FileTableRow";

interface GroupFilesClientProps {
  group: {
    id: string;
    name: string;
    image: string | null;
    lastMessage?: string;
    unreadCount?: number;
  };
  groupFiles: any[]; // Pass files from server component
}

export default function GroupFilesClient({ group, groupFiles }: GroupFilesClientProps) {
  const [mimeTypeFilter, setMimeTypeFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Get unique mime type categories
  const getMimeTypeCategories = () => {
    const categories = new Set<string>();
    groupFiles.forEach((file) => {
      if (file.mime_type.startsWith("image/")) categories.add("image");
      else if (file.mime_type === "application/pdf") categories.add("pdf");
      else if (file.mime_type.includes("presentation")) categories.add("presentation");
      else if (file.mime_type.includes("word")) categories.add("document");
      else if (file.mime_type.startsWith("video/")) categories.add("video");
      else categories.add("other");
    });
    return Array.from(categories);
  };

  // Filter files based on selected mime type and search
  const filteredFiles = groupFiles.filter((file) => {
    // Search filter
    if (searchQuery && !file.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Mime type filter
    if (mimeTypeFilter === "all") return true;
    if (mimeTypeFilter === "image") return file.mime_type.startsWith("image/");
    if (mimeTypeFilter === "pdf") return file.mime_type === "application/pdf";
    if (mimeTypeFilter === "presentation") return file.mime_type.includes("presentation");
    if (mimeTypeFilter === "document") return file.mime_type.includes("word");
    if (mimeTypeFilter === "video") return file.mime_type.startsWith("video/");
    if (mimeTypeFilter === "other") {
      return (
        !file.mime_type.startsWith("image/") &&
        file.mime_type !== "application/pdf" &&
        !file.mime_type.includes("presentation") &&
        !file.mime_type.includes("word") &&
        !file.mime_type.startsWith("video/")
      );
    }
    return true;
  });

  return (
    <>
      {/* Upload Button */}
      <div className="mb-6 flex justify-end">
        <button 
          onClick={() => {
            // Handle file upload logic here
            console.log('Upload file clicked');
          }}
          className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 sm:px-5 font-semibold text-white shadow-lg transition-all hover:bg-emerald-700 hover:scale-105 hover:shadow-xl active:scale-95 whitespace-nowrap text-sm sm:text-base">
        
          <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <span className="hidden sm:inline">Upload File</span>
          <span className="sm:hidden">Upload</span>
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-6 flex flex-col gap-4 rounded-xl bg-white p-3 sm:p-4 shadow-sm">
        {/* Search */}
        <div className="relative w-full">
          <svg
            className="absolute left-3 top-1/2 h-4 w-4 sm:h-5 sm:w-5 -translate-y-1/2 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 sm:pl-10 pr-4 text-sm outline-none transition-all focus:border-slate-400 focus:ring-2 focus:ring-slate-400/20"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setMimeTypeFilter("all")}
            className={`rounded-lg px-3 py-2 text-xs sm:text-sm font-medium transition-all ${
              mimeTypeFilter === "all"
                ? "bg-slate-800 text-white shadow-md"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            All
          </button>
          {getMimeTypeCategories().map((category) => (
            <button
              key={category}
              onClick={() => setMimeTypeFilter(category)}
              className={`rounded-lg px-3 py-2 text-xs sm:text-sm font-medium capitalize transition-all ${
                mimeTypeFilter === category
                  ? "bg-slate-800 text-white shadow-md"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Files Table */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        {filteredFiles.length === 0 ? (
          <div className="p-8 sm:p-12 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-slate-100">
              <svg className="h-6 w-6 sm:h-8 sm:w-8 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="mb-2 text-base sm:text-lg font-semibold text-slate-900">No files found</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              {searchQuery
                ? "Try adjusting your search or filters"
                : "Upload your first file to get started"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="min-w-full">
              <table className="w-full">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Name
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 hidden sm:table-cell">
                      Type
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 hidden md:table-cell">
                      Size
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 hidden md:table-cell">
                      Uploaded By
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700 hidden lg:table-cell">
                      Date
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFiles.map((file) => (
                    <FileTableRow key={file.file_id} file={file} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}