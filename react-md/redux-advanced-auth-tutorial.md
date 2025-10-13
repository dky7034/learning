# Redux 심화: 비동기 처리와 사용자 인증

## 📝 개요

이 문서는 Redux Toolkit을 사용하여 API 비동기 통신을 처리하고, 이를 통해 얻은 사용자 인증 정보(액세스 토큰)를 전역 상태로 관리하는 방법을 설명합니다. 또한, 상태를 영속적으로 유지하기 위한 `redux-persist`와 API 요청을 효율적으로 관리하는 `axios` 인터셉터 활용법까지 다룹니다.

-   `createAsyncThunk`를 이용한 Redux 비동기 처리
-   토큰 기반 인증(회원가입, 로그인, 로그아웃) 시스템 구현
-   `redux-persist`를 활용한 전역 상태 영속성 유지
-   `axios` 인터셉터를 이용한 공통 헤더 관리

### 사전 학습

-   [Redux Toolkit 실전: 카운터 앱 만들기](./redux-toolkit-tutorial.md)
-   React 기본, HTTP 통신, REST API에 대한 이해

---

## 1. 토큰 기반 사용자 인증(Authentication)의 이해

### 왜 인증이 필요한가? (HTTP의 무상태성)

HTTP 프로토콜은 **무상태성(Stateless)** 특성을 가집니다. 즉, 서버는 클라이언트의 이전 요청 상태를 기억하지 않고 각 요청을 독립적으로 처리합니다. 이 때문에 클라이언트가 로그인을 해도, 서버는 다음 요청에서 해당 사용자가 로그인했는지 알 수 없습니다.

이 문제를 해결하기 위해 **토큰 기반 인증**을 사용합니다.

1.  클라이언트가 아이디/비밀번호로 **로그인**을 요청합니다.
2.  서버는 정보가 유효하면, 사용자를 식별할 수 있는 **토큰(Token)**을 생성하여 클라이언트에게 응답으로 보내줍니다.
3.  클라이언트는 전달받은 토큰을 **저장**합니다. (Redux 스토어, 로컬 스토리지 등)
4.  이후 클라이언트는 서버에 요청을 보낼 때마다 저장된 토큰을 **HTTP 헤더**에 포함시켜 보냅니다.
5.  서버는 요청 헤더의 토큰을 검증하여 사용자를 인증하고 요청을 처리합니다.

### JWT (JSON Web Token)란?

액세스 토큰을 생성하는 대표적인 방법 중 하나입니다. JWT는 `Header.Payload.Signature` 구조의 긴 문자열로 구성되며, 토큰 자체에 암호화된 사용자 정보를 포함할 수 있습니다.

-   **헤더 (Header)**: 토큰의 타입(JWT)과 암호화 알고리즘 정보
-   **페이로드 (Payload)**: 사용자 정보(ID, 이름, 권한 등)와 만료 시간 등
-   **서명 (Signature)**: 토큰의 유효성을 검증하기 위한 암호화된 값

> 더 자세한 내용은 [JWT.io](https://www.jwt.io/)에서 확인하고 토큰을 디코딩해볼 수 있습니다.

---

## 2. Redux Toolkit 비동기 처리: `createAsyncThunk`

로그인과 같은 API 요청은 대표적인 비동기 작업입니다. Redux Toolkit은 `createAsyncThunk` 함수를 통해 비동기 작업을 처리하고 그 결과를 리듀서에서 관리할 수 있는 기능을 제공합니다.

### 1) `createAsyncThunk`

비동기 작업을 처리하는 액션 생성자(Thunk)를 만듭니다. 이 함수는 `pending`(요청 시작), `fulfilled`(요청 성공), `rejected`(요청 실패) 세 가지 상태의 액션을 자동으로 생성합니다.

```javascript
// createAsyncThunk(액션 타입 문자열, 비동기 처리 콜백 함수)
const login = createAsyncThunk(
  "auth/login", // 액션 타입
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/login", data);
      return response.data; // 성공 시 fulfilled 액션의 payload로 전달
    } catch (error) {
      return rejectWithValue(error.response.data); // 실패 시 rejected 액션의 payload로 전달
    }
  }
);
```

### 2) `extraReducers`

`createSlice` 내에서 `createAsyncThunk`로 생성된 비동기 액션들을 처리하기 위한 옵션입니다.

```javascript
const authSlice = createSlice({
  name: "auth",
  initialState: { token: null, error: null },
  reducers: { /* 동기 리듀서 */ },
  // 비동기 액션 처리
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        // 로그인 성공 시
        state.token = action.payload.access_token;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        // 로그인 실패 시
        state.token = null;
        state.error = action.payload;
      });
  },
});
```

---

## 3. 실전: 인증 시스템 구현하기 (Supabase 활용)

사용자 회원가입, 로그인, 로그아웃 기능을 구현하며 Redux Toolkit 비동기 처리를 학습합니다. (인증 서버는 Supabase 기준)

### 1단계: 프로젝트 환경 설정

`.env` 파일을 생성하여 API 통신에 필요한 환경 변수를 정의하고, `.gitignore`에 추가하여 버전 관리에서 제외합니다.

**`.env`**
```
VITE_SUPABASE_URL=YOUR_SUPABASE_URL
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

**`.gitignore`**
```
.env
```

### 2단계: 인증 Slice 생성 (`authSlice.js`)

회원가입, 로그인, 로그아웃을 위한 3개의 비동기 Thunk를 생성하고, `extraReducers`에서 각 Thunk의 상태에 따라 `token`과 `error` 상태를 업데이트합니다.

**`src/store/authSlice.js`**
```javascript
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Thunk: 회원가입
export const signup = createAsyncThunk(/* ... */);

// Thunk: 로그인
export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => { /* ... */ }
);

