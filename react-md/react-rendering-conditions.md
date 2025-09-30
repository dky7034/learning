# React 컴포넌트 리렌더링 완벽 가이드

이 문서는 React 컴포넌트가 언제, 왜 리렌더링(Re-rendering)되는지에 대한 핵심 원리를 설명합니다. 리렌더링의 트리거를 이해하는 것은 React 애플리케이션의 성능 최적화를 위한 첫걸음입니다.

## 목차

1.  [리렌더링(Re-rendering)이란?](#1-리렌더링re-rendering이란)
2.  [리렌더링의 주요 조건](#2-리렌더링의-주요-조건)
    - [1. 자신의 상태(State)가 변경될 때](#1-자신의-상태state가-변경될-때)
    - [2. 부모로부터 새로운 속성(Props)을 전달받을 때](#2-부모로부터-새로운-속성props을-전달받을-때)
    - [3. 부모 컴포넌트가 리렌더링될 때](#3-부모-컴포넌트가-리렌더링될-때)
    - [4. 구독 중인 컨텍스트(Context) 값이 변경될 때](#4-구독-중인-컨텍스트context-값이-변경될-때)
3.  [리렌더링과 실제 DOM 업데이트의 차이](#3-리렌더링과-실제-dom-업데이트의-차이)
4.  [불필요한 리렌더링을 방지하는 방법 (최적화)](#4-불필요한-리렌더링을-방지하는-방법-최적화)
    - [`React.memo`](#reactmemo)
    - [`useCallback`](#usecallback)
    - [`useMemo`](#usememo)
5.  [핵심 요약](#5-핵심-요약)

---

## 1. 리렌더링(Re-rendering)이란?

리렌더링은 컴포넌트의 현재 상태와 속성(Props)을 기반으로 **컴포넌트 함수를 다시 호출**하여 새로운 가상돔(Virtual DOM)을 생성하는 과정을 의미합니다. React는 이 새로운 가상돔과 이전 가상돔을 비교(Diffing)하여 변경된 부분만 실제 DOM에 반영합니다.

## 2. 리렌더링의 주요 조건

### 1. 자신의 상태(State)가 변경될 때

컴포넌트 내에서 `useState` 또는 `useReducer`를 통해 관리되는 상태(State)가 업데이트되면, 해당 컴포넌트는 리렌더링됩니다. 이는 컴포넌트 리렌더링의 가장 일반적인 원인입니다.

```jsx
import { useState } from "react";

function Counter() {
  // count 상태를 선언
  const [count, setCount] = useState(0);

  const handleClick = () => {
    // setCount 함수 호출로 상태가 변경되면 Counter 컴포넌트가 리렌더링됨
    setCount(count + 1);
  };

  console.log("Counter 컴포넌트가 렌더링되었습니다.");

  return <button onClick={handleClick}>Count: {count}</button>;
}
```

### 2. 부모로부터 새로운 속성(Props)을 전달받을 때

부모 컴포넌트로부터 전달받는 속성(Props)의 값이 변경되면, 자식 컴포넌트는 리렌더링됩니다. Props는 부모와 자식 간의 데이터 통신 방법이며, 이 값이 바뀌었다는 것은 자식 컴포넌트가 새로운 내용을 표시해야 함을 의미합니다.

```jsx
function Parent() {
  const [value, setValue] = useState(0);

  return (
    <div>
      <button onClick={() => setValue(value + 1)}>값 증가</button>
      {/* Parent의 value 상태가 변경되면 Child에게 새로운 props가 전달되어 리렌더링됨 */}
      <Child value={value} />
    </div>
  );
}

function Child({ value }) {
  console.log(`Child 컴포넌트 렌더링 (props.value: ${value})`);
  return <p>부모가 전달한 값: {value}</p>;
}
```

### 3. 부모 컴포넌트가 리렌더링될 때

React의 기본 동작 원칙 중 하나로, **부모 컴포넌트가 리렌더링되면 그 자식 컴포넌트들도 기본적으로 모두 리렌더링됩니다.** 이는 자식 컴포넌트의 props가 변경되었는지 여부와 관계없이 발생합니다.

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  console.log("Parent 컴포넌트 렌더링");

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>부모 상태 변경</button>
      {/* Parent가 리렌더링되면 Child도 함께 리렌더링됨 */}
      <Child />
    </div>
  );
}

function Child() {
  console.log("Child 컴포넌트 렌더링");
  return <p>나는 자식 컴포넌트!</p>;
}
```

> **최적화**: 이 기본 동작으로 인한 불필요한 리렌더링을 막기 위해 `React.memo`를 사용할 수 있습니다. (아래 [최적화 섹션](#reactmemo)에서 자세히 설명)

### 4. 구독 중인 컨텍스트(Context) 값이 변경될 때

`useContext` 훅을 사용하여 특정 컨텍스트(Context)를 구독하고 있는 컴포넌트는, 해당 컨텍스트의 `Provider`가 제공하는 값이 변경될 때마다 리렌더링됩니다.

```jsx
const MyContext = React.createContext(null);

function App() {
  const [user, setUser] = useState("홍길동");

  return (
    // Provider의 value가 변경되면...
    <MyContext.Provider value={user}>
      <Profile />
    </MyContext.Provider>
  );
}

function Profile() {
  // Context를 구독하고 있으므로 Provider의 value가 바뀔 때마다 리렌더링됨
  const user = useContext(MyContext);
  console.log("Profile 컴포넌트 렌더링");
  return <p>안녕하세요, {user}님!</p>;
}
```

## 3. 리렌더링과 실제 DOM 업데이트의 차이

- **리렌더링**: 컴포넌트 함수를 다시 호출하고, 새로운 가상돔을 생성하는 **메모리상의 과정**입니다.
- **DOM 업데이트**: 리렌더링 후 생성된 새로운 가상돔과 이전 가상돔을 비교하여, **실제로 변경이 필요한 부분만 실제 DOM에 적용**하는 과정입니다.

리렌더링이 발생했다고 해서 항상 실제 DOM이 변경되는 것은 아닙니다. React는 매우 효율적으로 이 비교 과정을 수행하여 최소한의 DOM 조작만을 실행합니다.

## 4. 불필요한 리렌더링을 방지하는 방법 (최적화)

### `React.memo`

`React.memo`는 컴포넌트를 감싸는 고차 컴포넌트(HOC)입니다. 컴포넌트가 받는 **props가 이전과 동일하다면, 부모가 리렌더링되더라도 자신은 리렌더링을 건너뛰도록(Memoization)** 만듭니다.

```jsx
const MemoizedChild = React.memo(function Child({ value }) {
  console.log("Child 렌더링");
  return <p>전달된 값: {value}</p>;
});
```

### `useCallback`

`useCallback`은 **함수를 메모이제이션**하는 훅입니다. 부모가 자식에게 함수를 props로 전달할 때, 부모가 리렌더링될 때마다 새로운 함수가 생성되어 `React.memo`를 무력화시키는 것을 방지합니다.

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  // count가 변경될 때만 새로운 함수를 생성
  const handleClick = useCallback(() => {
    console.log("버튼 클릭!");
  }, []); // 의존성 배열이 비어있으므로, 컴포넌트가 처음 렌더링될 때만 함수가 생성됨

  return <MemoizedChild onClick={handleClick} />;
}
```

### `useMemo`

`useMemo`는 **연산 비용이 큰 계산 결과값을 메모이제이션**하는 훅입니다. 의존성 배열의 값이 변경될 때만 계산을 다시 수행하므로, 매 렌더링마다 반복되는 복잡한 연산을 방지할 수 있습니다.

```jsx
function Calculator({ a, b }) {
  // a 또는 b가 변경될 때만 expensiveCalculation 함수가 실행됨
  const result = useMemo(() => expensiveCalculation(a, b), [a, b]);

  return <p>결과: {result}</p>;
}
```

## 5. 핵심 요약

✅ **React 컴포넌트는 다음 조건에서 리렌더링됩니다:**

1.  **자신의 `state`가 변경될 때**
2.  **부모로부터 받은 `props`가 변경될 때**
3.  **부모 컴포넌트가 리렌더링될 때 (기본 동작)**
4.  **구독 중인 `context`의 값이 변경될 때**

이러한 리렌더링 동작을 이해하고 `React.memo`, `useCallback`, `useMemo`와 같은 최적화 도구를 적절히 활용하면, 가볍고 빠른 React 애플리케이션을 만들 수 있습니다.
