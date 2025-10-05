export type SearchParamsTypes = {
  title: string;
  sort: "asc" | "desc";
  category: string;
  page: number;
  limit: number;
};
export type SearchParamsPromise = Promise<Partial<SearchParamsTypes>>;
