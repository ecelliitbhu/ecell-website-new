import fs from "fs";
import path from "path";

const userFilePath = path.join(process.cwd(), "SIP_data", "users.json");

export const writeUserToFile = async (user) => {
  try {
    // Read the existing users from the file
    const users = JSON.parse(fs.readFileSync(userFilePath, "utf-8"));

    // Find the index of the user with the same email
    const userIndex = users.findIndex((existingUser) => existingUser.email === user.email);

    if (userIndex !== -1) {
      // User exists, update their information
      users[userIndex] = user;
      // console.log(`User ${user.email} updated.`);
    } else {
      // User does not exist, add them to the array
      users.push(user);
      // console.log(`User ${user.email} added.`);
    }

    // Write the updated array back to the file
    fs.writeFileSync(userFilePath, JSON.stringify(users, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing user to file:", error);
  }
};
// import NextAuth from "next-auth/next";
// import GoogleProvider from "next-auth/providers/google";

// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID ?? "",
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
//     }),
//   ],
//   callbacks: {
//     async signIn({ user, account, profile }) {
//       if (account?.provider === "google" && profile?.email) {
//         // Check if user exists by making a GET request to the /user endpoint
//         const response = await fetch(`http://localhost:8000/user?email=${profile.email}`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });

//         if (response.ok) {
//           const userData = await response.json();
//           // User exists, add user information to session
//           return true; // Allow sign in
//         } else {
//           // User does not exist, redirect to /campus-ambassador
//           return '/campus-ambassador'; // Redirect to campus ambassador page
//         }
//       }
//       return false; // If not signed in
//     },
//     async session({ session, user }) {
//       // Optionally, you can also fetch user data here if needed
//       // and merge it into the session
//       return session; // Return updated session
//     },
//     async redirect({ url, baseUrl }) {
//       return baseUrl; // Redirect to base URL
//     },
//   },
//   session: {
//     strategy: 'jwt',
//     maxAge: 1 * 24 * 60 * 60, // 1 day
//   },
// });

// export { handler as GET, handler as POST };