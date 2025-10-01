"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import {
  CircleUser,
  LogIn,
  LogOut,
  MenuIcon,
  ShoppingCartIcon,
  X,
} from "lucide-react";
import Link from "next/link";

const HamburgerMenu = () => {
  return (
    <div className="md:hidden">
      <Drawer direction="right">
        <DrawerTrigger asChild>
          <button className="text-gray-700">
            <MenuIcon className="h-6 w-6" />
          </button>
        </DrawerTrigger>

        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="text-lg text-center">Menu</DrawerTitle>
          </DrawerHeader>

          <div className="flex flex-col gap-5">
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "flex items-center space-x-1 text-sm font-medium text-black hover:bg-transparent hover:text-green-500",
              )}
            >
              <CircleUser className="h-5 w-5" />
              Hi, User
            </Link>
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "flex items-center space-x-1 text-sm font-medium text-black hover:bg-transparent hover:text-green-500",
              )}
            >
              <ShoppingCartIcon className="h-5 w-5 " />
              Cart
            </Link>

            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "flex items-center space-x-1 text-sm font-medium text-black hover:bg-transparent hover:text-green-500",
              )}
            >
              <LogIn className="h-5 w-5" />
              Login
            </Link>
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "flex items-center space-x-1 text-sm font-medium text-black hover:bg-transparent hover:text-green-500",
              )}
            >
              <LogOut className="h-5 w-5" />
              Logout
            </Link>
            <DrawerClose asChild>
              <Button className="bg-transparent border-none w-fit mx-auto shadow-none hover:bg-transparent text-red-400">
                <X size={20} className="text-red-400" />
                Close
              </Button>
            </DrawerClose>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default HamburgerMenu;
