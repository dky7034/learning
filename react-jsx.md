# React JSX (JavaScript XML)

## 📝 개요

이 문서는 React의 핵심적인 문법 확장인 **JSX(JavaScript XML)**에 대해 상세히 설명합니다. JSX를 사용하면 JavaScript 코드 내에서 UI를 직관적으로 표현할 수 있어 생산성과 가독성이 크게 향상됩니다. 이 문서를 통해 다음을 학습할 수 있습니다.

- JSX의 정의와 장점
- JSX의 기본 문법과 주요 규칙
- JSX 내에서 JavaScript 표현식을 사용하는 방법
- JSX 요소에 스타일을 적용하는 두 가지 주요 방법

---

### 사전 학습

이 문서를 더 잘 이해하기 위해 아래 주제에 대한 기본 지식이 필요합니다.

- [React 컴포넌트](./react-components.md)
- [JavaScript 기본 문법](./javascript-md/javascript-basic/javascript-basic.md)
- [DOM 조작 및 이벤트 핸들링](./DOM_Manipulation.md)

---

## 1. JSX란 무엇인가?

**JSX(JavaScript XML)**는 JavaScript를 확장한 문법으로, React에서 UI가 어떻게 생겨야 하는지를 설명하기 위해 사용됩니다. 이를 통해 개발자는 JavaScript 파일 내에서 HTML과 유사한 코드를 작성할 수 있습니다.

- **직관적인 UI 구성**: HTML처럼 보여서 UI 구조를 한눈에 파악하기 쉽습니다.
- **높은 가독성**: 코드의 의도가 명확해져 유지보수가 용이합니다.
- **JavaScript의 모든 기능 활용**: JSX는 JavaScript이므로, 변수 사용, 함수 호출, 조건문 등 JavaScript의 모든 기능을 UI 로직에 통합할 수 있습니다.

```jsx
// JSX를 사용하면 컴포넌트의 렌더링 결과를 쉽게 예측할 수 있습니다.
function Greeting({ name }) {
  return <h1>안녕하세요, {name}님!</h1>;
}
```

> **💡 JSX는 브라우저에서 직접 실행되지 않습니다.**
> 브라우저는 JSX를 이해하지 못합니다. 따라서 코드가 브라우저에서 실행되기 전에 **Babel**과 같은 트랜스파일러를 통해 일반적인 JavaScript 코드로 변환되는 과정이 필요합니다.

---

## 2. JSX 주요 규칙 및 주의사항

JSX를 작성할 때는 몇 가지 중요한 규칙을 따라야 합니다.

### 1. 최상위 요소는 반드시 하나여야 합니다.

컴포넌트가 반환하는 JSX는 반드시 하나의 부모 요소로 감싸져 있어야 합니다. 여러 요소를 반환해야 할 경우, `<div>`나 `<React.Fragment>`(또는 축약형 `<>`)를 사용해 감싸야 합니다.

```jsx
// 잘못된 예시 ❌
// return (
//   <h1>제목</h1>
//   <p>내용</p>
// );

// 올바른 예시 1: div로 감싸기 ✅
return (
  <div>
    <h1>제목</h1>
    <p>내용</p>
  </div>
);

// 올바른 예시 2: Fragment 사용하기 ✅
return (
  <>
    <h1>제목</h1>
    <p>내용</p>
  </>
);
```

### 2. 모든 태그는 반드시 닫혀 있어야 합니다.

HTML과 달리 JSX에서는 모든 태그를 명시적으로 닫아야 합니다. 내용이 없는 태그(예: `<img>`, `<br>`)는 `/>`를 사용하여 자체적으로 닫아야 합니다.

```jsx
// 잘못된 예시 ❌
// <img src="profile.jpg">
// <br>

// 올바른 예시 ✅
<img src="profile.jpg" />
<br />
```

### 3. JavaScript 표현식은 중괄호 `{}` 안에 작성합니다.

JSX 내에서 변수, 계산 결과, 함수 호출 등 JavaScript 코드를 실행하려면 중괄호 `{}`를 사용해야 합니다.

- **표현식만 가능**: 중괄호 안에는 `if`문, `for`문과 같은 문(Statement)은 사용할 수 없으며, 값으로 평가될 수 있는 표현식(Expression)만 넣을 수 있습니다.
- **렌더링 되는 값**: 숫자, 문자열, 배열 등은 화면에 렌더링되지만, `boolean`, `null`, `undefined`는 렌더링되지 않습니다. (주로 조건부 렌더링에 활용)
- **객체 렌더링 불가**: 객체를 직접 렌더링하려고 하면 오류가 발생합니다.

```jsx
const name = "React";
const user = { age: 20 };

function App() {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>나이: {user.age}</p>
      <p>2 * 5 = {2 * 5}</p>
      {/* {user} 객체를 직접 렌더링하면 오류 발생 */}
    </div>
  );
}
```

### 4. `class` 대신 `className`을 사용합니다.

JSX는 JavaScript이므로, `class`는 JavaScript의 예약어(클래스 선언)입니다. 따라서 HTML의 `class` 속성 대신 `className`을 사용해야 합니다.

```jsx
// 잘못된 예시 ❌
// <div class="container">...</div>

// 올바른 예시 ✅
<div className="container">...</div>
```

---

## 3. JSX에 스타일 적용하기

JSX 요소에 스타일을 적용하는 방법은 크게 두 가지입니다.

### 1. 인라인 스타일 (Inline Styles)

`style` 속성에 JavaScript 객체를 전달하여 스타일을 직접 적용할 수 있습니다. 이때 스타일 속성명은 하이픈(`-`)을 사용하는 대신 **카멜 케이스(camelCase)**로 작성해야 합니다.

- `style` 속성은 중괄호를 두 번 사용(`style={{...}}`)합니다.
  - 바깥쪽 `{}`: JSX 내에서 JavaScript를 사용하겠다는 의미
  - 안쪽 `{}`: 스타일을 정의하는 JavaScript 객체

```jsx
function MyComponent() {
  const divStyle = {
    backgroundColor: "lightblue", // background-color -> backgroundColor
    fontSize: "16px", // font-size -> fontSize
    padding: "10px",
  };

  return <div style={divStyle}>이것은 인라인 스타일입니다.</div>;
}
```

### 2. 외부 CSS 파일 사용

별도의 `.css` 파일을 만들고 컴포넌트 파일에서 `import`하여 사용하는 것이 일반적인 방법입니다. `className` 속성을 통해 CSS 클래스를 요소에 적용합니다.

**`MyComponent.css`**

```css
.my-component {
  background-color: lightgreen;
  padding: 10px;
  border-radius: 5px;
}
```

**`MyComponent.jsx`**

```jsx
import React from "react";
import "./MyComponent.css"; // CSS 파일 import

function MyComponent() {
  return (
    <div className="my-component">
      이것은 외부 CSS 파일을 사용한 스타일입니다.
    </div>
  );
}
```
