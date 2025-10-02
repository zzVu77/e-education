"use client";
import { useHistory } from "@/hooks/useHistory";
import { Button } from "./ui/button";

interface ButtonViewDetailProps {
  productId?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ButtonViewDetail = ({ productId, onClick }: ButtonViewDetailProps) => {
  const { addToHistory } = useHistory(productId);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    addToHistory();
    onClick?.(event);
  };

  return (
    <Button
      variant="viewDetails"
      className="bg-green-500/20 text-green-600 hover:bg-green-600/20 py-0 "
      onClick={handleClick}
    >
      View Details
    </Button>
  );
};

export default ButtonViewDetail;
