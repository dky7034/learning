# `useRef` 완벽 가이드: DOM 접근과 렌더링 없는 값 저장

`useRef`는 React에서 두 가지 주요 목적을 위해 사용되는 특별한 훅(Hook)입니다.

1.  **DOM 요소에 직접 접근**: 특정 DOM 노드를 직접 제어해야 할 때 (예: 포커스 설정, 스크롤 위치 조작, 미디어 재생).
2.  **리렌더링을 유발하지 않는 값 저장**: 컴포넌트의 생명주기 동안 유지되어야 하지만, 그 값이 변경되어도 화면을 다시 그릴 필요가 없는 값을 저장할 때.

`useState`가 '화면에 보이는 값'을 다룬다면, `useRef`는 '화면 뒤에서 조용히 유지되는 값'을 다룹니다.

## 목차

1.  [`useRef`란 무엇인가?](#1-useref란-무엇인가)
2.  [`useRef` 사용법](#2-useref-사용법)
    - [1. DOM 요소에 접근하기](#1-dom-요소에-접근하기)
    - [2. 렌더링과 무관한 값 저장하기](#2-렌더링과-무관한-값-저장하기)
3.  [`useRef` vs. 일반 변수 (`let`, `const`)](#3-useref-vs-일반-변수-let-const)
4.  [`useRef` vs. `useState`](#4-useref-vs-usestate)
5.  [예제 코드 분석](#5-예제-코드-분석)

---

## 1. `useRef`란 무엇인가?

`useRef`는 `.current` 프로퍼티를 가진 '참조(reference)' 객체를 반환합니다. 이 객체는 컴포넌트의 전체 생명주기 동안 동일한 객체를 유지합니다.

```javascript
const myRef = useRef(initialValue);
```

- `myRef` 객체는 `{ current: initialValue }` 형태를 가집니다.
- `myRef.current` 값을 변경해도 **컴포넌트는 리렌더링되지 않습니다.**
- 컴포넌트가 리렌더링되어도 `myRef.current` 값은 **초기화되지 않고 유지됩니다.**

## 2. `useRef` 사용법

### 1. DOM 요소에 접근하기

가장 일반적인 `useRef`의 사용 사례입니다. JSX 요소의 `ref` 속성에 `useRef`로 생성한 참조 객체를 연결하면, 해당 DOM 노드에 직접 접근할 수 있습니다.

```jsx
import { useRef } from "react";

const Register = () => {
  const inputRef = useRef();

  const onSubmit = () => {
    // 이름 입력란이 비어있으면...
    if (input.name === "") {
      // inputRef.current는 <input> DOM 요소를 가리킴
      // focus()와 같은 DOM API를 직접 호출할 수 있음
      inputRef.current.focus();
    }
  };

  return (
    <div>
      {/* input 요소에 inputRef를 연결 */}
      <input ref={inputRef} placeholder={"이름"} />
      <button onClick={onSubmit}>제출</button>
    </div>
  );
};
```

위 예제에서 `inputRef.current`는 `input` 태그의 실제 DOM 요소를 가리킵니다. 따라서 `onSubmit` 함수 내에서 `inputRef.current.focus()`를 호출하여 사용자가 이름을 입력하지 않았을 때 해당 입력란에 자동으로 포커스를 맞출 수 있습니다.

### 2. 렌더링과 무관한 값 저장하기

컴포넌트가 몇 번 렌더링되었는지, 또는 특정 이벤트가 몇 번 발생했는지 세고 싶지만, 그 숫자가 화면에 표시될 필요는 없을 때 `useRef`를 유용하게 사용할 수 있습니다.

```jsx
import { useRef, useState } from "react";

const Register = () => {
  const [input, setInput] = useState({ name: "" });
  const countRef = useRef(0); // 렌더링 횟수를 셀 변수, 초기값 0

  const onChange = (e) => {
    // countRef의 현재 값(current)을 1 증가시킴
    // 이 코드는 컴포넌트를 리렌더링하지 않음!
    countRef.current++;
    console.log(`onChange 호출 횟수: ${countRef.current}`);

    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <input name="name" value={input.name} onChange={onChange} />
    </div>
  );
};
```

위 코드에서 `onChange` 이벤트가 발생할 때마다 `countRef.current` 값이 1씩 증가합니다. `input` 상태가 변경되면 컴포넌트는 리렌더링되지만, `countRef`는 초기화되지 않고 이전 값을 그대로 유지합니다. 만약 이 값을 `useState`로 관리했다면, 값이 변할 때마다 불필요한 리렌더링이 발생했을 것입니다.

## 3. `useRef` vs. 일반 변수 (`let`, `const`)

"그냥 컴포넌트 함수 안에 `let count = 0;` 같은 변수를 쓰면 안 되나요?" 라는 의문이 들 수 있습니다. **결론부터 말하면, 안 됩니다.**

React 컴포넌트는 **리렌더링될 때마다 함수 전체가 다시 호출됩니다.** 이는 함수 내부에 선언된 모든 지역 변수(`let`, `const`로 선언된 변수)가 **매번 새로 생성되고 초기화된다**는 의미입니다.

```jsx
const Register = () => {
  const [input, setInput] = useState({ name: "" });
  let count = 0; // 리렌더링될 때마다 count는 0으로 초기화됨

  const onChange = (e) => {
    count++; // count를 1로 만듦
    console.log(`count 변수: ${count}`); // 항상 1만 출력됨
    setInput({ ...input, name: e.target.value });
  };
  // ...
};
```

위 코드에서 `onChange`가 호출되어 `count`가 1이 되고, `setInput`으로 인해 컴포넌트가 리렌더링되면 `Register` 함수가 다시 실행됩니다. 이때 `let count = 0;` 코드가 다시 실행되면서 `count`는 0으로 돌아갑니다.

반면, `useRef`로 생성된 참조 객체는 React가 특별히 관리하여 컴포넌트가 리렌더링되어도 파괴되지 않고 계속 유지됩니다. 이것이 바로 리렌더링 사이클을 넘어 값을 유지하고 싶을 때 일반 변수 대신 `useRef`를 사용해야 하는 이유입니다.

## 4. `useRef` vs. `useState`

| 구분              | `useRef`                            | `useState`                               |
| :---------------- | :---------------------------------- | :--------------------------------------- |
| **값 변경 시**    | 리렌더링 **안 함**                  | 리렌더링 **함**                          |
| **값의 형태**     | `{ current: ... }` 객체             | `[value, setValue]` 배열                 |
| **주 사용 목적**  | DOM 접근, 리렌더링 불필요한 값 저장 | 화면에 보여줄 상태 값 관리               |
| **업데이트 방식** | `myRef.current = newValue` (동기적) | `setValue(newValue)` (비동기적 스케줄링) |

- **`useState`를 사용해야 할 때**: 값이 변경되었을 때 화면이 업데이트되어야 하는 모든 경우. (예: 사용자 입력, API 응답 데이터, UI 상태 등)
- **`useRef`를 사용해야 할 때**:
  - DOM 요소에 직접 접근해야 할 때.
  - 값이 변경되어도 화면을 업데이트할 필요는 없지만, 값은 계속 유지되어야 할 때. (예: `setTimeout`/`setInterval` ID, 이전 props 값, 렌더링 횟수 카운트 등)

## 5. 예제 코드 분석

아래는 회원가입 폼 예제에서 `useRef`가 어떻게 활용되는지 보여주는 전체 코드입니다.

```jsx
import { useRef, useState } from "react";

// 간단한 회원가입 폼
const Register = () => {
  const [input, setInput] = useState({
    name: "",
    birth: "",
    country: "",
    bio: "",
  });

  // 1. 렌더링과 무관한 값 저장용 Ref
  // onChange 이벤트 호출 횟수를 저장하지만, 이 값이 바뀐다고 화면이 변하진 않음
  const countRef = useRef(0);

  // 2. DOM 요소 접근용 Ref
  // 이름 input 요소에 직접 접근하기 위해 사용
  const inputRef = useRef();

  // 통합 이벤트 핸들러
  const onChange = (e) => {
    countRef.current++;
    console.log(`onChange 호출 횟수: ${countRef.current}`);
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const onsubmit = () => {
    // 이름 입력란이 비어있으면...
    if (input.name === "") {
      // inputRef.current는 이름 <input> DOM 요소를 가리킴
      // DOM API인 focus()를 직접 호출
      inputRef.current.focus();
    }
  };

  return (
    <div>
      <div>
        {/* input 요소에 ref를 연결 */}
        <input
          ref={inputRef}
          name="name"
          value={input.name}
          onChange={onChange}
          type="text"
          placeholder={"이름"}
        />
      </div>
      {/* ... 다른 input들 ... */}
      <button onClick={onsubmit}>제출</button>
    </div>
  );
};

export default Register;
```

이처럼 `useRef`는 React의 선언적 특성을 해치지 않으면서도, 필요할 때 DOM에 직접 접근하거나 리렌더링 흐름에서 벗어난 값을 관리할 수 있게 해주는 강력한 도구입니다.
