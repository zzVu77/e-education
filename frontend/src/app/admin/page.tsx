"use client";

import { useState } from "react";
import ManageDashboard from "./ManageDashboard";
import ManageCourses from "./ManageCourses";
import ManageOrders from "./ManageOrders";
import ManageUsers from "./ManageUsers";
import AppSidebar from "@/components/AppSideBar";

export default function AdminPage() {
  const [activePage, setActivePage] = useState("dashboard");

  const renderContent = () => {
    switch (activePage) {
      case "courses":
        return <ManageCourses />;
      case "orders":
        return <ManageOrders />;
      case "users":
        return <ManageUsers />;
      default:
        return <ManageDashboard />;
    }
  };

  return (
    <div className="flex h-screen">
      <AppSidebar activePage={activePage} setActivePage={setActivePage} />
      <main className="flex-1 bg-gray-100 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
}
