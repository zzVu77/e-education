"use client";
import ProductSkeleton from "@/components/ProductSkeleton";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/config/axiosConfig";
import React from "react";

const Page = () => {
  const handleClickLogin = () => {
    axiosInstance.post("http://localhost:8080/api/auth/login", {
      username: "vu77",
      password: "123456",
    });
  };
  const handleClickLogout = () => {
    axiosInstance.post("http://localhost:8080/api/auth/logout");
  };
  const handleClickFetchCourses = () => {
    axiosInstance.get("http://localhost:8080/api/courses");
  };
  return (
    <div>
      <Button onClick={handleClickLogin}>Login</Button>
      <Button onClick={handleClickLogout}>Logout</Button>
      <Button onClick={handleClickFetchCourses}>Fetch Courses</Button>
      <ProductSkeleton />
    </div>
  );
};

export default Page;
