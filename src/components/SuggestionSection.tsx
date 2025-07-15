import { Bot } from "lucide-react";
import { Text, Title } from "./ui/typography";
import { Button } from "./ui/button";
// import ProductCard from "./ProductCard";
// import { mockCoursesData } from "../../constants/data";

const SuggestionSection = () => {
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
          <Button className="capitalize rounded-lg bg-green-600/90 text-white font-bold active:scale-95 hover:bg-green-500/90 transition-all duration-200 cursor-pointer w-full md:w-fit h-10">
            suggest me courses
          </Button>
        </div>
        {/* List suggested courses */}
        <div className="w-full">
          <div className="w-full h-[100px] border-1 shadow-xs border-gray-300/50 rounded-lg  flex items-center justify-center mb-4">
            <Text className="text-center text-md w-full font-medium text-gray-700/70">{`Click "Suggest Me Courses" to get personalized recommendations based on your interests.`}</Text>
          </div>
          {/* <div className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid items-center justify-items-center gap-5 mt-0 py-0 w-full ">
            {mockCoursesData.map((course) => (
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
          </div> */}
        </div>
      </div>
    </>
  );
};

export default SuggestionSection;
