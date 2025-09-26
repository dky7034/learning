# React `useState`와 상태 끌어올리기 (Lifting State Up)

## 1. `useState`: 어디에 선언해야 할까?

React에서 동적인 데이터를 관리하기 위해 `useState` 훅(Hook)을 사용합니다. `useState`로 선언된 상태(state)는 컴포넌트가 리렌더링 되어도 그 값을 유지하며, 상태가 변경되면 컴포넌트와 그 자식들이 자동으로 다시 렌더링됩니다.

`useState`를 사용할 때 가장 중요한 원칙은 다음과 같습니다.

1.  **상태는 그것을 사용하는 컴포넌트 내부에 선언하는 것이 기본입니다.**
2.  **만약 여러 컴포넌트가 동일한 상태를 공유해야 한다면, 그들의 가장 가까운 공통 부모 컴포넌트에서 상태를 선언하고, 자식들에게 `props`로 전달해야 합니다.**

이 원칙을 통해 React는 **상태의 소유자(Owner)**를 명확히 하고, 데이터 흐름을 예측 가능하게 만듭니다. 상태의 소유자만이 해당 상태를 직접 변경할 수 있습니다.

## 2. 단일 컴포넌트에서만 상태가 필요한 경우

가장 간단한 시나리오는 상태가 하나의 컴포넌트 안에서만 사용되는 경우입니다. 예를 들어, `Counter` 컴포넌트 내부에 클릭 카운트를 저장하는 `count` 상태가 필요하다면 다음과 같이 작성할 수 있습니다.

```jsx
import { useState } from "react";

function Counter() {
  // Counter 컴포넌트 내에서만 사용하는 지역 상태
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count is {count}
    </button>
  );
}

export default Counter;
```

이 경우 `count` 상태는 `Counter` 컴포넌트에 캡슐화되어 있으며, 다른 컴포넌트는 이 상태에 대해 알 필요도, 접근할 수도 없습니다.

## 3. 상태 끌어올리기 (Lifting State Up)

하지만 여러 컴포넌트가 동일한 데이터를 공유하고 동기화해야 하는 경우가 자주 발생합니다. 예를 들어, 하나의 버튼(`Counter`)이 숫자를 올리면, 다른 컴포넌트(`Display`)가 그 숫자를 화면에 표시해야 하는 상황을 생각해 봅시다.

### 잘못된 접근 방식

각 컴포넌트가 독립적으로 `useState`를 선언하면, 그들은 서로 다른 상태를 갖게 되어 데이터가 공유되지 않습니다.

```jsx
// ❌ Counter와 Display가 각각 useState를 사용하면 값이 공유되지 않음

function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Increment</button>;
}

function Display() {
  // 이 count는 Counter의 count와는 완전히 다른 별개의 상태입니다.
  const [count] = useState(0);
  return <h1>{count}</h1>;
}
```

위 코드에서 `Counter`의 버튼을 클릭해도 `Display`의 숫자는 변하지 않습니다. 두 `count`는 이름만 같을 뿐, 완전히 다른 메모리 공간에 저장된 별개의 값이기 때문입니다.

### 올바른 접근 방식: 상태 끌어올리기

이 문제를 해결하기 위해 **상태 끌어올리기(Lifting State Up)** 패턴을 사용합니다. 공유가 필요한 상태를 두 컴포넌트의 **가장 가까운 공통 부모**로 이동시키는 것입니다.

```jsx
import { useState } from "react";

// 부모 컴포넌트
function App() {
  // ✅ 상태를 공통 부모인 App으로 끌어올림
  const [count, setCount] = useState(0);

  return (
    <div>
      {/* 자식들에게 상태와 상태 변경 함수를 props로 전달 */}
      <Counter count={count} setCount={setCount} />
      <Display count={count} />
    </div>
  );
}

// 자식 컴포넌트 1
function Counter({ count, setCount }) {
  // props로 받은 함수를 호출하여 부모의 상태를 변경
  return (
    <button onClick={() => setCount(count + 1)}>
      Increment
    </button>
  );
}

// 자식 컴포넌트 2
function Display({ count }) {
  // props로 받은 상태를 표시
  return <h1>Current Count: {count}</h1>;
}

export default App;
```

**작동 방식:**

1.  **상태의 중앙 관리**: `App` 컴포넌트가 `count` 상태의 유일한 **소유자(Owner)**가 됩니다.
2.  **데이터는 아래로 (Data flows down)**: `App`은 `count` 상태를 `Counter`와 `Display`에게 `props`로 전달합니다.
3.  **이벤트는 위로 (Events flow up)**: `Counter`에서 버튼 클릭 이벤트가 발생하면, `props`로 전달받은 `setCount` 함수를 호출합니다. 이 함수는 실제로는 부모인 `App`에 정의되어 있으므로, `App`의 `count` 상태가 변경됩니다.
4.  **리렌더링**: `App`의 상태가 변경되면, `App`과 그 자식들(`Counter`, `Display`)이 새로운 `props`를 받아 리렌더링되면서 UI가 업데이트됩니다.

## 4. 정리

- **`useState`는 상태가 필요한 가장 가까운 곳에 선언**하는 것이 원칙입니다.
- **여러 컴포넌트가 상태를 공유**해야 할 때는, 그들의 **가장 가까운 공통 부모**로 상태를 끌어올리고 `props`로 전달합니다.
- 이 패턴을 **상태 끌어올리기(Lifting State Up)**라고 하며, React에서 단방향 데이터 흐름을 유지하며 상태를 관리하는 핵심적인 원리입니다.

---

#### 💡 다음 단계

상태 끌어올리기는 매우 강력하지만, 컴포넌트 구조가 깊어지면 `props`를 여러 단계에 걸쳐 계속 내려보내야 하는 "Props Drilling" 문제가 발생할 수 있습니다. 이러한 문제를 해결하기 위해 **Context API**나 **상태 관리 라이브러리(Redux, Recoil, Zustand 등)**를 사용하는 것을 고려해볼 수 있습니다.
