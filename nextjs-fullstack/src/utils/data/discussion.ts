/**
 * Prisma Schema:
 * 
 * model Discussion {
 *   id           String   @id @default(uuid())
 *   groupId      String
 *   title        String
 *   description  String?   // Optional, for summary or initial post
 *   creatorId    String
 *   createdAt    DateTime  @default(now())
 *   updatedAt    DateTime  @updatedAt
 *
 *   // Relations
 *   group        Group     @relation(fields: [groupId], references: [id], onDelete: Cascade)
 *   creator      User      @relation(fields: [creatorId], references: [id], onDelete: Cascade)
 *   messages     ChatMessage[]
 *
 *   @@index([groupId, createdAt])
 * }
 */

export interface Discussion {
  id: string;
  groupId: string;
  title: string;
  description: string | null;
  creatorId: string;
  creatorName: string; // Denormalized for UI
  creatorAvatar: string | null;
  createdAt: string; // ISO string, DateTime in Prisma
  updatedAt: string; // ISO string, DateTime in Prisma
  messageCount?: number; // Optional, for displaying message count in list
}

// Sample discussions data - Multiple discussions for group "1"
export const discussions: Discussion[] = [
  {
    id: "disc-1",
    groupId: "1",
    title: "Binary Search Trees - Implementation & Analysis",
    description: "Let's dive deep into BST implementation, balancing techniques, and performance analysis. Share your code and insights!",
    creatorId: "user1",
    creatorName: "John Doe",
    creatorAvatar: "https://i.pravatar.cc/150?img=12",
    createdAt: "2025-10-30T10:20:00Z",
    updatedAt: "2025-10-30T12:45:00Z",
    messageCount: 8,
  },
  {
    id: "disc-2",
    groupId: "1",
    title: "Time Complexity Analysis - Big O Notation",
    description: "Understanding time and space complexity for various algorithms. Let's clarify any confusion!",
    creatorId: "user4",
    creatorName: "Emily Brown",
    creatorAvatar: "https://i.pravatar.cc/150?img=45",
    createdAt: "2025-10-30T14:00:00Z",
    updatedAt: "2025-10-30T14:00:00Z",
    messageCount: 0,
  },
  {
    id: "disc-3",
    groupId: "1",
    title: "Dynamic Programming - Memoization vs Tabulation",
    description: "Comparing different DP approaches with practical examples",
    creatorId: "user2",
    creatorName: "Sarah Johnson",
    creatorAvatar: "https://i.pravatar.cc/150?img=23",
    createdAt: "2025-10-29T16:30:00Z",
    updatedAt: "2025-10-29T18:15:00Z",
    messageCount: 0,
  },
  {
    id: "disc-4",
    groupId: "1",
    title: "Graph Algorithms - DFS vs BFS",
    description: "When to use depth-first search vs breadth-first search? Real-world applications and trade-offs",
    creatorId: "user3",
    creatorName: "Mike Chen",
    creatorAvatar: "https://i.pravatar.cc/150?img=33",
    createdAt: "2025-10-28T11:00:00Z",
    updatedAt: "2025-10-28T13:20:00Z",
    messageCount: 0,
  },
  {
    id: "disc-5",
    groupId: "1",
    title: "Sorting Algorithms Comparison",
    description: "QuickSort, MergeSort, HeapSort - which one to use and when?",
    creatorId: "user1",
    creatorName: "John Doe",
    creatorAvatar: "https://i.pravatar.cc/150?img=12",
    createdAt: "2025-10-27T09:00:00Z",
    updatedAt: "2025-10-27T10:30:00Z",
    messageCount: 0,
  },
];


