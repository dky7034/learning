# Redux Toolkit 실전: 카운터 앱 만들기

## 📝 개요

이 문서는 카운터 애플리케이션 예제를 통해 **Redux Toolkit**의 실제 사용법을 단계별로 설명합니다. 이 가이드를 통해 다음 내용을 학습할 수 있습니다.

-   Redux Toolkit 패키지 설치 및 프로젝트 구성
-   `createSlice`를 이용한 상태, 액션, 리듀서 통합 관리
-   `configureStore`를 이용한 스토어 설정
-   `Provider`, `useSelector`, `useDispatch`를 사용한 React 컴포넌트 연동

### 사전 학습

-   [Redux와 Redux Toolkit 기본 개념](./redux-intro.md)
-   React `useState` 훅에 대한 이해

---

## 1단계: 프로젝트 생성 및 설정

### 1. React 프로젝트 생성 및 의존성 설치

Vite를 사용하여 새로운 React 프로젝트를 생성하고, 생성된 디렉토리로 이동하여 기본 패키지를 설치합니다.

```bash
npm create vite@latest redux-app -- --template react
cd redux-app
npm install
```

### 2. Redux Toolkit 설치

React 환경에서 Redux를 사용하기 위한 `react-redux`와 Redux Toolkit 라이브러리인 `@reduxjs/toolkit`을 설치합니다.

```bash
npm install react-redux @reduxjs/toolkit
```

### 3. 프로젝트 디렉토리 구성

전역 상태 관리 코드와 UI 컴포넌트를 분리하여 관리하기 위해 다음과 같이 디렉토리를 구성합니다.

```
📁src/
├── 📁components/              # UI 컴포넌트
│   ├── ⚛️Counter.jsx
│   ├── ⚛️CounterIncrement.jsx
│   ├── ⚛️CounterIncrementByAmount.jsx
│   └── ⚛️CounterReset.jsx
├── 📁store/                   # Redux 상태 관리
│   ├── 🚦index.js            # 전역 스토어 설정
│   └── 🚦counterSlice.js     # 카운터 기능 관련 슬라이스
├── ⚛️App.jsx                  # 메인 애플리케이션 컴포넌트
└── ⚛️main.jsx                 # 애플리케이션 진입점
```

---

## 2단계: Slice(슬라이스) 생성

`createSlice`를 사용하여 카운터 기능의 상태, 리듀서, 액션을 한 번에 정의합니다.

**`src/store/counterSlice.js`**
```javascript
import { createSlice } from "@reduxjs/toolkit";

// 1. 초기 상태(initial state) 정의
const initialState = { count: 0 };

// 2. createSlice 함수로 슬라이스 생성
const counterSlice = createSlice({
  name: "counter", // 슬라이스 이름
  initialState,   // 초기 상태
  // 리듀서 맵: 액션 타입에 따른 상태 변경 로직
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    incrementByAmount: (state, action) => {
      state.count += Number(action.payload);
    },
    reset: (state) => {
      state.count = 0;
    },
  },
});

// 3. 생성된 액션 생성자들을 내보내기
export const { increment, incrementByAmount, reset } = counterSlice.actions;

// 4. 리듀서를 default export로 내보내기
export default counterSlice.reducer;
```

---

## 3단계: Store(스토어) 생성

`configureStore`를 사용하여 애플리케이션의 단일 스토어를 생성합니다. 이때 각 슬라이스에서 내보낸 리듀서들을 하나로 모읍니다.

**`src/store/index.js`**
```javascript
import { configureStore } from "@reduxjs/toolkit";
// counterSlice에서 export default로 내보낸 리듀서를 불러옴
import counterReducer from "./counterSlice";

// configureStore 함수로 스토어 생성
export const store = configureStore({
  // reducer 속성에 각 슬라이스의 리듀서를 등록
  reducer: {
    counter: counterReducer,
  },
});
```

---

## 4단계: React 앱에 Store 제공

