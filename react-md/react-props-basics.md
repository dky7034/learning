# React `props`: 개념부터 실용 예제까지

React에서 컴포넌트는 독립적인 UI 단위로 작동하지만, 실제 애플리케이션을 구축하려면 컴포넌트들이 서로 소통하며 데이터를 주고받아야 합니다. 이때 사용되는 것이 바로 **`props` (properties)**입니다.

이 글에서는 `props`의 핵심 개념, 문법, 그리고 자주 사용되는 패턴과 주의사항을 정리합니다.

## 1. `props`란 무엇인가?

`props`는 **부모 컴포넌트가 자식 컴포넌트에게 데이터를 전달**하기 위해 사용하는 메커니즘입니다. `props`의 주요 특징은 다음과 같습니다.

- **객체 형태**: 전달된 `props`는 자식 컴포넌트에서 하나의 자바스크립트 객체로 받게 됩니다.
- **읽기 전용 (Read-Only)**: 자식 컴포넌트는 전달받은 `props`를 직접 수정할 수 없습니다. 이는 React의 **단방향 데이터 흐름(One-Way Data Flow)** 원칙을 지키기 위함이며, 데이터 흐름을 예측 가능하게 만듭니다.

예를 들어, 아래와 같은 JSX 코드가 있다고 가정해 봅시다.

```jsx
<Counter value={count} onUpdate={setCount} />
```

React는 내부적으로 이 코드를 다음과 같은 `props` 객체로 변환하여 `Counter` 컴포넌트에 전달합니다.

```javascript
const props = {
  value: count, // count 변수의 값이 전달됨
  onUpdate: setCount, // setCount 함수가 전달됨
};
```

## 2. JSX 문법과 `props` 전달

JSX에서 `props`를 전달하는 문법은 HTML의 속성(attribute)과 유사해 보이지만, 실제로는 동적인 자바스크립트 표현식을 다룰 수 있습니다.

```jsx
<ChildComponent propKey={propValue} />
```

- **`propKey` (왼쪽)**: 자식 컴포넌트에서 사용할 `props`의 **키(key) 이름**입니다. 이 이름은 개발자가 자유롭게 정할 수 있습니다.
- **`propValue` (오른쪽)**: 부모 컴포넌트의 스코프(scope)에 존재하는 **실제 변수, 함수, 또는 값**입니다. 이 값은 반드시 부모 컴포넌트 내에서 접근 가능해야 합니다.

## 3. `useState`와 `props`의 관계

`useState`는 컴포넌트의 상태를 관리하기 위해 `[상태 값, 상태 변경 함수]` 형태의 배열을 반환합니다. 우리는 보통 구조 분해 할당을 통해 이 값들에 이름을 붙여 사용합니다.

```jsx
const [count, setCount] = useState(0);
```

여기서 `count`와 `setCount`는 개발자가 정한 이름일 뿐, React 자체는 이 이름에 관심이 없습니다. React는 단순히 컴포넌트 내에서 `useState`가 호출된 **순서**를 기준으로 상태를 관리합니다.

따라서 `props`로 값을 넘길 때는 `useState`로 선언된 변수명과 `props`의 키 이름을 명확히 구분해서 생각하는 것이 중요합니다.

### `props` 전달 시 이름 규칙

- **오른쪽 (`propValue`)**: 부모 컴포넌트에서 **실제로 선언된 변수명이나 함수명**을 사용해야 합니다. (예: `count`, `setCount`)
- **왼쪽 (`propKey`)**: 자식 컴포넌트에서 사용할 **`props`의 키 이름**입니다. 부모의 변수명과 같게 하는 것이 일반적이지만, 다르게 지정할 수도 있습니다.

**예시:**

```jsx
// 부모 컴포넌트
function App() {
  const [number, updateNumber] = useState(0);

  // value={number} -> number 변수의 값을 'value'라는 키로 전달
  // onUpdate={updateNumber} -> updateNumber 함수를 'onUpdate'라는 키로 전달
  return <Counter value={number} onUpdate={updateNumber} />;
}

// 자식 컴포넌트
function Counter({ value, onUpdate }) {
  // 부모에게서 받은 props 객체를 구조 분해 할당으로 받음
  return <button onClick={() => onUpdate(value + 1)}>{value}</button>;
}
```

## 4. `props`로 모든 자바스크립트 값 전달하기

`props`는 자바스크립트 객체이므로, 원시 자료형(문자열, 숫자 등)이나 함수뿐만 아니라 **객체, 배열, 심지어 다른 React 컴포넌트(JSX)**까지 모든 종류의 값을 전달할 수 있습니다.

```jsx
// 부모 컴포넌트
function App() {
  const [count, setCount] = useState(0);
  const userInfo = { name: "Alice", age: 30 };

  return (
    <Profile
      // 1. 상태 값 (숫자)
      value={count}
      // 2. 상태 변경 함수
      onUpdate={setCount}
      // 3. 일반 문자열
      title="My Profile"
      // 4. 객체
      user={userInfo}
      // 5. 배열
      tags={["React", "JavaScript", "Props"]}
      // 6. JSX (React 컴포넌트)
      customHeader={<h2>Profile Details</h2>}
    />
  );
}

// 자식 컴포넌트
function Profile({ value, onUpdate, title, user, tags, customHeader }) {
  return (
    <div>
      {customHeader}
      <h1>{title}</h1>
      <p>
        Name: {user.name}, Age: {user.age}
      </p>
      <p>Current Value: {value}</p>
      <button onClick={() => onUpdate(value + 1)}>Increment</button>
      <div>
        {tags.map((tag) => (
          <span key={tag}>#{tag} </span>
        ))}
      </div>
    </div>
  );
}
```

## 5. 흔한 실수와 올바른 사용법

가장 흔한 실수는 부모 컴포넌트의 스코프에 존재하지 않는 변수나 함수를 `props`로 전달하려고 시도하는 것입니다.

**❌ 잘못된 예시:**

```jsx
function App() {
  const [count, setCount] = useState(0);

  // 'increment'라는 변수나 함수는 App 스코프에 존재하지 않음
  return <Counter value={count} onUpdate={increment} />; // ReferenceError 발생
}
```

**✅ 올바른 예시:**

```jsx
function App() {
  const [count, setCount] = useState(0);

  // 부모 스코프에 존재하는 setCount 함수를 전달
  return <Counter value={count} onUpdate={setCount} />;
}
```

## 6. 정리

1.  **`props`는 부모가 자식에게 데이터를 전달하는 방법**이며, 자식은 이 값을 직접 수정할 수 없습니다.
2.  `props`는 본질적으로 **자바스크립트 객체**입니다.
3.  JSX에서 `props`를 전달할 때, **`key={value}`**에서 `key`는 자식이 사용할 이름, `value`는 부모에 선언된 실제 데이터입니다.
4.  `useState`로 만든 상태와 상태 변경 함수를 포함하여, **모든 자바스크립트 값을 `props`로 전달**할 수 있습니다.
5.  데이터 흐름을 명확히 하기 위해, `props`의 키 이름은 전달하는 변수/함수 이름과 **일관성 있게 유지**하는 것이 좋습니다.
