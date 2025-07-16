import AIChat from "@/components/AIChat";
import ProductSkeleton from "@/components/ProductSkeleton";
import SuggestionSection from "@/components/SuggestionSection";

const Page = () => {
  return (
    <>
      <AIChat></AIChat>
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
