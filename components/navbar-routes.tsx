"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import ModeToggle from "./DarkMode";

export const NavbarRoutes = () => {
  const { userId } = useAuth();

  return (
    <>
      <div className="flex gap-x-2 items-center ml-auto">
        <ModeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
};