// Thunk: 로그아웃
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue, getState }) => {
    try {
      const config = {
        url: `${SUPABASE_URL}/auth/v1/logout`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${getState().auth.token}`, // 현재 스토어의 토큰 사용
        },
      };
      await axios(config);
      return; // 성공 시 payload는 없음
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  token: null,
  error: null,
  isSignupSuccess: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetSignupSuccess: (state) => {
      state.isSignupSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, (state) => {
        state.isSignupSuccess = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.access_token;
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.token = null;
          state.error = action.payload;
        }
      );
  },
});

export const { resetSignupSuccess } = authSlice.actions;
export default authSlice.reducer;
```

### 3단계: 스토어 설정 및 컴포넌트 작성

이전 예제와 동일하게 `store/index.js`에서 `authSlice`의 리듀서를 등록하고, `main.jsx`에서 `<Provider>`로 앱을 감싸줍니다. 그 후 `Signup`, `Login`, `Profile` 컴포넌트에서 `useDispatch`와 `useSelector`를 사용하여 회원가입, 로그인, 로그아웃 기능을 구현합니다.

**`src/components/Signup.jsx` 예시**
```jsx
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { signup, resetSignupSuccess } from "../store/authSlice";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isSignupSuccess } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup({ email, password }));
  };

  useEffect(() => {
    if (isSignupSuccess) {
      alert("회원가입을 성공했습니다.");
      dispatch(resetSignupSuccess());
    }
  }, [isSignupSuccess, dispatch]);

  return (
    <form onSubmit={handleSubmit}>{/* ... */}</form>
  );
}
```

---

## 4. 상태 유지: Redux Persist 적용하기

Redux의 상태는 메모리에 저장되므로 새로고침하면 초기화됩니다. `redux-persist`는 스토어의 상태를 브라우저의 `localStorage`에 저장하여, 새로고침 후에도 로그인 상태 등을 유지시켜주는 라이브러리입니다.

### 1. 설치 및 설정

```bash
npm install redux-persist
```

`store/index.js` 파일을 수정하여 `persistReducer`와 `persistStore`를 설정합니다.

**`src/store/index.js`**
```javascript
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage 사용

// Persist 설정
const persistConfig = {
  key: "auth", // localStorage에 저장될 키
  storage,
  whitelist: ["token"], // 영속적으로 유지할 상태 (token만 저장)
};

// 기존 리듀서에 Persist 기능 추가
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
  },
  // 직렬화 불가 값(함수 등)에 대한 경고 무시
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// Persist 스토어 생성
export const persistor = persistStore(store);
```

### 2. 앱에 적용

`main.jsx`에서 `<PersistGate>` 컴포넌트로 앱을 감싸줍니다. `PersistGate`는 저장된 상태를 불러올 때까지 로딩 화면을 보여주는 역할을 합니다.

**`src/main.jsx`**
```jsx
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
```

---

## 5. 코드 개선: Axios 인터셉터 활용

API를 요청할 때마다 헤더에 토큰을 추가하는 것은 번거롭습니다. `axios`의 **인터셉터(Interceptor)**를 사용하면 모든 요청이 보내지기 전에 공통 작업을 자동으로 처리할 수 있습니다.

1.  **`axios` 인스턴스 생성**: 공통 `baseURL`과 헤더를 가진 `axios` 인스턴스를 만듭니다.
2.  **요청 인터셉터 설정**: `interceptors.request.use()`를 사용하여 모든 요청이 보내지기 전에 스토어에서 토큰을 가져와 `Authorization` 헤더에 추가합니다.
3.  **기존 코드 수정**: `axios`를 직접 사용하던 부분을 새로 만든 인스턴스로 교체하고, 중복되는 헤더 설정을 제거합니다.

**`src/api/index.js` (인스턴스 파일 예시)**
```javascript
import axios from "axios";
import { store } from "../store"; // 스토어 직접 불러오기

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SUPABASE_URL,
  headers: {
    apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  },
});

// 요청 인터셉터
axiosInstance.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
```

**`authSlice.js` 수정 후**
```javascript
import axiosInstance from "../api/index"; // 수정된 인스턴스 사용

// ...

const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      // 헤더 설정이 더 이상 필요 없음
      await axiosInstance.post("/auth/v1/logout");
      return;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
```
