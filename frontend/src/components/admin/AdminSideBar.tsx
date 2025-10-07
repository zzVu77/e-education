"use client";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/config/axiosConfig";
import { useUser } from "@/context/UserContext";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  House,
  LayoutDashboard,
  LogOut,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/courses", label: "Courses", icon: BookOpen },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/", label: "Homepage", icon: House },
];

export default function AdminSideBar() {
  const { setUser } = useUser();
  const pathname = usePathname();
  const handleLogout = () => {
    try {
      axiosInstance.post("/auth/logout").then(() => {
        setUser(null);
        window.location.href = "/";
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <div>
      {/* Sidebar Desktop */}
      <div className="hidden lg:flex flex-col h-screen w-64 bg-green-500 text-white border-r">
        <div className="h-16 flex items-center justify-center border-b border-green-600">
          <h1 className="font-bold text-lg">Admin Panel</h1>
        </div>

        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-2">
            {menuItems.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-white hover:bg-white hover:text-green-500 rounded-none",
                    pathname === href
                      ? "bg-white text-green-500 font-semibold"
                      : "",
                  )}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {label}
                </Button>
              </Link>
            ))}
          </div>
          <div className="p-2 border-t border-green-600">
            <Button
              onClick={handleLogout}
              className="w-full flex items-center justify-center bg-white text-green-500 hover:bg-gray-100"
            >
              <LogOut className="mr-2 h-4 w-4 text-green-500" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-around items-center h-16 shadow-md z-50">
        {menuItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center justify-center text-xs font-medium transition-colors",
                active
                  ? "text-green-600"
                  : "text-gray-500 hover:text-green-500",
              )}
            >
              <Icon
                className={cn("h-5 w-5 mb-1", active ? "text-green-600" : "")}
              />
              {label}
            </Link>
          );
        })}

        <button
          onClick={handleLogout}
          className="flex flex-col items-center justify-center text-xs text-gray-500 hover:text-green-500"
        >
          <LogOut className="h-5 w-5 mb-1" />
          Logout
        </button>
      </div>
    </div>
  );
}
