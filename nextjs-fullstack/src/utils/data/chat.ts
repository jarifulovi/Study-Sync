/**
 * PostgreSQL Schema (Normalized):
 * 
 * Table: chat_messages
 * - id                UUID PRIMARY KEY DEFAULT gen_random_uuid()
 * - group_id          UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE
 * - session_id        UUID REFERENCES discussions(id) ON DELETE SET NULL
 * - type              VARCHAR(20) NOT NULL CHECK (type IN ('message', 'notification', 'file', 'discussion'))
 * - sender_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE
 * - content           TEXT NOT NULL
 * - timestamp         TIMESTAMP NOT NULL DEFAULT NOW()
 * - is_edited         BOOLEAN DEFAULT FALSE
 * - is_deleted        BOOLEAN DEFAULT FALSE
 * - created_at        TIMESTAMP DEFAULT NOW()
 * - updated_at        TIMESTAMP DEFAULT NOW()
 * 
 * Table: chat_files (for file messages)
 * - id                UUID PRIMARY KEY DEFAULT gen_random_uuid()
 * - message_id        UUID NOT NULL REFERENCES chat_messages(id) ON DELETE CASCADE
 * - file_url          TEXT NOT NULL
 * - file_name         VARCHAR(255) NOT NULL
 * - file_size         VARCHAR(50) NOT NULL
 * 
 * Table: chat_notifications (for notification messages)
 * - id                UUID PRIMARY KEY DEFAULT gen_random_uuid()
 * - message_id        UUID NOT NULL REFERENCES chat_messages(id) ON DELETE CASCADE
 * - notification_type VARCHAR(20) NOT NULL CHECK (notification_type IN ('join', 'leave', 'roleChange', 'kicked', 'banned'))
 * 
 * Table: chat_discussions (for discussion messages)
 * - id                UUID PRIMARY KEY DEFAULT gen_random_uuid()
 * - message_id        UUID NOT NULL REFERENCES chat_messages(id) ON DELETE CASCADE
 * - discussion_id     UUID NOT NULL REFERENCES discussions(id) ON DELETE CASCADE
 * - discussion_title  VARCHAR(255) NOT NULL
 * 
 * Indexes:
 * - CREATE INDEX idx_messages_group_timestamp ON chat_messages(group_id, timestamp DESC);
 * - CREATE INDEX idx_messages_session ON chat_messages(session_id) WHERE session_id IS NOT NULL;
 * - CREATE INDEX idx_messages_sender ON chat_messages(sender_id);
 */

// Base message properties (common to all message types)
interface BaseMessage {
  id: string;
  groupId: string;
  sessionId: string | null; // For discussion chat messages, null for group chat
  senderId: string;
  senderName: string;
  senderAvatar: string | null;
  timestamp: string; // ISO string, will be TIMESTAMP in PostgreSQL
}

// Regular text message
export interface TextMessage extends BaseMessage {
  type: "message";
  content: string;
}

// System notification (user join/leave/role change/kicked/banned)
export interface NotificationMessage extends BaseMessage {
  type: "notification";
  content: string;
  notificationType: "join" | "leave" | "roleChange" | "kicked" | "banned";
}

// File upload message
export interface FileMessage extends BaseMessage {
  type: "file";
  content: string; // Description like "Shared a file"
  fileUrl: string;
  fileName: string;
  fileSize: string;
}

// Discussion start message (separate from notification)
export interface DiscussionMessage extends BaseMessage {
  type: "discussion";
  content: string;
  discussionId: string;
  discussionTitle: string;
}

// Discriminated Union
export type ChatMessage =
  | TextMessage
  | NotificationMessage
  | FileMessage
  | DiscussionMessage;

