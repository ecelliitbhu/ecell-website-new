import type { Metadata } from "next";

// These styles apply to every route in the application
import "@/app/globals.css";
import React from "react";

export const metadata: Metadata = {
  title: "Startup Junction",
  description:
    "Startup Junction, an initiative by the Entrepreneurship Cell of IIT BHU, fosters our nation's startup ecosystem. We connect venture capitalists with promising startups, offering a dynamic platform for innovation, growth, and collaboration.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
