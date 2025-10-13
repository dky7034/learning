# React Router 고급: 경로 관리와 모듈화 전략

## 📝 개요

이 문서는 React Router를 효율적으로 사용하기 위한 고급 기법을 설명합니다. 복잡해지는 프로젝트의 **경로 관리**, **라우터 설정 모듈화**, 그리고 **Not Found 페이지 처리** 방법을 학습하여 유지보수성과 개발 편의성을 높이는 것을 목표로 합니다.

- 경로 상수화를 통한 휴먼 에러 방지 및 일관성 유지
- 기능/레이아웃 단위의 라우터 모듈화
- `path="*"`를 이용한 Not Found(404) 페이지 처리

### 사전 학습

- [React Router 시작하기](./react-router-guide.md)

---

## 1. 경로 상수(Constant Paths)

경로 문자열을 직접 입력하는 대신, 별도의 파일에 상수로 정의하고 이를 불러와 사용하면 다음과 같은 장점이 있습니다.

- **오타 방지**: 자동 완성을 활용해 경로 작성 시 발생할 수 있는 오타를 줄입니다.
- **중앙 관리**: 경로가 변경될 때 여러 파일을 수정할 필요 없이 상수 파일 하나만 수정하면 됩니다.
- **가독성 향상**: `"/posts/:postId"` 같은 문자열보다 `PATHS.POST_DETAIL`처럼 의미 있는 이름으로 경로를 사용할 수 있습니다.

### 1단계: 디렉토리 구조

경로 상수를 관리할 `constants` 폴더와 `paths.js` 파일을 생성합니다.

```
📁 src/
├── 📁 pages/
│   ├── 📁 DummyPages/
│   │   ├── ⚛️ DummyHome.jsx
│   │   ├── ⚛️ Posts.jsx
│   │   ├── ⚛️ PostDetail.jsx
│   │   └── ⚛️ Products.jsx
│   ├── 📁 RootPages/
│   │   ├── ⚛️ RootHome.jsx
│   │   └── ⚛️ About.jsx
├── 📁 layouts/
│   ├── ⚛️ RootLayout.jsx
│   └── ⚛️ DummyLayout.jsx
├── 📁 constants/
│   └── 🚦 paths.js        # 경로 상수 관리 파일
└── 📁 router/
    └── 🚦 index.js
```

### 2단계: 경로 상수 정의

**`src/constants/paths.js`**

```javascript
// 경로 상수 객체 PATHS
const PATHS = {
  // RootLayout을 사용하는 경로
  ROOT: {
    INDEX: "/",
    ABOUT: "/about",
  },

  // DummyLayout을 사용하는 경로
  DUMMY: {
    INDEX: "/dummy",
    POSTS: "/dummy/posts",
    PRODUCTS: "/dummy/products",

    // 동적 경로(Dynamic Route)
    // 1. 라우터 정의에 사용될 패턴
    POST_DETAIL: "/dummy/posts/:postId",

    // 2. Link 또는 navigate()에서 사용할 함수
    getPostDetailPath: (postId) => `/dummy/posts/${postId}`,
  },
};

export default PATHS;
```

> **💡 동적 경로 관리**
> 동적 경로는 두 가지 형태로 관리하는 것이 편리합니다. 하나는 라우터 설정을 위한 문자열 패턴(`:postId`)이고, 다른 하나는 실제 파라미터를 넣어 완전한 URL을 생성하는 함수(`getPostDetailPath`)입니다.

### 3단계: 라우터에 경로 상수 적용

**`src/router/index.js`**

```javascript
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import DummyLayout from "../layouts/DummyLayout";
import RootHome from "../pages/RootPages/RootHome";
import About from "../pages/RootPages/About";
import DummyHome from "../pages/DummyPages/DummyHome";
import Posts from "../pages/DummyPages/Posts";
import PostDetail from "../pages/DummyPages/PostDetail";
import Products from "../pages/DummyPages/Products";

// 경로 상수 객체 PATHS 불러오기
import PATHS from "../constants/paths";

const router = createBrowserRouter([
  {
    path: PATHS.ROOT.INDEX,
    Component: RootLayout,
    children: [
      { index: true, Component: RootHome },
      { path: PATHS.ROOT.ABOUT, Component: About },
    ],
  },
  {
    path: PATHS.DUMMY.INDEX,
    Component: DummyLayout,
    children: [
      { index: true, Component: DummyHome },
      { path: PATHS.DUMMY.POSTS, Component: Posts },
      { path: PATHS.DUMMY.POST_DETAIL, Component: PostDetail },
      { path: PATHS.DUMMY.PRODUCTS, Component: Products },
    ],
  },
]);

export default router;
```

### 4단계: 컴포넌트에서 경로 상수 사용

`<Link>` 컴포넌트나 `navigate` 함수에서 정의된 경로 상수를 사용합니다.