// Sample chat data for group "1"
export const chatMessages: ChatMessage[] = [
  {
    id: "1",
    groupId: "1",
    sessionId: null,
    type: "notification",
    senderId: "system",
    senderName: "System",
    senderAvatar: null,
    content: "Sarah Johnson joined the group",
    timestamp: "2025-10-30T09:00:00Z",
    notificationType: "join",
  },
  {
    id: "2",
    groupId: "1",
    sessionId: null,
    type: "message",
    senderId: "user1",
    senderName: "John Doe",
    senderAvatar: "https://i.pravatar.cc/150?img=12",
    content: "Hey everyone! Ready for today's discussion on algorithms?",
    timestamp: "2025-10-30T10:15:00Z",
  },
  {
    id: "3",
    groupId: "1",
    sessionId: null,
    type: "message",
    senderId: "user2",
    senderName: "Sarah Johnson",
    senderAvatar: "https://i.pravatar.cc/150?img=23",
    content: "Absolutely! I've been working on the binary tree problem.",
    timestamp: "2025-10-30T10:16:30Z",
  },
  {
    id: "4",
    groupId: "1",
    sessionId: null,
    type: "discussion",
    senderId: "user1",
    senderName: "John Doe",
    senderAvatar: "https://i.pravatar.cc/150?img=12",
    content: "Started a new discussion",
    discussionId: "disc-1",
    discussionTitle: "Binary Search Trees - Implementation & Analysis",
    timestamp: "2025-10-30T10:20:00Z",
  },
  {
    id: "5",
    groupId: "1",
    sessionId: null,
    type: "message",
    senderId: "user3",
    senderName: "Mike Chen",
    senderAvatar: "https://i.pravatar.cc/150?img=33",
    content: "Great topic! I've been struggling with balancing trees.",
    timestamp: "2025-10-30T10:22:00Z",
  },
  {
    id: "6",
    groupId: "1",
    sessionId: null,
    type: "file",
    senderId: "user1",
    senderName: "John Doe",
    senderAvatar: "https://i.pravatar.cc/150?img=12",
    content: "Shared a file",
    fileUrl: "/files/algorithms-notes.pdf",
    fileName: "algorithms-notes.pdf",
    fileSize: "2.4 MB",
    timestamp: "2025-10-30T10:25:00Z",
  },
  {
    id: "7",
    groupId: "1",
    sessionId: null,
    type: "message",
    senderId: "user2",
    senderName: "Sarah Johnson",
    senderAvatar: "https://i.pravatar.cc/150?img=23",
    content: "Thanks for sharing! This will be really helpful.",
    timestamp: "2025-10-30T10:26:00Z",
  },
  {
    id: "8",
    groupId: "1",
    sessionId: null,
    type: "notification",
    senderId: "system",
    senderName: "System",
    senderAvatar: null,
    content: "Tom Wilson left the group",
    timestamp: "2025-10-30T11:00:00Z",
    notificationType: "leave",
  },
  {
    id: "9",
    groupId: "1",
    sessionId: null,
    type: "message",
    senderId: "user4",
    senderName: "Emily Brown",
    senderAvatar: "https://i.pravatar.cc/150?img=45",
    content: "Can someone explain the time complexity of AVL tree rotations?",
    timestamp: "2025-10-30T11:30:00Z",
  },
  {
    id: "10",
    groupId: "1",
    sessionId: null,
    type: "message",
    senderId: "user1",
    senderName: "John Doe",
    senderAvatar: "https://i.pravatar.cc/150?img=12",
    content: "Sure! AVL rotations are O(1) operations. The key is that each rotation only involves pointer manipulation.",
    timestamp: "2025-10-30T11:32:00Z",
  },
  {
    id: "11",
    groupId: "1",
    sessionId: null,
    type: "discussion",
    senderId: "user4",
    senderName: "Emily Brown",
    senderAvatar: "https://i.pravatar.cc/150?img=45",
    content: "Started a new discussion",
    discussionId: "disc-2",
    discussionTitle: "Time Complexity Analysis - Big O Notation",
    timestamp: "2025-10-30T14:00:00Z",
  },
  {
    id: "11a",
    groupId: "1",
    sessionId: null,
    type: "notification",
    senderId: "system",
    senderName: "System",
    senderAvatar: null,
    content: "Alex Kumar was kicked from the group",
    timestamp: "2025-10-30T14:30:00Z",
    notificationType: "kicked",
  },
  {
    id: "11b",
    groupId: "1",
    sessionId: null,
    type: "notification",
    senderId: "system",
    senderName: "System",
    senderAvatar: null,
    content: "Spam User was banned from the group",
    timestamp: "2025-10-30T14:45:00Z",
    notificationType: "banned",
  },
  {
    id: "12",
    groupId: "1",
    sessionId: null,
    type: "message",
    senderId: "user3",
    senderName: "Mike Chen",
    senderAvatar: "https://i.pravatar.cc/150?img=33",
    content: "Anyone up for a coding session this weekend?",
    timestamp: "2025-10-30T15:00:00Z",
  },
  {
    id: "13",
    groupId: "1",
    sessionId: "324",
    type: "message",
    senderId: "user3",
    senderName: "Mike Chen",
    senderAvatar: "https://i.pravatar.cc/150?img=33",
    content: "Let's start our conversation then",
    timestamp: "2025-10-30T15:00:00Z",
  },

  // Discussion messages for disc-1: "Binary Search Trees - Implementation & Analysis"
  {
    id: "disc1-msg1",
    groupId: "1",
    sessionId: "disc-1",
    type: "message",
    senderId: "user1",
    senderName: "John Doe",
    senderAvatar: "https://i.pravatar.cc/150?img=12",
    content: "Let's start by discussing the basic structure of a BST. Each node has at most two children, with left child < parent < right child.",
    timestamp: "2025-10-30T10:21:00Z",
  },
  {
    id: "disc1-msg2",
    groupId: "1",
    sessionId: "disc-1",
    type: "message",
    senderId: "user2",
    senderName: "Sarah Johnson",
    senderAvatar: "https://i.pravatar.cc/150?img=23",
    content: "Right! I've implemented a simple BST in Python. The insert operation is pretty straightforward.",
    timestamp: "2025-10-30T10:23:00Z",
  },
  {
    id: "disc1-msg3",
    groupId: "1",
    sessionId: "disc-1",
    type: "message",
    senderId: "user3",
    senderName: "Mike Chen",
    senderAvatar: "https://i.pravatar.cc/150?img=33",
    content: "What about the worst-case scenario? When the tree becomes unbalanced, it degrades to O(n) time complexity.",
    timestamp: "2025-10-30T10:25:00Z",
  },
  {
    id: "disc1-msg4",
    groupId: "1",
    sessionId: "disc-1",
    type: "message",
    senderId: "user1",
    senderName: "John Doe",
    senderAvatar: "https://i.pravatar.cc/150?img=12",
    content: "Exactly! That's why we have self-balancing trees like AVL and Red-Black trees. They maintain O(log n) operations.",
    timestamp: "2025-10-30T10:27:00Z",
  },
  {
    id: "disc1-msg5",
    groupId: "1",
    sessionId: "disc-1",
    type: "file",
    senderId: "user2",
    senderName: "Sarah Johnson",
    senderAvatar: "https://i.pravatar.cc/150?img=23",
    content: "Shared a file",
    fileUrl: "/files/bst-implementation.py",
    fileName: "bst-implementation.py",
    fileSize: "3.2 KB",
    timestamp: "2025-10-30T10:30:00Z",
  },
  {
    id: "disc1-msg6",
    groupId: "1",
    sessionId: "disc-1",
    type: "message",
    senderId: "user4",
    senderName: "Emily Brown",
    senderAvatar: "https://i.pravatar.cc/150?img=45",
    content: "Thanks for sharing! Can someone explain how AVL rotations work?",
    timestamp: "2025-10-30T11:00:00Z",
  },
  {
    id: "disc1-msg7",
    groupId: "1",
    sessionId: "disc-1",
    type: "message",
    senderId: "user3",
    senderName: "Mike Chen",
    senderAvatar: "https://i.pravatar.cc/150?img=33",
    content: "AVL trees use four types of rotations: LL, RR, LR, and RL. They're applied based on the balance factor of nodes.",
    timestamp: "2025-10-30T11:15:00Z",
  },
  {
    id: "disc1-msg8",
    groupId: "1",
    sessionId: "disc-1",
    type: "message",
    senderId: "user1",
    senderName: "John Doe",
    senderAvatar: "https://i.pravatar.cc/150?img=12",
    content: "I'll prepare a visual diagram showing all rotation types. Will share it tomorrow!",
    timestamp: "2025-10-30T12:45:00Z",
  },
];
