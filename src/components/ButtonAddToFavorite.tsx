"use client";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
type Props = {
  className?: HTMLButtonElement["className"];
  isFavorite?: boolean;
  itemName?: string;
};
const ButtonAddToFavorite = ({ className, isFavorite, itemName }: Props) => {
  const [favorite, setFavorite] = useState(isFavorite);
  const handleOnClick = () => {
    const next = !favorite;
    setFavorite(next);

    toast[next ? "success" : "info"](
      <span className="font-[500]">
        {next ? "Added " : "Removed "}
        <span className="text-green-500 font-bold">
          {itemName || "Advanced Machine Learning Specialization"}
        </span>
        {next ? " to your favorite list!" : " from your favorite list!"}
      </span>
    );
  };

  return (
    <>
      <Button
        className={cn(
          "bg-white/50 relative hover:bg-white h-10 w-10 cursor-pointer active:scale-110 rounded-full ",
          className
        )}
        onClick={handleOnClick}
      >
        <Heart
          className={cn(
            "absolute fill-gray-300 text-gray-300/30 h-7 w-7",
            favorite && " fill-red-400 text-red-500 h-7 w-7"
          )}
        />
      </Button>
    </>
  );
};

export default ButtonAddToFavorite;
