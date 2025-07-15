import Filter from "@/components/Filter";
import ProductCard from "@/components/ProductCard";
import { Check, Info } from "lucide-react";
import { Toaster } from "sonner";
import { dummyCategories, dummyPriceRanges } from "../../../constants/data";
const Page = () => {
  return (
    <>
      <div className="flex flex-row items-center justify-start gap-10">
        <Filter typeOfFilter="category" items={dummyCategories} />
        <Filter typeOfFilter="price" items={dummyPriceRanges} />
      </div>
      <Toaster
        icons={{
          success: <Check className="text-green-500 h-5 w-5 mr-4" />,
          info: <Info className="text-blue-500 h-5 w-5 mr-4  " />,
        }}
      />
      <div className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid items-center justify-items-center gap-4 ">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </>
  );
};

export default Page;
