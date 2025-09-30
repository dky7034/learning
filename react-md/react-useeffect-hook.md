# React useEffect 훅(Hook) 완벽 가이드

## 📝 개요

이 문서는 React의 가장 중요한 훅 중 하나인 **`useEffect`**에 대해 심도 있게 다룹니다. `useEffect`는 React 컴포넌트가 외부 시스템과 상호작용(Side Effect, 부수 효과)할 수 있게 해주는 강력한 도구입니다. 이 문서를 통해 다음 내용을 학습할 수 있습니다.

- Side Effect의 개념과 `useEffect`의 필요성
- 의존성 배열(Dependency Array)을 활용한 `useEffect`의 세 가지 동작 방식
- `useEffect` 사용 시 반드시 지켜야 할 규칙과 흔한 실수들
- 데이터 패칭(Data Fetching)과 같은 실제 활용 사례

---

### 사전 학습

이 문서를 더 잘 이해하기 위해 아래 주제에 대한 기본 지식이 필요합니다.

- [React 컴포넌트와 렌더링 과정](./react-rendering-process.md)
- [useState 훅 기본 사용법](./react-state-management.md)
- JavaScript 비동기 처리 (Promise, async/await)

---

## 1. Side Effect와 useEffect란?

**Side Effect(부수 효과)**란 React 컴포넌트의 주된 역할인 'UI 렌더링'과 직접적인 관련이 없는 모든 작업을 의미합니다. 대표적인 예시는 다음과 같습니다.

- 서버로부터 데이터 가져오기 (Data Fetching)
- 타이머 설정 및 해제 (`setTimeout`, `setInterval`)
- DOM 직접 조작 (권장되지는 않음)
- 웹 스토리지(`localStorage`, `sessionStorage`) 접근

이러한 작업들은 컴포넌트가 렌더링되는 도중에 실행되면 예측 불가능한 문제를 일으킬 수 있습니다. **`useEffect`**는 이러한 Side Effect들을 렌더링이 완료된 후에 안전하게 실행할 수 있도록 분리해주는 훅(Hook)입니다.

### 기본 구조

```jsx
import { useEffect } from "react";

useEffect(
  () => {
    // Side Effect를 수행하는 콜백 함수 (Effect 함수)
  },
  [] // 의존성 배열 (Dependency Array)
);
```

## 2. 의존성 배열(Dependency Array)의 세 가지 사용법

`useEffect`의 동작 방식을 결정하는 가장 중요한 요소는 두 번째 인자인 **의존성 배열**입니다.

### 1) 의존성 배열을 생략하는 경우 (매 렌더링마다 실행)

```jsx
useEffect(() => {
  console.log("컴포넌트가 렌더링될 때마다 실행됩니다.");
}); // 의존성 배열 없음
```

의존성 배열을 아예 전달하지 않으면, 컴포넌트가 **최초 렌더링될 때와 리렌더링될 때마다** 콜백 함수가 실행됩니다.

> **⚠️ 주의!**
> 이 방식은 `useEffect` 내에서 상태를 업데이트할 경우 **무한 루프**를 유발하기 매우 쉽기 때문에 실제 애플리케이션에서는 거의 사용되지 않습니다. 항상 의존성 배열을 명시하는 습관을 들이는 것이 좋습니다.

### 2) 빈 배열(`[]`)을 전달하는 경우 (최초 1회만 실행)

```jsx
useEffect(() => {
  console.log("컴포넌트가 최초 렌더링(마운트)될 때 한 번만 실행됩니다.");
}, []); // 빈 배열
```

의존성 배열을 빈 배열로 전달하면, 콜백 함수는 **컴포넌트가 처음 화면에 렌더링될 때 단 한 번만** 실행됩니다. 주로 최초 데이터 로딩, 타이머 설정 등 초기화 작업에 사용됩니다.

### 3) 배열에 의존성을 전달하는 경우 (특정 값이 변할 때만 실행)

```jsx
const [count, setCount] = useState(0);

useEffect(() => {
  console.log(`count 값이 ${count}(으)로 변경되었습니다.`);
}, [count]); // [count] 의존성 배열
```

의존성 배열에 특정 값(주로 `state`나 `props`)을 전달하면, 콜백 함수는 **최초 렌더링 시 한 번 실행**되고, 그 이후에는 **배열 안의 값이 변경될 때마다** 다시 실행됩니다. 이는 `useEffect`의 가장 일반적인 사용 방식입니다.

## 3. useEffect 사용 시 주의사항 및 규칙

### 1) `useEffect`의 콜백 함수에는 `async`를 직접 붙일 수 없습니다

`useEffect`의 콜백 함수는 '정리(cleanup) 함수'를 반환할 수 있는데, `async` 함수는 항상 Promise를 반환하므로 구조적으로 맞지 않습니다.

**❌ 잘못된 사용법**

```jsx
useEffect(async () => {
  const data = await fetchData();
  setData(data);
}, []);
```

