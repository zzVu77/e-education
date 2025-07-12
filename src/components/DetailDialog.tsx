"use client";
import { Star } from "lucide-react";
import Image from "next/image";
import { ASSSETS } from "../../constants/assets";
import ButtonAddToFavorite from "./ButtonAddToFavorite";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Text } from "./ui/typography";

const DetailDialog = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"viewDetails"} className="py-0 text-white">
            View Details
          </Button>
        </DialogTrigger>
        <DialogContent className="grid grid-rows-2 grid-cols-1 md:grid-cols-2 md:grid-rows-1 gap-4 w-full h-full max-w-[95vw] md:max-w-[75vw] max-h-[90vh] px-4 overflow-y-auto">
          <div className="w-[100%] h-full max-h-[400px] md:max-h-none">
            <Image
              src={ASSSETS.PLACEHOLDER_IMAGE}
              width={352}
              height={400}
              alt="product-image"
              className="rounded-xl border-none w-full h-full   object-cover"
              unoptimized
            ></Image>
          </div>
          <div className="w-full flex flex-col gap-3 md:gap-4">
            {/* Title */}
            <DialogHeader>
              <DialogTitle>
                <Text className="text-[28px] md:text-[32px] font-[800] text-start">
                  Advanced Machine Learning Specialization
                </Text>
              </DialogTitle>
            </DialogHeader>
            {/* Rating */}
            <div className="flex items-center justify-start gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(4.5)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <Text className="font-[500] text-gray-600/80 text-[16px]">
                4.5 rating
              </Text>
            </div>
            {/* Cost */}
            <Text className="text-[28px] md:text-[32px] font-[700] text-green-600/90 text-start">
              $499,000
            </Text>
            {/* Description */}
            <div className="w-full flex flex-col gap-1">
              <Text className=" text-[16px] font-medium text-black">
                Description:
              </Text>
              <Text className="text-gray-600/90 text-[14px]">{`Take your machine learning skills to the next level with this advanced specialization. You'll dive deep into neural networks, deep learning, computer vision, and natural language processing. Through hands-on projects, you'll build real-world AI applications that can recognize images, understand text, and make predictions based on complex data.`}</Text>
            </div>
            {/* Course Info */}
            <div className="grid grid-cols-2 md:grid-cols-3 items-center justify-items-start gap-3">
              <div>
                <p className="text-xs font-medium text-gray-900">Category</p>
                <p className="text-sm text-gray-600">Data Science</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-900">Level</p>
                <p className="text-sm text-gray-600">Advanced</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-900">Instructor</p>
                <p className="text-sm text-gray-600">Andrew Ng</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-900">Duration</p>
                <p className="text-sm text-gray-600">120 hours</p>
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
              <ButtonAddToFavorite className="rounded-lg bg-white border-1 border-gray-600/20 hover:border-gray-600/50 h-10 w-10" />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DetailDialog;
