import { currentUser, userStats, recentActivity, quickActions } from "@/utils/data/user";
import UserProfileOverview from "@/components/dashboard/UserProfileOverview";
import StatsCard from "@/components/dashboard/StatsCard";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import QuickActions from "@/components/dashboard/QuickActions";
import Achievements from "@/components/dashboard/Achievements";
import Certificates from "@/components/dashboard/Certificates";



export default function DashboardPage() {
  return (
    <div className="min-h-screen p-6 pt-20 lg:pt-6">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* User Profile Overview */}
        <UserProfileOverview user={currentUser} />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {userStats.map((stat) => (
            <StatsCard key={stat.label} stat={stat} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Activity Feed */}
          <div className="lg:col-span-2">
            <ActivityFeed activities={recentActivity} />
          </div>

          {/* Right Column - Quick Actions */}
          <div className="lg:col-span-1">
            <QuickActions actions={quickActions} />
          </div>
        </div>

        {/* Achievements & Certificates Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Achievements */}
          <Achievements achievements={currentUser.achievements} />
          
          {/* Certificates */}
          <Certificates certificates={currentUser.certificates} />
        </div>
      </div>
    </div>
  );
}