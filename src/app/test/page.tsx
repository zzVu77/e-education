import ProductSkeleton from "@/components/ProductSkeleton";
import SuggestionSection from "@/components/SuggestionSection";

const Page = () => {
  return (
    <>
      <SuggestionSection></SuggestionSection>
      <div className="flex flex-row items-center justify-center gap-4 w-full mt-10">
        <ProductSkeleton></ProductSkeleton>
        <ProductSkeleton></ProductSkeleton>
        <ProductSkeleton></ProductSkeleton>
        <ProductSkeleton></ProductSkeleton>
      </div>
    </>
  );
};

export default Page;
