# React 조건부 렌더링 (Conditional Rendering)

## 📝 개요

이 문서는 React에서 특정 조건에 따라 UI를 다르게 보여주는 **조건부 렌더링(Conditional Rendering)** 기법을 설명합니다. 문서를 통해 다음 내용을 학습할 수 있습니다.

- 조건부 렌더링의 개념과 필요성
- JSX에서 조건에 따라 요소를 다르게 렌더링하는 방법
- **삼항 연산자**와 **논리 연산자(&&)**를 활용한 조건부 렌더링

---

### 사전 학습

이 문서를 더 잘 이해하기 위해 아래 주제에 대한 기본 지식이 필요합니다.

- [React JSX](./react-jsx.md)
- [React 컴포넌트](./react-components.md)
- JavaScript 삼항 연산자와 논리 연산자

---

## 1. 조건부 렌더링이란?

**조건부 렌더링**은 말 그대로, **주어진 조건에 따라 다른 화면을 사용자에게 보여주는 방법**입니다.

React에서는 주로 **삼항 연산자**와 **논리 연산자(&&)**를 사용하여 이 기능을 구현합니다. 로그인/로그아웃 상태 표시, 특정 조건에서의 경고 메시지, 데이터 로딩 중 스피너 표시 등 UI를 동적으로 제어해야 하는 다양한 상황에서 필수적으로 사용됩니다.

## 2. JSX에서 조건을 다루는 방법

### 1) 삼항 연산자 (`? :`)

`if-else` 문을 한 줄로 축약한 것과 같은 역할을 합니다. 조건의 참/거짓 결과에 따라 두 가지 옵션 중 하나를 선택하여 보여줍니다.

#### 기본 구조
```javascript
조건 ? '참일 때 선택될 값' : '거짓일 때 선택될 값'
```

> **💡 읽는 방법**
> 1.  `조건` : "이 조건이 참인가요?"
> 2.  `?` : "만약 참이라면,"
> 3.  `'참일 때 값'` : "이 값을 선택하고,"
> 4.  `:` : "만약 거짓이라면,"
> 5.  `'거짓일 때 값'` : "이 값을 선택해요."

### 2) 논리 연산자 (`&&`)

`&&` 연산자는 왼쪽 조건이 `true`일 경우에만 오른쪽 값을 반환합니다. 조건이 `false`이면 아무것도 반환하지 않습니다.

#### 기본 구조
```javascript
조건 && '조건이 참일 때만 보여줄 값'
```

> **💡 동작 원리**
> `&&` 연산자는 "만약 ~라면, ~를 보여줘" 라는 의미로 해석할 수 있습니다.
> - 왼쪽 조건이 `true`이면 → 오른쪽 값을 보여줍니다.
> - 왼쪽 조건이 `false`이면 → 연산을 멈추고 아무것도 보여주지 않습니다.

## 3. 예제 코드로 배우기

### 디렉토리 구조
```plain
📁 src/
└── 📁 components/
    └── 📁 ConditionalRendering/
        ├── ⚛️ RenderingContainer.jsx
        ├── ⚛️ LoginStatus.jsx
        └── ⚛️ AdminLink.jsx
```

### 1) 삼항 연산자 활용: 로그인 상태 표시

**언제 사용하나요?**
로그인/로그아웃, 로딩/완료, 활성/비활성처럼 **두 가지 상태 중 하나를 반드시 보여줘야 할 때** 매우 유용합니다.

#### `LoginStatus.jsx`
```jsx
export default function LoginStatus({ isLogin }) {
  return (
    <>
      <h1>로그인 상태: {isLogin ? "로그인" : "로그아웃"}</h1>
      <p>{isLogin ? "환영합니다!" : "로그인 해주세요."}</p>
      <button>{isLogin ? "로그아웃" : "로그인"}</button>
    </>
  );
}
```

#### `RenderingContainer.jsx`
```jsx
import LoginStatus from "./components/ConditionalRendering/LoginStatus";

export default function RenderingContainer() {
  return (
    <>
      <LoginStatus isLogin={false} />
      <hr />
      <LoginStatus isLogin={true} />
    </>
  );
}
```

### 2) 논리 연산자(`&&`) 활용: 관리자 전용 링크

**언제 사용하나요?**
경고 메시지, 새 알림 배지, 특정 권한을 가진 사용자에게만 보이는 버튼 등 **조건이 참일 때만 특정 요소를 보여주고 싶을 때** 적합합니다.

#### `AdminLink.jsx`
```jsx
export default function AdminLink({ isAdmin }) {
  return (
    <div>
      <p>현재 권한 : {isAdmin ? "관리자" : "일반 사용자"}</p>
      {isAdmin && <a href="#">관리 페이지 이동</a>}
    </div>
  );
}
```

#### `RenderingContainer.jsx`
```jsx
import AdminLink from "./components/ConditionalRendering/AdminLink";

export default function RenderingContainer() {
  return (
    <>
      <AdminLink isAdmin={false} />
      <hr />
      <AdminLink isAdmin={true} />
    </>
  );
}
```

## 4. 최종 정리: 언제 무엇을 써야 할까?

| 구분 | 삼항 연산자 (`? :`) | 논리 연산자 (`&&`) |
| :--- | :--- | :--- |
| **의미** | "A라면 B, 아니라면 C" | "A라면 B" |
| **결과** | 참/거짓 모두 렌더링 결과가 있음 | 참일 때만 렌더링 결과가 있음 |
| **적합한 경우** | - 로그인/로그아웃 상태<br>- 활성/비활성 토글<br>- 두 가지 옵션 중 하나를 반드시 보여줘야 할 때 | - 경고 메시지 표시<br>- 새 알림 배지<br>- 조건이 맞을 때만 요소를 추가로 보여줄 때 |
