"use client";

import DetailsCoverImage  from "@/components/groups/DetailsCoverImage";
import DetailsStatSection from "@/components/groups/DetailsStatSection";
import NoGroupDetails from "@/components/groups/NoGroupDetails";
import { groupsDetails } from "@/utils/data/groups";
import { getInitials } from "@/utils/formatter";
import { use } from "react";

interface GroupDetailsPageProps {
  params: Promise<{
    groupId: string;
  }>;
}

// This is group details page for members
// visitors details page will be implemented in main/[groupId]/page.tsx
export default function GroupDetailsPage({ params }: GroupDetailsPageProps) {
  // Find group details by ID
  const { groupId } = use(params);
  const group = groupsDetails.find((g) => g.id === groupId);

  if (!group) {
    return (
      <NoGroupDetails />
    );
  }

  return (
    <div className="flex flex-1 flex-col bg-white">
      <DetailsCoverImage
        coverImage={group.coverImage}
        imageUrl={group.image}
        name={group.name}
        status={group.status}
        type={group.type}
        members={group.members}
      />

      {/* Main Content */}
      <div className="mx-auto w-full max-w-6xl p-6 space-y-6">
        <DetailsStatSection
          discussion={{ total: group.stats.totalDiscussions }}
          file={{ total: group.stats.totalFiles }}
          activity={{ totalWeekly: group.stats.weeklyActivity }}
          members={group.members}
          avgResponse={group.stats.avgResponseTime}
          engagement={ group.stats.engagement }
        />

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* About Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">About This Group</h2>
              <p className="text-slate-700 leading-relaxed mb-4">{group.longDescription}</p>
              <div className="pt-4 border-t border-slate-200">
                <p className="text-sm text-slate-600 mb-2">
                  <span className="font-medium text-slate-700">Created:</span> {new Date(group.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>

            {/* Topics Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Topics Covered</h2>
              <div className="flex flex-wrap gap-2">
                {group.topics.map((topic) => (
                  <span key={topic} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors">
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Group Rules */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Group Rules</h2>
              <ul className="space-y-3">
                {group.rules.map((rule, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center">
                        <span className="text-xs font-medium text-slate-700">{index + 1}</span>
                      </div>
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed">{rule}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Meeting Schedule */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Meeting Schedule</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-slate-100 p-2">
                    <svg className="h-5 w-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{group.meetingSchedule.frequency}</p>
                    <p className="text-xs text-slate-600">Every {group.meetingSchedule.day}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-slate-100 p-2">
                    <svg className="h-5 w-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{group.meetingSchedule.time}</p>
                    <p className="text-xs text-slate-600">Platform: {group.meetingSchedule.platform}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            
            {/* Admins Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Admins</h2>
              <div className="space-y-3">
                {group.admins.map((admin) => (
                  <div key={admin.id} className="flex items-center gap-3">
                    {admin.avatar ? (
                      <img src={admin.avatar} alt={admin.name} className="h-10 w-10 rounded-full object-cover" />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                        <span className="text-sm font-medium text-white">{getInitials(admin.name)}</span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">{admin.name}</p>
                      <p className="text-xs text-slate-600">{admin.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Moderators Section */}
            {group.moderators && group.moderators.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Moderators</h2>
                <div className="space-y-3">
                  {group.moderators.map((mod) => (
                    <div key={mod.id} className="flex items-center gap-3">
                      {mod.avatar ? (
                        <img src={mod.avatar} alt={mod.name} className="h-10 w-10 rounded-full object-cover" />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                          <span className="text-sm font-medium text-white">{getInitials(mod.name)}</span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">{mod.name}</p>
                        <p className="text-xs text-slate-600">Moderator</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Members Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-900">Recent Members</h2>
                <span className="text-xs text-slate-600">{group.members} total</span>
              </div>
              <div className="space-y-3">
                {group.recentMembers.map((member) => (
                  <div key={member.id} className="flex items-center gap-3">
                    {member.avatar ? (
                      <img src={member.avatar} alt={member.name} className="h-10 w-10 rounded-full object-cover" />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                        <span className="text-sm font-medium text-white">{getInitials(member.name)}</span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">{member.name}</p>
                      <p className="text-xs text-slate-600">Joined {new Date(member.joinedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full text-center text-sm font-medium text-slate-700 hover:text-slate-900 py-2 rounded-lg hover:bg-slate-50 transition-colors">
                View All Members
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
