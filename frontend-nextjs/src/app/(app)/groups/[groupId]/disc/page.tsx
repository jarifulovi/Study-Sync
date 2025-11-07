

import { groupsBar } from "@/utils/data/groups";
import { discussions } from "@/utils/data/discussion";
import DiscussionsPanel from "@/components/discussions/DiscussionsPanel";
import { notFound } from "next/navigation";

interface DiscussionsListPageProps {
  params: Promise<{ groupId: string }>;
}

export default async function DiscussionsListPage({
  params,
}: DiscussionsListPageProps) {
  const { groupId } = await params;

  // Find the selected group from the data based on URL parameter
  const selectedGroup = groupsBar.find((g) => g.id === groupId);

  // If group not found, show 404
  if (!selectedGroup) {
    notFound();
  }

  // Filter discussions for this group
  const groupDiscussions = discussions.filter(
    (disc) => disc.groupId === groupId
  );

  return (
    <DiscussionsPanel 
      selectedGroup={selectedGroup} 
      discussions={groupDiscussions}
      groupId={groupId}
    />
  );
}