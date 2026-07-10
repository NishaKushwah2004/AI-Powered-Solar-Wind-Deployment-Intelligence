import { Outlet } from "react-router-dom";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import PageContainer from "@/components/layout/PageContainer";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-slate-50">

      <Sidebar />

      <div className="flex min-h-screen flex-1 flex-col">

        <Navbar />

        <PageContainer className="flex-1">

          <Outlet />

        </PageContainer>

      </div>

    </div>
  );
}