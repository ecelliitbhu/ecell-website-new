import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { writeUserToFile } from "./utils";

const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId : process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env. GOOGLE_CLIENT_SECRET ?? "",
        })
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if (account?.provider === "google" && profile?.email && (profile.email?.endsWith("@itbhu.ac.in") || profile.email?.endsWith("@iitbhu.ac.in"))){
                console.log("User Information:");
                console.log(user);
                // write into json file here
                await writeUserToFile(user);
                return true;
              }
              return false;
        },
        async redirect({ url, baseUrl }) {
          return baseUrl
        },
        async session({ session, user, token }) {
            // console.log('Session: ')
            // console.log(session)
          return session
        },
        async jwt({ token, user, account, profile,isNewUser}) {
            // console.log("JWT Token: ")
            // console.log(token)
        if(isNewUser){
            await writeUserToFile(user);
        }
          return token
        }
},
session: {
    strategy: 'jwt',
    maxAge: 1 * 24 * 60 * 60, // 1 day
  },
}
);

export { handler as GET, handler as POST };