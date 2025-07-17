import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";
import { Check, Info } from "lucide-react";
import AIChat from "@/components/AIChat";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "E-Education Platform",
  description:
    "A modern platform for interactive online learning and education.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.variable}  antialiased`}>
        <Header />
        <AIChat></AIChat>
        <Toaster
          icons={{
            success: <Check className="text-green-500 h-5 w-5 mr-4" />,
            info: <Info className="text-blue-500 h-5 w-5 mr-4  " />,
          }}
        />
        {children}
      </body>
    </html>
  );
}
