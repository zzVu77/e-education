"use client";
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
  return (
    <div>
      <Button onClick={handleClickLogin}>Login</Button>
      <Button onClick={handleClickLogout}>Logout</Button>
    </div>
  );
};

export default Page;
