import Link from "next/link";
import { groups } from "@/utils/data/groups";
import GroupCard from "@/components/groups/GroupCard";
import NoGroupsSection from "@/components/groups/NoGroupsSection";
import Page from "@/app/page";
import PageHeader from "@/components/ui/PageHeader";

export default function GroupsPage() {

  // TODO: Fetch all my groups from the backend

  return (
    <div className="min-h-screen bg-white p-6 pt-20 lg:pt-6">
      <div className="mx-auto max-w-7xl">
        {/* Header Section with Create Button */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <PageHeader title="My Groups" subtitle="Manage and interact with your study groups" />
          
          {/* Create Group Button */}
          <Link
            href="/groups/create"
            className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 font-medium text-white shadow-lg transition-all hover:bg-emerald-700 hover:shadow-xl hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Group
          </Link>
        </div>

        {groups.length === 0 ? (
          <NoGroupsSection />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {groups.map((group) => (
              <Link key={group.id} href={`/groups/${group.id}/chat`}>
                <GroupCard {...group} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}