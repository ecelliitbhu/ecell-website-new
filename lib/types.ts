export interface User {
  id: string;
  email: string;
  createdAt: string;
}

export interface Student {
  id: string;
  userId: string;
  name?: string;
  rollNo?: string;
  branch?: string;
  cpi?: number;
  courseType?: string;
  year?: number;
  linkedinUrl?: string;
  githubUrl?: string;
  resumeUrl?: string;
  user?: User;
}

export interface Recruiter {
  id: string;
  userId?: string;
  companyName?: string;
  address?: string;
  websiteUrl?: string;
}

export interface Post {
  id: string;
  recruiterId: string;
  companyName?: string;
  jobTitle?: string;
  jobDescription?: string;
  qualification?: string;
  experience?: string;
  stipend?: string;
  requiredSkills?: string[];
  location?: string;
  jobType?: JobType;
  createdAt?: string;
  applications?: Application[];
}

export interface Application {
  id: string;
  studentId: string;
  postId: string;
  appliedAt?: Date;
  status: ApplicationStatus;
  student: Student;
  post: Post;
}

export type PostErrors = {
  companyName?: string;
  jobTitle?: string;
  jobDescription?: string;
  qualification?: string;
  experience?: string;
  stipend?: string;
  requiredSkills?: string;
  location?: string;
  jobType?: string;
};


export type JobType = "REMOTE" | "ONSITE" | "HYBRID";

export type ApplicationStatus = "PENDING" | "REJECTED" | "ACCEPTED";
