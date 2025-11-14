import { groups } from "@/utils/data/groups";
import { notFound } from "next/navigation";
import GroupFilesClient from "@/components/file/GroupFilesClient";

interface GroupFilesPageProps {
  params: Promise<{ groupId: string }>;
}

export default async function GroupFilesPage({ params }: GroupFilesPageProps) {
  const { groupId } = await params;

  // Find the group
  const group = groups.find((g) => g.id === groupId);

  if (!group) {
    notFound();
  }

  return <GroupFilesClient group={group} />;
}