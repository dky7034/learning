# React `useRef` Hook 완벽 가이드

이 문서는 React의 `useRef` Hook에 대한 심층적인 가이드입니다. `useRef`의 두 가지 주요 사용 사례인 DOM 요소 접근과 렌더링과 무관한 값 유지를 중심으로 개념과 실제 예제를 다룹니다.

## 목차

1.  [useRef란 무엇인가?](#1-useref란-무엇인가)
2.  [기본 구조](#2-기본-구조)
3.  [주요 사용 사례 1: DOM 요소에 직접 접근하기](#3-주요-사용-사례-1-dom-요소에-직접-접근하기)
    - [예제 1: 입력 필드 포커스](#예제-1-입력-필드-포커스)
    - [예제 2: 스크롤 위치 조작](#예제-2-스크롤-위치-조작)
    - [예제 3: 요소 크기 측정](#예제-3-요소-크기-측정)
4.  [주요 사용 사례 2: 렌더링과 무관한 값 유지하기](#4-주요-사용-사례-2-렌더링과-무관한-값-유지하기)
5.  [비교: `useRef` vs `useState` vs 일반 변수](#5-비교-useref-vs-usestate-vs-일반-변수)
    - [`useRef`와 `useState`의 차이](#useref와-usestate의-차이)
    - [`useRef`와 일반 변수의 차이](#useref와-일반-변수의-차이)
6.  [⚠️ 사용 시 주의사항](#️-사용-시-주의사항)
    - [항상 `null` 체크하기](#항상-null-체크하기)
    - [UI 상태를 위해 `useRef` 남용 금지](#ui-상태를-위해-useref-남용-금지)
7.  [결론](#7-결론)

---

## 1. useRef란 무엇인가?

`useRef`는 React에서 제공하는 Hook으로, 두 가지 주요 목적을 위해 사용됩니다.

1.  **DOM 요소에 직접 접근**: React의 선언적 방식에서 벗어나 특정 DOM 노드에 직접 접근하여 포커스, 스크롤 위치 조작, 크기 측정 등의 작업을 수행할 수 있습니다.
2.  **렌더링과 무관한 값 유지**: 컴포넌트의 전체 생명주기 동안 특정 값을 유지하면서도, 그 값이 변경될 때 리렌더링을 유발하고 싶지 않을 때 사용합니다. (예: 타이머 ID, 이전 상태 값 등)

가장 중요한 특징은 **`useRef`의 값이 변경되어도 컴포넌트가 리렌더링되지 않는다**는 점입니다.

## 2. 기본 구조

`useRef`는 `.current` 프로퍼티를 가진 **참조 객체(ref object)**를 반환합니다. 이 `.current` 프로퍼티를 통해 실제 값에 접근하거나 변경할 수 있습니다.

```javascript
import { useRef, useEffect } from "react";

export default function Component() {
  // 1. useRef(초기값)으로 ref 객체 생성
  const myRef = useRef(null);

  useEffect(() => {
    // 3. ref 객체의 .current 속성으로 실제 값에 접근
    console.log(myRef.current);
  }, []);

  return (
    <div>
      {/* 2. ref 속성을 통해 DOM 요소와 ref 객체를 연결 */}
      <div ref={myRef}>Hello, useRef!</div>
    </div>
  );
}
```

## 3. 주요 사용 사례 1: DOM 요소에 직접 접근하기

가장 일반적인 `useRef`의 사용법입니다. JSX 요소의 `ref` 속성에 `useRef`로 생성한 객체를 전달하면, 렌더링 후 `.current` 프로퍼티가 해당 DOM 노드를 가리키게 됩니다.

### 예제 1: 입력 필드 포커스

페이지 로드 시 또는 특정 이벤트 발생 시 사용자가 바로 입력할 수 있도록 `input` 요소에 포커스를 맞춰줍니다.

```javascript
// src/components/UseRef/FocusInput.jsx
import { useRef, useEffect } from "react";

export default function FocusInput() {
  const inputRef = useRef(null);

  // 컴포넌트가 마운트될 때 입력 요소에 자동 포커스
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // 버튼 클릭 시 입력 요소에 포커스
  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div>
      <input
        className="border-2 border-gray-300 rounded-md p-2"
        ref={inputRef}
        type="text"
        placeholder="자동 포커스됨"
      />
      <button onClick={handleFocus}>포커스 맞추기</button>
    </div>
  );
}
```

### 예제 2: 스크롤 위치 조작

`scrollIntoView()`와 같은 DOM API와 함께 사용하여 특정 요소로 부드럽게 스크롤을 이동시킬 수 있습니다.

```javascript
// src/components/UseRef/Scroll.jsx
import { useRef } from "react";

export default function Scroll() {
  const topRef = useRef(null);
  const bottomRef = useRef(null);

  const scrollToTop = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToBottom = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <div ref={topRef}>
        <h2>페이지 상단</h2>
        <button onClick={scrollToBottom}>하단으로 이동</button>
      </div>

      <div className="h-[2000px] p-4">
        <p>긴 내용...</p>
      </div>

      <div ref={bottomRef}>
        <h2>페이지 하단</h2>
        <button onClick={scrollToTop}>상단으로 이동</button>
      </div>
    </div>
  );
}
```

### 예제 3: 요소 크기 측정

`getBoundingClientRect()`와 같은 메서드를 사용하여 렌더링된 DOM 요소의 너비, 높이, 위치 등의 정보를 얻을 수 있습니다.

```javascript
// src/components/UseRef/MeasureElement.jsx
import { useRef, useState } from "react";

export default function MeasureElement() {
  const divRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const measureElement = () => {
    if (divRef.current) {
      const { width, height } = divRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
  };

  return (
    <div>
      <div ref={divRef} className="w-[200px] h-[100px] bg-blue-500 p-4">
        측정할 요소
      </div>
      <button onClick={measureElement}>크기 측정</button>
      <p>
        너비: {dimensions.width}px, 높이: {dimensions.height}px
      </p>
    </div>
  );
}
```

## 4. 주요 사용 사례 2: 렌더링과 무관한 값 유지하기

`useRef`는 DOM 접근 외에도, 리렌더링을 유발하지 않으면서 컴포넌트의 생명주기 동안 값을 유지하는 데 유용합니다. 예를 들어, `setTimeout`이나 `setInterval`의 ID를 저장하는 경우가 대표적입니다.

```javascript
// 타이머 ID를 저장하는 예시
function TimerComponent() {
  const timerIdRef = useRef(null);

  const startTimer = () => {
    // 이전에 설정된 타이머가 있다면 초기화
    if (timerIdRef.current) {
      clearInterval(timerIdRef.current);
    }
    // 새로운 타이머 설정 및 ID 저장
    timerIdRef.current = setInterval(() => {
      console.log("Timer tick");
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerIdRef.current);
    timerIdRef.current = null;
  };

  // ...
}
```

## 5. 비교: `useRef` vs `useState` vs 일반 변수

### `useRef`와 `useState`의 차이

| 구분          | `useRef`                          | `useState`                    |
| :------------ | :-------------------------------- | :---------------------------- |
| **목적**      | 값 유지, DOM 접근                 | **상태 관리**                 |
| **리렌더링**  | 값 변경 시 **리렌더링 안 됨**     | 값 변경 시 **리렌더링 됨**    |
| **값 접근**   | `ref.current`로 접근              | 직접 접근                     |
| **값 변경**   | `ref.current = newValue`          | `setState(newValue)`          |
| **사용 예시** | DOM 조작, 타이머 ID, 이전 값 저장 | UI에 표시될 상태, 사용자 입력 |

> **핵심**: 화면에 보이는 것을 바꿔야 한다면 `useState`, 보이지 않는 값을 관리하고 싶다면 `useRef`를 사용하세요.

### `useRef`와 일반 변수의 차이

| 구분          | `useRef`                                | 일반 변수 (let, const)             |
| :------------ | :-------------------------------------- | :--------------------------------- |
| **값 유지**   | **리렌더링 간에 값이 유지됨**           | **리렌더링 시마다 초기화됨**       |
| **생명주기**  | 컴포넌트의 생명주기와 함께 유지         | 함수 실행 시마다 새로 생성 및 소멸 |
| **사용 목적** | 컴포넌트 전반에 걸쳐 지속되어야 하는 값 | 함수 내의 임시 계산 값             |

> **핵심**: 리렌더링이 되어도 값을 기억해야 한다면 `useRef`, 리렌더링 될 때마다 초기화되어도 상관없다면 일반 변수를 사용하세요.

## 6. ⚠️ 사용 시 주의사항

### 항상 `null` 체크하기

`ref.current`는 컴포넌트가 렌더링되고 DOM 요소가 실제로 생성된 후에 할당됩니다. 따라서 `useEffect`나 이벤트 핸들러에서 사용할 때, 해당 시점에 `ref.current`가 `null`이 아님을 보장할 수 없는 경우가 있습니다. 항상 `null` 체크를 하는 습관을 들이는 것이 안전합니다.

```javascript
// ❌ 위험한 코드
const handleClick = () => {
  inputRef.current.focus(); // inputRef.current가 null일 수 있음
};

// ✅ 안전한 코드
const handleClick = () => {
  if (inputRef.current) {
    inputRef.current.focus();
  }
};
```

### UI 상태를 위해 `useRef` 남용 금지

`useRef`의 값을 변경해도 리렌더링이 일어나지 않는다는 점을 기억해야 합니다. 만약 화면에 표시되는 값을 `useRef`로 관리하면, 값은 변경되지만 UI는 업데이트되지 않는 문제가 발생합니다.

```javascript
// ❌ 잘못된 사용 - UI가 업데이트되지 않음
export default function BadCounter() {
  const countRef = useRef(0);

  const increment = () => {
    countRef.current += 1;
    console.log(countRef.current); // 콘솔에는 값이 증가하지만...
  };

  return (
    <div>
      {/* 화면의 숫자는 계속 0으로 보임 */}
      <p>{countRef.current}</p>
      <button onClick={increment}>증가</button>
    </div>
  );
}

// ✅ 올바른 사용
export default function GoodCounter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(prev => prev + 1);
  };

  return (
    <div>
      <p>{count}</p>
      <button onClick={increment}>증가</button>
    </div>
  );
}
```

## 7. 결론

`useRef`는 React의 선언적 패러다임을 보완하는 강력한 도구입니다. DOM을 직접 조작해야 할 때나, 리렌더링 없이 값을 유지해야 할 때 유용하게 사용할 수 있습니다. `useState`와의 차이점을 명확히 이해하고, 각 Hook의 목적에 맞게 사용하는 것이 중요합니다.
