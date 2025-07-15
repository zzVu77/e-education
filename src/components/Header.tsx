import Link from "next/link";
import { HeartIcon, HomeIcon, ShoppingCartIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import HamburgerMenu from "@/components/HamburgerMenu";

const Header = () => {
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
          <nav className="hidden md:flex items-center space-x-4">
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "flex items-center space-x-1 text-sm font-medium text-black"
              )}
            >
              <HomeIcon className="h-4 w-4" />
              Home
            </Link>

            <Link
              href="/favorites"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "flex items-center space-x-1 text-sm font-medium text-black"
              )}
            >
              <HeartIcon className="h-4 w-4" />
              Favorites
            </Link>
          </nav>

          {/* Mobile Hamburger */}
          <HamburgerMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
