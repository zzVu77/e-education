"use client";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useState } from "react";

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (query) {
      params.set("search", query);
    } else {
      params.delete("search");
    }
    router.replace(`?${params.toString()}`);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };
  const handleButtonClick = () => {
    handleSearch();
  };

  return (
    <div className="flex flex-row items-center justify-start gap-1 w-full">
      <div className="relative w-full h-auto">
        <Input
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="Search courses, books and more ..."
          className=" shadow-sm w-full h-10 rounded-lg"
        />
      </div>
      <Button
        className="h-10 bg-green-500 text-center hover:bg-green-500/70 rounded-lg cursor-pointer active:scale-95"
        onClick={handleButtonClick}
      >
        <Search className=" h-4 w-4 text-white pointer-events-none" />
      </Button>
    </div>
  );
};

export default SearchBar;
