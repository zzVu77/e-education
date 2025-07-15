import Filter from "@/components/Filter";

import SearchBar from "@/components/SearchBar";
import { dummyCategories, dummyPriceRanges } from "../../constants/data";
import { Suspense } from "react";
const SearchAndFilterSection = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-start gap-2 w-full">
        <Suspense fallback={null}>
          <SearchBar />
        </Suspense>
        <div className="flex flex-row items-center justify-center gap-2 w-full md:w-auto">
          <Suspense fallback={null}>
            <Filter typeOfFilter="category" items={dummyCategories} />
          </Suspense>
          <Suspense fallback={null}>
            <Filter typeOfFilter="price" items={dummyPriceRanges} />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default SearchAndFilterSection;
