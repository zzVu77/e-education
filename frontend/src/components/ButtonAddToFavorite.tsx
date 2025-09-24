"use client";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFavorite } from "@/hooks/useFavorite";

type Props = {
  className?: HTMLButtonElement["className"];
  itemName?: string;
  itemID: string;
};

const ButtonAddToFavorite = ({ className, itemName, itemID }: Props) => {
  const { isFavorite, toggleFavorite } = useFavorite(itemID);

  const handleClick = () => {
    toast[!isFavorite ? "success" : "info"](
      <span className="font-[500]">
        {!isFavorite ? "Added" : "Removed"}{" "}
        <span
          className={
            !isFavorite ? "text-green-500 font-bold" : "text-red-500 font-bold"
          }
        >
          {itemName || "Item"}
        </span>{" "}
        {!isFavorite ? "to" : "from"} your favorite list!
      </span>
    );
    toggleFavorite();
  };

  return (
    <Button
      className={cn(
        "bg-white/40 relative hover:bg-white h-10 w-10 cursor-pointer active:scale-110 rounded-full ",
        className
      )}
      onClick={handleClick}
    >
      <Heart
        className={cn(
          "absolute fill-gray-200/70 text-gray-300/30 h-7 w-7",
          isFavorite && "fill-red-400 text-red-500"
        )}
      />
    </Button>
  );
};

export default ButtonAddToFavorite;
