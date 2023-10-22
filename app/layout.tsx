import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html>
      <head />
      <body>
        <section className={""}>{children}</section>
      </body>
    </html>
  );
}
