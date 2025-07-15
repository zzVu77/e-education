import Filter from "@/components/Filter";

import SearchBar from "@/components/SearchBar";
import { dummyCategories, dummyPriceRanges } from "../../constants/data";
const SearchAndFilterSection = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-start gap-2 w-full">
        <SearchBar />
        <div className="flex flex-row items-center justify-center gap-2 w-full md:w-auto">
          <Filter typeOfFilter="category" items={dummyCategories} />
          <Filter typeOfFilter="price" items={dummyPriceRanges} />
        </div>
      </div>
    </>
  );
};

export default SearchAndFilterSection;
