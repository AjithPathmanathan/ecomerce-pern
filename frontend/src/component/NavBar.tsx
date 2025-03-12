import React from "react";
import {
  PaintBucketIcon,
  Search,
  ShoppingBagIcon,
  ShoppingCartIcon,
} from "lucide-react";
import { Link, useResolvedPath } from "react-router-dom";
import ThemeSelector from "./ThemeSelector";

const NavBar = () => {
  const { pathname } = useResolvedPath();
  const isHomePage = pathname === "/";
  return (
    <div className="bg-base-100/80 backdrop-blur-lg border-b border-base-content/10 sticky top-0 z-50 ">
      <div className="max-w-7xl mx-auto">
        <div className="navbar px-4  min-h-[4rem] justify-between ">
          {/* logo */}
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <div className="flex items-center gap-2">
              <ShoppingCartIcon className="size-9 " />
              <span className="font-mono font-semibold bg-clip-text bg-gradient-to-r from-primary to-secondary">
                PERN
              </span>
            </div>
          </Link>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-400 rounded-xl h-8 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-5">
            <ThemeSelector/>
            {isHomePage && (
              <div className="indicator">
                <ShoppingBagIcon className="size-5" />
                <span className="badge badge-sm badge-primary indicator-item">
                  8
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
