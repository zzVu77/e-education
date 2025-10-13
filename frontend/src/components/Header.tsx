"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axiosInstance from "@/config/axiosConfig";
import { useUser } from "@/context/UserContext";
import { cn } from "@/lib/utils";
import {
  CircleUser,
  LayoutDashboard,
  LogIn,
  LogOut,
  ShoppingCartIcon,
} from "lucide-react";
import Link from "next/link";
import Desktop from "./shared/Desktop";

const Header = () => {
  const { user, setUser } = useUser();
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
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-green-500 p-2 rounded-lg">
              <ShoppingCartIcon className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-extrabold text-black/90">
              e-Education
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-2 font-medium text-black hover:bg-transparent hover:text-green-500 cursor-pointer"
                  >
                    <CircleUser className="h-6 w-6 md:h-5 md:w-5" />
                    <Desktop.Show>
                      <span>Hi, {user.fullName}</span>
                    </Desktop.Show>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <Desktop.Show>
                    <DropdownMenuLabel>Account</DropdownMenuLabel>
                  </Desktop.Show>
                  <Desktop.Hide>
                    <DropdownMenuLabel>
                      <span>Hi, {user.fullName}</span>
                    </DropdownMenuLabel>
                  </Desktop.Hide>
                  <DropdownMenuSeparator />
                  {user.role === "admin" ? (
                    <DropdownMenuItem asChild>
                      <a
                        href="/admin"
                        className="flex items-center cursor-pointer"
                      >
                        <LayoutDashboard className="h-4 w-4 mr-2" />
                        Dashboard
                      </a>
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem asChild>
                      <Link
                        href="#"
                        className="flex items-center cursor-pointer"
                      >
                        <ShoppingCartIcon className="h-4 w-4 mr-2" />
                        Cart
                      </Link>
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuItem
                    className="flex items-center text-red-600 cursor-pointer"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2 text-red-500" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
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
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
