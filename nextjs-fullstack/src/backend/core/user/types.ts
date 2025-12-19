
export interface ServiceResponse<T = any> {
  success: boolean;
  message?: string;
  error?: string;
  data?: T;
}

// RegisterInput 
export interface RegisterInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export interface LoginInput {
  email: string;
  password: string;
};

export interface LoginOutput {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  profile?: Profile; // optional, profile data
  session?: any;     // Supabase session info
};

export interface ForgotPasswordInput {
  email: string;
};

export interface ResetPasswordInput {
  access_token: string;
  password: string;
};


// Profile schema interface
export interface Profile {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  bio: string | null;
  createdAt: string;
  updatedAt: string;
  
  // Education & Professional Info
  education: Education,
  
  // Social Links
  media_links: {
    linkedin?: string;
    github?: string;
    website?: string;
    [key: string]: string | undefined; // future-proof for extra links
  },
  achievements: Achievement[],
  certificates: Certificate[],

  
  // Statistics (will be fetched)
  // totalGroups: number;
  // totalMessages: number;
  // filesShared: number;
  // discussionsStarted: number;
}

// Education Panel structure
export interface Education {
  university: string;
  major: string;
  year: string; // e.g., "3rd Year", "Graduate"
  gpa?: number;
  currentJob?: string;
  location: string;
}

// Single achievement structure
export interface Achievement {
  title: string;        // e.g., "Won Hackathon 2024"
  description?: string; // optional details
  date?: string;        // ISO string of achievement date
  link?: string;        // optional external link
}

// Single certificate structure
export interface Certificate {
  title: string;        // e.g., "AWS Certified Developer"
  issuer?: string;      // e.g., "Amazon"
  issueDate?: string;   // ISO string
  expiryDate?: string;  // ISO string, optional
  credentialId?: string;
  credentialUrl?: string;
}