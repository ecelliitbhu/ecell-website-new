// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// IMPORTANT: Use advanced initialization to get access to req and res
export default async function auth(req, res) {
  // Pass req and res to NextAuth along with your options
  return NextAuth(req, res, {
    // Changed name to avoid confusion with the function name
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
    ],
    callbacks: {
      // Modify signIn to accept 'req' as the first argument using advanced initialization
      async signIn({ user, account }) {
        // Standard arguments for signIn callback
        // When using advanced initialization, 'req' will be implicitly available from the outer function's scope.
        // However, to directly access it *within* the callback parameters, you'd typically pass it explicitly
        // if you were defining this in a different file. Since this is in the same file,
        // and we will change the export to be a function, `req` becomes accessible.

        // --- OLD INCORRECT LOGIC REMOVED ---
        // const absoluteUrl = "https://www.google.com/" + account.callbackUrl;
        // const url = new URL(absoluteUrl);
        // const tab = url.searchParams.get("tab");
        // --- END OF OLD INCORRECT LOGIC ---

        // Access 'req' from the outer scope if using `export default async function auth(req, res)`
        // This is the correct way to get client-passed query parameters.

        const urlObject = new URL(req.cookies["next-auth.callback-url"]); // Use req.url to get the full URL from the request
        const tab = urlObject.searchParams.get("tab");
        const backend = process.env.NEXT_PUBLIC_BACKEND_URL;

        console.log("User:", user);
        console.log("Account:", account);
        console.log("Active tab from client-passed URL:", tab); // Now 'tab' should be correct

        const findRes = await fetch(
          `${backend}/users/find?email=${encodeURIComponent(user.email)}`
        );
        let foundUser;

        // let foundUser = await prisma.user.findUnique({
        //   where: { email: user.email },
        //   include: {
        //     student: true,
        //     recruiter: true,
        //     ambassador: true,
        //   },
        // });

        // If user doesn't exist, create user
        // if (!foundUser) {
        //   console.log("Creating new user:", user.email);
        //   foundUser = await prisma.user.create({
        //     data: { email: user.email },
        //   });
        // }

        // foundUser = await prisma.user.findUnique({
        //   where: { email: user.email },
        //   include: {
        //     student: true,
        //     recruiter: true,
        //     ambassador: true,
        //   },
        // });

        if (findRes.status === 200) {
          foundUser = await findRes.json();
        } else if (findRes.status === 404) {
          // 2. Create new user
          const createRes = await fetch(`${backend}/users/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: user.email }),
          });
          foundUser = await createRes.json();
        } else {
          console.error("Failed to fetch/create user:", await findRes.text());
          return false;
        }

        const { id, student, recruiter, ambassador } = foundUser;

        // Logic to create associated role data if it doesn't exist and 'tab' matches
        if (tab === "student" && !student) {
          console.log("in student tab")
          await fetch(`${backend}/students`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: id }),
          });
        } else if (tab === "recruiter" && !recruiter) {
          await fetch(`${backend}/recruiters`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: id }),
          });
        } else if (tab === "ambassador" && !ambassador) {
          console.log("No ambassador profile for user:", id);
        }

        // 4. Re-fetch user to get updated roles
        const updatedUserRes = await fetch(
          `${backend}/users/find?email=${encodeURIComponent(user.email)}`
        );
        const updatedUser = await updatedUserRes.json();

        const roles = [];
        if (updatedUser.student) roles.push("STUDENT");
        if (updatedUser.recruiter) roles.push("RECRUITER");
        if (updatedUser.ambassador) roles.push("AMBASSADOR");

        user.id = updatedUser.id;
        user.roles = roles;
        user.roleData = {
          student: updatedUser.student || null,
          recruiter: updatedUser.recruiter || null,
          ambassador: updatedUser.ambassador || null,
        };

        console.log("User object after role assignment:", user);

        return true; // Always allow sign-in, or return false to deny
      },
      async jwt({ token, user }) {
        // 'user' object here will contain the 'id', 'roles', and 'roleData'
        // that we attached in the signIn callback.
        if (user) {
          token.id = user.id;
          token.roles = user.roles;
          token.roleData = user.roleData;
        }
        return token;
      },
      async session({ session, token }) {
        // 'token' here contains the properties we added in the jwt callback.
        session.user.id = token.id;
        session.user.roles = token.roles;
        session.user.roleData = token.roleData;
        return session;
      },
    },
    pages: {
      error: "/sip", // Send back to the login page if error
    },
  });
}
