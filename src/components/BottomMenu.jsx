import React from "react";
import { Link, useLocation } from "react-router-dom";
import { GlobeIcon, FireIcon, UserIcon } from "./Icons";

export function BottomMenu() {
  const location = useLocation();
  const activePath = location.pathname;
  const getIconColor = (path) => activePath === path ? "#FF50A8" : "black";

  return (
    <div className="absolute bottom-0 left-0 right-0 h-16 bg-white border-t-2 border-black flex items-center justify-around px-6 z-[1000]">
      <Link to="/map" className="p-2 hover:bg-gray-100 rounded-full">
         <div style={{ color: getIconColor("/map") }}><GlobeIcon /></div>
      </Link>
      <Link to="/feed" className="p-2 hover:bg-gray-100 rounded-full">
        <div style={{ color: getIconColor("/feed") }}><FireIcon /></div>
      </Link>
      <Link to="/profile" className="p-2 hover:bg-gray-100 rounded-full">
         <div style={{ color: getIconColor("/profile") }}><UserIcon /></div>
      </Link>
    </div>
  );
}