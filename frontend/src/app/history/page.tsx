// "use client";
// import EmptyState from "@/components/shared/EmptyState";
// import ProductCard, { ProductCardProps } from "@/components/ProductCard";
// import Wrapper from "@/components/shared/Wrapper";
// import { useHistoryChangeListener } from "@/hooks/useHistory";
// import { History } from "lucide-react";
// import { useCallback, useEffect, useState } from "react";
// import { LOCAL_STORAGE_HISTORY_KEY } from "../../../constants/const";
// import { mockCoursesData } from "../../../constants/data";
// import SectionHeader from "@/components/shared/SectionHeader";

// const Page = () => {
//   const [historyList, setHistoryList] = useState<ProductCardProps[]>([]);

//   const loadHistory = useCallback(() => {
//     const stored = JSON.parse(
//       localStorage.getItem(LOCAL_STORAGE_HISTORY_KEY) || "[]"
//     );
//     const reversedStored = [...stored].reverse();
//     const history = reversedStored
//       .map((id: string) =>
//         mockCoursesData.find((product) => product.courseId === id)
//       )
//       .filter(Boolean) as ProductCardProps[];
//     setHistoryList(history);
//   }, []);

//   useEffect(() => {
//     loadHistory();
//   }, [loadHistory]);

//   useHistoryChangeListener(() => {
//     loadHistory();
//   });

//   return (
//     <div className="flex flex-col items-center justify-center w-full">
//       <SectionHeader
//         icon={<History className="h-12 w-12 mr-2 fill-blue-500" />}
//         title="Viewing History"
//         description="Here you can find all the courses you've viewed recently. Click on any course to revisit its details."
//       />

//       <Wrapper
//         classNames={{
//           container: "pt-5 md:px-10",
//         }}
//       >
//         {historyList.length === 0 ? (
//           <EmptyState
//             icon={<History className="h-12 w-12 mx-auto text-gray-500 mb-4" />}
//             title=" No viewed courses yet"
//             description={
//               <>
//                 {` You haven't viewed any courses yet.`}
//                 <br />
//                 {`Explore our catalog and click on a course to see it appear here in your history.`}
//               </>
//             }
//             buttonText="Browse Products"
//             buttonHref="/"
//           />
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center justify-items-center gap-10 mt-0 py-0 w-full">
//             {historyList.map((product) => (
//               <ProductCard
//                 key={product.id}
//                 id={product.id}
//                 title={product.title}
//                 imgUrl={product.imgUrl}
//                 coursePrice={product.coursePrice}
//                 courseRating={product.courseRating}
//                 description={product.description}
//                 courseFullDescription={product.courseFullDescription}
//                 courseInfo={product.courseInfo}
//               />
//             ))}
//           </div>
//         )}
//       </Wrapper>
//     </div>
//   );
// };

// export default Page;
