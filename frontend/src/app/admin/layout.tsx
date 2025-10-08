import AdminSideBar from "@/components/admin/AdminSideBar";
import { OnlineUserProvider } from "@/context/OnlineUserContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OnlineUserProvider>
      <div className="flex h-screen">
        <AdminSideBar />
        <main className="flex-1 bg-gray-100 overflow-y-auto">{children}</main>
      </div>
    </OnlineUserProvider>
  );
}
