import Header from "@/components/Header";
import AIChat from "@/components/AIChat";
import { Toaster } from "@/components/ui/sonner";
import { Check, Info } from "lucide-react";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";
import { cookies } from "next/headers";
import { getUserFromToken } from "@/utils/server/auth.server";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  const user = token ? await getUserFromToken(token) : null;
  return (
    <html lang="en">
      <body className={`${openSans.variable}  antialiased`}>
        <UserProvider initialUser={user}>
          <Header />
          <AIChat />
          <Toaster
            icons={{
              success: <Check className="text-green-500 h-5 w-5 mr-4" />,
              info: <Info className="text-blue-500 h-5 w-5 mr-4  " />,
            }}
          />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
