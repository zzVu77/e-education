"use client";

import { useCallback, useEffect, useState } from "react";
import ProductCard, { ProductCardProps } from "@/components/ProductCard";
import Wrapper from "@/components/shared/Wrapper";
import { HeartIcon } from "lucide-react";
import { mockCoursesData } from "../../../constants/data";
import { LOCAL_STORAGE_KEY } from "../../../constants/const";
import { useFavoriteChangeListener } from "@/hooks/useFavorite";
import Link from "next/link";
import { Text } from "@/components/ui/typography";

const Page = () => {
  const [favoriteProducts, setFavoriteProducts] = useState<ProductCardProps[]>(
    []
  );

  const loadFavorites = useCallback(() => {
    const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
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
      <section className="w-full bg-gradient-to-l from-green-300 to-green-500 text-white py-7">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-4">
            <HeartIcon className="h-12 w-12 mr-2 fill-red-400" />
            <h1 className="text-3xl md:text-4xl font-bold text-shadow-2xs">
              My Favorites
            </h1>
          </div>
          <p className="text-white font-semibold max-w-2xl text-shadow-2xs">
            Your collection of saved educational resources. Click on any item to
            view details.
          </p>
        </div>
      </section>

      <Wrapper
        classNames={{
          container: "pt-5 md:px-10",
        }}
      >
        {favoriteProducts.length === 0 ? (
          <div className="bg-white rounded-lg  text-center flex flex-col items-center w-full py-10 h-full">
            <HeartIcon className="h-12 w-12 mx-auto text-gray-300 mb-4" />
            <Text className="text-xl font-medium text-gray-700 mb-2">
              No favorites yet
            </Text>
            <Text className="text-gray-500 mb-6">
              {` You haven't added any products to your favorites. Browse the
                  catalog and click the heart icon to add items here.`}
            </Text>
            <Link
              href="/"
              className="inline-block bg-green-400 text-white py-2 px-6 rounded-lg hover:bg-green-500 transition-colors font-medium"
            >
              Browse Products
            </Link>
          </div>
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
