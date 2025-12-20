

export const groups = [
  {
    id: "1",
    name: "Advanced Algorithms Study Group",
    description: "Deep dive into complex algorithms, data structures, and competitive programming techniques.",
    status: "public",
    members: 24,
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=300&fit=crop",
  },
  {
    id: "2",
    name: "Web Development Bootcamp",
    description: "Learn modern web technologies including React, Next.js, and TypeScript.",
    status: "private",
    members: 18,
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop",
  },
  {
    id: "3",
    name: "Machine Learning & AI",
    description: "Exploring neural networks, deep learning, and practical AI applications.",
    status: "public",
    members: 32,
    image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400&h=300&fit=crop",
  },
  {
    id: "4",
    name: "Database Design Masters",
    description: "Master SQL, NoSQL, database optimization, and system design patterns.",
    status: "public",
    members: 15,
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=300&fit=crop",
  },
  {
    id: "5",
    name: "Mobile App Development",
    description: "Building cross-platform mobile apps with React Native and Flutter.",
    status: "private",
    members: 21,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
  },
  {
    id: "6",
    name: "Cloud Computing & DevOps",
    description: "AWS, Azure, Docker, Kubernetes, and modern DevOps practices.",
    status: "public",
    members: 28,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
  },
];


export const groupsBar = [
  {
    id: "1",
    name: "Advanced Algorithms",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=300&fit=crop",
    role: "admin" as const,
    lastMessage: "Let's discuss the assignment",
    unreadCount: 3,
  },
  {
    id: "2",
    name: "Web Development",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop",
    role: "member" as const,
    lastMessage: "Thanks for the help!",
  },
  {
    id: "3",
    name: "Machine Learning",
    image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400&h=300&fit=crop",
    role: "member" as const,
    lastMessage: "Check out this resource",
    unreadCount: 1,
  },
  {
    id: "4",
    name: "Database Design",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=300&fit=crop",
    role: "admin" as const,
    lastMessage: "Meeting at 3 PM",
  },
  {
    id: "5",
    name: "Mobile App Dev",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
    role: "member" as const,
    lastMessage: "Great work everyone!",
  },
  {
    id: "6",
    name: "Cloud Computing",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
    role: "member" as const,
    lastMessage: "AWS tutorial tomorrow",
    unreadCount: 5,
  },
  {
    id: "7",
    name: "Next.js Learning",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
    role: "member" as const,
    lastMessage: "Needs to learn testing",
    unreadCount: 3,
  },
  {
    id: "8",
    name: "Mongose Worriors",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    role: "member" as const,
    lastMessage: "Today will start part 2",
    unreadCount: 1,
  },
];


