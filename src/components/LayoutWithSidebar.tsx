import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";


export default function LayoutWithSidebar() {
  return (
    <div className="flex min-h-screen bg-boostlab-bg">
      <Sidebar />
      <main className="flex-1 ml-64 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
