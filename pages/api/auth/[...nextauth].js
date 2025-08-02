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
                const backend = process.env.NEXT_PUBLIC_BACKEND_URL;

                const findCreateRes = await fetch(`${backend}/users/create`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: user.email }),
                });

                if (!findCreateRes.ok) {
                    console.error("Failed");
                    return false;
                }

                const foundUser = await findCreateRes.json();
                // console.log(foundUser)

                const roles = [];
                if (foundUser.student) roles.push("STUDENT");
                if (foundUser.recruiter) roles.push("RECRUITER");
                if (foundUser.ambassador) roles.push("AMBASSADOR");

                user.id = foundUser.id;
                user.roles = roles;
                user.roleData = {
                    student: foundUser.student || null,
                    recruiter: foundUser.recruiter || null,
                    ambassador: foundUser.ambassador || null,
                };

                // console.log("User object after role assignment:", user);

                return true; // Always allow sign-in, or return false to deny
            },
            async jwt({ token, user, trigger, session }) {
                if (user) {
                    token.id = user.id;
                    token.roles = user.roles;
                    token.roleData = user.roleData;
                }
                if (trigger === "update" && session?.user?.roles) {
                    token.roles = session.user.roles;
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
            error: "/grow-your-resume", // Send back to the login page if error
        },
    });
}
