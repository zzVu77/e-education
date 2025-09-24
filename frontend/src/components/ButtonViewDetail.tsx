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
      className="py-0 text-white"
      onClick={handleClick}
    >
      View Details
    </Button>
  );
};

export default ButtonViewDetail;
