import { groups } from "@/utils/data/groups";
import { files } from "@/utils/data/files";
import { notFound } from "next/navigation";
import GroupFilesClient from "@/components/file/GroupFilesClient";
import { PageHeaderWithBackButton } from "@/components/ui/PageHeader";

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

  // Filter files for this group
  const groupFiles = files.filter((f) => f.folder_id === group.id);

  return (
    <div className="min-h-screen bg-gray-50 w-full overflow-x-hidden">
      <div className="w-full max-w-full p-4 sm:p-6 pt-20 lg:pt-6">
        <div className="mx-auto max-w-7xl w-full">
          {/* Header with Back Button */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <PageHeaderWithBackButton title={group.name} subtitle={`${groupFiles.length} files`} />
          </div>

          {/* Interactive Files Component */}
          <GroupFilesClient group={group} groupFiles={groupFiles} />
        </div>
      </div>
    </div>
  );
}