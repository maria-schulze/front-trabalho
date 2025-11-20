import React from "react";
import { useLocation } from "react-router-dom";
import { BottomMenu } from "./BottomMenu";

export function AppLayout({ children }) {
  const location = useLocation();
  const noMenuRoutes = ["/", "/login", "/register"];
  const showMenu = !noMenuRoutes.includes(location.pathname);

  return (
    <div className="app-container">
      <div className={`flex-1 overflow-y-auto ${showMenu ? "pb-16" : ""}`}>
        {children}
      </div>
      {showMenu && <BottomMenu />}
    </div>
  );
}