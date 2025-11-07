import { groupsBar } from "@/utils/data/groups";
import GroupsBar from "@/components/chat/GroupsBar";
import { notFound } from "next/navigation";

interface DiscussionLayoutProps {
  children: React.ReactNode;
  params: Promise<{ groupId: string }>;
}

export default async function DiscussionLayout({
  children,
  params,
}: DiscussionLayoutProps) {
  const { groupId } = await params;

  // Find the selected group from the data based on URL parameter
  const selectedGroup = groupsBar.find((g) => g.id === groupId);

  // If group not found, show 404
  if (!selectedGroup) {
    notFound();
  }

  return (
    <div className="fixed inset-0 flex">
      {/* Left Section - Groups Bar */}
      <GroupsBar groups={groupsBar} currentGroupId={groupId} />
      
      {/* Right Section - Children (Discussion Pages) */}
      {children}
    </div>
  );
}