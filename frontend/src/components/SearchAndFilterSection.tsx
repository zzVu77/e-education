import Filter from "@/components/Filter";
import SearchBar from "@/components/SearchBar";
import { Suspense } from "react";
import { mockCategories } from "../constants/data";
const SearchAndFilterSection = () => {
  const sortOptions = [
    { label: "Unsorted", value: "none" },
    { label: "Ascending", value: "asc" },
    { label: "Descending", value: "desc" },
  ];
  return (
    <>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-start gap-2 w-full">
        <Suspense fallback={null}>
          <SearchBar />
        </Suspense>
        <div className="flex flex-row items-center justify-center gap-2 w-full md:w-auto">
          <Suspense fallback={null}>
            <Filter
              typeOfFilter="category"
              items={[...mockCategories].sort((a, b) =>
                a.label.localeCompare(b.label),
              )}
            />
          </Suspense>
          <Suspense fallback={null}>
            <Filter typeOfFilter="sort" items={sortOptions} />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default SearchAndFilterSection;
