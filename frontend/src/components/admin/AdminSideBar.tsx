"use client";

import {
  LayoutDashboard,
  BookOpen,
  ShoppingCart,
  Users,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/courses", label: "Courses", icon: BookOpen },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/users", label: "Users", icon: Users },
];

export default function AdminSideBar() {
  const pathname = usePathname();

  return (
    <div>
      {/* Sidebar Desktop */}
      <div className="hidden md:flex flex-col h-screen w-64 bg-green-500 text-white border-r">
        <div className="h-16 flex items-center justify-center border-b border-green-600">
          <h1 className="font-bold text-lg">Admin Panel</h1>
        </div>

        <div className="flex-1 p-2 space-y-2">
          {menuItems.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start text-white hover:bg-green-600 hover:text-white",
                  pathname === href
                    ? "bg-green-600 text-white font-semibold"
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
          <Button className="w-full flex items-center justify-center bg-white text-green-500 hover:bg-gray-100">
            <LogOut className="mr-2 h-4 w-4 text-green-500" />
            Logout
          </Button>
        </div>
      </div>

      {/* Drawer Mobile */}
      <div className="md:hidden p-2">
        <Drawer direction="left">
          <DrawerTrigger asChild>
            <button className="text-green-500">
              <Menu className="h-6 w-6" />
            </button>
          </DrawerTrigger>

          <DrawerContent className="p-4">
            <DrawerHeader>
              <DrawerTitle className="text-lg text-center text-green-500">
                Admin Menu
              </DrawerTitle>
            </DrawerHeader>

            <div className="flex flex-col gap-4">
              {menuItems.map(({ href, label, icon: Icon }) => (
                <Link key={href} href={href}>
                  <button
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "sm" }),
                      "flex items-center gap-2 w-full justify-start",
                      pathname === href
                        ? "bg-green-500 text-white"
                        : "text-green-600 hover:bg-green-100",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </button>
                </Link>
              ))}

              <DrawerClose asChild>
                <Button className="bg-white border border-green-500 text-green-500 hover:bg-green-50 w-fit mx-auto">
                  <X size={22} className="text-green-500" />
                  Close
                </Button>
              </DrawerClose>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
