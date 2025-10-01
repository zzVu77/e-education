"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  BookOpen,
  ShoppingCart,
  Users,
  LogOut,
  Menu,
  X,
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

export default function AppSidebar() {
  return (
    <div>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col h-screen w-64 bg-muted/40 border-r">
        <div className="h-16 flex items-center justify-center border-b">
          <h1 className="font-bold text-lg">Admin</h1>
        </div>

        <div className="flex-1 p-2 space-y-2">
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/admin">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          </Button>

          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/admin/courses">
              <BookOpen className="mr-2 h-4 w-4" />
              Courses
            </Link>
          </Button>

          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/admin/orders">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Orders
            </Link>
          </Button>

          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/admin/users">
              <Users className="mr-2 h-4 w-4" />
              Users
            </Link>
          </Button>
          {/* 
          <Separator />

          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/admin/settings">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </Button> */}
        </div>

        <div className="p-2 border-t">
          <Button variant="outline" className="w-full">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
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
              <Link
                href="/admin"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "flex items-center gap-2 text-black",
                )}
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>

              <Link
                href="/admin/courses"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "flex items-center gap-2 text-black",
                )}
              >
                <BookOpen className="h-4 w-4" />
                Courses
              </Link>

              <Link
                href="/admin/orders"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "flex items-center gap-2 text-black",
                )}
              >
                <ShoppingCart className="h-4 w-4" />
                Orders
              </Link>

              <Link
                href="/admin/users"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "flex items-center gap-2 text-black",
                )}
              >
                <Users className="h-4 w-4" />
                Users
              </Link>

              {/* <Separator />

              <Link
                href="/admin/settings"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "flex items-center gap-2 text-black"
                )}
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link> */}

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
