# React 컴포넌트 이벤트 핸들링

이 문서는 React 컴포넌트의 이벤트 처리 방법을 상세히 설명합니다. 이 문서를 통해 개발자는 React 애플리케이션에서 사용자 상호작용을 효과적으로 관리하는 방법을 학습할 수 있습니다.

## 사전 학습

이 문서를 이해하기 위해 다음의 사전 지식이 필요합니다.

-   JavaScript 이벤트 핸들링 (Event Handling)
-   React 기본 개념 (컴포넌트, props, state)
-   JSX 문법 및 활용

## React 이벤트 핸들링의 특징

React의 이벤트 시스템은 표준 DOM 이벤트와 유사하지만 몇 가지 중요한 차이점이 있습니다.

1.  **카멜 케이스(camelCase) 명명 규칙**: HTML의 소문자 이벤트 속성 대신 카멜 케이스를 사용합니다.
    -   HTML: `onclick`, `onchange`
    -   React: `onClick`, `onChange`
2.  **함수 전달**: 이벤트 핸들러로 문자열이 아닌 함수를 전달합니다.
    -   HTML: `<button onclick="handleClick()">`
    -   React: `<button onClick={handleClick}>`
3.  **`addEventListener` 미사용**: `addEventListener`를 직접 호출하여 DOM 요소에 리스너를 추가할 필요 없이, JSX를 통해 이벤트 핸들러를 선언적으로 연결합니다.
4.  **합성 이벤트(SyntheticEvent)**: React는 모든 이벤트를 `SyntheticEvent`라는 래퍼(wrapper)로 감싸서 전달합니다. 이는 브라우저 간의 이벤트 동작 차이를 정규화하여 일관된 API를 제공합니다.
5.  **`onInput` 대신 `onChange`**: React에서는 입력 필드의 값이 변경될 때 `onInput` 대신 `onChange` 이벤트를 사용하는 것을 권장합니다. 이는 `onInput`과 동일하게 작동하지만, React의 제어 컴포넌트(controlled component) 패턴에 더 적합합니다.

---

## 예시 디렉토리 구조

아래 예제 코드들은 다음과 같은 디렉토리 구조를 기반으로 작성되었습니다.

```
📁 src/
├── 🎨 index.css
├── ⚛️ main.jsx
├── ⚛️ App.jsx
└── 📁 components/
    └── 📁EventHandling/
        ├── ⚛️ OnClick.jsx
        ├── ⚛️ OnChange.jsx
        └── ⚛️ OnSubmit.jsx
```

---

## 주요 이벤트 핸들러 예제

### 1. `onClick` 이벤트

`onClick` 이벤트는 사용자가 버튼, `div` 등 특정 요소를 클릭했을 때 발생하는 이벤트를 처리합니다.

#### 기본 사용법

파라미터가 없는 함수를 호출할 때는 함수 이름만 전달합니다.

#### 파라미터 전달

핸들러 함수에 파라미터를 전달해야 할 경우, 화살표 함수(`() => {}`)를 사용하여 함수를 감싸야 합니다. 이렇게 하지 않으면 컴포넌트가 렌더링될 때 함수가 즉시 실행되어 버립니다.

```jsx
// /src/components/EventHandling/OnClick.jsx

export default function OnClick() {
  // 파라미터가 없는 함수
  function helloClick() {
    alert("Hello, World!");
  }

  // 파라미터가 있는 함수
  function handleClick(buttonName) {
    alert(`${buttonName} 클릭`);
  }

  return (
    <div>
      {/* 파라미터 없는 함수 호출 */}
      <div onClick={helloClick}>Hello, World!</div>

      {/* 파라미터 있는 함수 호출 */}
      <button onClick={() => handleClick("1번 버튼")}>1번 버튼</button>
      <button onClick={() => handleClick("2번 버튼")}>2번 버튼</button>
      <button onClick={() => handleClick("3번 버튼")}>3번 버튼</button>
    </div>
  );
}
```

### 2. `onChange` 이벤트

`onChange` 이벤트는 `<input>`, `<textarea>`, `<select>`와 같은 폼 요소의 값이 변경될 때 발생합니다. 사용자의 입력을 실시간으로 추적하고 상태(state)를 업데이트하는 데 주로 사용됩니다.

이벤트 핸들러는 이벤트 객체(`event`)를 인자로 받으며, `event.target.value`를 통해 현재 입력 값을 가져올 수 있습니다.

```jsx
// /src/components/EventHandling/OnChange.jsx

export default function OnChange() {
  const handleChange = (event) => {
    console.log(`입력 이벤트 발생, 입력 값: ${event.target.value}`);
  };

  return (
    <div>
      <input type="text" onChange={handleChange} />
    </div>
  );
}
```

### 3. `onSubmit` 이벤트

`onSubmit` 이벤트는 `<form>` 요소 내부에서 `type="submit"`인 버튼을 클릭하거나, 입력 필드에서 Enter 키를 눌렀을 때 발생합니다.

#### `event.preventDefault()`

폼 제출 시 기본적으로 페이지가 새로고침됩니다. 이를 방지하고 JavaScript로 폼 데이터를 처리하려면 `event.preventDefault()`를 반드시 호출해야 합니다.

#### 폼 데이터 접근

`event.target.elements`를 통해 폼 안의 모든 입력 요소(`input`, `textarea` 등)에 접근할 수 있습니다. 각 요소의 `name` 속성을 키로 사용하여 값을 가져올 수 있습니다.

```jsx
// /src/components/EventHandling/OnSubmit.jsx

export default function OnSubmit() {
  const handleSubmit = (event) => {
    // 폼 제출 시 기본 동작(페이지 새로고침) 방지
    event.preventDefault();

    // event.target은 form 요소를 가리킴
    // event.target.elements : form 요소의 모든 입력 요소들
    const elements = event.target.elements;

    // 구조 분해 할당을 활용하여 각 요소를 변수에 할당
    const { email, password, name } = elements;

    // 각 입력 요소의 값(value)에 접근
    console.log(`이메일 입력 값: ${email.value}`);
    console.log(`비밀번호 입력 값: ${password.value}`);
    console.log(`이름 입력 값: ${name.value}`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <input type="text" name="name" placeholder="Name" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
```

---

## 요약

-   React 이벤트 핸들러는 **카멜 케이스**(`onClick`)를 사용합니다.
-   이벤트 핸들러로는 **함수**(`{handleClick}`)를 전달합니다.
-   파라미터를 전달할 때는 **화살표 함수**(`{() => handleClick(param)}`)를 사용합니다.
-   폼 제출 시에는 **`event.preventDefault()`**를 호출하여 페이지 새로고침을 막습니다.
-   React는 브라우저 호환성을 위해 **`SyntheticEvent`** 객체를 사용합니다.
