// src/router/index.js

// 페이지 컴포넌트 불러오기
import Home from "../pages/RootPages/Home";
import About from "../pages/RootPages/About";
import Profile from "../pages/RootPages/Profile";
import AuthHome from "../pages/AuthPages/AuthHome";
import Signup from "../pages/AuthPages/Signup";
import Login from "../pages/AuthPages/Login";

// React Router의 createBrowserRouter 불러오기
import { createBrowserRouter } from "react-router-dom";

// 레이아웃 컴포넌트 불러오기
import RootLayout from "../layout/RootLayout";
import AuthLayout from "../layout/AuthLayout";
import ProtectedLayout from "../layout/ProtectedLayout";

// 라우터 설정 생성
const router = createBrowserRouter([
  // 1. 라우트 객체는 중괄호 {} 로 감싸야 합니다.
  {
    path: "/",
    Component: RootLayout,

    // 2. 'Children'이 아닌 'children' (소문자) 속성을 사용해야 합니다.
    children: [
      // 3. 자식 경로는 부모 경로를 기준으로 상대적으로 렌더링됩니다.
      {
        index: true, // 부모 경로('/')와 정확히 일치할 때 렌더링됩니다.
        Component: Home,
      },
      {
        path: "about", // '/about' 경로에 렌더링됩니다.
        Component: About,
      },
      {
        // path가 없는 레이아웃 라우트를 사용해 하위 경로들을 그룹화하고 보호합니다.
        Component: ProtectedLayout,
        children: [
          {
            path: "profile", // '/profile' 경로에 렌더링되며, ProtectedLayout의 보호를 받습니다.
            Component: Profile,
          },
        ],
      },
    ],
  },
  // AuthLayout 경로 설정
  {
    path: "/auth",
    Component: AuthLayout,

    children: [
      { index: true, Component: AuthHome },
      { path: "login", Component: Login },
      { path: "signup", Component: Signup },
    ],
  },
]);

export default router;
