import { Skeleton } from "./ui/skeleton";

const ProductSkeleton = () => {
  return (
    <div className="border-1 border-gray-500/10 rounded-xl shadow-lg bg-white overflow-hidden w-full max-w-xs sm:max-w-sm md:max-w-sm">
      {/* Image Skeleton */}
      <div className="relative w-full h-48">
        <Skeleton className="w-full h-full object-cover" />
        <div className="absolute top-3 right-3 w-8 h-8 bg-gray-200/70 rounded-full" />
      </div>

      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <Skeleton className="h-6 w-3/4 rounded" />
        {/* Rating */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-6 rounded" />
        </div>
        {/* Description */}
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-5/6 rounded" />
        {/* Price & Button */}
        <div className="flex items-center justify-between pt-3">
          <Skeleton className="h-6 w-20 rounded" />
          <Skeleton className="h-8 w-24 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
