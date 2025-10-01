// src/app/admin/layout.tsx
import React from "react";
import AppSidebar from "@/components/AppSideBar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <AppSidebar />

      {/* Nội dung chính */}
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}
