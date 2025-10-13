import React from "react";
import { Outlet, NavLink } from "react-router-dom";

export default function AuthLayout() {
  const baseLinkClasses =
    "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300";
  const inactiveLinkClasses =
    "text-gray-300 hover:bg-gray-700 hover:text-white";
  const activeLinkClasses = "bg-gray-900 text-white";

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-800 shadow-md">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <NavLink to="/auth" className="text-white text-2xl font-bold">
                인증 시스템
              </NavLink>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink
                  to="/auth/login"
                  className={({ isActive }) =>
                    `${baseLinkClasses} ${
                      isActive ? activeLinkClasses : inactiveLinkClasses
                    }`
                  }
                >
                  로그인
                </NavLink>
                <NavLink
                  to="/auth/signup"
                  className={({ isActive }) =>
                    `${baseLinkClasses} ${
                      isActive ? activeLinkClasses : inactiveLinkClasses
                    }`
                  }
                >
                  회원가입
                </NavLink>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `${baseLinkClasses} ${
                      isActive ? activeLinkClasses : inactiveLinkClasses
                    }`
                  }
                >
                  홈페이지
                </NavLink>
              </div>
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
