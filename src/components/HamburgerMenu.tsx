"use client";

import Link from "next/link";
import { MenuIcon, HomeIcon, HeartIcon, X } from "lucide-react";
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
              href="/"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "flex items-center gap-2  text-black"
              )}
            >
              <HomeIcon className="h-4 w-4" />
              Home
            </Link>

            <Link
              href="/favorites"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "flex items-center gap-2 text-black "
              )}
            >
              <HeartIcon className="h-4 w-4" />
              Favorites
            </Link>

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
  );
};

export default HamburgerMenu;
