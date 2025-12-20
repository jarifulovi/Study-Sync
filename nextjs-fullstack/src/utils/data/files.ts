// NOTE: Additional data that could be useful from backend:
// 1. folder_owner: { id, name, image } - To show who created the folder
// 2. last_modified: Date - To show when folder was last updated
// 3. permissions: string[] - To show access level (read, write, admin)
// 4. shared_with: number - Count of users/groups folder is shared with

export interface Folder {
  folder_id: string;
  name: string;
  description?: string;
  created_at: string;
  file_count: number;
  color: string; // For visual distinction
}

export interface File {
  file_id: string;
  folder_id: string;
  name: string;
  mime_type: string;
  size: number; // in bytes
  uploaded_by: {
    id: string;
    name: string;
    image: string | null;
  };
  uploaded_at: string;
  url: string;
}

export const folders: Folder[] = [
  {
    folder_id: "1",
    name: "Algorithm Study Materials",
    description: "Collection of algorithm resources and practice problems",
    created_at: "2025-10-20T10:00:00Z",
    file_count: 12,
    color: "blue",
  },
  {
    folder_id: "2",
    name: "Web Development Resources",
    description: "Frontend and backend development guides",
    created_at: "2025-10-18T14:30:00Z",
    file_count: 8,
    color: "purple",
  },
  {
    folder_id: "3",
    name: "Machine Learning Papers",
    description: "Research papers and ML tutorials",
    created_at: "2025-10-15T09:15:00Z",
    file_count: 15,
    color: "green",
  },
  {
    folder_id: "4",
    name: "Database Design Docs",
    description: "SQL queries, ER diagrams, and optimization guides",
    created_at: "2025-10-12T16:45:00Z",
    file_count: 6,
    color: "orange",
  },
  {
    folder_id: "5",
    name: "Project Presentations",
    description: "Presentation slides and demo videos",
    created_at: "2025-10-10T11:20:00Z",
    file_count: 4,
    color: "red",
  },
];

export const files: File[] = [
  // Algorithm Study Materials
  {
    file_id: "1",
    folder_id: "1",
    name: "Binary Search Trees.pdf",
    mime_type: "application/pdf",
    size: 2457600, // 2.4 MB
    uploaded_by: { id: "user1", name: "John Doe", image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80' },
    uploaded_at: "2025-10-25T10:30:00Z",
    url: "#",
  },
  {
    file_id: "2",
    folder_id: "1",
    name: "Dynamic Programming Guide.pdf",
    mime_type: "application/pdf",
    size: 3145728, // 3 MB
    uploaded_by: { id: "user2", name: "Sarah Smith", image: 'https://ui-avatars.com/api/?name=Jennifer+Taylor&background=ec4899&color=fff' },
    uploaded_at: "2025-10-24T14:20:00Z",
    url: "#",
  },
  {
    file_id: "3",
    folder_id: "1",
    name: "Graph Algorithms.pptx",
    mime_type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    size: 5242880, // 5 MB
    uploaded_by: { id: "user3", name: "Alex Johnson", image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80' },
    uploaded_at: "2025-10-23T09:15:00Z",
    url: "#",
  },
  {
    file_id: "4",
    folder_id: "1",
    name: "sorting-algorithms.zip",
    mime_type: "application/zip",
    size: 1048576, // 1 MB
    uploaded_by: { id: "user1", name: "John Doe", image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80' },
    uploaded_at: "2025-10-22T16:45:00Z",
    url: "#",
  },

  // Web Development Resources
  {
    file_id: "5",
    folder_id: "2",
    name: "React Best Practices.pdf",
    mime_type: "application/pdf",
    size: 1572864, // 1.5 MB
    uploaded_by: { id: "user4", name: "Emma Wilson", image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80' },
    uploaded_at: "2025-10-21T11:00:00Z",
    url: "#",
  },
  {
    file_id: "6",
    folder_id: "2",
    name: "TypeScript Handbook.pdf",
    mime_type: "application/pdf",
    size: 2097152, // 2 MB
    uploaded_by: { id: "user5", name: "Michael Chen", image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80' },
    uploaded_at: "2025-10-20T15:30:00Z",
    url: "#",
  },
  {
    file_id: "7",
    folder_id: "2",
    name: "CSS Grid Tutorial.docx",
    mime_type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    size: 524288, // 512 KB
    uploaded_by: { id: "user4", name: "Emma Wilson", image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80' },
    uploaded_at: "2025-10-19T10:15:00Z",
    url: "#",
  },
  {
    file_id: "8",
    folder_id: "2",
    name: "api-documentation.html",
    mime_type: "text/html",
    size: 204800, // 200 KB
    uploaded_by: { id: "user6", name: "David Lee", image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80' },
    uploaded_at: "2025-10-18T13:45:00Z",
    url: "#",
  },

  // Machine Learning Papers
  {
    file_id: "9",
    folder_id: "3",
    name: "Neural Networks Introduction.pdf",
    mime_type: "application/pdf",
    size: 4194304, // 4 MB
    uploaded_by: { id: "user7", name: "Lisa Wang", image: null },
    uploaded_at: "2025-10-17T09:30:00Z",
    url: "#",
  },
  {
    file_id: "10",
    folder_id: "3",
    name: "Deep Learning Paper.pdf",
    mime_type: "application/pdf",
    size: 3670016, // 3.5 MB
    uploaded_by: { id: "user7", name: "Lisa Wang", image: null },
    uploaded_at: "2025-10-16T14:00:00Z",
    url: "#",
  },
  {
    file_id: "11",
    folder_id: "3",
    name: "ML Model Training.ipynb",
    mime_type: "application/x-ipynb+json",
    size: 307200, // 300 KB
    uploaded_by: { id: "user8", name: "Robert Brown", image: null },
    uploaded_at: "2025-10-15T11:20:00Z",
    url: "#",
  },

  // Database Design Docs
  {
    file_id: "12",
    folder_id: "4",
    name: "ER Diagram.png",
    mime_type: "image/png",
    size: 819200, // 800 KB
    uploaded_by: { id: "user3", name: "Alex Johnson", image: null },
    uploaded_at: "2025-10-14T10:00:00Z",
    url: "#",
  },
  {
    file_id: "13",
    folder_id: "4",
    name: "SQL Optimization Guide.pdf",
    mime_type: "application/pdf",
    size: 1835008, // 1.75 MB
    uploaded_by: { id: "user9", name: "Jennifer Taylor", image: null },
    uploaded_at: "2025-10-13T15:30:00Z",
    url: "#",
  },
  {
    file_id: "14",
    folder_id: "4",
    name: "database-schema.sql",
    mime_type: "application/sql",
    size: 51200, // 50 KB
    uploaded_by: { id: "user3", name: "Alex Johnson", image: null },
    uploaded_at: "2025-10-12T09:45:00Z",
    url: "#",
  },

  // Project Presentations
  {
    file_id: "15",
    folder_id: "5",
    name: "Final Project Demo.mp4",
    mime_type: "video/mp4",
    size: 20971520, // 20 MB
    uploaded_by: { id: "user2", name: "Sarah Smith", image: null },
    uploaded_at: "2025-10-11T16:00:00Z",
    url: "#",
  },
  {
    file_id: "16",
    folder_id: "5",
    name: "Project Presentation.pptx",
    mime_type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    size: 6291456, // 6 MB
    uploaded_by: { id: "user1", name: "John Doe", image: null },
    uploaded_at: "2025-10-10T14:30:00Z",
    url: "#",
  },
];
