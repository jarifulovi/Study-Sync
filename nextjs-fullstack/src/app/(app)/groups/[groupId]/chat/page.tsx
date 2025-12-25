import { groupsBar } from "@/utils/data/groups";
import { chatMessages } from "@/utils/data/chat";
import ChatPanel from "@/components/chat/ChatPanel";
import GroupsBar from "@/components/chat/GroupsBar";
import { notFound } from "next/navigation";

interface ChatPageProps {
  params: Promise<{ groupId: string }>;
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { groupId } = await params;

  // Find the selected group from the data based on URL parameter
  const selectedGroup = groupsBar.find((g) => g.id === groupId);

  // If group not found, show 404
  if (!selectedGroup) {
    notFound();
  }

  // Filter messages for the current group
  const groupMessages = chatMessages.filter((msg) => msg.groupId === groupId);

  return (
    <div className="flex h-screen">
      {/* Left Section - Groups Bar */}
      <GroupsBar groups={groupsBar} currentGroupId={groupId} />
      
      {/* Right Section - Chat Panel */}
      <ChatPanel selectedGroup={selectedGroup} messages={groupMessages} />
    </div>
  );
}