`react-redux`의 `<Provider>` 컴포넌트를 사용하여 애플리케이션 전체에 Redux 스토어를 제공합니다. 이로써 하위 모든 컴포넌트가 스토어에 접근할 수 있게 됩니다.

**`src/main.jsx`**
```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux"; // 1. Provider 불러오기
import { store } from "./store"; // 2. 위에서 생성한 스토어 불러오기
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* 3. App 컴포넌트를 Provider로 감싸고 store prop 전달 */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
```
> **💡 React Router와 함께 사용하기**
> React Router를 함께 사용하는 경우, `<RouterProvider>`를 `<Provider>`의 자식으로 배치하는 것이 일반적입니다.
> ```jsx
> <Provider store={store}>
>   <RouterProvider router={router} />
> </Provider>
> ```

---

## 5단계: 컴포넌트 작성

이제 컴포넌트에서 `useSelector`로 스토어의 상태를 읽고, `useDispatch`로 액션을 발생시켜 상태를 변경합니다.

### 1. 상태 조회: `Counter.jsx`

`useSelector` 훅을 사용하여 스토어의 `count` 상태를 조회하고 화면에 표시합니다.

**`src/components/Counter.jsx`**
```jsx
import { useSelector } from "react-redux";
import CounterIncrement from "./CounterIncrement";
import CounterIncrementByAmount from "./CounterIncrementByAmount";
import CounterReset from "./CounterReset";

export default function Counter() {
  // useSelector로 스토어의 상태에 접근
  // state.counter.count의 `counter`는 store에 등록한 리듀서의 키 이름
  const count = useSelector((state) => state.counter.count);

  return (
    <div>
      <div>전역 상태 Count: {count}</div>
      <hr />
      <CounterIncrement />
      <CounterIncrementByAmount />
      <CounterReset />
    </div>
  );
}
```

### 2. 액션 실행(단순 증가): `CounterIncrement.jsx`

`useDispatch` 훅으로 `dispatch` 함수를 가져오고, 버튼 클릭 시 `increment` 액션을 디스패치(발생)시킵니다.

**`src/components/CounterIncrement.jsx`**
```jsx
import { useDispatch } from "react-redux";
import { increment } from "../store/counterSlice"; // 실행할 액션 불러오기

export default function CounterIncrement() {
  const dispatch = useDispatch();

  function handleIncrement() {
    // dispatch 함수에 액션 생성자를 넣어 호출
    dispatch(increment());
  }

  return (
    <div>
      <button onClick={handleIncrement}>+1</button>
    </div>
  );
}
```

### 3. 액션 실행(입력값만큼 증가): `CounterIncrementByAmount.jsx`

입력 필드의 값을 `payload`로 전달하여 상태를 변경합니다. 컴포넌트 내부의 지역 상태(`useState`)를 활용하여 입력값을 관리합니다.

**`src/components/CounterIncrementByAmount.jsx`**
```jsx
import { useDispatch } from "react-redux";
import { incrementByAmount } from "../store/counterSlice";
import { useState } from "react";

export default function CounterIncrementByAmount() {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);

  function handleIncrementByAmount() {
    // 액션 함수에 payload 값을 인자로 전달
    dispatch(incrementByAmount(amount));
  }

  function handleChange(e) {
    setAmount(e.target.value);
  }

  return (
    <div>
      <input type="number" value={amount} onChange={handleChange} />
      <button onClick={handleIncrementByAmount}>입력값만큼 증가</button>
    </div>
  );
}
```

---

## 6. 최종 요약

-   **`createSlice`**로 상태, 리듀서, 액션을 한 번에 정의합니다.
-   **`configureStore`**로 각 슬라이스의 리듀서를 모아 스토어를 생성합니다.
-   **`<Provider>`**로 React 앱 전체에 스토어를 제공합니다.
-   컴포넌트에서는 **`useSelector`**로 상태를 조회하고, **`useDispatch`**로 액션을 발생시켜 상태를 변경합니다.
