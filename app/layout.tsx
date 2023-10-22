import { Inter as FontSans } from "next/font/google";
import localFont from "next/font/local";

import React from "react";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

// const fontSans = FontSans({
//   subsets: ["latin"],
//   variable: "--font-sans",
// });
// const fontHeading = localFont({
//   src: "../assets/fonts/CalSans-SemiBold.woff2",
//   variable: "--font-heading",
// });

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html>
      <head />
      <body
      // className={cn(
      //   "min-h-screen bg-background font-sans antialiased"
      //   // fontSans.variable,
      //   // fontHeading.variable
      // )}
      >
        <section className={""}>{children}</section>
      </body>
    </html>
  );
}
