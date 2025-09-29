# React Props 심화: 다양한 데이터 타입 전달 예제

이 문서는 다양한 JavaScript 데이터 타입을 React 컴포넌트의 Props로 전달하는 방법을 구체적인 예제를 통해 설명합니다. Props의 기본 개념을 넘어 실제 개발에서 마주할 수 있는 여러 데이터 유형을 효과적으로 다루는 방법을 학습합니다.

## 사전 학습

- JSX 문법 및 활용
- React 컴포넌트의 이해
- [React Props 기본 활용법](./react-props-basics.md)

## 예제 디렉토리 구조

모든 예제는 아래와 같은 파일 구조를 가정하고 작성되었습니다.

```
📁 src/
├── 🎨 index.css
├── ⚛️ main.jsx
├── ⚛️ App.jsx
└── 📁 components/
    └── 📁 PropsExample/
        ├── ⚛️ ProfileContainer.jsx
        └── ⚛️ Profile.jsx
```

---

## 다양한 타입의 Props 전달하기

Props로는 JavaScript의 모든 데이터 타입을 전달할 수 있습니다. 데이터 타입에 따라 전달하는 문법이 달라집니다.

- **문자열**: 따옴표 `""`를 사용합니다.
- **그 외 모든 JavaScript 표현식** (숫자, 불리언, 변수, 객체, 배열, 함수 등): 중괄호 `{}`를 사용합니다.

### 1. 문자열 (String)

문자열은 HTML 속성처럼 따옴표로 감싸서 전달합니다.

**부모 컴포넌트 (`ProfileContainer.jsx`)**

```jsx
import Profile from "./Profile";

export default function ProfileContainer() {
  return (
    <div>
      <Profile name="현우" />
      <Profile name="수진" />
    </div>
  );
}
```

**자식 컴포넌트 (`Profile.jsx`)**

```jsx
export default function Profile(props) {
  return <div>저는 {props.name}입니다.</div>;
}
```

### 2. 숫자 (Number)

숫자나 변수 등 JavaScript 표현식은 중괄호 `{}`로 감싸서 전달해야 합니다.

**부모 컴포넌트 (`ProfileContainer.jsx`)**

```jsx
import Profile from "./Profile";

export default function ProfileContainer() {
  return (
    <div>
      <Profile name="현우" age={22} />
      <Profile name="수진" age={21} />
    </div>
  );
}
```

**자식 컴포넌트 (`Profile.jsx`)**

```jsx
export default function Profile(props) {
  return (
    <div>
      저는 {props.name}이고, {props.age}세 입니다.
    </div>
  );
}
```

### 3. 불리언 (Boolean)

불리언 값도 중괄호 `{}`로 감싸 전달합니다. 특히, prop 이름만 명시하면 그 값은 `true`로 간주됩니다.

**부모 컴포넌트 (`ProfileContainer.jsx`)**

```jsx
import Profile from "./Profile";

export default function ProfileContainer() {
  return (
    <div>
      {/* isAdmin={true}와 동일 */}
      <Profile name="현우" age={22} isAdmin />
      <Profile name="수진" age={21} isAdmin={false} />
    </div>
  );
}
```

**자식 컴포넌트 (`Profile.jsx`)**

```jsx
export default function Profile(props) {
  return (
    <div>
      <p>
        저는 {props.name}이고, {props.age}세 입니다.
      </p>
      {/* 조건부 렌더링: isAdmin이 true일 때만 관리자 텍스트 표시 */}
      {props.isAdmin && <p>(관리자)</p>}
    </div>
  );
}
```

### 4. 객체 (Object)

객체를 전달할 때는 **중괄호를 두 번** 사용합니다 (`{{...}}`). 바깥쪽 `{}`는 JSX의 JavaScript 표현식을 의미하고, 안쪽 `{}`는 객체 리터럴을 의미합니다.

