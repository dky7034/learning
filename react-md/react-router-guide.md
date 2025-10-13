# React Router 시작하기: SPA를 위한 필수 내비게이션 가이드

## 📝 개요

이 문서는 React 기반의 **단일 페이지 애플리케이션(SPA)**에서 사용자 내비게이션을 구현하는 필수 라이브러리, **React Router**의 기초 사용법을 상세히 설명합니다. 이 가이드를 통해 다음 내용을 학습할 수 있습니다.

-   React Router의 역할과 SPA에서의 필요성
-   Vite 환경에서 React Router 설치 및 프로젝트 설정하기
-   `createBrowserRouter`를 사용한 라우트(경로) 정의 방법
-   `RouterProvider`와 `Link` 컴포넌트를 이용한 페이지 렌더링 및 이동

---

### 사전 학습

이 문서를 더 잘 이해하기 위해 아래 주제에 대한 기본 지식이 필요합니다.

-   [React SPA와 렌더링 전략](./react-spa-and-rendering-strategies.md)
-   [React 컴포넌트와 JSX](./react-components.md)
-   [Vite를 사용한 React 프로젝트 설정](./react-vite-setup.md)

---

## 1. React Router란? 왜 필요한가?

전통적인 웹사이트(MPA)는 페이지를 이동할 때마다 서버로부터 새로운 HTML 파일을 받아와 화면 전체를 새로고침합니다. 반면, **SPA(Single Page Application)**는 최초에 하나의 HTML 페이지만 불러온 후, JavaScript를 사용해 필요한 부분만 동적으로 교체하여 화면을 보여줍니다.

이때, 브라우저의 주소창에 따라 다른 화면(컴포넌트)을 보여주도록 연결해주는 **"길잡이"** 역할이 필요한데, 이것이 바로 **라우팅(Routing)**입니다. **React Router**는 React 생태계에서 클라이언트 사이드 라우팅을 구현하기 위한 표준 라이브러리입니다.

React Router를 사용하면 사용자가 URL을 직접 변경하거나 페이지 내 링크를 클릭했을 때, 페이지 전체를 새로고침하지 않고도 URL에 맞는 컴포넌트를 렌더링하여 앱과 같은 부드러운 사용자 경험을 제공할 수 있습니다.

## 2. 프로젝트 준비 및 설치

### 1단계: Vite로 React 프로젝트 생성

최신 빌드 도구인 Vite를 사용하여 React 프로젝트를 생성합니다.

```bash
# npm create vite@latest {프로젝트 이름} -- --template react
npm create vite@latest my-react-router-app -- --template react
```

### 2단계: 프로젝트 이동 및 패키지 설치

생성된 프로젝트 디렉토리로 이동하여 기본 의존성 패키지를 설치합니다.

```bash
# 프로젝트 경로로 이동
cd my-react-router-app

# 패키지 설치
npm install
```

### 3단계: React Router 설치

웹 환경에서 사용되는 `react-router-dom` 패키지를 설치합니다.

```bash
npm install react-router-dom
```

## 3. React Router 프로젝트 적용하기

### 1단계: 기본 디렉토리 구조 설정

먼저, 페이지 컴포넌트와 라우터 설정을 관리할 폴더를 생성합니다. `src/App.jsx`와 `src/App.css`는 사용하지 않으므로 삭제해도 좋습니다.

```
📁 src/
├── 📁 assets/
├── 📁 pages/              # 페이지 단위 컴포넌트 관리
│   ├── ⚛️ Home.jsx
│   └── ⚛️ About.jsx
├── 📁 router/              # 라우터 설정 파일 관리
│   └── 🚦 index.js
├── index.css
└── ⚛️ main.jsx            # 애플리케이션 진입점
```

### 2단계: 라우터(Router) 정의

`src/router/index.js` 파일에서 어떤 주소(URL)에 어떤 컴포넌트를 보여줄지 정의합니다. `createBrowserRouter` 함수를 사용해 라우팅 설정을 생성합니다.

**`src/router/index.js`**
'''javascript
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";

// createBrowserRouter: 경로와 컴포넌트를 매핑하는 라우터 객체를 생성
const router = createBrowserRouter([
  {
    path: "/", // 루트 경로: http://localhost:5173/
    element: <Home />, // 해당 경로에서 렌더링될 컴포넌트
  },
  {
    path: "/about", // /about 경로: http://localhost:5173/about
    element: <About />,
  },
]);

export default router;
'''
-   **`path`**: 브라우저에 표시될 URL 경로입니다.
-   **`element`**: 해당 `path`에 맞춰 렌더링할 React 요소를 지정합니다. 주로 JSX 컴포넌트를 전달합니다. (v6 이전 버전에서는 `component` prop을 사용했습니다.)

### 3단계: `RouterProvider`로 라우터 적용

정의한 라우터 설정을 애플리케이션 전체에 적용하기 위해, 진입점인 `src/main.jsx` 파일을 수정합니다. 기존의 `<App />` 대신 `<RouterProvider>` 컴포넌트를 사용합니다.

**`src/main.jsx`**
'''jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom"; // 1. RouterProvider 불러오기
import router from "./router"; // 2. 위에서 정의한 라우터 설정 불러오기
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* 3. router prop으로 라우터 설정을 전달 */}
    <RouterProvider router={router} />
  </StrictMode>
);
'''
`<RouterProvider>`는 애플리케이션의 최상위에서 라우팅 설정을 주입하여, 하위 컴포넌트들이 URL 변화에 따라 올바르게 렌더링될 수 있도록 해줍니다.

### 4단계: 페이지 컴포넌트 및 링크 작성

이제 각 페이지 컴포넌트를 작성하고, 페이지 간 이동을 위한 링크를 만듭니다.

> **💡 `<a>` 태그 대신 `<Link>` 컴포넌트 사용하기**
> SPA에서 일반 `<a>` 태그를 사용하면 페이지 전체가 새로고침되어 SPA의 장점이 사라집니다. React Router가 제공하는 `<Link>` 컴포넌트를 사용해야 페이지 새로고침 없이 URL만 변경하고 해당 컴포넌트를 렌더링할 수 있습니다.

**`src/pages/Home.jsx`**
'''jsx
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>홈 페이지</h1>
      {/* to 속성에 이동할 경로를 지정 */}
      <Link to="/about">소개 페이지로 이동</Link>
    </div>
  );
}
'''

**`src/pages/About.jsx`**
'''jsx
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div>
      <h1>소개 페이지</h1>
      <Link to="/">홈 페이지로 이동</Link>
    </div>
  );
}
'''

이제 `npm run dev`로 개발 서버를 실행하고 `http://localhost:5173`에 접속하면, "홈 페이지"가 보이고 링크를 클릭하면 페이지 새로고침 없이 "소개 페이지"로 부드럽게 전환되는 것을 확인할 수 있습니다.

## 4. 최종 요약

-   **React Router**는 SPA에서 URL에 따라 다른 컴포넌트를 보여주는 **클라이언트 사이드 라우팅**을 구현합니다.
-   `createBrowserRouter`를 사용하여 **경로(`path`)**와 **컴포넌트(`element`)**를 매핑하는 배열을 만듭니다.
-   `main.jsx`에서 `<RouterProvider>`를 사용하여 앱 전체에 라우팅 설정을 적용합니다.
-   페이지 간 이동은 `<a>` 태그 대신 **`<Link>` 컴포넌트**를 사용해야 합니다.
