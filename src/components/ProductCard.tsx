"use client";
import { Heart, Star } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { ASSSETS } from "../../constants/assets";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Text, Title } from "./ui/typography";
const ProductCard = () => {
  return (
    <>
      <Card className="w-fit pt-0 mt-10  rounded-xl border-none shadow-md hover:shadow-md ease-in-out hover:transform hover:scale-102 transition-all duration-80 ">
        <div className="w-[100%] h-[auto] relative ">
          <Image
            src={ASSSETS.PLACEHOLDER_IMAGE}
            width={352}
            height={400}
            alt="product-image"
            className="rounded-t-xl border-none w-full h-auto"
            unoptimized
          ></Image>
          <Button
            className="bg-white/40  hover:bg-white absolute top-5 right-3 h-8 w-8 cursor-pointer active:scale-110 rounded-full"
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
            <Heart className="fill-red-400 text-red-500 h-5 w-5" />
          </Button>
        </div>
        <CardHeader>
          <div className="flex flex-row items-center justify-between w-full">
            <CardTitle className="line-clamp-2">
              <Title level={3} className="text-md font-[800]">
                Advanced Machine Learning Specialization
              </Title>
            </CardTitle>
            <div className="flex flex-row items-center gap-1">
              <Star className=" h-5 w-5 fill-yellow-400 text-yellow-400" />
              <Text className="font-[700]">4.5</Text>
            </div>
          </div>
          <CardDescription>
            <Text>
              Learn HTML, CSS, JavaScript, React and Node.js from scratch
            </Text>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row items-center justify-between">
            <Text className="text-lg font-[700] text-green-600/90">
              $499,000
            </Text>
            <Button variant={"viewDetails"} className="py-0 text-white">
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ProductCard;
