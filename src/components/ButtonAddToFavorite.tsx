"use client";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
type Props = {
  className?: HTMLButtonElement["className"];
};
const ButtonAddToFavorite = ({ className }: Props) => {
  return (
    <>
      <Button
        className={cn(
          "bg-white/40 relative hover:bg-white h-10 w-10 cursor-pointer active:scale-110 rounded-full ",
          className
        )}
        onClick={() =>
          toast.success(
            <span className="font-[500]">
              Added{" "}
              <span className="text-green-500 font-bold">{`"Advanced Machine Learning Specialization"`}</span>{" "}
              to your favorite list!
            </span>,
            {
              className:
                "bg-green-50 text-green-800 border border-green-300 shadow",
            }
          )
        }
      >
        <Heart className=" absolute fill-red-400 text-red-500 h-7 w-7" />
      </Button>
    </>
  );
};

export default ButtonAddToFavorite;
