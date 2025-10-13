# React Router 내비게이션: Link, NavLink, Navigate, useNavigate 완벽 가이드

## 📝 개요

이 문서는 React Router에서 페이지 이동을 구현하는 다양한 방법에 대해 상세히 설명합니다. 사용자가 UI와 상호작용하며 앱의 다른 부분으로 이동할 수 있도록 돕는 핵심 기능들을 학습합니다.

-   선언적 내비게이션: `<Link>`, `<NavLink>` 컴포넌트
-   렌더링 시 리다이렉트: `<Navigate>` 컴포넌트
-   명령형 내비게이션: `useNavigate` 훅
-   상황에 따른 조건부 리다이렉트 구현 방법

---

### 사전 학습

이 문서를 더 잘 이해하기 위해 아래 주제에 대한 기본 지식이 필요합니다.

-   [React Router 시작하기](./react-router-guide.md)

---

## 1. 내비게이션의 두 가지 접근법

React Router는 페이지 이동을 위해 크게 두 가지 접근법을 제공합니다.

1.  **선언적(Declarative) 내비게이션**: 컴포넌트를 사용하여 "어디로 가야 하는지"를 선언합니다. 사용자가 직접 상호작용하는 UI를 만들 때 사용됩니다. (`<Link>`, `<NavLink>`, `<Navigate>`)
2.  **명령형(Imperative) 내비게이션**: 함수를 호출하여 "언제, 어떻게 갈지"를 코드로 직접 명령합니다. 특정 로직(예: 폼 제출) 실행 후 페이지를 이동시킬 때 사용됩니다. (`useNavigate`)

## 2. `<Link>` 컴포넌트: 기본 SPA 링크

`<Link>` 컴포넌트는 웹 페이지의 `<a>` 태그와 유사한 역할을 하지만, 가장 큰 차이점은 **페이지를 새로고침하지 않고** 애플리케이션 내에서 라우트를 전환한다는 것입니다. 이것이 SPA(Single Page Application)의 핵심 동작 방식입니다.

-   `to` 속성: 이동하고자 하는 목표 경로(path)를 지정합니다.

#### 기본 구조

```jsx
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav>
      <Link to="/">홈</Link>
      <Link to="/about">소개</Link>
      <Link to="/products">상품 목록</Link>
    </nav>
  );
}
```

## 3. `<NavLink>` 컴포넌트: 활성 링크 스타일링

`<NavLink>`는 `<Link>`의 특별한 버전으로, 자신이 가리키는 URL과 현재 페이지의 URL이 일치하는지 여부를 스스로 판단할 수 있습니다. 이를 통해 현재 활성화된 링크에 특정 스타일이나 클래스를 적용할 수 있습니다.

-   `className`과 `style` 속성에 함수를 전달할 수 있습니다.
-   이 함수는 `{ isActive, isPending }` 객체를 인자로 받으며, `isActive`가 `true`이면 현재 링크가 활성 상태임을 의미합니다.

#### 기본 구조

```jsx
import { NavLink } from "react-router-dom";

// 활성 상태일 때 적용할 Tailwind CSS 클래스
const activeClass = "text-blue-500 font-bold";

export default function Navigation() {
  return (
    <nav className="flex gap-4">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? activeClass : "")}
      >
        홈
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) => (isActive ? activeClass : "")}
      >
        소개
      </NavLink>
    </nav>
  );
}
```

## 4. `<Navigate>` 컴포넌트: 렌더링과 동시에 리다이렉트

`<Navigate>` 컴포넌트는 렌더링되는 즉시 사용자를 다른 경로로 이동시키는, 즉 **리다이렉트(Redirect)**하는 역할을 합니다.

-   `to` 속성: 이동할 경로를 지정합니다.
-   `replace` 속성: `true`로 설정하면 현재 페이지를 브라우저 히스토리(history)에 남기지 않습니다. 사용자가 뒤로가기 버튼을 눌렀을 때 리다이렉트 이전 페이지로 돌아가는 것을 방지할 수 있습니다. (예: 로그인 성공 후 이전 로그인 페이지로 돌아가지 않도록 할 때)

#### 비로그인 사용자 리다이렉트 예시

