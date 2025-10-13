# Redux와 Redux Toolkit: React 전역 상태 관리 가이드

## 📝 개요

이 문서는 React 애플리케이션의 상태를 전역으로 관리하기 위한 라이브러리인 **Redux**와, Redux를 더 쉽고 간편하게 사용하도록 돕는 **Redux Toolkit**에 대한 기본적인 개념과 차이점을 설명합니다. 이 가이드를 통해 다음 내용을 학습할 수 있습니다.

-   전역 상태 관리의 필요성
-   Redux의 핵심 구성 요소 (Action, Reducer, Store, Dispatch)
-   Redux Toolkit의 등장 배경과 장점
-   `createSlice`와 `configureStore`를 사용한 간결한 상태 관리

### 사전 학습

-   React 상태(State)와 속성(Props)에 대한 이해

---

## 1. 왜 전역 상태 관리가 필요한가?

React의 기본 상태 관리는 단일 컴포넌트 또는 부모-자식 관계에 최적화되어 있습니다. 하지만 애플리케이션이 복잡해지면 여러 컴포넌트가 동일한 상태를 공유해야 하는 경우가 발생하며, 이때 지역 상태 관리만으로는 한계에 부딪힙니다.

### 지역 상태 관리의 한계

-   **Props Drilling**: 상태를 필요로 하는 컴포넌트가 깊은 계층 구조에 있을 때, 중간에 있는 모든 컴포넌트를 거쳐 props를 전달해야 하는 문제입니다. 이는 코드의 복잡성을 높이고 유지보수를 어렵게 만듭니다.
-   **상태 동기화의 어려움**: 서로 다른 위치에 있는 컴포넌트들이 동일한 상태를 가질 때, 한쪽에서 상태가 변경되면 다른 쪽도 모두 동기화해야 하는 번거로움이 있습니다.
-   **디버깅의 복잡성**: 상태가 어디서, 어떻게, 왜 변경되었는지 추적하기가 어렵습니다.

#### Props Drilling 예시

최상위 컴포넌트 `App`의 `user` 상태를 가장 깊은 하위 컴포넌트 `Greeting`까지 전달하기 위해 `HomePage`, `Profile` 컴포넌트가 중간 다리 역할을 해야만 합니다.

```jsx
// 최상위 컴포넌트(App)의 상태를 아주 깊은 하위 컴포넌트(Greeting)로 전달해야 하는 경우
function App() {
  const [user, setUser] = useState({ name: "홍길동", isLoggedIn: true });

  return <HomePage user={user} />;
}

function HomePage({ user }) {
  // 이 컴포넌트는 user가 필요 없지만, 하위로 전달하기 위해 받아야 함
  return <Profile user={user} />;
}

function Profile({ user }) {
  // 이 컴포넌트도 user가 필요 없지만, 하위로 전달하기 위해 받아야 함
  return <Greeting user={user} />;
}

function Greeting({ user }) {
  return <div>{user.name}님, 환영합니다!</div>;
}
```

**Redux**와 같은 전역 상태 관리 라이브러리는 이러한 문제를 해결하기 위해 등장했습니다. 컴포넌트 계층 구조와 상관없이 중앙 집중화된 **저장소(Store)**를 통해 애플리케이션의 모든 상태를 한 곳에서 관리합니다.

---

## 2. Redux의 핵심 개념

Redux는 다음 세 가지 주요 구성 요소로 이루어져 있습니다.

### 1) Action (액션)

상태에 어떤 변화가 필요한지 설명하는 **정보 객체**입니다. 액션은 반드시 어떤 종류의 액션인지를 나타내는 `type` 속성을 가져야 합니다.

-   `type` (필수): 액션의 종류를 나타내는 문자열 (예: `"INCREMENT"`).
-   `payload` (선택): 상태 변경에 필요한 추가 데이터를 담습니다.

```javascript
// 액션 생성자(Action Creator): 액션 객체를 만드는 함수
export const increment = () => ({
  type: "INCREMENT",
});

export const incrementByAmount = (amount) => ({
  type: "INCREMENT_BY_AMOUNT",
  payload: amount,
});
```

### 2) Reducer (리듀서)