```jsx
import { useNavigate, Link } from "react-router-dom";
import PATHS from "../constants/paths";

export default function Component() {
  const navigate = useNavigate();

  return (
    <>
      {/* 정적 경로 사용 */}
      <button onClick={() => navigate(PATHS.ROOT.INDEX)}>홈 페이지</button>
      <Link to={PATHS.ROOT.ABOUT}>소개</Link>
      <Link to={PATHS.DUMMY.POSTS}>Posts</Link>

      {/* 동적 경로 사용 */}
      <Link to={PATHS.DUMMY.getPostDetailPath(1)}>Post #1</Link>
      <Link to={PATHS.DUMMY.getPostDetailPath(2)}>Post #2</Link>
    </>
  );
}
```

---

## 2. 라우터 모듈화(Modular Router)

프로젝트 규모가 커지면 `router/index.js` 파일이 비대해질 수 있습니다. 이때 **레이아웃**이나 **기능** 단위로 라우트 설정을 분리하면 관리가 용이해집니다.

### 1단계: 디렉토리 구조

라우트 설정 파일을 담을 `routes` 폴더를 생성하고, 모듈화할 파일을 만듭니다.

```
📁 src/
└── 📁 router/
    ├── 🚦 index.js          # 메인 라우터 파일
    └── 📁 routes/
        ├── 🚦 rootRoutes.js   # RootLayout 관련 라우트
        └── 🚦 dummyRoutes.js  # DummyLayout 관련 라우트
```

### 2단계: 라우트 설정 분리

각 파일에 라우트 배열을 정의하고 `export` 합니다.

**`src/router/routes/rootRoutes.js`**

```javascript
import RootLayout from "../../layouts/RootLayout";
import RootHome from "../../pages/RootPages/RootHome";
import About from "../../pages/RootPages/About";
import PATHS from "../../constants/paths";

const rootRoutes = [
  {
    path: PATHS.ROOT.INDEX,
    Component: RootLayout,
    children: [
      { index: true, Component: RootHome },
      { path: PATHS.ROOT.ABOUT, Component: About },
    ],
  },
];

export default rootRoutes;
```

**`src/router/routes/dummyRoutes.js`**

```javascript
import DummyLayout from "../../layouts/DummyLayout";
import DummyHome from "../../pages/DummyPages/DummyHome";
import Posts from "../../pages/DummyPages/Posts";
import PostDetail from "../../pages/DummyPages/PostDetail";
import Products from "../../pages/DummyPages/Products";
import PATHS from "../../constants/paths";

const dummyRoutes = [
  {
    path: PATHS.DUMMY.INDEX,
    Component: DummyLayout,
    children: [
      { index: true, Component: DummyHome },
      { path: PATHS.DUMMY.POSTS, Component: Posts },
      { path: PATHS.DUMMY.POST_DETAIL, Component: PostDetail },
      { path: PATHS.DUMMY.PRODUCTS, Component: Products },
    ],
  },
];

export default dummyRoutes;
```

### 3단계: 메인 라우터에서 설정 병합

`router/index.js`에서 분리된 라우트 설정들을 불러와 전개 연산자(`...`)를 사용해 하나의 배열로 합칩니다.

**`src/router/index.js`**

```javascript
import { createBrowserRouter } from "react-router-dom";
import rootRoutes from "./routes/rootRoutes";
import dummyRoutes from "./routes/dummyRoutes";

// 분리된 라우트 설정을 합쳐서 라우터 생성
const router = createBrowserRouter([...rootRoutes, ...dummyRoutes]);

export default router;
```

---

## 3. Not Found 처리

사용자가 존재하지 않는 주소로 접근했을 때, "페이지를 찾을 수 없습니다"와 같은 안내를 보여주는 것은 좋은 사용자 경험을 위해 필수적입니다.

### 1단계: Not Found 컴포넌트 생성

**`src/pages/NotFound.jsx`**

```jsx
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>요청하신 페이지를 찾을 수 없습니다.</p>
      <Link to="/">홈으로 돌아가기</Link>
    </div>
  );
}
```

### 2단계: 라우터에 Not Found 경로 추가

`path="*"`는 **와일드카드** 역할을 하여 위에 정의된 어떤 경로와도 일치하지 않을 경우 렌더링될 컴포넌트를 지정합니다. 이 설정은 반드시 라우터 배열의 **가장 마지막**에 위치해야 합니다.

**`src/router/index.js`**

```javascript
import { createBrowserRouter } from "react-router-dom";
import rootRoutes from "./routes/rootRoutes";
import dummyRoutes from "./routes/dummyRoutes";
import NotFound from "../pages/NotFound"; // Not Found 컴포넌트 불러오기

const router = createBrowserRouter([
  ...rootRoutes,
  ...dummyRoutes,
  {
    // 위에 정의된 경로 외 모든 경로에 대해 처리
    path: "*",
    Component: NotFound,
  },
]);

export default router;
```

## 4. 최종 요약

- **경로 상수**: 경로를 상수로 관리하여 코드의 일관성과 유지보수성을 높입니다. 동적 경로는 패턴과 생성 함수 두 가지로 관리하면 편리합니다.
- **라우터 모듈화**: `createBrowserRouter`에 전달할 배열을 기능별/레이아웃별 파일로 분리하고, 메인 파일에서 합쳐서 사용하면 관리가 용이합니다.
- **Not Found 처리**: `path="*"` 설정을 라우터 배열의 맨 마지막에 추가하여 존재하지 않는 경로에 대한 처리를 구현합니다.
