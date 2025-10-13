# React Router 동적 라우팅: useParams와 useSearchParams 활용하기

## 📝 개요

이 문서는 React Router를 사용하여 URL을 통해 동적인 데이터를 전달하고 사용하는 두 가지 주요 방법, **경로 파라미터(Path Parameters)**와 **쿼리 파라미터(Query Parameters)**에 대해 상세히 설명합니다. 이 가이드를 통해 다음 내용을 학습할 수 있습니다.

- `useParams` 훅을 사용한 경로 파라미터 추출 및 활용
- `useSearchParams` 훅을 사용한 쿼리 파라미터 조회 및 변경
- 각 파라미터 방식의 사용 사례와 적절한 선택 기준

---

### 사전 학습

이 문서를 더 잘 이해하기 위해 아래 주제에 대한 기본 지식이 필요합니다.

- [React Router 시작하기](./react-router-guide.md)
- [React useEffect 훅](./react-useeffect-hook.md)

---

## 1. 경로 파라미터 (Path Parameters)와 `useParams`

**경로 파라미터**는 URL 경로의 일부를 변수처럼 사용하여 특정 리소스(예: 특정 게시글, 특정 사용자 프로필)를 식별하는 방법입니다. 예를 들어 `/posts/1`, `/posts/2` 와 같이 동적으로 변하는 ID 값을 처리할 때 사용됩니다.

### 1) 라우터 설정

`createBrowserRouter`에서 경로를 설정할 때, 동적으로 변할 부분에 `:{파라미터명}` 구문을 사용합니다.

```javascript
// router/index.js
import PostDetail from "../pages/PostDetail";

const router = createBrowserRouter([
  {
    // :postId 부분이 동적인 경로 파라미터가 됩니다.
    path: "/posts/:postId",
    element: <PostDetail />,
  },
]);
```

### 2) 파라미터 값 전달

`<Link>` 컴포넌트나 `navigate` 함수를 사용하여 동적 경로로 이동할 수 있습니다.

```jsx
// <Link> 컴포넌트 사용
<Link to="/posts/1">1번 게시글</Link>
<Link to="/posts/2">2번 게시글</Link>

// useNavigate 훅 사용
const navigate = useNavigate();
navigate("/posts/1");
```

### 3) `useParams` 훅으로 값 추출하기

`useParams` 훅은 URL의 경로 파라미터들을 키-값 형태의 객체로 반환합니다. 이 객체를 구조 분해하여 필요한 값을 쉽게 추출할 수 있습니다.

```jsx
// URL이 "/posts/123" 일 경우
import { useParams } from "react-router-dom";

function PostDetail() {
  // params는 { postId: "123" } 객체가 됩니다.
  const params = useParams();
  const postId = params.postId;

  // 또는 구조 분해 할당 사용
  const { postId } = useParams();

  return <div>게시글 ID: {postId}</div>;
}
```

### 4) 경로 파라미터 전체 예제

게시글 목록에서 특정 게시글을 클릭하면 해당 상세 페이지로 이동하는 예제입니다.

**`router/index.js`**
'''javascript
import { createBrowserRouter } from "react-router-dom";
import PostList from "../pages/PostList";
import PostDetail from "../pages/PostDetail";

const router = createBrowserRouter([
{ path: "/posts", element: <PostList /> },
{ path: "/posts/:postId", element: <PostDetail /> },
]);

export default router;
'''

**`pages/PostList.jsx`**
'''jsx
import { Link } from "react-router-dom";

export default function PostList() {
const posts = [{ id: 1 }, { id: 2 }, { id: 3 }]; // 예시 데이터
return (
<div>
<h1>게시글 목록</h1>
<ul>
{posts.map((post) => (
<li key={post.id}>
<Link to={`/posts/${post.id}`}>{post.id}번 게시글 상세 페이지</Link>
</li>
))}
</ul>
</div>
);
}
'''

**`pages/PostDetail.jsx`**
'''jsx
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function PostDetail() {
const { postId } = useParams(); // URL에서 postId 추출
const [post, setPost] = useState(null);

useEffect(() => {
const fetchPost = async () => {
// 추출한 postId를 사용해 API 요청
const res = await axios(`https://dummyjson.com/posts/${postId}`);
setPost(res.data);
};
fetchPost();
}, [postId]); // postId가 변경될 때마다 데이터를 다시 가져옴

if (!post) return <div>로딩 중...</div>;

return (
<div>
<h1>{post.title}</h1>
<p>{post.body}</p>
<Link to="/posts">목록으로 돌아가기</Link>
</div>
);
}
'''

## 2. 쿼리 파라미터 (Query Parameters)와 `useSearchParams`

