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
export type CourseApiResponse = {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  instructor: string;
  duration: number; // số giờ (hoặc phút)
  imgUrl: string;
  createdAt: string;
  updatedAt: string;
};
export type CoursesDataResponseForCard = {
  data: ProductCardProps[];
  totalPages: number;
};
export type CoursesDataResponse = {
  data: CourseApiResponse[];
  totalPages: number;
};
export type CreateCourseResponse = {
  message: string;
  data: CourseApiResponse;
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
export type LoginResponse = {
  message: string;
  user: {
    id: string;
    fullName: string;
  };
};
export type UserInfo = {
  id: string;
  fullName: string;
  role: "admin" | "user";
};
