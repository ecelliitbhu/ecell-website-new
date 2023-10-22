import { Inter as FontSans } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@/components/analytics";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import React from "react";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
const fontHeading = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
});

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen flex-col">
            <header className="container z-40 bg-background">
              <div className="flex h-20 items-center justify-between py-6">
                <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
                  <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
                    <main className="flex-1">{children}</main>
                  </div>
                </section>
              </div>
            </header>
          </div>
          <Analytics />
          <Toaster />
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  );
}
