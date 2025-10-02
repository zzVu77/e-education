export type ProductCardProps = {
  id: string;
  title: string;
  imgUrl: string;
  price: number;
  description: string;
  category: string;
  level: string;
  instructor: string;
  duration: string;
};
export type CoursesDataResponse = {
  data: ProductCardProps[];
  totalPages: number;
};