현재 상태와 전달받은 액션을 사용하여 **새로운 상태를 만드는 순수 함수**입니다. 리듀서는 절대 기존 상태를 직접 수정해서는 안 되며, 반드시 새로운 상태 객체를 반환해야 합니다 (불변성 원칙).

```javascript
// 리듀서 함수 정의
const counterReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "INCREMENT_BY_AMOUNT":
      return { ...state, count: state.count + action.payload };
    case "RESET":
      return { ...state, count: 0 };
    default:
      return state;
  }
};

export default counterReducer;
```

### 3) Store (스토어)

애플리케이션의 **전역 상태를 담고 있는 단 하나의 저장소**입니다. 스토어는 리듀서를 받아 생성되며, 상태를 읽고 변경하는 여러 내장 함수를 제공합니다.

```javascript
import { createStore } from "redux";
import counterReducer from "./reducer";

// createStore 함수로 스토어 생성
const store = createStore(counterReducer);

export default store;
```

### 4) Dispatch (디스패치)

컴포넌트에서 스토어에 있는 상태를 변경하기 위해 **액션을 발생시키는 함수**입니다. `dispatch(action)` 형태로 호출하면 스토어는 리듀서를 실행하여 새로운 상태를 생성합니다.

```jsx
import { useDispatch } from "react-redux";

function Counter() {
  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+1</button>
      <button onClick={() => dispatch({ type: "INCREMENT_BY_AMOUNT", payload: 10 })}>+10</button>
    </div>
  );
}
```

---

## 3. Redux Toolkit: 더 간편해진 Redux

Redux는 강력하지만, 액션 타입, 액션 생성자, 리듀서를 모두 별도로 작성해야 하는 등 보일러플레이트 코드가 많다는 단점이 있습니다. **Redux Toolkit(RTK)**은 이러한 단점을 개선하여 Redux를 더 쉽고 효율적으로 사용할 수 있도록 Redux 팀이 공식적으로 만든 라이브러리입니다.

### Redux Toolkit의 주요 구성 요소

#### 1) `createSlice`

리듀서와 액션을 한 번에 생성하는 강력한 함수입니다. `name`, `initialState`, `reducers` 객체를 받아 액션 생성자와 리듀서를 자동으로 만들어줍니다.

> **💡 Immer 라이브러리 내장**
> `createSlice`의 리듀서 내부에서는 **Immer** 라이브러리가 동작하여, `state.value += 1`처럼 상태를 직접 수정하는 것처럼 보이는 코드를 작성해도 **자동으로 불변성을 유지**해줍니다. 개발자는 더 이상 `...state`와 같은 전개 연산자를 사용할 필요가 없습니다.

```javascript
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1; // Immer가 불변성을 유지하며 상태를 업데이트
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});

// 액션 생성자 자동 생성 및 내보내기
export const { increment, incrementByAmount, reset } = counterSlice.actions;

// 리듀서 내보내기
export default counterSlice.reducer;
```

#### 2) `configureStore`

`createStore`를 대체하는 함수로, 여러 슬라이스의 리듀서를 쉽게 병합하고 유용한 미들웨어를 기본적으로 추가해줍니다.

```javascript
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";

// configureStore 함수로 스토어 생성
export const store = configureStore({
  reducer: {
    // 여기에 여러 리듀서를 추가하여 병합할 수 있음
    counter: counterReducer,
  },
});
```

## 4. 최종 요약

-   **Redux**는 Props Drilling과 같은 문제를 해결하기 위해 상태를 중앙에서 관리하는 **전역 상태 관리** 라이브러리입니다.
-   **Redux**는 **Action**, **Reducer**, **Store**, **Dispatch**를 통해 상태를 관리하며, 데이터 흐름이 단방향으로 이루어집니다.
-   **Redux Toolkit**은 Redux의 보일러플레이트를 줄이고, Immer를 내장하여 불변성 관리를 쉽게 만들어주는 **공식 권장 라이브러리**입니다.
-   현대적인 React 개발에서는 특별한 이유가 없다면 **Redux Toolkit을 사용**하는 것이 생산성과 코드 간결성 면에서 훨씬 유리합니다.
