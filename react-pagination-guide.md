# React 게시글 페이지네이션 구현 가이드

## 1. 개요

이 문서는 React를 사용하여 게시글 목록을 불러오고, 페이지네이션(Pagination) 기능을 구현하는 방법을 단계별로 안내합니다. `dummyjson.com`의 게시글 API를 활용하여 데이터를 동적으로 불러오고, 사용자가 게시글 목록을 탐색할 수 있는 UI를 구축합니다.

이 가이드를 통해 프레젠테이셔널 컴포넌트와 컨테이너 컴포넌트의 역할을 이해하고, `useState`와 `useEffect` 훅을 사용한 상태 관리 및 데이터 페칭 방법을 학습할 수 있습니다.

---

## 2. API 이해하기: `dummyjson.com`

페이지네이션 구현을 위해 `dummyjson.com`의 게시글 API를 사용합니다. 이 API는 `limit`과 `skip`이라는 두 가지 중요한 쿼리 파라미터를 제공합니다.

-   `limit`: 한 번의 요청으로 받아올 게시글의 수
-   `skip`: 받아올 게시글의 시작 위치(인덱스). 이 값을 조절하여 페이지를 이동합니다.
-   **총 게시글 수**: 251개

**API 요청 예시:**

-   **1~5번 게시글 요청**: `https://dummyjson.com/posts?limit=5&skip=0`
-   **6~10번 게시글 요청**: `https://dummyjson.com/posts?limit=5&skip=5`

---

## 3. 컴포넌트 구조

컴포넌트를 역할에 따라 **프레젠테이셔널 컴포넌트**와 **컨테이너 컴포넌트**로 분리하여 관리합니다.

### 3.1. 프레젠테이셔널 컴포넌트: `Post.jsx`

`Post.jsx`는 오직 데이터를 받아 화면에 표시하는 역할만 담당합니다. 자체적으로 상태를 가지지 않으며, `props`로 전달된 `post` 객체의 내용을 렌더링합니다.

```jsx
// src/components/Post.jsx

export default function Post({ post }) {
  return (
    <div className="border p-4 rounded-md shadow-sm bg-white">
      <h2 className="text-lg font-bold mb-2">
        No. {post.id} {post.title}
      </h2>
      <p className="text-gray-700 mb-3">{post.body}</p>
      <div className="flex gap-4 text-sm text-gray-500">
        <span>userId: {post.userId}</span>
        <span>views: {post.views}</span>
      </div>
    </div>
  );
}
```

### 3.2. 컨테이너 컴포넌트: `Container.jsx`

`Container.jsx`는 애플리케이션의 로직을 담당합니다. 상태 관리, API 데이터 페칭, 이벤트 핸들링 등 모든 "동작"을 이 컴포넌트에서 처리하고, 그 결과를 프레젠테이셔널 컴포넌트(`Post`)에 `props`로 전달합니다.

---

## 4. `Container.jsx` 구현하기

이제 페이지네이션 로직을 포함하여 `Container.jsx`를 완성해 보겠습니다.

### 4.1. 상태 및 상수 정의

필요한 상태와 상수를 정의합니다.

-   `posts`: API로부터 받아온 게시글 목록을 저장하는 상태
-   `skip`: 현재 페이지의 시작 인덱스를 관리하는 상태
-   `LIMIT`: 한 페이지에 표시할 게시글 수를 나타내는 상수
-   `TOTAL_POSTS`: 전체 게시글 수를 나타내는 상수

```jsx
import { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post";

export default function Container() {
  const [posts, setPosts] = useState([]);
  const [skip, setSkip] = useState(0);
  const LIMIT = 5;
  const TOTAL_POSTS = 251; // 전체 게시글 수

  // ... (이하 로직 구현)
}
```

### 4.2. 데이터 페칭 (`useEffect`)

`skip` 상태가 변경될 때마다 API를 다시 호출하여 새로운 게시글 목록을 가져옵니다. `useEffect`의 의존성 배열에 `skip`을 추가하여 이를 구현합니다.

```jsx
// ...

useEffect(() => {
  async function fetchPosts() {
    try {
      const response = await axios.get(
        `https://dummyjson.com/posts?limit=${LIMIT}&skip=${skip}`
      );
      setPosts(response.data.posts);
    } catch (error) {
      console.error("데이터를 불러오는 데 실패했습니다.", error);
    }
  }

  fetchPosts();
}, [skip]); // skip 상태가 변경될 때마다 이 효과를 재실행합니다.

