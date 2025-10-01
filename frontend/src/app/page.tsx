import ProductCard from "@/components/ProductCard";
import SearchAndFilterSection from "@/components/SearchAndFilterSection";
import SectionHeader from "@/components/shared/SectionHeader";
import Wrapper from "@/components/shared/Wrapper";
import SuggestionSection from "@/components/SuggestionSection";
import axiosInstance from "@/config/axiosConfig";
import { ProductCardProps } from "@/types";
import { SearchParamsPromise } from "@/utils/searchParams";
import { Bookmark } from "lucide-react";

const Home = async ({
  searchParams,
}: {
  searchParams: SearchParamsPromise;
}) => {
  const resolvedParams = await searchParams;
  console.log("Resolved Search Params:", resolvedParams);

  const coursesData = await axiosInstance.get<ProductCardProps[]>(
    "http://localhost:8080/api/courses",
  );

  // const response = filterCourses(coursesData.data, {
  //   courseName: resolvedParams.search,
  //   priceRange: resolvedParams.price,
  //   category: resolvedParams.category,
  // });
  return (
    <>
      <SectionHeader
        icon={<Bookmark className="h-12 w-12 mr-2 fill-amber-400" />}
        title="All Courses"
        description="Browse our complete collection of courses. Click on any course to view more details and start learning."
      />
      <Wrapper
        classNames={{
          container: "pt-10 ",
        }}
      >
        <SearchAndFilterSection />
        <div className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid items-center justify-items-center gap-10 mt-0 py-0 w-full ">
          {
            // Sort mockCoursesData alphabetically by courseName before mapping
            coursesData.data.map((course: ProductCardProps) => (
              <ProductCard
                key={course.id}
                id={course.id}
                title={course.title}
                imgUrl={course.imgUrl}
                price={course.price}
                description={course.description}
                category={course.category}
                level={course.level}
                instructor={course.instructor}
                duration={course.duration}
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
