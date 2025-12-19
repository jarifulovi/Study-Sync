"use client";

import { useState } from "react";
import Link from "next/link";
import { groups } from "@/utils/data/groups";
import GroupCard from "@/components/groups/GroupCard";
import NoGroupsSection from "@/components/groups/NoGroupsSection";
import SearchBar from "@/components/search/SearchBar";
import PageHeader from "@/components/ui/PageHeader";

export default function MainPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // TODO: Replace with actual data from API
  // const [groupList, setGroupList] = useState(groups);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // TODO: Implement search logic
  };

  return (
    <div className="mx-auto max-w-7xl p-6 pt-20 lg:pt-6">
      <PageHeader title="Discover Study Groups" subtitle="Find and join groups that match your interests" />

      {/* Search and Filter Section */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row">
        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} />

        {/* Filter Button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center justify-center gap-2 rounded-lg bg-slate-800 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-slate-700 active:scale-95"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          Filters
        </button>
      </div>

      {/* Filter Panel (Optional - can be expanded later) */}
      {showFilters && (
        <div className="mb-8 rounded-xl bg-slate-800 p-6 shadow-lg">
          <div className="flex flex-wrap gap-3">
            <button className="rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-slate-600">
              All Groups
            </button>
            <button className="rounded-lg bg-slate-900/50 px-4 py-2 text-sm font-medium text-slate-300 transition-all hover:bg-slate-700 hover:text-white">
              Public Only
            </button>
            <button className="rounded-lg bg-slate-900/50 px-4 py-2 text-sm font-medium text-slate-300 transition-all hover:bg-slate-700 hover:text-white">
              Private Only
            </button>
          </div>
        </div>
      )}

      {/* Groups Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {groups && groups.map((group) => (
          <Link key={group.id} href={`/groups/${group.id}/details`}>
            <GroupCard {...group} />
          </Link>
        ))}
      </div>

      {groups.length === 0 && (
        <NoGroupsSection />
      )}
    </div>
  );
}