// Detailed group information for details page
export const groupsDetails = [
  {
    id: "1",
    name: "Advanced Algorithms Study Group",
    description: "Deep dive into complex algorithms, data structures, and competitive programming techniques. We focus on solving challenging problems, analyzing time complexity, and preparing for technical interviews at top tech companies.",
    longDescription: "This study group is dedicated to mastering advanced algorithmic concepts and problem-solving techniques. We meet weekly to discuss new algorithms, solve challenging problems together, and share insights from our competitive programming experiences. Whether you're preparing for coding interviews or simply want to improve your algorithmic thinking, this is the perfect place to grow.",
    status: "public",
    type: "Study Group",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=300&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&h=400&fit=crop",
    members: 24,
    createdAt: "2024-09-15",
    topics: ["Algorithms", "Data Structures", "Competitive Programming", "Problem Solving", "Interview Prep"],
    admins: [
      { id: "a1", name: "Sarah Johnson", avatar: "https://i.pravatar.cc/150?img=1", role: "Creator" },
      { id: "a2", name: "Michael Chen", avatar: "https://i.pravatar.cc/150?img=2", role: "Admin" }
    ],
    moderators: [
      { id: "m1", name: "Emily Davis", avatar: "https://i.pravatar.cc/150?img=3" }
    ],
    recentMembers: [
      { id: "u1", name: "Alex Kumar", avatar: "https://i.pravatar.cc/150?img=4", joinedAt: "2024-12-10" },
      { id: "u2", name: "Jessica Lee", avatar: "https://i.pravatar.cc/150?img=5", joinedAt: "2024-12-08" },
      { id: "u3", name: "David Park", avatar: "https://i.pravatar.cc/150?img=6", joinedAt: "2024-12-05" },
      { id: "u4", name: "Sophie Turner", avatar: "https://i.pravatar.cc/150?img=7", joinedAt: "2024-12-01" }
    ],
    stats: {
      totalDiscussions: 156,
      totalFiles: 42,
      weeklyActivity: 85,
      avgResponseTime: 24,
      engagement: 43
    },
    rules: [
      "Be respectful and supportive of all members",
      "Share resources and help others learn",
      "No plagiarism - always cite your sources",
      "Keep discussions relevant to algorithms and data structures",
      "No spam or self-promotion without permission"
    ],
    meetingSchedule: {
      frequency: "Weekly",
      day: "Saturday",
      time: "3:00 PM EST",
      platform: "Discord"
    }
  },
  {
    id: "2",
    name: "Web Development Bootcamp",
    description: "Learn modern web technologies including React, Next.js, and TypeScript.",
    longDescription: "Join our intensive web development bootcamp where we cover everything from HTML/CSS basics to advanced React patterns and Next.js applications. Perfect for beginners and intermediate developers looking to level up their skills. We have weekly coding sessions, code reviews, and project collaborations.",
    status: "private",
    type: "Course Discussion",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=1200&h=400&fit=crop",
    members: 18,
    createdAt: "2024-10-01",
    topics: ["React", "Next.js", "TypeScript", "JavaScript", "Web Development", "CSS"],
    admins: [
      { id: "a3", name: "John Smith", avatar: "https://i.pravatar.cc/150?img=8", role: "Creator" }
    ],
    moderators: [
      { id: "m2", name: "Lisa Wang", avatar: "https://i.pravatar.cc/150?img=9" },
      { id: "m3", name: "Robert Brown", avatar: "https://i.pravatar.cc/150?img=10" }
    ],
    recentMembers: [
      { id: "u5", name: "Maria Garcia", avatar: "https://i.pravatar.cc/150?img=11", joinedAt: "2024-12-12" },
      { id: "u6", name: "Chris Wilson", avatar: "https://i.pravatar.cc/150?img=12", joinedAt: "2024-12-09" },
      { id: "u7", name: "Anna Martinez", avatar: "https://i.pravatar.cc/150?img=13", joinedAt: "2024-12-07" }
    ],
    stats: {
      totalDiscussions: 203,
      totalFiles: 67,
      weeklyActivity: 92,
      avgResponseTime: 31,
      engagement: 37
    },
    rules: [
      "Complete weekly assignments on time",
      "Participate actively in code reviews",
      "Ask questions - no question is too small",
      "Share your project progress weekly",
      "Respect others' learning pace"
    ],
    meetingSchedule: {
      frequency: "Twice Weekly",
      day: "Tuesday & Thursday",
      time: "7:00 PM EST",
      platform: "Zoom"
    }
  },
  {
    id: "3",
    name: "Machine Learning & AI",
    description: "Exploring neural networks, deep learning, and practical AI applications.",
    longDescription: "Dive deep into the world of artificial intelligence and machine learning. We cover fundamental concepts, neural network architectures, deep learning frameworks like TensorFlow and PyTorch, and real-world AI applications. From beginners to advanced practitioners, everyone is welcome to learn and share knowledge.",
    status: "public",
    type: "Study Group",
    image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400&h=300&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=1200&h=400&fit=crop",
    members: 32,
    createdAt: "2024-08-20",
    topics: ["Machine Learning", "Deep Learning", "Neural Networks", "TensorFlow", "PyTorch", "AI"],
    admins: [
      { id: "a4", name: "Dr. Rachel Green", avatar: "https://i.pravatar.cc/150?img=14", role: "Creator" },
      { id: "a5", name: "Kevin Zhang", avatar: "https://i.pravatar.cc/150?img=15", role: "Admin" }
    ],
    moderators: [
      { id: "m4", name: "Priya Sharma", avatar: "https://i.pravatar.cc/150?img=16" }
    ],
    recentMembers: [
      { id: "u8", name: "Tom Anderson", avatar: "https://i.pravatar.cc/150?img=17", joinedAt: "2024-12-15" },
      { id: "u9", name: "Nina Patel", avatar: "https://i.pravatar.cc/150?img=18", joinedAt: "2024-12-13" },
      { id: "u10", name: "James Miller", avatar: "https://i.pravatar.cc/150?img=19", joinedAt: "2024-12-11" },
      { id: "u11", name: "Olivia Taylor", avatar: "https://i.pravatar.cc/150?img=20", joinedAt: "2024-12-06" }
    ],
    stats: {
      totalDiscussions: 287,
      totalFiles: 95,
      weeklyActivity: 78,
      avgResponseTime: 18,
      engagement: 52
    },
    rules: [
      "Share your ML experiments and findings",
      "Provide constructive feedback on models",
      "Document your code and approaches",
      "Respect computational resource limitations",
      "Keep discussions technically accurate"
    ],
    meetingSchedule: {
      frequency: "Weekly",
      day: "Sunday",
      time: "4:00 PM EST",
      platform: "Google Meet"
    }
  }
];