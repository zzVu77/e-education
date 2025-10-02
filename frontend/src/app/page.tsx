import CustomPagination from "@/components/CustomPagination";
import ProductCard from "@/components/ProductCard";
import SearchAndFilterSection from "@/components/SearchAndFilterSection";
import SectionHeader from "@/components/shared/SectionHeader";
import Wrapper from "@/components/shared/Wrapper";
import axiosInstance from "@/config/axiosConfig";
import { CoursesDataResponse, ProductCardProps } from "@/types";
import { SearchParamsPromise } from "@/utils/searchParams";
import { Bookmark } from "lucide-react";
import Image from "next/image";

const Home = async ({
  searchParams,
}: {
  searchParams: SearchParamsPromise;
}) => {
  const resolvedParams = await searchParams;
  let coursesData: CoursesDataResponse = { data: [], totalPages: 0 };
  try {
    const response = !resolvedParams
      ? await axiosInstance.get<CoursesDataResponse>("/courses")
      : await axiosInstance.get<CoursesDataResponse>(
          `/courses/filter?title=${resolvedParams.title ?? ""}&category=${
            resolvedParams.category ?? ""
          }&page=${resolvedParams.page || 1}&limit=${resolvedParams.limit || 8}`,
        );
    coursesData = response;
  } catch (error) {
    console.error("Failed to fetch courses:", error);
  }
  if (resolvedParams.sort === "asc") {
    coursesData.data.sort((a, b) => a.price - b.price);
  } else if (resolvedParams.sort === "desc") {
    coursesData.data.sort((a, b) => b.price - a.price);
  }
  console.log(coursesData);

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
        {coursesData.data.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-5 ">
            <p className="text-lg md:text-2xl lg:text-3xl tracking-wider font-bold text-black ">
              No courses found.
            </p>
            <Image
              src="/empty.svg"
              alt="No courses found"
              height={250}
              width={250}
            />
          </div>
        ) : (
          <div className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4  grid items-center justify-items-center gap-5 mt-0 py-0 w-full">
            {coursesData.data.map((course: ProductCardProps) => (
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
            ))}
          </div>
        )}
        <CustomPagination totalPages={coursesData.totalPages} />
      </Wrapper>
    </>
  );
};

export default Home;
