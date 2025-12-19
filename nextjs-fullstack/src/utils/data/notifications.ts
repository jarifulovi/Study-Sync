// NOTE: Additional data needed for better UI/UX:
// 1. sender_name: string - To display who triggered the notification
// 2. sender_image: string | null - For sender's avatar
// 3. group_name: string - To display group name in notifications
// 4. is_read: boolean - To mark notifications as read/unread
// 5. action_url: string - To navigate when clicking on notification
// 6. file_name: string (for file_shared type) - To show which file was shared
// 7. discussion_topic: string (for discussion_topic type) - To show discussion title

export interface Notification {
  notification_id: string;
  user_id: string;
  type: "invitation" | "discussion_topic" | "join_request" | "join_group" | "file_shared" | "video_conferencing";
  content: string;
  sender?: {
    id: string;
    name: string;
    image: string | null;
  };
  group_id?: string;
  group_name?: string;
  receive_date: string;
  is_read: boolean;
  action_url?: string;
}

export const notifications: Notification[] = [
  {
    notification_id: "1",
    user_id: "user1",
    type: "invitation",
    content: "John Doe invited you to join the Advanced Algorithms Study Group",
    sender: { id: "sender1", name: "John Doe", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
    group_id: "group1",
    group_name: "Advanced Algorithms Study Group",
    receive_date: "2025-10-26T10:30:00Z",
    is_read: false,
    action_url: "/groups/group1/details",
  },
  {
    notification_id: "2",
    user_id: "user1",
    type: "join_request",
    content: "Sarah Smith requested to join the Web Development Bootcamp",
    sender: { id: "sender2", name: "Sarah Smith", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face" },
    group_id: "group2",
    group_name: "Web Development Bootcamp",
    receive_date: "2025-10-26T09:15:00Z",
    is_read: false,
    action_url: "/groups/group2/requests",
  },
  {
    notification_id: "3",
    user_id: "user1",
    type: "join_group",
    content: "You successfully joined the Machine Learning & AI",
    group_id: "group3",
    group_name: "Machine Learning & AI",
    receive_date: "2025-10-25T18:45:00Z",
    is_read: true,
    action_url: "/groups/group3",
  },
  {
    notification_id: "4",
    user_id: "user1",
    type: "discussion_topic",
    content: "Alex Johnson started a discussion Binary Search Trees in Database Design Masters",
    sender: { id: "sender3", name: "Alex Johnson", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
    group_id: "group4",
    group_name: "Database Design Masters",
    receive_date: "2025-10-25T16:20:00Z",
    is_read: true,
    action_url: "/groups/group4/discussions/discussion1",
  },
  {
    notification_id: "5",
    user_id: "user1",
    type: "file_shared",
    content: "Emma Wilson shared a file React Best Practices.pdf in Mobile App Development",
    sender: { id: "sender4", name: "Emma Wilson", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" },
    group_id: "group5",
    group_name: "Mobile App Development",
    receive_date: "2025-10-25T14:10:00Z",
    is_read: true,
    action_url: "/groups/group5/files/file1",
  },
  {
    notification_id: "6",
    user_id: "user1",
    type: "video_conferencing",
    content: "Michael Chen started a video conferencing in Cloud Computing & DevOps",
    sender: { id: "sender5", name: "Michael Chen", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" },
    group_id: "group6",
    group_name: "Cloud Computing & DevOps",
    receive_date: "2025-10-25T11:00:00Z",
    is_read: true,
    action_url: "/groups/group6/conference",
  },
  {
    notification_id: "7",
    user_id: "user1",
    type: "invitation",
    content: "David Lee invited you to join the Python Programming",
    sender: { id: "sender6", name: "David Lee", image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face" },
    group_id: "group7",
    group_name: "Python Programming",
    receive_date: "2025-10-24T15:30:00Z",
    is_read: true,
    action_url: "/groups/group7/details",
  },
  {
    notification_id: "8",
    user_id: "user1",
    type: "file_shared",
    content: "Lisa Wang shared a file TypeScript Guide.pdf in Web Development Bootcamp",
    sender: { id: "sender7", name: "Lisa Wang", image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face" },
    group_id: "group2",
    group_name: "Web Development Bootcamp",
    receive_date: "2025-10-24T12:00:00Z",
    is_read: true,
    action_url: "/groups/group2/files/file2",
  },
];