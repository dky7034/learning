# React: JSX 상세 가이드

## 📝 개요

이 문서는 React의 핵심 문법인 **JSX(JavaScript XML)**를 깊이 있게 다룹니다. JSX의 기본 개념부터 반드시 알아야 할 문법 규칙, 그리고 JavaScript 표현식을 통합하는 보간법(Interpolation)까지 상세히 설명합니다.

- JSX가 DOM API에 비해 가지는 장점
- JSX 작성 시 지켜야 할 4가지 핵심 규칙
- JSX 내부에 변수, 표현식, 함수 등을 동적으로 삽입하는 방법

---

### 사전 학습

이 문서를 더 잘 이해하기 위해 아래 주제에 대한 기본 지식이 필요합니다.

- [React 기본 개념](./react-introduction.md)
- JavaScript 기본 문법 (변수, 함수, 객체, 배열, 연산자 등)
- HTML 구조에 대한 이해

---

## 1. JSX(JavaScript XML)란?

**JSX**는 JavaScript 코드 내에서 UI 구조를 직관적으로 표현할 수 있게 해주는 **JavaScript의 확장 문법**입니다. 복잡하고 긴 DOM API 코드를 사용하는 대신, HTML과 유사한 친숙한 형태로 UI를 작성할 수 있어 코드의 가독성과 생산성을 크게 높여줍니다.

#### DOM API vs. JSX 비교

**DOM API 코드**

```javascript
const element = document.createElement("h1");
element.className = "greeting";
element.textContent = "Hello, World!";
document.getElementById("root").appendChild(element);
```

**JSX 코드**

```jsx
const element = <h1 className="greeting">Hello, World!</h1>;
ReactDOM.createRoot(document.getElementById("root")).render(element);
```

---

## 2. JSX 핵심 문법 규칙

### 규칙 1: 반드시 하나의 최상위 태그로 감싸야 합니다.

React 컴포넌트는 여러 개의 JSX 요소를 동시에 반환할 수 없습니다. 모든 요소는 반드시 하나의 부모 태그로 감싸져야 합니다. 불필요한 `<div>` 태그를 피하고 싶을 때는 **Fragment 태그(`<>...</>`)**를 사용할 수 있습니다.

**❌ 잘못된 코드 (Error)**

```jsx
// 에러: 인접한 JSX 요소들은 반드시 하나의 부모 태그로 감싸져야 합니다.
const element = (
  <h1>Title</h1>
  <p>Paragraph</p>
);
```

**✅ 올바른 코드 (Fragment 사용)**

```jsx
const element = (
  <>
    <h1>Title</h1>
    <p>Paragraph</p>
  </>
);
```

### 규칙 2: 모든 태그는 반드시 닫아야 합니다.

HTML과 달리 JSX는 모든 태그를 명시적으로 닫아야 합니다. 내용이 없는 단일 태그(Self-closing tag)는 끝에 `/`를 붙여주어야 합니다.

**❌ 잘못된 코드**

```jsx
const element = (
  <div>
    <h1>Title
    <p>Content
    <br>
    <input type="text">
  </div>
);
```

**✅ 올바른 코드**

```jsx
const element = (
  <div>
    <h1>Title</h1>
    <p>Content</p>
    <br />
    <input type="text" />
  </div>
);
```

### 규칙 3: 속성명은 대부분 카멜케이스(camelCase)로 작성합니다.

JSX에서 HTML 속성을 사용할 때는 JavaScript 문법과의 충돌을 피하기 위해 대부분 카멜케이스 표기법을 따릅니다.

- `class` → `className` (가장 흔한 예시, `class`는 JavaScript의 예약어)
- `onclick` → `onClick`
- `tabindex` → `tabIndex`
- `readonly` → `readOnly`

> **💡 예외: `data-*` 와 `aria-*` 속성** > `data-testid` 같은 `data-*` 속성과 `aria-label` 같은 `aria-*` 웹 접근성 속성은 카멜케이스로 변환하지 않고 원래의 하이픈(-) 표기법을 그대로 사용합니다.

```jsx
function Component() {
  const handleClick = () => {
    console.log("Button clicked!");
  };

  return (
    <div className="container">
      <button
        onClick={handleClick} // 카멜케이스
        aria-label="Close button" // 예외: 하이픈 유지
        data-testid="close-btn" // 예외: 하이픈 유지
      >
        Click Me
      </button>
      <input type="text" readOnly={true} />
    </div>
  );
}
```

### 규칙 4: `style` 속성은 객체 형태로 작성합니다.

인라인 스타일을 적용할 때 `style` 속성에는 문자열이 아닌 JavaScript 객체를 전달해야 합니다. CSS 속성명 또한 카멜케이스로 작성합니다.

- **`style={{...}}`**: 바깥쪽 중괄호는 JSX의 JavaScript 표현식 삽입을 의미하고, 안쪽 중괄호는 스타일을 정의하는 JavaScript 객체를 의미합니다.

```jsx
function StyledComponent() {
  return (
    <div
      style={{
        // background-color → backgroundColor
        backgroundColor: "#f0f0f0",
        // font-size → fontSize
        fontSize: "20px",
        // border-radius → borderRadius
        borderRadius: "8px",
        padding: "16px",
      }}
    >
      Styled Div
    </div>
  );
}
```

---

## 3. JSX 보간법 (Interpolation)

**보간법**은 중괄호 `{}`를 사용하여 JSX 코드 내부에 JavaScript 변수나 표현식의 결과값을 동적으로 삽입하는 방법입니다.

### 변수 및 표현식 삽입

```jsx
const name = "김철수";
const age = 25;

const element = (
  <>
    <h1>안녕하세요, {name}님!</h1>
    <p>내년 나이는 {age + 1}세 입니다.</p>
    <p>성인 여부: {age >= 18 ? "성인" : "미성년자"}</p>
  </>
);
```

### 함수 호출 결과 삽입

```jsx
function getGreeting(userName) {
  return `Welcome, ${userName}!`;
}

const element = <h1>{getGreeting("React Developer")}</h1>;
```

### 객체 속성 및 배열 요소 접근

```jsx
const user = {
  name: "이영희",
  avatarUrl: "/path/to/avatar.jpg",
};

const colors = ["빨강", "파랑", "초록"];

const element = (
  <>
    <h2>{user.name}</h2>
    <img src={user.avatarUrl} alt={user.name} />
    <p>가장 좋아하는 색: {colors[0]}</p>
  </>
);
```

### ⚠️ 보간법 주의사항

- **`if`, `for`와 같은 문(Statement)은 사용할 수 없습니다**: 오직 값으로 평가되는 표현식(Expression)만 가능합니다. (삼항 연산자나 배열의 `map` 메서드는 사용 가능)

- **객체는 직접 렌더링할 수 없습니다**: `{user}`와 같이 객체 자체를 렌더링하면 `Objects are not valid as a React child` 오류가 발생합니다. 반드시 `{user.name}`처럼 특정 속성에 접근해야 합니다.

- **배열은 직접 렌더링이 가능합니다**: React는 배열을 만나면 내부의 항목들을 순서대로 모두 렌더링합니다. 하지만 실무에서는 주로 `map` 메서드를 사용하여 배열의 각 항목을 JSX 요소로 변환하여 목록을 만드는 방식을 사용합니다.

  ```jsx
  const users = [
    { id: 1, name: "김철수" },
    { id: 2, name: "이영희" },
  ];

  const userList = (
    <ul>
      {/* 배열 map을 사용한 렌더링. 각 요소에 고유한 key를 제공해야 합니다. */}
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
  ```