**부모 컴포넌트 (`ProfileContainer.jsx`)**

```jsx
import Profile from "./Profile";

export default function ProfileContainer() {
  const user = {
    name: "현우",
    age: 22,
    isAdmin: true,
  };

  return (
    <div>
      {/* 변수로 전달 */}
      <Profile user={user} />

      {/* 직접 객체 리터럴로 전달 */}
      <Profile user={{ name: "수진", age: 21, isAdmin: false }} />
    </div>
  );
}
```

**자식 컴포넌트 (`Profile.jsx`)**

```jsx
export default function Profile(props) {
  return (
    <div>
      <p>
        저는 {props.user.name}이고, {props.user.age}세 입니다.
      </p>
      {props.user.isAdmin && <p>(관리자)</p>}
    </div>
  );
}
```

### 5. 배열 (Array)

배열도 중괄호 `{}`로 전달하며, 자식 컴포넌트에서는 `map()` 함수를 사용하여 배열의 각 요소를 렌더링하는 경우가 많습니다.

**부모 컴포넌트 (`ProfileContainer.jsx`)**

```jsx
import Profile from "./Profile";

export default function ProfileContainer() {
  const hobbies = ["코딩", "독서", "영화감상"];

  return <Profile name="현우" hobbies={hobbies} />;
}
```

**자식 컴포넌트 (`Profile.jsx`)**

```jsx
export default function Profile(props) {
  return (
    <div>
      <p>{props.name}의 취미:</p>
      <ul>
        {props.hobbies.map((hobby, index) => (
          <li key={index}>{hobby}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 구조 분해 할당 (Destructuring) 활용하기

Props는 객체이므로, JavaScript의 구조 분해 할당 문법을 사용하면 코드를 훨씬 간결하고 명확하게 만들 수 있습니다. `props.` 반복을 줄여주고 컴포넌트가 어떤 props를 받는지 한눈에 파악하기 쉽게 해줍니다.

### 기본 Props 구조 분해 할당

**부모 컴포넌트 (`ProfileContainer.jsx`)**

```jsx
import Profile from "./Profile";

export default function ProfileContainer() {
  return <Profile name="현우" age={22} isAdmin={true} />;
}
```

**자식 컴포넌트 (`Profile.jsx`) - 수정 후**

```jsx
// 매개변수에서 직접 구조 분해 할당
export default function Profile({ name, age, isAdmin }) {
  return (
    <div>
      <p>
        저는 {name}이고, {age}세 입니다.
      </p>
      {isAdmin && <p>(관리자)</p>}
    </div>
  );
}
```

### 중첩된 객체 Props 구조 분해 할당

Prop으로 전달된 객체 내부의 값까지 직접 분해할 수 있습니다.

**부모 컴포넌트 (`ProfileContainer.jsx`)**

```jsx
import Profile from "./Profile";

export default function ProfileContainer() {
  const user = { name: "현우", age: 22, isAdmin: true };
  return <Profile user={user} />;
}
```

**자식 컴포넌트 (`Profile.jsx`) - 수정 후**

```jsx
// 중첩된 객체 구조 분해 할당
export default function Profile({ user: { name, age, isAdmin } }) {
  return (
    <div>
      <p>
        저는 {name}이고, {age}세 입니다.
      </p>
      {isAdmin && <p>(관리자)</p>}
    </div>
  );
}
```

## 요약

- 문자열은 `""`로, 그 외 모든 JavaScript 값(숫자, 변수, 객체 등)은 `{}`로 전달합니다.
- 객체를 직접 전달할 때는 `prop={{ key: value }}`와 같이 중괄호를 두 번 사용합니다.
- 배열은 `map()` 함수와 함께 사용하여 동적인 목록을 렌더링하는 데 유용합니다.
- **구조 분해 할당**을 사용하면 `props`를 더 깔끔하고 효율적으로 다룰 수 있으므로 적극적인 사용을 권장합니다.
