"use client";

import EmptyState from "@/components/shared/EmptyState";
import ProductCard, { ProductCardProps } from "@/components/ProductCard";
import Wrapper from "@/components/shared/Wrapper";
import { useFavoriteChangeListener } from "@/hooks/useFavorite";
import { HeartIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { LOCAL_STORAGE_FAVORITE_KEY } from "../../../constants/const";
import { mockCoursesData } from "../../../constants/data";
import SectionHeader from "@/components/shared/SectionHeader";

const Page = () => {
  const [favoriteProducts, setFavoriteProducts] = useState<ProductCardProps[]>(
    []
  );

  const loadFavorites = useCallback(() => {
    const stored = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_FAVORITE_KEY) || "[]"
    );
    const favorites = mockCoursesData.filter((product) =>
      stored.includes(product.courseId)
    );
    setFavoriteProducts(favorites);
  }, []);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  useFavoriteChangeListener(() => {
    loadFavorites();
  });

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <SectionHeader
        icon={<HeartIcon className="h-12 w-12 mr-2 fill-red-400" />}
        title="My Favorites"
        description="Your collection of saved educational resources. Click on any item to
            view details."
      />

      <Wrapper
        classNames={{
          container: "pt-5 md:px-10",
        }}
      >
        {favoriteProducts.length === 0 ? (
          <EmptyState
            icon={<HeartIcon className="w-12 h-12 mx-auto" />}
            title="No favorites yet"
            description={
              <>
                {` You haven't added any products to your favorites.`}
                <br />
                {`  Browse the catalog and click the heart icon to add items here.`}
              </>
            }
            buttonText="Browse Products"
            buttonHref="/"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center justify-items-center gap-10 mt-0 py-0 w-full">
            {favoriteProducts.map((product) => (
              <ProductCard
                key={product.courseId}
                courseId={product.courseId}
                courseName={product.courseName}
                courseImage={product.courseImage}
                coursePrice={product.coursePrice}
                courseRating={product.courseRating}
                courseShortDescription={product.courseShortDescription}
                courseFullDescription={product.courseFullDescription}
                courseInfo={product.courseInfo}
              />
            ))}
          </div>
        )}
      </Wrapper>
    </div>
  );
};

export default Page;
