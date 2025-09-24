import { ProductCardProps } from "@/components/ProductCard";

interface FilterOptions {
  courseName?: string;
  priceRange?: string; // "free", "lt-500", "500-1000", "gt-1000"
  category?: string;
}

function priceInRange(price: number, range?: string): boolean {
  if (!range) return true;

  switch (range) {
    case "all":
      return true;
    case "free":
      return price === 0;
    case "lt-500":
      return price > 0 && price < 500;
    case "500-1000":
      return price >= 500 && price <= 1000;
    case "gt-1000":
      return price > 1000;
    default:
      return true;
  }
}
function toKebabCase(str: string) {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}

export function filterCourses(
  courses: ProductCardProps[],
  filters: FilterOptions,
): ProductCardProps[] {
  return courses.filter((course) => {
    const { courseName, priceRange, category } = filters;

    // Filter by courseName (if provided)
    const matchesName = courseName
      ? course.courseName
          ?.toLowerCase()
          .includes(courseName.trim().toLowerCase())
      : true;

    // Filter by priceRange (if provided)
    const matchesPrice = priceInRange(course.coursePrice ?? 0, priceRange);

    // Filter by category (if provided)
    const courseCategory = course.courseInfo?.find(
      (info) => info.label === "Category",
    )?.value;

    const matchesCategory =
      category && category !== "all"
        ? toKebabCase(courseCategory ?? "") === category
        : true;
    return matchesName && matchesPrice && matchesCategory;
  });
}
