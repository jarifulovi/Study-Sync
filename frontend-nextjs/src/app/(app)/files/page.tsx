import Link from "next/link";
import { groups } from "@/utils/data/groups";
import GroupFolderCard from "@/components/file/GroupFolderCard";

export default function FilesPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-20 lg:pt-6">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold text-gray-900">File Repository</h1>
            <p className="mt-2 text-gray-600">
              Organize and access your study materials by group
            </p>
          </div>
          
          {/* Upload Button - Mobile: Below header, Desktop: Right side */}
          <button className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-green-700 px-6 py-3 font-medium text-white shadow-lg shadow-green-600/30 transition-all hover:shadow-xl hover:shadow-green-600/40 hover:scale-105 active:scale-95 whitespace-nowrap">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Upload File
          </button>
        </div>

        {/* Group Folders Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <Link key={group.id} href={`/files/g/${group.id}`}>
              <GroupFolderCard group={group} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
