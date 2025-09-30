# React 상태(State) 관리 가이드

이 문서는 리액트의 핵심 개념인 **상태(State)**에 대해 심도 있게 다룹니다. 상태의 기본 개념부터 `useState` 훅을 활용한 다양한 데이터 타입 관리, 그리고 고급 상태 관리 기법까지 학습할 수 있습니다.

## 목차

1.  [상태(State)란?](#1-상태state란)
    - [상태의 핵심 특징](#상태의-핵심-특징)
2.  [`useState` 훅(Hook)](#2-usestate-훅hook)
    - [기본 구조](#기본-구조)
    - [상태 업데이트와 불변성](#상태-업데이트와-불변성)
3.  [State, Props, Variable 비교](#3-state-props-variable-비교)
    - [상태(State) vs 속성(Props)](#상태state-vs-속성props)
    - [상태(State) vs 변수(Variable)](#상태state-vs-변수variable)
4.  [다양한 데이터 타입의 상태 관리](#4-다양한-데이터-타입의-상태-관리)
    - [문자열(String)](#문자열string)
    - [숫자(Number)](#숫자number)
    - [객체(Object)](#객체object)
    - [배열(Array)](#배열array)
5.  [불변성을 지켜야 하는 이유](#5-불변성을-지켜야-하는-이유)
6.  [고급 상태 관리 기법](#6-고급-상태-관리-기법)
    - [이벤트 핸들링과 상태](#이벤트-핸들링과-상태)
    - [폼(Form) 상태 통합 관리](#폼form-상태-통합-관리)
    - [상태 업데이트의 비동기적 동작](#상태-업데이트의-비동기적-동작)
    - [함수형 업데이트 (Functional Updates)](#함수형-업데이트-functional-updates)

---

## 1. 상태(State)란?

**상태(State)**는 리액트 컴포넌트 내에서 관리되는 **독립적인 데이터**입니다. 사용자의 상호작용(클릭, 입력 등)이나 시간의 흐름에 따라 동적으로 변할 수 있는 값을 의미하며, 화면의 모습을 결정하는 핵심적인 역할을 합니다.

리액트는 **상태가 변경되면 해당 상태를 사용하는 컴포넌트를 자동으로 리렌더링(Re-rendering)**하여 화면을 최신 데이터로 업데이트합니다. 이 메커니즘 덕분에 개발자는 UI를 직접 조작할 필요 없이 데이터 관리만으로 동적인 웹 애플리케이션을 만들 수 있습니다.

### 상태의 핵심 특징

- **지역성 (Local):** 상태는 기본적으로 해당 상태를 정의한 컴포넌트 내에서만 접근하고 수정할 수 있습니다. (컴포넌트의 캡슐화)
- **불변성 (Immutability):** 상태는 직접 수정할 수 없습니다. 반드시 상태를 업데이트하기 위해 제공되는 **상태 설정 함수**를 사용해야 합니다.
- **비동기성 (Asynchronous):** 상태 변경은 즉각적으로 반영되지 않고, 비동기적으로 처리됩니다. 리액트는 성능 최적화를 위해 여러 상태 변경을 하나로 묶어 처리(Batching)하기도 합니다.
- **일관성 (Consistency):** 동일한 컴포넌트와 동일한 상태는 항상 동일한 렌더링 결과를 보장합니다.

## 2. `useState` 훅(Hook)

`useState`는 함수형 컴포넌트에서 상태를 관리할 수 있게 해주는 리액트의 기본 **훅(Hook)**입니다. 훅은 리액트의 특정 기능(상태 관리, 생명주기 등)을 "연결"하는 특별한 함수입니다.

### 기본 구조

`useState`는 상태 변수와 해당 상태를 변경하는 함수를 쌍으로 제공합니다.

```jsx
import { useState } from "react";

function MyComponent() {
  // const [상태 변수, 상태 설정 함수] = useState(초기값);
  const [something, setSomething] = useState(initialValue);
}
```

- `something`: 현재 상태 값을 저장하는 변수입니다.
- `setSomething`: `something`의 값을 업데이트하는 함수입니다.
- `initialValue`: 상태가 처음 생성될 때 가질 초기값입니다. 생략 시 `undefined`가 됩니다.

### 상태 업데이트와 불변성

상태를 업데이트할 때는 반드시 `setSomething`과 같은 상태 설정 함수를 사용해야 합니다. 이는 리액트에게 상태 변경이 발생했음을 알리고 리렌더링을 유발하는 유일한 방법입니다.

```jsx
import { useState } from "react";

function Counter() {
  const [number, setNumber] = useState(0);

  function increment() {
    // ❌ 잘못된 방법: 상태를 직접 수정하면 리렌더링이 발생하지 않습니다.
    // number = number + 1;

    // ✅ 올바른 방법: 상태 설정 함수를 사용하여 새로운 값으로 업데이트합니다.
    setNumber(number + 1);
  }

  return (
    <div>
      <p>Count: {number}</p>
      <button onClick={increment}>증가</button>
    </div>
  );
}
```

## 3. State, Props, Variable 비교

### 상태(State) vs 속성(Props)

| 구분            | 상태 (State)                               | 속성 (Props)                                 |
| :-------------- | :----------------------------------------- | :------------------------------------------- |
| **정의**        | 컴포넌트의 **내부** 상태를 표현하는 데이터 | 부모 컴포넌트가 자식에게 **전달**하는 데이터 |
| **소유**        | 컴포넌트 **자신**이 소유하고 관리          | **부모** 컴포넌트가 소유                     |
| **변경 가능성** | **변경 가능** (상태 설정 함수 사용)        | **읽기 전용** (변경 불가, 불변)              |
| **사용 목적**   | 컴포넌트 내부의 동적 데이터 관리           | 컴포넌트 간 데이터 및 기능 전달              |
| **초기화 시점** | 컴포넌트 생성 시 `useState`로 초기화       | 부모가 자식 컴포넌트를 렌더링할 때 전달      |

### 상태(State) vs 변수(Variable)

| 항목             | 상태 (State)                               | 변수 (Variable)                              |
| :--------------- | :----------------------------------------- | :------------------------------------------- |
| **정의**         | 컴포넌트의 UI 렌더링에 영향을 주는 데이터  | 데이터를 임시로 저장하는 일반적인 변수       |
| **변경 시 반응** | 값이 바뀌면 **화면이 자동으로 리렌더링됨** | 값이 바뀌어도 **UI에 아무런 변화가 없음**    |
| **생성**         | `useState()` 훅(Hook)으로 생성             | `let`, `const` 등으로 자유롭게 생성          |
| **변경**         | 상태 설정 함수로만 변경 가능               | 어디서나 자유롭게 재할당 가능 (`let`의 경우) |
| **렌더링 영향**  | **있음** (상태 변경이 리렌더링의 트리거)   | **없음** (리렌더링 시 변수는 초기화됨)       |

## 4. 다양한 데이터 타입의 상태 관리

`useState`는 문자열, 숫자뿐만 아니라 객체, 배열 등 모든 JavaScript 자료형을 상태로 관리할 수 있습니다. 중요한 것은 **불변성**을 지키며 상태를 업데이트하는 것입니다.

### 문자열(String)

```jsx
// src/components/State/StringState.jsx
import { useState } from "react";

export default function StringState() {
  const [text, setText] = useState("초기 문자열");

  const updateText = () => {
    // 새로운 문자열을 생성하여 상태를 업데이트
    setText(text + " 추가!");
  };

  return (
    <div>
      <p>{text}</p>
      <button onClick={updateText}>문자열 추가</button>
    </div>
  );
}
```

### 숫자(Number)

```jsx
// src/components/State/NumberState.jsx
import { useState } from "react";

export default function NumberState() {
  const [count, setCount] = useState(0);

  const increment = () => {
    // 새로운 숫자 값을 생성하여 상태를 업데이트
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>카운트 증가</button>
    </div>
  );
}
```

### 객체(Object)

객체나 배열 같은 참조 타입 데이터를 업데이트할 때는 **스프레드 연산자(`...`)**를 사용하여 기존 객체를 복사한 후, 원하는 속성만 변경하여 **새로운 객체**를 만들어야 합니다.

#### 속성 수정

```jsx
// src/components/State/ObjectState.jsx
import { useState } from "react";

export default function ObjectState() {
  const [user, setUser] = useState({ name: "홍길동", age: 25 });

  const increaseAge = () => {
    // 새로운 객체를 생성하여 상태를 업데이트
    const newUser = { ...user, age: user.age + 1 };
    setUser(newUser);
  };

  return (
    <div>
      <p>이름: {user.name}</p>
      <p>나이: {user.age}</p>
      <button onClick={increaseAge}>나이 증가</button>
    </div>
  );
}
```

#### 속성 제거

**구조 분해 할당**과 **나머지 연산자(`...`)**를 활용하여 특정 속성을 제외한 새로운 객체를 만들 수 있습니다.

```jsx
// src/components/State/ObjectState.jsx (이어서)
const removeAge = () => {
  // age 속성을 분리하고, 나머지 속성은 rest 변수에 할당
  const { age, ...rest } = user;
  // age가 제외된 새로운 객체로 상태 업데이트
  setUser(rest);
};

// ... JSX 부분에 버튼 추가
<button onClick={removeAge}>나이 제거</button>;
```

### 배열(Array)

배열 역시 객체와 마찬가지로 불변성을 지켜야 합니다. `push`, `pop`, `splice`처럼 원본 배열을 직접 수정하는 메서드 대신, `map`, `filter`, `concat`이나 스프레드 연산자처럼 **새로운 배열을 반환**하는 메서드를 사용해야 합니다.

#### 데이터 추가

```jsx
// src/components/State/ArrayState.jsx
import { useState } from "react";

export default function ArrayState() {
  const [items, setItems] = useState([{ id: 1, value: "항목 1" }]);

  const addItem = () => {
    const newItem = { id: items.length + 1, value: `항목 ${items.length + 1}` };
    // 기존 배열을 복사하고 새로운 항목을 추가한 '새로운 배열'로 업데이트
    setItems([...items, newItem]);
  };

  // ...
}
```

#### 데이터 제거

`filter` 메서드는 특정 조건을 만족하는 요소만 모아 **새로운 배열**을 만들기 때문에 데이터 제거에 매우 유용합니다.

```jsx
// src/components/State/ArrayState.jsx (이어서)
const removeItem = (idToRemove) => {
  // idToRemove와 일치하지 않는 항목만으로 새로운 배열을 생성
  const newItems = items.filter((item) => item.id !== idToRemove);
  setItems(newItems);
};

// ... JSX
<ul>
  {items.map((item) => (
    <li key={item.id}>
      {item.value}
      <button onClick={() => removeItem(item.id)}> 제거</button>
    </li>
  ))}
</ul>;
```

## 5. 불변성을 지켜야 하는 이유

> React는 상태 변수에 저장된 **메모리 주소**가 변경되었을 때만 컴포넌트를 리렌더링합니다.

- **참조 타입 데이터 (객체, 배열):** `user.age = 26`처럼 직접 수정하면 객체가 담긴 메모리 주소는 그대로이고 내부 값만 바뀝니다. React는 주소 변경을 감지하지 못하므로 리렌더링이 일어나지 않습니다. `setUser({ ...user, age: 26 })`처럼 새로운 객체를 생성하면 새로운 메모리 주소가 할당되므로 React가 변화를 감지하고 리렌더링을 수행합니다.

- **원시 타입 데이터 (숫자, 문자열):** 원시 타입은 값을 변경하면 항상 새로운 메모리 공간이 할당됩니다. 하지만 `useState`는 상태 변수를 `const`로 선언하기 때문에 `count = count + 1`과 같은 직접적인 재할당은 문법 오류를 발생시킵니다. 따라서 원시 타입이든 참조 타입이든, 항상 상태 설정 함수를 사용하는 것이 일관되고 올바른 방법입니다.

## 6. 고급 상태 관리 기법

### 이벤트 핸들링과 상태

사용자 이벤트(`onClick`, `onChange` 등)에 반응하여 상태를 업데이트하는 것은 리액트 애플리케이션의 가장 기본적인 동작입니다.

```jsx
// src/components/StateAdvanced/Counter.jsx
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  // 이벤트 핸들러 함수
  const plusCount = () => setCount(count + 1);
  const minusCount = () => setCount(count - 1);

  return (
    <div>
      <p>현재 count: {count}</p>
      <button onClick={plusCount}>증가</button>
      <button onClick={minusCount}>감소</button>
    </div>
  );
}
```

### 폼(Form) 상태 통합 관리

여러 개의 입력 필드를 가진 폼을 만들 때, 각 필드마다 `useState`를 사용할 수도 있지만, 하나의 객체로 상태를 통합 관리하면 더 효율적입니다. 이때 **계산된 속성명(Computed Property Name)** 문법이 유용하게 사용됩니다.

```jsx
// src/components/StateAdvanced/Form.jsx
import { useState } from "react";

export default function Form() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
  });

  const handleChange = (e) => {
    // 이벤트가 발생한 input의 name과 value를 구조 분해 할당으로 추출
    const { name, value } = e.target;

    // 계산된 속성명을 사용하여 해당하는 필드의 값만 동적으로 업데이트
    setForm({
      ...form, // 기존 form 객체를 복사하고
      [name]: value, // name 키를 가진 값을 value로 설정
    });
  };

  return (
    <form>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="이름"
      />
      <input
        name="age"
        value={form.age}
        onChange={handleChange}
        placeholder="나이"
        type="number"
      />
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="이메일"
        type="email"
      />
      <pre>{JSON.stringify(form, null, 2)}</pre>
    </form>
  );
}
```

### 상태 업데이트의 비동기적 동작

상태 설정 함수(`setCount`)는 비동기적으로 작동합니다. 즉, `setCount` 호출 직후에 `count` 변수를 조회해도 이전 값을 보게 됩니다. 또한, 리액트는 성능을 위해 여러 상태 업데이트를 하나의 리렌더링으로 묶어서 처리(Batching)합니다.

```jsx
// 이 코드에서 버튼을 클릭하면 count는 1만 증가합니다.
const handleIncrement = () => {
  // 이 시점의 count는 모두 0입니다.
  setCount(count + 1); // setCount(0 + 1)
  setCount(count + 1); // setCount(0 + 1)
  setCount(count + 1); // setCount(0 + 1)
  console.log(count); // 0이 출력됩니다.
};
```

리액트는 마지막 `setCount(1)` 호출만 유효한 것으로 간주하고, 단 한 번의 리렌더링을 발생시킵니다.

### 함수형 업데이트 (Functional Updates)

이전 상태 값에 의존하여 다음 상태를 결정해야 할 때, **함수형 업데이트**를 사용하면 상태 업데이트의 비동기적 동작으로 인한 문제를 해결할 수 있습니다. 상태 설정 함수에 값을 직접 전달하는 대신, **이전 상태(previous state)를 인자로 받아 새로운 상태를 반환하는 함수**를 전달하는 방식입니다.

```jsx
// 이 코드에서 버튼을 클릭하면 count는 3이 증가합니다.
const handleIncrementFunctional = () => {
  // 각 업데이트는 이전 상태 값을 정확히 참조하여 실행됩니다.
  setCount((prevCount) => prevCount + 1); // prevCount는 0, 1을 반환
  setCount((prevCount) => prevCount + 1); // prevCount는 1, 2를 반환
  setCount((prevCount) => prevCount + 1); // prevCount는 2, 3을 반환
  console.log(count); // 여전히 0이 출력됩니다. (비동기)
};
```

함수형 업데이트는 리액트가 업데이트 큐에 함수들을 순서대로 쌓아두고, 이전 상태 값을 정확하게 다음 함수로 전달해주기 때문에 여러 번의 상태 업데이트를 의도한 대로 처리할 수 있습니다.
