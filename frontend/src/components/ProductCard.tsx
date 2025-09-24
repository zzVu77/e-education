import { Star } from "lucide-react";
import Image from "next/image";
import { ASSSETS } from "../../constants/assets";
import ButtonAddToFavorite from "./ButtonAddToFavorite";
import DetailDialog, { CourseInfo } from "./DetailDialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Text, Title } from "./ui/typography";
import { formatCurrency } from "@/lib/utils";
export type ProductCardProps = {
  courseId?: string;
  courseName?: string;
  courseImage?: string;
  coursePrice?: number;
  courseRating?: number;
  courseShortDescription?: string;
  courseFullDescription?: string;
  courseInfo?: CourseInfo[];
};
const ProductCard = ({
  courseId,
  courseName,
  courseImage,
  coursePrice,
  courseRating,
  courseShortDescription,
  courseFullDescription,
  courseInfo,
}: ProductCardProps) => {
  return (
    <>
      <Card className="w-full pt-0 rounded-xl border-none shadow-md hover:shadow-md ease-in-out hover:transform hover:scale-102 transition-all duration-80 min-h-[450px]">
        <div className="w-[100%] h-[235px] relative ">
          <Image
            src={courseImage || ASSSETS.PLACEHOLDER_IMAGE}
            width={352}
            height={400}
            alt="product-image"
            className="rounded-t-xl border-none w-full h-full object-cover"
          ></Image>
          <ButtonAddToFavorite
            itemID={courseId ?? "1"}
            className="absolute top-5 right-3 border-1 border-gray-400/10"
            itemName={courseName}
          />
        </div>
        <CardHeader>
          <div className="flex flex-row items-center justify-between w-full">
            <CardTitle className="line-clamp-2">
              <Title level={3} className="text-lg font-[800] line-clamp-2">
                {courseName || " Advanced Machine Learning Specialization"}
              </Title>
            </CardTitle>
            <div className="flex flex-row items-center gap-1">
              <Star className=" h-5 w-5 fill-yellow-400 text-yellow-400" />
              <Text className="font-[700]">{courseRating || 4.5}</Text>
            </div>
          </div>
          <CardDescription>
            <Text className="line-clamp-2">
              {courseShortDescription ||
                "Learn HTML, CSS, JavaScript, React and Node.js from scratch"}
            </Text>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row items-center justify-between">
            <Text className="text-lg font-[700] text-green-600/90">
              {formatCurrency(coursePrice ?? 499000)}
            </Text>
            <DetailDialog
              productProps={{
                courseId,
                courseName,
                courseImage,
                coursePrice,
                courseRating,
                courseFullDescription,
                courseInfo,
              }}
            />
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ProductCard;
