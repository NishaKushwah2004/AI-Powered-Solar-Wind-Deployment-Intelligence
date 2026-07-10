import { Outlet } from "react-router-dom";


export default function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">


      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}