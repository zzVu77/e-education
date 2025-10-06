import "@/app/globals.css";
import { Open_Sans } from "next/font/google";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { Check, Info } from "lucide-react";
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
  keywords: ["education", "e-learning", "AI", "Next.js"],
  authors: [{ name: "Vũ", url: "https://vucoder77.id.vn" }],
  openGraph: {
    title: "E-Education Platform",
    description: "A modern AI-powered learning experience",
    url: "https://e-education-vu77.vercel.app",
    siteName: "E-Education",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "E-Education Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  const user = token ? await getUserFromToken(token) : null;

  return (
    <html lang="en">
      <body className={`${openSans.variable} antialiased`}>
        <UserProvider initialUser={user}>
          <Toaster
            icons={{
              success: <Check className="text-green-500 h-5 w-5 mr-4" />,
              info: <Info className="text-blue-500 h-5 w-5 mr-4" />,
            }}
          />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
