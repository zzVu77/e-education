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
export type CategoryDataResponse = {
  data: string[];
};
export type CourseInOrder = {
  id: string;
  name: string;
  price: number;
};

export type UserInOrder = {
  id: string;
  username: string;
};

export type OrderItem = {
  id: string;
  user: UserInOrder;
  courses: CourseInOrder[];
  totalAmount: number;
  paymentStatus: "Pending" | "Paid" | "Failed";
  paymentMethod: "CreditCard" | "Paypal" | "BankTransfer";
  createdAt: string;
  updatedAt: string;
};

export type OrdersDataResponse = OrderItem[];
