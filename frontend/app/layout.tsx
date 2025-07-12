import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/AuthContext";
import { QuizProvider } from "@/context/QuizContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quizzer",
  description: "Compete with your colleagues with a real time leaderboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className={inter.className}>
          <AuthProvider>
            <QuizProvider>
              <Toaster richColors/>
              <Navbar/>
              {children}
            </QuizProvider>
          </AuthProvider>
        </body>
    </html>
  );
}
