import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Best Robot in the World",
  description:
    "A curated leaderboard of the world's most capable robots, organized by what they do best.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">{children}</body>
    </html>
  );
}
