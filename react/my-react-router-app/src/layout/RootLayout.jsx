import React from "react";
import { Outlet, NavLink } from "react-router-dom";

export default function RootLayout() {
  const baseLinkClasses =
    "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300";
  const inactiveLinkClasses = "text-gray-700 hover:bg-gray-200";
  const activeLinkClasses = "bg-gray-900 text-white";

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center md:justify-between py-4">
            <div className="flex-shrink-0 mb-4 md:mb-0">
              <NavLink to="/" className="text-2xl font-bold text-gray-800">
                MyApp
              </NavLink>
            </div>
            <div className="flex flex-wrap justify-center items-baseline gap-x-4 gap-y-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${baseLinkClasses} ${
                    isActive ? activeLinkClasses : inactiveLinkClasses
                  }`
                }
                end
              >
                홈
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `${baseLinkClasses} ${
                    isActive ? activeLinkClasses : inactiveLinkClasses
                  }`
                }
              >
                소개
              </NavLink>
              <NavLink
                to="/posts"
                className={({ isActive }) =>
                  `${baseLinkClasses} ${
                    isActive ? activeLinkClasses : inactiveLinkClasses
                  }`
                }
              >
                게시물
              </NavLink>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `${baseLinkClasses} ${
                    isActive ? activeLinkClasses : inactiveLinkClasses
                  }`
                }
              >
                프로필
              </NavLink>
              <NavLink
                to="/auth"
                className={`${baseLinkClasses} ${inactiveLinkClasses}`}
              >
                인증
              </NavLink>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
