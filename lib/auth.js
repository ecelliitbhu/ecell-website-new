import { getSession } from "next-auth/react";

// Get the currently logged-in user from NextAuth session
export const getStoredUser = async () => {
  try {
    const session = await getSession();
    return session?.user || null;
  } catch (error) {
    console.error("Error getting session user:", error);
    return null;
  }
};

// Get user ID from session
export const getCurrentUserId = async () => {
  const user = await getStoredUser();
  // console.log("Current user from session:", user);
  return user?.id || null;
};

// Get user roles (STUDENT, RECRUITER, AMBASSADOR)
export const getCurrentUserRole = async () => {
  const user = await getStoredUser();
  const roles = [];

  if (!user) return roles;

  if (user.roles?.includes("STUDENT")) roles.push("STUDENT");
  if (user.roles?.includes("RECRUITER")) roles.push("RECRUITER");
  if (user.roles?.includes("AMBASSADOR")) roles.push("AMBASSADOR");

  return roles;
};

// Check if user is authenticated
export const isAuthenticated = async () => {
  const user = await getStoredUser();
  return !!user;
};

// Logout utility
export const logout = async () => {
  const { signOut } = await import("next-auth/react");
  await signOut();
};

// Get student ID (uses user.id for now)
export const getStudentId = async () => {
  const user = await getStoredUser();
  // console.log("Getting student ID from session:", user);
  return user?.id || null;
};

// Get recruiter ID (uses user.id for now)
export const getRecruiterId = async () => {
  const user = await getStoredUser();
  // console.log("Getting recruiter ID from session:", user);
  return user?.id || null;
};
