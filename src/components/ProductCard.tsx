import { Star } from "lucide-react";
import Image from "next/image";
import { ASSSETS } from "../../constants/assets";
import ButtonAddToFavorite from "./ButtonAddToFavorite";
import DetailDialog from "./DetailDialog";
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
          <ButtonAddToFavorite className="absolute top-5 right-3 bg-gray-300/30 border-1 border-gray-400/10" />
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
            <DetailDialog />
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ProductCard;
