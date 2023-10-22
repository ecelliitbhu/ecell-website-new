import React from "react";

export default function BalveerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1>My Layout</h1>
      {children}
    </div>
  );
}
