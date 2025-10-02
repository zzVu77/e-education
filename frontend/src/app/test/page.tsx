import CustomPagination from "@/components/CustomPagination";
import ProductSkeleton from "@/components/ProductSkeleton";
import SearchAndFilterSection from "@/components/SearchAndFilterSection";

const Page = () => {
  return (
    <div>
      {/* <Button onClick={handleClickLogin}>Login</Button>
      <Button onClick={handleClickLogout}>Logout</Button>
      <Button onClick={handleClickFetchCourses}>Fetch Courses</Button> */}
      <ProductSkeleton />
      <SearchAndFilterSection />
      <CustomPagination totalPages={20} />
    </div>
  );
};

export default Page;
