# React Router 중첩 라우팅: Outlet과 children으로 레이아웃 구현하기

## 📝 개요

이 문서는 React Router의 강력한 기능 중 하나인 **중첩 라우팅(Nested Routing)**에 대해 상세히 설명합니다. 이 가이드를 통해 공통된 UI 레이아웃을 여러 페이지에 걸쳐 효율적으로 재사용하는 방법을 학습할 수 있습니다.

-   중첩 라우팅의 개념과 필요성
-   `<Outlet>` 컴포넌트의 역할과 사용법
-   `createBrowserRouter`에서 `children` 속성을 사용한 라우트 중첩 방법
-   실제 예제를 통한 공통 레이아웃 구현

---

### 사전 학습

이 문서를 더 잘 이해하기 위해 아래 주제에 대한 기본 지식이 필요합니다.

-   [React Router 시작하기](./react-router-guide.md)

---

## 1. 중첩 라우팅(Nested Routing)이란?

웹 애플리케이션을 만들다 보면 여러 페이지가 동일한 헤더(Header), 푸터(Footer), 또는 사이드바(Sidebar)를 공유하는 경우가 많습니다. 중첩 라우팅은 바로 이러한 **공통 레이아웃 구조**를 쉽게 구현하기 위한 기능입니다.

경로(Route) 안에 또 다른 경로를 중첩시키는 방식으로, 부모 경로는 공통 레이아웃 역할을 하는 컴포넌트를 렌더링하고, 자식 경로는 해당 레이아웃의 특정 영역에 실제 페이지 콘텐츠를 렌더링합니다.

> **💡 쉽게 이해하기**
> 중첩 라우팅은 "액자"와 "그림"에 비유할 수 있습니다.
> - **부모 라우트 (Layout)**: 모든 페이지에 동일하게 적용되는 "액자"입니다.
> - **자식 라우트 (Page)**: 액자 안에 들어갈 개별 "그림"입니다.
> - **`<Outlet>`**: 그림이 들어갈 액자의 빈 공간입니다.

## 2. 핵심 개념 1: `<Outlet>` 컴포넌트

`<Outlet>` 컴포넌트는 부모 라우트의 컴포넌트(레이아웃) 내에서 **자식 라우트의 컴포넌트가 렌더링될 위치를 지정해주는 표식(Placeholder)**입니다.

React Router는 현재 URL에 맞는 자식 라우트를 찾아, 해당 컴포넌트를 부모의 `<Outlet>` 위치에 렌더링합니다.

#### 기본 구조

```jsx
// layouts/MainLayout.jsx
import { Outlet, Link } from "react-router-dom";

export default function MainLayout() {
  return (
    <div>
      <header>
        <h1>My App</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>

      <hr />

      <main>
        {/* 자식 컴포넌트가 이 자리에 렌더링됩니다 */}
        <Outlet />
      </main>

      <hr />

      <footer>
        <p>© 2025 My App</p>
      </footer>
    </div>
  );
}
```

## 3. 핵심 개념 2: `children` 속성

라우터를 설정하는 `createBrowserRouter` 함수에서, 특정 경로 객체 내에 `children` 속성을 사용하여 자식 경로들을 배열 형태로 정의할 수 있습니다.

#### `children` 경로 규칙

-   **상대 경로 사용**: 자식 경로의 `path`는 부모 경로에 상대적으로 작성됩니다. `/`로 시작하지 않아야 합니다.
    -   부모 `path: "/products"`, 자식 `path: "1"` → 전체 URL: `/products/1`
-   **인덱스 라우트(Index Route)**: `path` 대신 `index: true`를 사용하면, 부모의 URL과 정확히 일치할 때 기본으로 렌더링될 자식 컴포넌트를 지정할 수 있습니다.

#### 기본 구조

```javascript
// router/index.js
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";

const router = createBrowserRouter([
  {
    // 부모 라우트
    path: "/",
    element: <MainLayout />, // 공통 레이아웃 컴포넌트
    children: [
      {
        // 자식 라우트 1 (인덱스)
        index: true, // 완성 URL: "/"
        element: <HomePage />,
      },
      {
        // 자식 라우트 2
        path: "about", // 완성 URL: "/about"
        element: <AboutPage />,
      },
    ],
  },
]);
```