**✅ 올바른 사용법**
콜백 함수 **내부**에 별도의 `async` 함수를 선언하고 호출해야 합니다.

```jsx
useEffect(() => {
  // 내부에 async 함수를 선언
  async function loadData() {
    const data = await fetchData();
    setData(data);
  }
  // 선언한 함수를 호출
  loadData();
}, []);
```

### 2) 의존성 배열을 잘못 사용하면 무한 루프에 빠집니다

`useEffect` 내에서 상태를 변경하는데, 그 상태가 다시 의존성 배열에 포함되어 있다면 무한 루프가 발생합니다.

```jsx
// ❌ 무한 루프 예시
const [posts, setPosts] = useState([]);

useEffect(() => {
  async function fetchData() {
    const response = await axios.get("...");
    // 1. API 호출 후 posts 상태 변경
    setPosts(response.data.posts);
  }
  fetchData();
  // 2. posts가 변경되었으므로 useEffect가 다시 실행되어 1번으로 돌아감 (무한 반복)
}, [posts]);
```

이 경우, 데이터를 한 번만 불러오는 것이 목적이므로 의존성 배열을 `[]`로 설정해야 합니다.

### 3) 콜백 함수에 사용되는 모든 `state`와 `props`는 의존성 배열에 포함해야 합니다

`useEffect` 콜백 함수 내부에서 참조하는 모든 `state`와 `props`는 의존성 배열에 포함하는 것이 원칙입니다. 이를 통해 React는 항상 최신 상태의 값을 기준으로 Side Effect를 실행할 수 있습니다.

**❌ 잘못된 사용법 (Stale State 문제 발생)**

```jsx
// isAdmin 또는 isLogin이 바뀌어도 useEffect가 다시 실행되지 않음
// 따라서 userAuth는 항상 초기 상태(isAdmin=false, isLogin=false)를 기준으로 계산됨
useEffect(() => {
  if (isAdmin && isLogin) {
    setUserAuth("관리자");
  } else {
    setUserAuth("일반 사용자");
  }
}, []); // 의존성 누락
```

**✅ 올바른 사용법**

```jsx
useEffect(() => {
  if (isAdmin && isLogin) {
    setUserAuth("관리자");
  } else {
    setUserAuth("일반 사용자");
  }
  // 콜백 함수에서 사용된 isAdmin과 isLogin을 의존성 배열에 추가
}, [isAdmin, isLogin]);
```

## 4. 활용 사례: 데이터 패칭과 컨테이너/프레젠테이셔널 패턴

`useEffect`는 서버로부터 데이터를 가져오는 작업에 필수적으로 사용됩니다. 이때 코드의 역할을 명확히 분리하기 위해 **컨테이너/프레젠테이셔널 패턴**을 사용하면 좋습니다.

- **컨테이너 컴포넌트**: 데이터 로직을 담당합니다. `useEffect`를 사용해 데이터를 가져오고, 상태를 관리하며, 이 데이터를 프레젠테이셔널 컴포넌트에 `props`로 전달합니다.
- **프레젠테이셔널 컴포넌트**: UI 표시를 담당합니다. `props`로 받은 데이터를 화면에 어떻게 보여줄지에만 집중합니다.

#### 컨테이너 컴포넌트 예시 (`PostList.jsx`)

```jsx
import { useEffect, useState } from "react";
import axios from "axios";
import Post from "./Post"; // 프레젠테이셔널 컴포넌트

// 데이터 로직을 담당
export default function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("https://dummyjson.com/posts");
      setPosts(response.data.posts);
    }
    fetchData();
  }, []);

  return (
    <ul>
      {posts.map((post) => (
        // 데이터를 화면에 그리는 역할은 Post 컴포넌트에 위임
        <Post key={post.id} post={post} />
      ))}
    </ul>
  );
}
```

#### 프레젠테이셔널 컴포넌트 예시 (`Post.jsx`)

```jsx
// UI 표시만 담당
export default function Post({ post }) {
  return (
    <li>
      <strong>{post.id}.</strong> {post.title}
    </li>
  );
}
```

## 5. 요약

- `useEffect`는 렌더링과 관련 없는 **Side Effect**를 처리하기 위한 훅입니다.
- **의존성 배열**은 `useEffect`가 언제 실행될지를 제어하는 핵심적인 역할을 합니다.
  - `생략`: 매 렌더링 시 실행 (거의 사용 안 함)
  - `[]`: 최초 렌더링 시 1회만 실행
  - `[deps]`: 최초 렌더링 시 + `deps`가 변경될 때마다 실행
- `useEffect`의 콜백 함수는 `async`로 직접 선언할 수 없으며, 내부에 `async` 함수를 만들어 호출해야 합니다.
- 콜백 함수에서 사용하는 모든 `state`와 `props`는 의존성 배열에 포함하여 항상 최신 값을 참조하도록 해야 합니다.