```jsx
import { Navigate } from "react-router-dom";

export default function ProtectedPage() {
  const isLoggedIn = false; // 실제 앱에서는 Context나 Redux 등에서 관리

  // 로그인이 되어있지 않다면, 렌더링 즉시 /login 경로로 리다이렉트
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <div>회원 전용 정보 페이지</div>;
}
```

## 5. `useNavigate()` 훅: 프로그래밍 방식의 내비게이션

`useNavigate` 훅은 이벤트 핸들러나 `useEffect` 내부처럼, 특정 로직이 실행된 후에 프로그래밍 방식으로 페이지를 이동시켜야 할 때 사용합니다. 이 훅은 페이지를 이동시키는 `navigate` 함수를 반환합니다.

#### 다양한 페이지 이동 방법

`navigate` 함수는 다양한 방식으로 호출할 수 있습니다.

-   `navigate('/home')`: 지정된 경로로 이동합니다.
-   `navigate(-1)`: 한 페이지 뒤로 갑니다. (뒤로가기 버튼과 동일)
-   `navigate(1)`: 한 페이지 앞으로 갑니다. (앞으로가기 버튼과 동일)
-   `navigate('/login', { replace: true })`: 히스토리를 남기지 않고 페이지를 이동합니다.

#### 기본 구조 및 예시

```jsx
import { useNavigate } from "react-router-dom";

export default function LoginButton() {
  // 1. useNavigate 훅을 호출하여 navigate 함수를 가져옴
  const navigate = useNavigate();

  const handleLogin = () => {
    // 로그인 API 호출 및 성공 처리 로직...
    alert("로그인 성공! 홈으로 이동합니다.");

    // 2. 작업 완료 후 홈으로 이동
    navigate("/");
  };

  return (
    <div>
      <button onClick={handleLogin}>로그인</button>
      <button onClick={() => navigate(-1)}>뒤로가기</button>
    </div>
  );
}
```

## 6. 조건부 리다이렉트 고급 예제

페이지에 접근 권한이 있는지 확인하고, 권한이 없으면 다른 페이지로 보내는 로직은 매우 흔합니다. `<Navigate>`와 `useNavigate`를 사용하여 두 가지 방식으로 구현할 수 있습니다.

### 방법 1: `<Navigate>` 컴포넌트 사용 (권장)

컴포넌트가 렌더링되는 시점에 즉시 조건을 확인하고 리다이렉트할 수 있어 코드가 간결하고 직관적입니다.

```jsx
// pages/MyPage.jsx
import { Navigate } from 'react-router-dom';

function MyPage() {
  const { isLoggedIn } = useAuth(); // 가상의 인증 훅

  if (!isLoggedIn) {
    // 렌더링과 동시에 /login으로 리다이렉트
    return <Navigate to="/login" replace />;
  }

  return <h1>마이 페이지</h1>;
}
```

### 방법 2: `useEffect`와 `useNavigate` 사용

컴포넌트가 렌더링된 이후, 비동기 작업(예: API로 권한 확인)의 결과에 따라 페이지를 이동시켜야 할 때 유용합니다.

```jsx
// pages/AdminPage.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminPage() {
  const navigate = useNavigate();
  const { user, isLoading } = useUser(); // 가상의 유저 정보 훅

  useEffect(() => {
    // 로딩이 끝났는데, 유저 정보가 없거나 관리자가 아니면 홈으로 보냄
    if (!isLoading && (!user || !user.isAdmin)) {
      alert("권한이 없습니다.");
      navigate('/', { replace: true });
    }
  }, [user, isLoading, navigate]); // 의존성 배열에 사용된 모든 값을 포함

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return <h1>관리자 페이지</h1>;
}
```

## 7. 최종 요약

| 구분 | 추천 방법 | 주요 사용 사례 |
| :--- | :--- | :--- |
| **단순 링크** | `<Link>` | 사용자가 직접 클릭하는 메뉴, 버튼 등 일반적인 페이지 이동 |
| **활성 스타일** | `<NavLink>` | 현재 경로와 일치하는 내비게이션 메뉴에 특별한 스타일을 적용할 때 |
| **즉시 리다이렉트** | `<Navigate>` | 렌더링 되자마자 특정 조건에 따라 다른 페이지로 보내야 할 때 (예: 권한 확인) |
| **로직 후 이동** | `useNavigate()` | 폼 제출, API 요청 등 특정 작업이 끝난 후 프로그래밍 방식으로 이동시킬 때 |