## 4. 중첩 라우팅 전체 예제

공통 헤더를 가진 메인 레이아웃과, 인증 관련 페이지들을 위한 별도의 인증 레이아웃, 두 가지 중첩 라우팅 구조를 만들어 보겠습니다.

### 1) 디렉토리 구조

```
📁 src/
├── 📁 pages/                # 페이지 컴포넌트
│   ├── ⚛️ Home.jsx
│   ├── ⚛️ About.jsx
│   ├── ⚛️ Login.jsx
│   └── ⚛️ Signup.jsx
├── 📁 layouts/              # 레이아웃 컴포넌트
│   ├── ⚛️ RootLayout.jsx
│   └── ⚛️ AuthLayout.jsx
├── 📁 router/
│   └── 🚦 index.js          # 라우터 설정
└── ⚛️ main.jsx
```

### 2) 라우터 정의 (`router/index.js`)

```javascript
import { createBrowserRouter } from "react-router-dom";

// 레이아웃 컴포넌트
import RootLayout from "../layouts/RootLayout";
import AuthLayout from "../layouts/AuthLayout";

// 페이지 컴포넌트
import Home from "../pages/Home";
import About from "../pages/About";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
    ],
  },
]);

export default router;
```

### 3) 레이아웃 컴포넌트 작성

**`layouts/RootLayout.jsx`**
'''jsx
import { Outlet, Link } from "react-router-dom";

export default function RootLayout() {
  return (
    <div>
      <header style={{ padding: 20, borderBottom: '1px solid gray' }}>
        <h2>메인 헤더</h2>
        <nav>
          <Link to="/" style={{ marginRight: 10 }}>홈</Link>
          <Link to="/about" style={{ marginRight: 10 }}>소개</Link>
          <Link to="/auth/login">로그인</Link>
        </nav>
      </header>
      <main style={{ padding: 20 }}>
        <Outlet />
      </main>
    </div>
  );
}
'''

**`layouts/AuthLayout.jsx`**
'''jsx
import { Outlet, Link } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div>
      <header style={{ padding: 20, borderBottom: '1px solid gray' }}>
        <h2>인증 페이지 헤더</h2>
        <Link to="/">홈으로</Link>
      </header>
      <main style={{ padding: 20, backgroundColor: '#f0f0f0' }}>
        <Outlet />
      </main>
    </div>
  );
}
'''

### 4) 페이지 컴포넌트 작성 (예시)

**`pages/Home.jsx`**
```jsx
export default function Home() {
  return <h1>🏠 홈 페이지</h1>;
}
```

**`pages/Login.jsx`**
```jsx
export default function Login() {
  return <h2>🔒 로그인 페이지</h2>;
}
```

(다른 페이지 컴포넌트들도 유사하게 작성합니다.)

### 5) `RouterProvider` 적용 (`main.jsx`)

라우터 설정을 앱에 적용하는 부분은 변경되지 않습니다.

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
```

이제 `/`, `/about` 경로에서는 `RootLayout`이 적용되고, `/auth/login`, `/auth/signup` 경로에서는 `AuthLayout`이 적용되는 것을 확인할 수 있습니다.

## 5. 최종 요약

-   **중첩 라우팅**은 여러 페이지에 걸쳐 **공통 레이아웃**을 재사용하기 위한 강력한 기능입니다.
-   부모 라우트는 `element`에 레이아웃 컴포넌트를, `children`에 하위 페이지 라우트 배열을 설정합니다.
-   레이아웃 컴포넌트 안에는 자식 컴포넌트가 렌더링될 위치를 표시하기 위해 **`<Outlet />`**을 반드시 포함해야 합니다.
-   자식 라우트의 `path`는 부모에 대한 **상대 경로**로 작성하며, `index: true`는 부모 경로와 동일한 URL의 기본 페이지를 지정합니다.