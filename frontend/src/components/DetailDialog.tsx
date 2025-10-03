import Image from "next/image";
import { ASSSETS } from "../constants/assets";
import ButtonAddToFavorite from "./ButtonAddToFavorite";
import ButtonViewDetail from "./ButtonViewDetail";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Text } from "./ui/typography";
import { ProductCardProps } from "@/types";
import { formatCurrency } from "@/utils/formatCurrency";

type DetailDialogProps = {
  productProps: ProductCardProps;
};

const DetailDialog = ({ productProps }: DetailDialogProps) => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <ButtonViewDetail productId={productProps.id ?? "1"} />
        </DialogTrigger>
        <DialogContent className="grid grid-rows-2 grid-cols-1 lg:grid-cols-2 lg:grid-rows-1 gap-8 lg:gap-10 w-full h-full max-w-[95vw] xl:max-w-[80vw] max-h-[92vh] px-4 overflow-y-auto py-[50px]">
          <div className="w-[100%] h-full max-h-[400px] lg:max-h-none">
            <Image
              src={productProps.imgUrl || ASSSETS.PLACEHOLDER_IMAGE}
              width={352}
              height={400}
              alt="product-image"
              className="rounded-xl border-none w-full h-full   object-cover"
            ></Image>
          </div>
          <div className="w-full flex flex-col gap-3 md:gap-4">
            {/* Title */}
            <DialogHeader>
              <DialogTitle>
                <Text className="text-[28px] md:text-[32px] font-[800] text-start">
                  {productProps.title ||
                    " Advanced Machine Learning Specialization"}
                </Text>
              </DialogTitle>
            </DialogHeader>
            {/* Cost */}
            <Text className="text-[28px] md:text-[32px] font-[700] text-green-600/90 text-start">
              {formatCurrency(productProps.price ?? 100) || "$499,000"}
            </Text>
            {/* Description */}
            <div className="w-full flex flex-col gap-1">
              <Text className=" text-lg md:text-xl font-medium text-black">
                Description:
              </Text>
              <Text className="text-gray-600/90 text-[14px] md:text-[16px]">
                {productProps.description}
              </Text>
            </div>
            {/* Course Info */}
            <div className="grid grid-cols-2 items-center justify-items-start gap-3">
              <div className="flex flex-col">
                <Text className="text-sm md:text-lg font-medium text-gray-900 italic">
                  Category
                </Text>
                <Text className="text-sm text-gray-600">
                  {productProps.category || "Development"}
                </Text>
              </div>
              <div className="flex flex-col">
                <Text className="text-sm md:text-lg font-medium text-gray-900 italic">
                  Instructor
                </Text>
                <Text className="text-sm text-gray-600">
                  {productProps.instructor || "John Doe"}
                </Text>
              </div>
              <div className="flex flex-col">
                <Text className="text-sm md:text-lg font-medium text-gray-900 italic">
                  Level
                </Text>
                <Text className="text-sm text-gray-600">
                  {productProps.level || "Beginner"}
                </Text>
              </div>
              <div className="flex flex-col">
                <Text className="text-sm md:text-lg font-medium text-gray-900 italic">
                  Duration
                </Text>
                <Text className="text-sm text-gray-600">
                  {productProps.duration
                    ? `${productProps.duration} hours`
                    : "3 hours"}
                </Text>
              </div>
            </div>
            <div className="w-full flex flex-row items-end justify-start md:justify-center gap-2 self-end grow-2 pb-4">
              <Button
                type="button"
                variant="viewDetails"
                className="rounded-lg w-fit h-10 "
              >
                Purchase Now
              </Button>
              <ButtonAddToFavorite
                itemID={productProps.id ?? "1"}
                className="rounded-lg bg-white border-1 border-gray-600/20 hover:border-gray-600/50 h-10 w-10 "
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DetailDialog;
