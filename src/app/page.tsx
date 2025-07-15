import ProductCard from "@/components/ProductCard";
import SearchAndFilterSection from "@/components/SearchAndFilterSection";
import Wrapper from "@/components/shared/Wrapper";
import { Check, Info } from "lucide-react";
import { Toaster } from "sonner";
import { mockCoursesData } from "../../constants/data";
import SuggestionSection from "@/components/SuggestionSection";

const Home = () => {
  return (
    <>
      <Toaster
        icons={{
          success: <Check className="text-green-500 h-5 w-5 mr-4" />,
          info: <Info className="text-blue-500 h-5 w-5 mr-4  " />,
        }}
      />
      <Wrapper
        classNames={{
          container: "pt-10 ",
        }}
      >
        <SearchAndFilterSection />
        <div className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid items-center justify-items-center gap-5 mt-0 py-0 w-full ">
          {
            // Assuming mockCoursesData is an array of ProductCardProps
            // Replace with actual data fetching logic as needed
            mockCoursesData.map((course) => (
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
