import { Sidebar } from "./sidebar"; // Make sure path is correct
import { Outlet } from "react-router-dom";

export default function LayoutWithSidebar() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
