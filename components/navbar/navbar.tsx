import { NavbarRoutes } from "@/components/navbar-routes";

import { MobileSidebar } from "./mobile-sidebar";

export const Navbar = () => {
  return (
    <div className="p-4 border-b h-full flex z-40 bg-white dark:bg-black items-centershadow-sm">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
};
