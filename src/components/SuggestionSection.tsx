"use client";
import { Bot } from "lucide-react";
import { Text, Title } from "./ui/typography";
import { Button } from "./ui/button";
import ProductCard, { ProductCardProps } from "./ProductCard";
import useAxios from "@/hooks/useAxios";
import ProductSkeleton from "./ProductSkeleton";

const SuggestionSection = () => {
  const { fetchData, response, setResponse, loading } =
    useAxios<ProductCardProps[]>();

  const handleSuggestCourses = async () => {
    setResponse([]);
    await fetchData({
      url: "/suggestions?userId=12345",
      method: "GET",
      timeout: 1500,
    });
  };
  console.log("is loading", loading);
  console.log("response", response?.length);
  return (
    <>
      <div className="w-full">
        {/* Title and Action button */}
        <div className="flex flex-col md:flex-row items-center justify-start md:justify-between gap-4 mb-6">
          <div className="flex flex-row item-center justify-start gap-2  w-full">
            <Bot className="text-green-500 h-12 w-12" />
            <Title
              level={3}
              className="text-center self-center text-lg md:text-2xl"
            >
              AI-Powered Suggestions
            </Title>
          </div>
          <Button
            onClick={handleSuggestCourses}
            className="capitalize rounded-lg bg-green-600/90 text-white font-bold active:scale-95 hover:bg-green-500/90 transition-all duration-200 cursor-pointer w-full md:w-fit h-10"
          >
            suggest me courses
          </Button>
        </div>
        {/* List suggested courses */}
        <div className="w-full">
          {loading && (
            <div className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid items-center justify-items-center gap-5 mt-0 py-0 w-full ">
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
            </div>
          )}
          {response && response.length > 0 ? (
            <div className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid items-center justify-items-center gap-5 mt-0 py-0 w-full ">
              {response?.map((course) => (
                <ProductCard
                  key={course.courseId}
                  courseId={course.courseId}
                  courseName={course.courseName}
                  courseImage={course.courseImage}
                  coursePrice={course.coursePrice}
                  courseRating={course.courseRating}
                  courseShortDescription={course.courseShortDescription}
                  courseFullDescription={course.courseFullDescription}
                  courseInfo={course.courseInfo}
                />
              ))}
            </div>
          ) : !loading && response?.length === undefined ? (
            <div className="w-full h-[100px] border-1 shadow-xs border-gray-300/50 rounded-lg  flex items-center justify-center mb-4">
              <Text className="text-center text-md w-full font-medium text-gray-700/70">{`Click "Suggest Me Courses" to get personalized recommendations based on your interests.`}</Text>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default SuggestionSection;
