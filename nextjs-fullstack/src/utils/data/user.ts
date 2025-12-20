

// Import types from backend
export interface Education {
  university: string;
  major: string;
  year: string;
  gpa?: number;
  currentJob?: string;
  location: string;
}

export interface Achievement {
  title: string;
  description?: string;
  date?: string;
  link?: string;
}

export interface Certificate {
  title: string;
  issuer?: string;
  issueDate?: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  bio: string | null;
  createdAt: string;
  updatedAt: string;
  
  // Education & Professional Info
  education: Education;
  
  // Social Links
  media_links: {
    linkedin?: string;
    github?: string;
    website?: string;
    [key: string]: string | undefined;
  };
  
  achievements: Achievement[];
  certificates: Certificate[];
  
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
  education: {
    university: "MIT",
    major: "Computer Science",
    year: "3rd Year",
    gpa: 3.8,
    currentJob: "Software Engineering Intern at Google",
    location: "Cambridge, MA",
  },
  
  // Social Links
  media_links: {
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
    website: "https://johndoe.dev",
  },
  
  // Achievements
  achievements: [
    {
      title: "First Place - MIT Hackathon 2024",
      description: "Won first place for developing an AI-powered study assistant",
      date: "2024-11-10T00:00:00Z",
      link: "https://hackathon.mit.edu/2024"
    },
    {
      title: "Dean's List - Fall 2024",
      description: "Achieved 4.0 GPA in all courses",
      date: "2024-12-15T00:00:00Z"
    },
    {
      title: "Published Research Paper",
      description: "Co-authored paper on algorithm optimization published in ACM Journal",
      date: "2024-09-20T00:00:00Z",
      link: "https://dl.acm.org/doi/example"
    },
    {
      title: "Google Code Jam - Top 100",
      description: "Ranked in top 100 globally in Google Code Jam 2024",
      date: "2024-08-15T00:00:00Z"
    }
  ],
  
  // Certificates
  certificates: [
    {
      title: "AWS Certified Developer - Associate",
      issuer: "Amazon Web Services",
      issueDate: "2024-10-01T00:00:00Z",
      expiryDate: "2027-10-01T00:00:00Z",
      credentialId: "AWS-DEV-2024-12345",
      credentialUrl: "https://aws.amazon.com/verification/12345"
    },
    {
      title: "Google Cloud Professional Data Engineer",
      issuer: "Google Cloud",
      issueDate: "2024-07-15T00:00:00Z",
      expiryDate: "2026-07-15T00:00:00Z",
      credentialId: "GCP-DE-2024-67890",
      credentialUrl: "https://cloud.google.com/certification/verify/67890"
    },
    {
      title: "Meta Front-End Developer Professional Certificate",
      issuer: "Meta (via Coursera)",
      issueDate: "2024-05-20T00:00:00Z",
      credentialId: "COURSERA-META-FE-2024",
      credentialUrl: "https://coursera.org/verify/METAFE2024"
    },
    {
      title: "Machine Learning Specialization",
      issuer: "Stanford Online (Coursera)",
      issueDate: "2024-03-10T00:00:00Z",
      credentialId: "STANFORD-ML-2024",
      credentialUrl: "https://coursera.org/verify/STANFORDML2024"
    }
  ],
  
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