**쿼리 파라미터**(쿼리 스트링)는 URL 경로 뒤에 `?`로 시작하여 `key=value` 형태로 데이터를 전달하는 방식입니다. 여러 개일 경우 `&`로 연결합니다. 주로 데이터의 **정렬(sorting), 필터링(filtering), 페이지네이션(pagination)** 등 부가적인 옵션을 표현할 때 사용됩니다.

### 1) `useSearchParams` 훅

`useSearchParams` 훅은 쿼리 파라미터를 읽고 수정할 수 있는 기능을 제공합니다. `useState`와 유사하게, 현재 쿼리 파라미터를 나타내는 객체와 이를 수정하는 함수를 배열 형태로 반환합니다.

```jsx
import { useSearchParams } from "react-router-dom";

// searchParams: 쿼리 파라미터를 읽는 용도
// setSearchParams: 쿼리 파라미터를 변경하는 용도
const [searchParams, setSearchParams] = useSearchParams();
```

### 2) 쿼리 파라미터 값 읽기

`searchParams.get('key')` 메서드를 사용하여 특정 키에 해당하는 값을 읽을 수 있습니다.

```jsx
// URL: /products?sort=price&page=2

const sort = searchParams.get("sort"); // "price"
const page = searchParams.get("page"); // "2"
const filter = searchParams.get("filter"); // null (존재하지 않는 키)
```

### 3) 쿼리 파라미터 값 변경

`setSearchParams` 함수에 객체를 전달하여 쿼리 파라미터를 변경할 수 있습니다. 이 함수가 호출되면 URL이 변경되고 컴포넌트가 리렌더링됩니다.

```jsx
// URL을 /products?sort=price&order=asc 로 변경
setSearchParams({ sort: "price", order: "asc" });

// URL을 /products 로 변경 (모든 쿼리 파라미터 제거)
setSearchParams({});
```

### 4) 쿼리 파라미터 전체 예제

상품 목록을 가격순, 이름순으로 정렬하는 기능 예제입니다.

**`pages/ProductList.jsx`**
'''jsx
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductList() {
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(false);
const [searchParams, setSearchParams] = useSearchParams();

// URL의 쿼리 파라미터 또는 기본값으로 정렬 기준 설정
const sortBy = searchParams.get("sortBy") ?? "id";
const order = searchParams.get("order") ?? "asc";

useEffect(() => {
const fetchProducts = async () => {
setLoading(true);
const res = await axios(
`https://dummyjson.com/products?sortBy=${sortBy}&order=${order}`
);
setProducts(res.data.products);
setLoading(false);
};
fetchProducts();
}, [searchParams]); // searchParams가 변경될 때마다 API를 다시 호출

// 정렬 버튼 클릭 시 URL의 쿼리 파라미터를 변경하는 함수
function handleSortChange(newSortBy, newOrder) {
setSearchParams({ sortBy: newSortBy, order: newOrder });
}

return (
<div>
<h1>상품 목록</h1>
<div>
<button onClick={() => handleSortChange("price", "asc")}>가격 낮은 순</button>
<button onClick={() => handleSortChange("price", "desc")}>가격 높은 순</button>
<button onClick={() => handleSortChange("title", "asc")}>이름 순</button>
</div>
{loading ? (
<div>로딩 중...</div>
) : (
<ul>
{products.map((p) => (
<li key={p.id}>{p.title} (${p.price})</li>
))}
</ul>
)}
</div>
);
}
'''

## 3. 경로 파라미터 vs. 쿼리 파라미터

| 구분          | 경로 파라미터 (Path Parameters)                        | 쿼리 파라미터 (Query Parameters)                                  |
| :------------ | :----------------------------------------------------- | :---------------------------------------------------------------- |
| **URL 형태**  | `/posts/123`                                           | `/products?sort=price&page=2`                                     |
| **주요 용도** | 특정 리소스(데이터)를 **고유하게 식별**할 때           | 데이터 **정렬, 필터링, 검색, 페이지네이션** 등 부가적인 옵션 전달 |
| **필수 여부** | 일반적으로 **필수**. 없으면 해당 경로에 매칭되지 않음. | 일반적으로 **선택**. 없어도 페이지는 렌더링됨.                    |
| **React 훅**  | `useParams`                                            | `useSearchParams`                                                 |
| **값 변경**   | 새로운 경로로 이동해야 함 (`<Link>`, `navigate`)       | `setSearchParams` 함수로 URL을 업데이트하고 리렌더링.             |
| **예시**      | 게시글 ID, 사용자 아이디, 상품 번호 등                 | `?sort=asc`, `?category=electronics`, `?q=react`                  |
