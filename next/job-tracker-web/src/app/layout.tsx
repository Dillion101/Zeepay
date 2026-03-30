import type { Metadata } from "next";
import { ApplicationProvider } from "@/context/ApplicationContext";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Job Tracker",
  description: "Track your job applications",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-black-900 min-h-screen">
        <ApplicationProvider>
          <Navbar />
          <main className="max-w-5xl mx-auto px-6 py-8">{children}</main>
        </ApplicationProvider>
      </body>
    </html>
  );
}
