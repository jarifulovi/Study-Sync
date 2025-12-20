import { MessageSquare, FileText, TrendingUp, Users, Clock, Zap } from "lucide-react";

interface DetailsStatSectionProps {
  discussion: {
    total: number;
  };
  file: {
    total: number;
  };
  activity: {
    totalWeekly: number;
  };
  members: number;
  avgResponse: number; // minutes
  engagement?: number; // percentage
}

export default function DetailsStatSection({
  discussion,
  file,
  activity,
  members,
  avgResponse,
  engagement,
}: DetailsStatSectionProps) {
  const stats = [
    {
      icon: MessageSquare,
      value: discussion.total,
      label: "Discussions",
      desc: "Active threads",
    },
    {
      icon: FileText,
      value: file.total,
      label: "Files",
      desc: "Resources shared",
    },
    {
      icon: TrendingUp,
      value: `${activity.totalWeekly}%`,
      label: "Activity",
      desc: "This week",
    },
    {
      icon: Users,
      value: members,
      label: "Members",
      desc: "Participants",
    },
    {
      icon: Clock,
      value: `${avgResponse}m`,
      label: "Response",
      desc: "Avg. reply time",
    },
    ...(engagement ? [{
      icon: Zap,
      value: `${engagement}%`,
      label: "Engagement",
      desc: "Participation rate",
    }] : []),
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="group p-4 transition-colors hover:bg-slate-50/50"
          >
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-slate-100 p-2 group-hover:bg-slate-200 transition-colors">
                <stat.icon className="h-4 w-4 text-slate-700" />
              </div>
              <div>
                <div className="text-2xl font-semibold text-slate-900">
                  {stat.value}
                </div>
                <div className="space-y-0.5 mt-1">
                  <div className="text-sm font-medium text-slate-900">
                    {stat.label}
                  </div>
                  <div className="text-xs text-slate-500">
                    {stat.desc}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}