// ...
```

### 4.3. 페이지네이션 핸들러 함수 작성

각 버튼 클릭 시 `skip` 상태를 변경할 핸들러 함수들을 작성합니다.

```jsx
// ...

// 처음으로
const handleFirst = () => {
  setSkip(0);
};

// 마지막으로
const handleLast = () => {
  // 마지막 페이지의 시작 skip 값을 계산합니다.
  const lastPageSkip = Math.floor((TOTAL_POSTS - 1) / LIMIT) * LIMIT;
  setSkip(lastPageSkip);
};

// 이전
const handlePrev = () => {
  // 현재 skip 값에서 LIMIT 만큼 빼되, 0 미만으로 내려가지 않도록 합니다.
  setSkip((prevSkip) => Math.max(prevSkip - LIMIT, 0));
};

// 다음
const handleNext = () => {
  // 다음 페이지가 마지막 페이지를 넘지 않는 경우에만 skip을 업데이트합니다.
  if (skip + LIMIT < TOTAL_POSTS) {
    setSkip((prevSkip) => prevSkip + LIMIT);
  }
};

// ...
```

### 4.4. 버튼에 핸들러 연결 및 비활성화 로직 추가

작성된 핸들러 함수를 각 버튼의 `onClick` 이벤트에 연결합니다. 또한, 현재 페이지 위치에 따라 불필요한 버튼은 `disabled` 속성을 통해 비활성화하여 사용자 경험을 개선합니다.

```jsx
// ...

return (
  <div className="p-4 max-w-4xl mx-auto bg-gray-50 min-h-screen">
    <div className="flex justify-center gap-2 mb-6">
      <button
        onClick={handleFirst}
        disabled={skip === 0}
        className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer disabled:bg-gray-300"
      >
        처음으로
      </button>
      <button
        onClick={handlePrev}
        disabled={skip === 0}
        className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer disabled:bg-blue-300"
      >
        이전
      </button>
      <button
        onClick={handleNext}
        disabled={skip + LIMIT >= TOTAL_POSTS}
        className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer disabled:bg-blue-300"
      >
        다음
      </button>
      <button
        onClick={handleLast}
        disabled={skip + LIMIT >= TOTAL_POSTS}
        className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer disabled:bg-gray-300"
      >
        마지막으로
      </button>
    </div>
    <div className="space-y-4">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  </div>
);

// ...
```

---

## 5. 최종 코드: `Container.jsx`

위에서 설명한 모든 로직을 통합한 최종 코드는 다음과 같습니다.

```jsx
// src/components/Container.jsx

import { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post";

export default function Container() {
  const [posts, setPosts] = useState([]);
  const [skip, setSkip] = useState(0);
  const LIMIT = 5;
  const TOTAL_POSTS = 251;

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get(
          `https://dummyjson.com/posts?limit=${LIMIT}&skip=${skip}`
        );
        setPosts(response.data.posts);
      } catch (error) {
        console.error("데이터를 불러오는 데 실패했습니다.", error);
      }
    }

    fetchPosts();
  }, [skip]);

  const handleFirst = () => {
    setSkip(0);
  };

  const handleLast = () => {
    const lastPageSkip = Math.floor((TOTAL_POSTS - 1) / LIMIT) * LIMIT;
    setSkip(lastPageSkip);
  };

  const handlePrev = () => {
    setSkip((prevSkip) => Math.max(prevSkip - LIMIT, 0));
  };

  const handleNext = () => {
    if (skip + LIMIT < TOTAL_POSTS) {
      setSkip((prevSkip) => prevSkip + LIMIT);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto bg-gray-50 min-h-screen">
      <div className="flex justify-center gap-2 mb-6">
        <button
          onClick={handleFirst}
          disabled={skip === 0}
          className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer disabled:bg-gray-300"
        >
          처음으로
        </button>
        <button
          onClick={handlePrev}
          disabled={skip === 0}
          className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer disabled:bg-blue-300"
        >
          이전
        </button>
        <button
          onClick={handleNext}
          disabled={skip + LIMIT >= TOTAL_POSTS}
          className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer disabled:bg-blue-300"
        >
          다음
        </button>
        <button
          onClick={handleLast}
          disabled={skip + LIMIT >= TOTAL_POSTS}
          className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer disabled:bg-gray-300"
        >
          마지막으로
        </button>
      </div>
      <div className="space-y-4">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
```

## 6. 결과

위 코드를 적용하면 아래와 같이 동작하는 페이지네이션 컴포넌트가 완성됩니다.

![페이지네이션 예시 이미지](httpse://i.imgur.com/example.png)
(Note: The original image link was broken, a placeholder is used here)
