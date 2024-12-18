import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";


// https://cell-backend-8gp3.onrender.com
async function checkUserExists(email) {
  try {
    console.log("entered here")
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL+`/user?email=${email}`);
    if (response.status === 404) {
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error checking user:', error);
    return false;
  }
}
export const authOptions = {
  secret:process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Check if the user exists by calling the backend API
      const userExists = await checkUserExists(user.email);
      
      if (!userExists) {
        console.log("entered error")
        // If the user doesn't exist, throw an error to trigger redirection
        throw new Error('Campus Ambassador form closed');
      }

      return true; // Allow sign-in if user exists
    },

    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
  pages: {
    error: '/',
  }
};

export default NextAuth(authOptions);
