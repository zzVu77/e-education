import ProductCard, { ProductCardProps } from "@/components/ProductCard";
import SearchAndFilterSection from "@/components/SearchAndFilterSection";
import Wrapper from "@/components/shared/Wrapper";
import SuggestionSection from "@/components/SuggestionSection";
import axiosInstance from "@/config/axiosConfig";
import { filterCourses } from "@/utils/searchAndFilter";
import { SearchParamsPromise } from "@/utils/searchParams";

const Home = async ({
  searchParams,
}: {
  searchParams: SearchParamsPromise;
}) => {
  const resolvedParams = await searchParams;

  const coursesData = await axiosInstance.get<ProductCardProps[]>("/courses");

  const response = filterCourses(coursesData.data, {
    courseName: resolvedParams.search,
    priceRange: resolvedParams.price,
    category: resolvedParams.category,
  });
  return (
    <>
      <Wrapper
        classNames={{
          container: "pt-10 ",
        }}
      >
        <SearchAndFilterSection />
        <div className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid items-center justify-items-center gap-10 mt-0 py-0 w-full ">
          {
            // Sort mockCoursesData alphabetically by courseName before mapping
            response
              .slice()
              .sort((a, b) =>
                (a.courseName ?? "").localeCompare(b.courseName ?? "")
              )
              .map((course) => (
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
              ))
          }
        </div>
      </Wrapper>
      <Wrapper>
        <SuggestionSection />
      </Wrapper>
    </>
  );
};

export default Home;
