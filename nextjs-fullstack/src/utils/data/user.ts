/**
 * Prisma Schema Suggestion:
 * 
 * model User {
 *   id           String   @id @default(uuid())
 *   name         String
 *   email        String   @unique
 *   avatar       String?
 *   bio          String?
 *   createdAt    DateTime @default(now())
 *   updatedAt    DateTime @updatedAt
 *   
 *   // Statistics
 *   totalGroups     Int @default(0)
 *   totalMessages   Int @default(0)
 *   filesShared     Int @default(0)
 *   
 *   // Relations
 *   groups       UserGroup[]
 *   messages     ChatMessage[]
 *   files        File[]
 *   
 *   @@map("users")
 * }
 */

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  bio: string | null;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  
  // Education & Professional Info
  university: string;
  major: string;
  year: string; // e.g., "3rd Year", "Graduate"
  gpa?: number;
  currentJob?: string;
  location: string;
  
  // Social Links
  linkedin?: string;
  github?: string;
  website?: string;
  
  // Statistics
  totalGroups: number;
  totalMessages: number;
  filesShared: number;
  discussionsStarted: number;
}

export interface UserActivity {
  id: string;
  type: "message" | "file_upload" | "group_join" | "discussion_start";
  title: string;
  description: string;
  groupName?: string;
  timestamp: string;
  icon: "message" | "file" | "users" | "chat";
}

export interface UserStats {
  label: string;
  value: number;
  change: number; // percentage change
  changeType: "increase" | "decrease" | "neutral";
  icon: string;
  color: "blue" | "green" | "purple" | "orange";
}

// Current user data
export const currentUser: User = {
  id: "current-user",
  name: "John Doe",
  email: "john.doe@university.edu",
  avatar: "https://i.pravatar.cc/150?img=12",
  bio: "Computer Science student passionate about algorithms and data structures. Always eager to learn and collaborate with fellow students!",
  createdAt: "2024-09-01T08:00:00Z",
  updatedAt: "2025-11-14T10:30:00Z",
  
  // Education & Professional Info
  university: "MIT",
  major: "Computer Science",
  year: "3rd Year",
  gpa: 3.8,
  currentJob: "Software Engineering Intern at Google",
  location: "Cambridge, MA",
  
  // Social Links
  linkedin: "https://linkedin.com/in/johndoe",
  github: "https://github.com/johndoe",
  website: "https://johndoe.dev",
  
  // Statistics
  totalGroups: 5,
  totalMessages: 247,
  filesShared: 18,
  discussionsStarted: 12,
};

// User statistics for dashboard
export const userStats: UserStats[] = [
  {
    label: "Active Groups",
    value: 5,
    change: 25,
    changeType: "increase",
    icon: "users",
    color: "blue",
  },
  {
    label: "Messages Sent",
    value: 247,
    change: 12,
    changeType: "increase",
    icon: "message-circle",
    color: "blue",
  },
  {
    label: "Files Shared",
    value: 18,
    change: -5,
    changeType: "decrease",
    icon: "file",
    color: "blue",
  },
  {
    label: "Discussions Started",
    value: 12,
    change: 8,
    changeType: "increase",
    icon: "message-square",
    color: "blue",
  },
];

// Recent activity data
export const recentActivity: UserActivity[] = [
  {
    id: "act-1",
    type: "message",
    title: "Sent message in Data Structures",
    description: "Shared solution for binary tree traversal problem",
    groupName: "Data Structures Study Group",
    timestamp: "2025-11-14T09:45:00Z",
    icon: "message",
  },
  {
    id: "act-2",
    type: "file_upload",
    title: "Uploaded file to Algorithms",
    description: "algorithms-cheatsheet.pdf (2.4 MB)",
    groupName: "Advanced Algorithms",
    timestamp: "2025-11-14T08:30:00Z",
    icon: "file",
  },
  {
    id: "act-3",
    type: "discussion_start",
    title: "Started discussion",
    description: "Big O Notation - Time Complexity Analysis",
    groupName: "Data Structures Study Group",
    timestamp: "2025-11-13T16:20:00Z",
    icon: "chat",
  },
  {
    id: "act-4",
    type: "group_join",
    title: "Joined new group",
    description: "Machine Learning Basics",
    timestamp: "2025-11-13T14:15:00Z",
    icon: "users",
  },
  {
    id: "act-5",
    type: "message",
    title: "Replied in Web Development",
    description: "Answered question about React hooks",
    groupName: "Web Development Hub",
    timestamp: "2025-11-13T11:30:00Z",
    icon: "message",
  },
  {
    id: "act-6",
    type: "file_upload",
    title: "Shared presentation",
    description: "react-hooks-presentation.pptx (15.2 MB)",
    groupName: "Web Development Hub",
    timestamp: "2025-11-12T15:45:00Z",
    icon: "file",
  },
];

// Quick actions for dashboard
export const quickActions = [
  {
    id: "create-group",
    label: "Create Group",
    description: "Start a new study group",
    icon: "plus",
    color: "blue",
    href: "/groups/create",
  },
  {
    id: "browse-groups",
    label: "Browse Groups",
    description: "Find groups to join",
    icon: "search",
    color: "green",
    href: "/groups",
  },
  {
    id: "upload-file",
    label: "Upload File",
    description: "Share study materials",
    icon: "upload",
    color: "purple",
    href: "/files",
  },
  {
    id: "view-notifications",
    label: "Notifications",
    description: "Check recent updates",
    icon: "bell",
    color: "orange",
    href: "/notifications",
  },
];