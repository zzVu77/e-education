import { formatCurrency } from "@/lib/utils";
import { Tag } from "lucide-react";
import Image from "next/image";
import { ASSSETS } from "../../constants/assets";
import DetailDialog from "./DetailDialog";
import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Text, Title } from "./ui/typography";
import { ProductCardProps } from "@/types";

const ProductCard = ({
  id,
  title,
  imgUrl,
  price,
  description,
  category,
  level,
  instructor,
  duration,
}: ProductCardProps) => {
  return (
    <>
      <Card className="w-full pt-0 rounded-xl border-none shadow-md hover:shadow-md ease-in-out hover:transform hover:scale-102 transition-all duration-80 min-h-[450px]">
        <div className="w-[100%] h-[235px] relative ">
          <Image
            src={imgUrl || ASSSETS.PLACEHOLDER_IMAGE}
            width={352}
            height={400}
            alt="product-image"
            className="rounded-t-xl border-none w-full h-full object-cover"
          ></Image>
          <Badge className="absolute bottom-2 left-3 border-1 bg-green-600/80 py-[2px] flex flex-row items-center justify-center">
            <Tag />
            {category || "Development"}
          </Badge>
        </div>
        <CardHeader>
          <div className="flex flex-row items-center justify-between w-full">
            <CardTitle className="line-clamp-2">
              <Title level={3} className="text-lg font-[800] line-clamp-2">
                {title || " Advanced Machine Learning Specialization"}
              </Title>
            </CardTitle>
          </div>
          <CardDescription>
            <Text className="line-clamp-2">{description}</Text>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row items-center justify-between">
            <Text className="text-lg font-[700] text-green-600/90">
              {formatCurrency(price ?? 499000)}
            </Text>
            <DetailDialog
              productProps={{
                id,
                title,
                imgUrl,
                price,
                level,
                category,
                instructor,
                description,
                duration,
              }}
            />
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ProductCard;
