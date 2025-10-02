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

interface AppSidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

export default function AppSidebar({
  activePage,
  setActivePage,
}: AppSidebarProps) {
  const menuItems = [
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { key: "courses", label: "Courses", icon: BookOpen },
    { key: "orders", label: "Orders", icon: ShoppingCart },
    { key: "users", label: "Users", icon: Users },
  ];

  return (
    <div>
      {/* Sidebar Desktop */}
      <div className="hidden md:flex flex-col h-screen w-64 bg-gray-900 text-white border-r">
        <div className="h-16 flex items-center justify-center border-b">
          <h1 className="font-bold text-lg">Admin Panel</h1>
        </div>

        <div className="flex-1 p-2 space-y-2">
          {menuItems.map(({ key, label, icon: Icon }) => (
            <Button
              key={key}
              variant="ghost"
              className={cn(
                "w-full justify-start",
                activePage === key ? "bg-gray-700 text-white" : "",
              )}
              onClick={() => setActivePage(key)}
            >
              <Icon className="mr-2 h-4 w-4" />
              {label}
            </Button>
          ))}
        </div>

        <div className="p-2 border-t">
          <Button className="w-full flex items-center justify-center bg-gray-800 text-white hover:bg-gray-700 hover:text-white">
            <LogOut className="mr-2 h-4 w-4 text-white" />
            Logout
          </Button>
        </div>
      </div>

      {/* Drawer Mobile */}
      <div className="md:hidden p-2">
        <Drawer direction="left">
          <DrawerTrigger asChild>
            <button className="text-gray-700">
              <Menu className="h-6 w-6" />
            </button>
          </DrawerTrigger>

          <DrawerContent className="p-4">
            <DrawerHeader>
              <DrawerTitle className="text-lg text-center">
                Admin Menu
              </DrawerTitle>
            </DrawerHeader>

            <div className="flex flex-col gap-4">
              {menuItems.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActivePage(key)}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "flex items-center gap-2",
                    activePage === key
                      ? "bg-gray-200 text-black"
                      : "text-black",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              ))}

              <DrawerClose asChild>
                <Button className="bg-transparent border-none w-fit mx-auto shadow-none hover:bg-transparent text-black">
                  <X size={22} className="text-red-400" />
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
