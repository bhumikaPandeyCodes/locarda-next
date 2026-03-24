import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastProvider } from "@/components/ui/error/ToastError";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Locarda - Forensic AI Voice-to-Report",
  description: "Evidence of Injury (EOI) workflow using AI and Voice Dictation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.className} bg-zinc-950 text-slate-200 antialiased min-h-screen flex flex-col`}>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
