import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Himanshoo Thakre | Full-Stack Developer",
  description: "Full-stack engineer focused on building production systems with thoughtful architecture and clean code.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
