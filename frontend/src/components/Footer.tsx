"use client";

import { Text } from "@/components/ui/typography";
import { Github, Youtube, Facebook } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "Home", link: "/" },
  { label: "About", link: "#" },
  { label: "Contact Us", link: "#" },
  { label: "FAQ", link: "/faq" },
];

export default function Footer() {
  return (
    <footer className="bg-green-500 text-white mt-5 pt-5">
      <div className="mx-auto w-full max-w-screen-xl pb-4">
        {/* Mạng xã hội */}
        <div className="flex flex-row justify-center gap-x-6">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/20 p-2 rounded-xl transition-all duration-300 hover:scale-110 hover:bg-white hover:text-green-600"
          >
            <Github className="w-6 h-5" />
          </a>
          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/20 p-2 rounded-xl transition-all duration-300 hover:scale-110 hover:bg-white hover:text-red-600"
          >
            <Youtube className="w-6 h-5" />
          </a>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/20 p-2 rounded-xl transition-all duration-300 hover:scale-110 hover:bg-white hover:text-blue-600"
          >
            <Facebook className="w-6 h-5" />
          </a>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-row flex-wrap justify-center gap-x-4 md:gap-x-6 mt-5">
          {navLinks.map((nav, index) => (
            <Link key={index} href={nav.link} className="hover:scale-105">
              <Text
                body={4}
                className="text-[14px] tracking-wider text-white hover:text-black transition-all duration-500 ease-in-out font-medium underline "
              >
                {nav.label}
              </Text>
            </Link>
          ))}
        </div>

        <hr className=" sm:mx-auto my-4 border-white/30" />

        <div className="flex justify-center w-full">
          <Text className="text-sm text-white/80 text-center">
            © 2025 E-Education. All Rights Reserved.
          </Text>
        </div>
      </div>
    </footer>
  );
}
